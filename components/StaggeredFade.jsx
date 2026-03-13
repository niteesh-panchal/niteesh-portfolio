"use client";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import * as React from "react";

export const StaggeredFade = ({ text, className = "" }) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: 16,
    },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
      },
    }),
  };

  const words = text.split(" ");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.h2
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className={cn(
        "text-sm text-center sm:text-4xl font-bold md:text-lg ",
        className,
      )}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={variants}
          custom={i}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};
