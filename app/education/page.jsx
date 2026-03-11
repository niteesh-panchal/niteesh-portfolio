"use client";
import React from "react";
import { motion } from "framer-motion";
import { FadeUpTextEffect } from "@/components/FadeUpTextEffect";

const experiences = [
  {
    id: 1,
    university: "Stevens Institute of Technology",
    degreeType: "Masters of Science in Computer Science",
    year: "2024-2026",
    skills:
      "NumPy • React.js • Next.js • GraphQL • Redis • Matplotlib • Agile Methodology",
  },
  {
    id: 2,
    university: "University of Mumbai",
    degreeType: "Bachelores of Science in Computer Science",
    year: "2019-2022",
    skills:
      "Python • JavaScript • Object Oriented Programming • Game Programming • Ethical Hacking • Wireless Networks • Mobile Development",
  },
];

function ExperienceRow({ item, isLast, index }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_80px_1.4fr] gap-6">
      {/* Left */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.5,
          delay: index * 0.12 + 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex items-center justify-center lg:justify-end"
      >
        <h3 className="text-right text-lg font-semibold text-white md:text-xl">
          {item.university}
        </h3>
      </motion.div>

      {/* Center line + dot */}
      <div className="relative flex justify-center">
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0.4 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              delay: index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-10 h-[calc(100%+2.5rem)] w-px origin-top bg-gradient-to-b from-white/50 via-white/20 to-transparent"
          />
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.4,
            delay: index * 0.12 + 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-8 flex h-5 w-5 items-center justify-center"
        >
          <div className="absolute h-5 w-5 rounded-full bg-white/15 blur-[8px]" />
          <div className="h-3 w-3 rounded-full border border-white/50 bg-neutral-950" />
        </motion.div>
      </div>

      {/* Right */}
      <motion.div
        initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.55,
          delay: index * 0.12 + 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6"
      >
        <p className="mt-3 text-sm font-medium text-neutral-300">{item.year}</p>

        <p className="mt-4 text-sm leading-7 text-neutral-400 md:text-base">
          {item.skills}
        </p>
      </motion.div>
    </div>
  );
}

export default function Education() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col w-full max-w-6xl px-6 justify-center items-center lg:pt-5 sm:gap-1 md:gap-1 lg:gap-5 xl:gap-20">
        <div className="w-full text-text-dark flex flex-col items-center gap-2 pt-5 md:p-1">
          <FadeUpTextEffect
            className="text-4xl sm:text-5xl md:text-6xl text-center"
            duration={0.7}
            delay={0.3}
            staggerChildren={0.15}
          >
            <h1 className="font-main-heading">My Education</h1>
          </FadeUpTextEffect>
          <FadeUpTextEffect
            className="text-lg sm:text-md md:text-lg text-center"
            duration={0.7}
            delay={0.8}
            staggerChildren={0.15}
          >
            <p className="font-main-heading">
              These are my education and skill I learned
            </p>
          </FadeUpTextEffect>
        </div>

        <div className="space-y-12 md:space-y-16 py-10">
          {experiences.map((item, index) => (
            <ExperienceRow
              key={item.id}
              item={item}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
