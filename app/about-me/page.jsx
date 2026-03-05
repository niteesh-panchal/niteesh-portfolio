"use client";

import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";
import LogoLoop from "@/components/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiDocker,
  SiFlask,
  SiGraphql,
  SiPostgresql,
  SiGithub,
} from "react-icons/si";

import { useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function AboutMe() {
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const firedRef = useRef(false);
  const introductionText =
    "I’m a 25-year-old Full-Stack Developer passionate about building scalable, high-performance web applications. I specialize in modern front-end technologies like TypeScript, React, and Next.js, and robust back-end systems using Node.js, Docker, and MongoDB. I focus on writing clean, maintainable code and delivering intuitive, user-centered experiences.";
  const techLogos = [
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiReact />
          </TooltipTrigger>
          <TooltipContent>
            <p>React</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "React",
      href: "https://react.dev",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiNextdotjs />
          </TooltipTrigger>
          <TooltipContent>
            <p>Next.js</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "Next.js",
      href: "https://nextjs.org",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiTypescript />
          </TooltipTrigger>
          <TooltipContent>
            <p>TypeScript</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiTailwindcss />
          </TooltipTrigger>
          <TooltipContent>
            <p>TailwindCSS</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiMongodb />
          </TooltipTrigger>
          <TooltipContent>
            <p>MongoDB</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "MongoDB",
      href: "https://mongodb.com",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiDocker />
          </TooltipTrigger>
          <TooltipContent>
            <p>Docker</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "Docket",
      href: "https://www.docker.com",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiFlask />
          </TooltipTrigger>
          <TooltipContent>
            <p>Flask</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "Flask",
      href: "https://flask.palletsprojects.com/en/stable/",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiPostgresql />
          </TooltipTrigger>
          <TooltipContent>
            <p>PostgreSql</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "PostgreSQL",
      href: "https://www.postgresql.org/",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiGithub />
          </TooltipTrigger>
          <TooltipContent>
            <p>Github</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "Github",
      href: "https://github.com/Niteesh3110",
    },
    {
      node: (
        <Tooltip>
          <TooltipTrigger asChild>
            <SiGraphql />
          </TooltipTrigger>
          <TooltipContent>
            <p>GraphQL</p>
          </TooltipContent>
        </Tooltip>
      ),
      title: "GraphQL",
      href: "https://graphql.com/",
    },
  ];

  const handleFirstDone = () => {
    // Prevent multiple triggers if callback fires per-letter
    if (firedRef.current) return;
    firedRef.current = true;

    setShowSecond(true);
  };

  return (
    <div className="h-full w-full overflow-hidden flex flex-col">
      <div className="p-5 ml-20 mt-20 flex flex-col">
        <SplitText
          text="Hello, my name is Niteesh"
          className="text-5xl font-semibold text-center"
          delay={70}
          duration={1}
          ease="power3.out"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.5}
          rootMargin="-100px"
          textAlign="start"
          onLetterAnimationComplete={handleFirstDone}
          showCallback
        />

        {showSecond && (
          <SplitText
            text="A Full Stack Developer"
            className="text-2xl font-semibold text-center"
            delay={70}
            duration={0.75}
            ease="power3.out"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="start"
            onLetterAnimationComplete={() =>
              console.log("Second line complete")
            }
            showCallback
          />
        )}
      </div>

      <div className="border border-white flex flex-1 flex-col overflow-hidden">
        <div className="w-full flex items-center justify-center my-5">
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
            delay={2}
            className="text-start mx-10 px-14"
          >
            <p className="text-lg">{introductionText}</p>
          </AnimatedContent>
        </div>

        <div className="flex flex-col p-10">
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
            delay={3}
            className="text-start mx-10 px-14"
          >
            <h1 className="text-3xl ml-14 pb-9">My Tech Stack</h1>

            <div className="overflow-hidden max-w-4xl mx-auto flex items-center justify-center">
              <LogoLoop
                logos={techLogos}
                speed={100}
                direction="left"
                logoHeight={60}
                gap={60}
                hoverSpeed={0}
                scaleOnHover
                fadeOut
                fadeOutColor="#ffffff"
                ariaLabel="Technology partners"
              />
            </div>
          </AnimatedContent>
        </div>
      </div>

      <div className="size-7" />
    </div>
  );
}
