"use client";
import TextArea from "@/components/TextArea";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FetchChatResponse } from "@/lib/chatUtils";
import { toast } from "sonner";
import BlurText from "@/components/BlurText";
import { ArrowUp } from "lucide-react";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";

export default function Home() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [showIntroText, setShowIntroText] = useState(true);

  const suggestions = [
    "Tell me something about him.",
    "Tell me about his projects",
    "Tell me about his education",
    "Tell me about his experiences",
    "What are his hobbies?",
  ];

  async function handleSuggestionClick(suggestion) {
    setMessage(suggestion);
  }

  async function handleSendMessage() {
    const currentMessage = message.trim();
    if (!currentMessage) return;

    setShowIntroText(false);
    setMessage(""); // clear input
    setAnswer(""); // clears old answer while loading (optional)

    const res = await FetchChatResponse(currentMessage);

    if (res.status >= 500 && res.status < 600) {
      toast.error("Something went wrong");
      setAnswer(
        res.data?.answer ||
          "Ugh! I need some rest now. Please feel free to check his portfolio page on your own. Thank you! P.S I am broke so I have implemented rate limit.",
      );
      return;
    }

    setAnswer(res.data?.answer || "");
  }

  return (
    <div className="h-full w-full overflow-hidden flex flex-col">
      <div className="border border-white flex flex-1 flex-col overflow-hidden">
        <div className="border-t flex-1 overflow-y-auto w-full flex justify-center items-center">
          <TextArea answer={answer} showIntroText={showIntroText} />
        </div>

        <div className="p-4 flex flex-col w-full justify-center items-center">
          <div className="w-[50%] flex flex-col border border-gray-400 rounded-2xl px-3 py-2">
            <div className="flex gap-5">
              <Input
                type="text"
                placeholder="Ask me anything."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={"border-none"}
              />
              <Button
                onClick={handleSendMessage}
                className={"rounded-full hover:cursor-pointer"}
              >
                <ArrowUp />
              </Button>
            </div>
            <div className="w-full p-2">
              <Suggestions>
                {suggestions.map((suggestion) => (
                  <Suggestion
                    key={suggestion}
                    suggestion={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                  />
                ))}
              </Suggestions>
            </div>
          </div>
        </div>
      </div>
      <div className="size-7"></div>
    </div>
  );
}
