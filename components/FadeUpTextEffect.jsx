"use client";
import { motion, useInView } from "framer-motion";
import * as React from "react";

export function FadeUpTextEffect({
  direction = "up",
  children,
  className = "",
  staggerChildren = 0.1,
  duration = 0.6,
  delay = 0,
}) {
  const FADE_DOWN = {
    hidden: {
      opacity: 0,
      y: direction === "down" ? -18 : 18,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        duration: duration,
        delay: delay,
      },
    },
  };

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerChildren,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) ? (
          <motion.div variants={FADE_DOWN}>{child}</motion.div>
        ) : (
          child
        ),
      )}
    </motion.div>
  );
}
