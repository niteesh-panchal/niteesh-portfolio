"use client";

import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";
import { BlurIn } from "@/components/BlurInText";

const experiences = [
  {
    id: 1,
    company: "Stevens Institute of Technology",
    role: "Graduate Course Assistant (Introduction to Web Development)",
    stack: "Jan 2026 - Current",
    description:
      "Introduced core concepts of web architecture, modern web programming technologies, and real-world product development practices using Agile methodologies to over 50 students. Developed automated grading scripts that improved evaluation efficiency and significantly streamlined the assignment assessment process.",
  },
  {
    id: 2,
    company: "Stevens Institute of Technology",
    role: "Graduate Course Assistant (Advance Web Development)",
    stack: "Sept 2025 - Current",
    description:
      "Deliver weekly lectures and hold office hours for over 100 students, helping them master advanced full-stack development topics like React.js, Next.js, Node.js, Express.js, RESTful APIs, GraphQL, Redis, and MongoDB. Reinforce best practices in debugging, modular coding, and asynchronous programming. Grade 11 labs and multiple full-stack projects for over 50 students, collaborating with faculty to ensure fair, consistent, and standards-aligned evaluations.",
  },
  {
    id: 3,
    company: "Stevens Institute of Technology",
    role: "Graduate Course Assistant (Web Development)",
    stack: "Jan 2025 – May 2025",
    description:
      "Delivered weekly lectures and held office hours to support over 170 students in mastering full-stack development concepts using JavaScript, React.js, Node.js, Express.js, RESTful APIs, and MongoDB. Reinforced best practices in debugging, modular coding, and asynchronous programming. Graded 11 labs and multiple full-stack projects for over 100 students, created final exam assessments, and collaborated with faculty for fair evaluation. Built automated grading scripts and managed assignment logistics, saving over 5 hours/week and streamlining course operations.",
  },
  {
    id: 4,
    company: "Quantum Mutual Funds",
    role: "Associate Software Engineer",
    stack: "Oct 2022 – Feb 2024",
    description:
      "Optimized investor dashboard interfaces with React, boosting page load speed by 25% and enhancing accessibility. Engineered RESTful microservices with Node.js/Express.js, cutting API response times by 30% for faster real-time market data access. Designed SQL queries on PostgreSQL databases to streamline data retrieval and accurately handle high-volume financial transactions.",
  },
  {
    id: 5,
    company: "Quantum Mutual Funds",
    role: "Software Engineering Intern",
    stack: "Apr 2022 – Sept 2022",
    description:
      "Built 10+ reusable UI components with React and Bootstrap, cutting duplicate code by 20% and speeding up feature development for the investor dashboard. Integrated in-house APIs to enhance data refresh speed by 30% and provide timely insights for portfolio managers. Collaborated with senior developers to resolve stability issues, improving application reliability and user experience.",
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
        <h3 className="text-center lg:text-right text-lg font-semibold text-white md:text-xl">
          {item.company}
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
        <p className="text-lg text-neutral-500">{item.role}</p>

        <p className="mt-3 text-sm font-medium text-neutral-300">
          {item.stack}
        </p>

        <p className="mt-4 text-sm leading-7 text-neutral-400 md:text-base">
          {item.description}
        </p>
      </motion.div>
    </div>
  );
}

export default function ExperienceTimeline() {
  return (
    <section className="w-full px-6 bg-main-dark min-h-full max-w-sm md:max-w-fullflex lg:max-w-full">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="text-center min-h-dvh flex flex-col items-center justify-center"
        >
          <p className="text-5xl uppercase tracking-[0.25em] text-white">
            <BlurIn>
              <GradientText
                colors={["#edf6f9", "#cbcbcb", "#f2f2f2"]}
                className="font-main-heading"
              >
                My Experience
              </GradientText>
            </BlurIn>
          </p>

          <p className="mt-3 text-2xl font-semibold text-white md:text-2xl">
            <BlurIn>
              <GradientText
                colors={["#174d38", "#cbcbcb", "#f2f2f2"]}
                className="font-sub-heading"
              >
                Building across products, systems, and user experiences.
              </GradientText>
            </BlurIn>
          </p>
        </motion.div>

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
    </section>
  );
}
