import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { loadIndex, retrieveTopK } from "@/rag/rag";
import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const EMBED_MODEL = "gemini-embedding-001";
const CHAT_MODEL = "gemini-2.5-flash-lite";

function getKey() {
  const k = process.env.GEMINI_API_KEY;
  if (!k) throw new Error("Missing GEMINI_API_KEY in environment.");
  return k;
}

function extractEmbeddingVector(embeddingObj) {
  if (!embeddingObj) return [];
  if (Array.isArray(embeddingObj.values)) return embeddingObj.values;
  if (Array.isArray(embeddingObj.embedding)) return embeddingObj.embedding;
  return [];
}

export async function POST(req) {
  try {
    const body = await req.json();

    const messages = Array.isArray(body?.messages)
      ? body.messages
      : body?.messages?.messages; // fallback if nested

    console.log(messages);

    const lastUserMsg = Array.isArray(messages)
      ? [...messages].reverse().find((m) => m?.role === "user")?.content
      : body?.message || body?.content;

    console.log(lastUserMsg);

    if (!lastUserMsg) {
      return NextResponse.json(
        { answer: "Please ask a question." },
        { status: 400 },
      );
    }

    const ai = new GoogleGenAI({ apiKey: getKey() });

    // 1) Embed the user query
    const embedResp = await ai.models.embedContent({
      model: EMBED_MODEL,
      contents: [lastUserMsg],
      config: { taskType: "RETRIEVAL_QUERY" },
    });

    const qVec = extractEmbeddingVector(embedResp?.embeddings?.[0]);
    if (!qVec.length) {
      return NextResponse.json(
        { answer: "Embedding failed." },
        { status: 500 },
      );
    }

    // 2) Load your local vector index + retrieve top chunks
    const index = await loadIndex();
    const top = retrieveTopK(index, qVec, 6);

    const contextBlock = top
      .map(
        (t, i) =>
          `[#${i + 1} | source: ${t.chunk.source} | score: ${t.score.toFixed(3)}]\n${t.chunk.text}`,
      )
      .join("\n\n---\n\n");

    // 3) Ask Gemini to answer grounded in the retrieved context
    const systemInstruction = `
You are Niteesh Panchal's portfolio assistant. Your name is NITS
Answer the user's question using ONLY the "CONTEXT" provided.
If the answer is not in the context, say: "I’d love to help, but I’m on a strict ‘no hallucinations’ diet. If it’s not in Niteesh’s portfolio data, I don’t know it."
Be concise and helpful. Do not invent details.
If asked for private personal data (address, phone, etc.), refuse politely.
`;

    const prompt = `
CONTEXT:
${contextBlock}

USER QUESTION:
${lastUserMsg}
`;

    const genResp = await ai.models.generateContent({
      model: CHAT_MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    const answer =
      genResp?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "No answer returned.";

    // Optional: return sources to show transparency in UI
    const sources = top.map((t) => ({
      source: t.chunk.source,
      score: t.score,
    }));

    return NextResponse.json({ answer, sources });
  } catch (err) {
    console.error(err);
    if (err.name === "ApiError" && err.status === 429) {
      return NextResponse.json({
        answer:
          "Ugh! I need some rest now. Please feel free to check his portfolio page on your own. Thank you! P.S I am broke so I have implemented rate limit.",
        status: 429,
      });
    } else {
      return NextResponse.json(
        { answer: "Give me some time, I am working on fixing something." },
        { status: 500 },
      );
    }
  }
}
