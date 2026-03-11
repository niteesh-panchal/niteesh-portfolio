import React from "react";
import IntroText from "./IntroText";
import MessageRendering from "./MessageRendering";
import { Shimmer } from "./ai-elements/shimmer";

export default function TextArea({ answer = "", showIntroText }) {
  return (
    <div className="w-full h-full">
      {showIntroText ? (
        <IntroText />
      ) : (
        <div className="flex items-center justify-center">
          {answer.trim() === "" ? (
            <div className="opacity-70">
              <Shimmer
                duration={1}
                className={"font-sub-heading text-accent-dark"}
              >
                Thinking....
              </Shimmer>
            </div>
          ) : (
            <MessageRendering answer={answer} />
          )}
        </div>
      )}
    </div>
  );
}
