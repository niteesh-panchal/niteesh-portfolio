import dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const DATA_DIR = path.join(process.cwd(), "data");
const OUT_DIR = path.join(process.cwd(), "rag");
const OUT_FILE = path.join(OUT_DIR, "index.json");

// Embeddings model (Gemini API)
const EMBED_MODEL = "gemini-embedding-001";

// Chunking knobs (safe defaults for RAG)
const MAX_CHARS = 1800;
const OVERLAP_CHARS = 200;

// Batch embeddings to reduce API calls
const BATCH_SIZE = 32;

function assertEnv(name) {
  const v = process.env[name];
  console.log("v:", v);
  if (!v) throw new Error(`Missing ${name}. Add it to .env.local`);
  return v;
}

async function walkDir(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkDir(full)));
    else out.push(full);
  }
  return out;
}

function normalizeNewlines(s) {
  return s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function stripFrontmatter(md) {
  // Remove YAML frontmatter if present
  if (md.startsWith("---")) {
    const end = md.indexOf("\n---", 3);
    if (end !== -1) return md.slice(end + 4);
  }
  return md;
}

function chunkText(text, maxChars, overlapChars) {
  const clean = text
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .trim();

  if (!clean) return [];

  // Split by blank lines first (paragraph-ish)
  const paragraphs = clean
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks = [];
  let buf = "";

  const pushBuf = () => {
    const t = buf.trim();
    if (t) chunks.push(t);
    buf = "";
  };

  for (const p of paragraphs) {
    if (!buf) {
      buf = p;
      continue;
    }
    if ((buf + "\n\n" + p).length <= maxChars) {
      buf = buf + "\n\n" + p;
    } else {
      pushBuf();
      buf = p;
    }
  }
  pushBuf();

  // Add overlap (character-based) to improve retrieval continuity
  if (overlapChars > 0 && chunks.length > 1) {
    const overlapped = [];
    for (let i = 0; i < chunks.length; i++) {
      const prev = i > 0 ? chunks[i - 1] : "";
      const head =
        i > 0 ? prev.slice(Math.max(0, prev.length - overlapChars)) : "";
      overlapped.push(head ? `${head}\n\n${chunks[i]}` : chunks[i]);
    }
    return overlapped;
  }

  return chunks;
}

function stableId(sourceRel, chunkTextValue) {
  // Stable IDs so you can diff / re-ingest cleanly
  const h = crypto
    .createHash("sha256")
    .update(sourceRel + "\n" + chunkTextValue)
    .digest("hex");
  return h.slice(0, 16);
}

function extractEmbeddingVector(embeddingObj) {
  // The SDK response shape can vary by version; handle common shapes.
  // Typically: { embeddings: [{ values: number[] }, ...] }
  if (!embeddingObj) return [];
  if (Array.isArray(embeddingObj.values)) return embeddingObj.values;
  if (Array.isArray(embeddingObj.embedding)) return embeddingObj.embedding;
  if (Array.isArray(embeddingObj)) return embeddingObj;
  return [];
}

async function main() {
  const apiKey = assertEnv("GEMINI_API_KEY");
  const ai = new GoogleGenAI({ apiKey });

  const allFiles = (await walkDir(DATA_DIR))
    .filter((f) => f.endsWith(".md"))
    .sort();

  if (allFiles.length === 0) {
    throw new Error(`No .md files found under ${DATA_DIR}`);
  }

  const chunkRecords = [];

  for (const file of allFiles) {
    const rel = path.relative(DATA_DIR, file).replace(/\\/g, "/");
    const raw = normalizeNewlines(await fs.readFile(file, "utf8"));
    const cleaned = stripFrontmatter(raw).trim();

    const chunks = chunkText(cleaned, MAX_CHARS, OVERLAP_CHARS);

    for (const c of chunks) {
      chunkRecords.push({
        sourceRel: rel,
        text: c,
        id: stableId(rel, c),
      });
    }
  }

  console.log(`Found ${allFiles.length} markdown files.`);
  console.log(
    `Created ${chunkRecords.length} chunks. Embedding in batches of ${BATCH_SIZE}...`,
  );

  const ragChunks = [];

  for (let i = 0; i < chunkRecords.length; i += BATCH_SIZE) {
    const batch = chunkRecords.slice(i, i + BATCH_SIZE);
    const contents = batch.map((b) => b.text);

    const response = await ai.models.embedContent({
      model: EMBED_MODEL,
      contents,
      config: {
        taskType: "RETRIEVAL_DOCUMENT",
      },
    });

    const embeddingsArr = response?.embeddings ?? [];
    if (
      !Array.isArray(embeddingsArr) ||
      embeddingsArr.length !== batch.length
    ) {
      throw new Error(
        `Embedding response mismatch: got ${embeddingsArr?.length} embeddings for ${batch.length} inputs`,
      );
    }

    for (let j = 0; j < batch.length; j++) {
      const vec = extractEmbeddingVector(embeddingsArr[j]);
      if (!vec.length) {
        throw new Error(
          `Empty embedding vector for chunk ${batch[j].id} (${batch[j].sourceRel})`,
        );
      }
      ragChunks.push({
        id: batch[j].id,
        source: batch[j].sourceRel,
        text: batch[j].text,
        embedding: vec,
      });
    }

    console.log(
      `Embedded ${Math.min(i + BATCH_SIZE, chunkRecords.length)} / ${chunkRecords.length}`,
    );
  }

  const index = {
    createdAt: new Date().toISOString(),
    model: EMBED_MODEL,
    chunking: { maxChars: MAX_CHARS, overlapChars: OVERLAP_CHARS },
    chunks: ragChunks,
  };

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(OUT_FILE, JSON.stringify(index, null, 2), "utf8");

  console.log(
    `✅ Wrote vector index to ${path.relative(process.cwd(), OUT_FILE)}`,
  );
  console.log(`Chunks: ${index.chunks.length}`);
  console.log(`Embedding dims (example): ${index.chunks[0].embedding.length}`);
}

main().catch((err) => {
  console.error("❌ Ingestion failed:", err);
  process.exit(1);
});
