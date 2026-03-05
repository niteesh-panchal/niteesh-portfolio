"use client";
import AnimatedContent from "@/components/AnimatedContent";
import Carousel from "@/components/Carousel";
import { useState } from "react";

export default function Projects() {
  const [stackComplete, setStackComplete] = useState(false);

  return (
    <AnimatedContent
      distance={100}
      direction="vertical"
      reverse={false}
      duration={0.8}
      ease="power3.out"
      initialOpacity={0}
      animateOpacity
      scale={1}
      threshold={0.1}
      delay={0.5}
      className="relative z-10"
    >
      {/* IMPORTANT: let this container scroll naturally */}
      <div className="w-full">
        <Carousel
          autoplay
          autoplayDelay={3000}
          loop
          pauseOnHover
          round={false}
        />
      </div>
    </AnimatedContent>
  );
}
