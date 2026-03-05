import React from "react";
import IntroText from "./IntroText";
import MessageRendering from "./MessageRendering";
import { Shimmer } from "./ai-elements/shimmer";

export default function TextArea({ answer = "", showIntroText }) {
  return (
    <div className="w-full">
      {showIntroText ? (
        <IntroText />
      ) : (
        <div className="p-5">
          {answer.trim() === "" ? (
            <div className="opacity-70">
              <Shimmer duration={1}>Thinking....</Shimmer>
            </div>
          ) : (
            <MessageRendering answer={answer} />
          )}
        </div>
      )}
    </div>
  );
}
