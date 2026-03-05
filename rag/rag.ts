import fs from "node:fs/promises";
import path from "node:path";

export async function loadIndex() {
  const file = path.join(process.cwd(), "rag", "index.json");
  const raw = await fs.readFile(file, "utf8");
  return JSON.parse(raw);
}

function dot(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}

function norm(a) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * a[i];
  return Math.sqrt(s);
}

export function cosineSimilarity(a, b) {
  const na = norm(a);
  const nb = norm(b);
  if (!na || !nb) return 0;
  return dot(a, b) / (na * nb);
}

export function retrieveTopK(index, queryEmbedding, k = 5) {
  const scored = index.chunks.map((c) => ({
    chunk: c,
    score: cosineSimilarity(queryEmbedding, c.embedding),
  }));

  scored.sort((x, y) => y.score - x.score);

  return scored.slice(0, k);
}
