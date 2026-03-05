"use client";

import React, { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function MessageRendering({ answer = "" }) {
  const LONG_THRESHOLD = 600;
  const PREVIEW_CHARS = 520;

  const previewText = useMemo(() => {
    if (answer.length <= LONG_THRESHOLD) return answer;

    const cut = answer.slice(0, PREVIEW_CHARS);
    const lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > 200 ? cut.slice(0, lastSpace) : cut) + "…";
  }, [answer]);

  const [showFull, setShowFull] = useState(false);

  // Reset whenever a NEW answer arrives (safe if answer is set once per response)
  useEffect(() => {
    setShowFull(false);
  }, [answer]);

  // ✅ Correct hook usage (array return)
  const [text] = useTypewriter({
    words: [previewText],
    loop: 1,
    typeSpeed: 10,
    deleteSpeed: 0,
    delaySpeed: 0,
  });

  // When typing reaches the preview end, show full markdown answer
  useEffect(() => {
    if (!showFull && text === previewText) {
      setShowFull(true);
    }
  }, [text, previewText, showFull]);

  return (
    <div className="p-3 pt-32 overflow-y-auto w-full max-w-3xl">
      {!showFull ? (
        <div>
          <span>{text}</span>
          <Cursor cursorStyle="▍" />
        </div>
      ) : (
        <ReactMarkdown>{answer}</ReactMarkdown>
      )}
    </div>
  );
}
