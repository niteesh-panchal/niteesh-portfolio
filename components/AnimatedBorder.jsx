"use client";

import { motion } from "framer-motion";

export default function AnimatedBorder({
  isInView,
  borderColor = "text-white",
}) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.rect
        x="1"
        y="1"
        width="98"
        height="98"
        rx="6"
        ry="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={
          isInView
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 1 }
        }
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        className={borderColor}
      />
    </svg>
  );
}
