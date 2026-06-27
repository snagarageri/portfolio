"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMascot } from "@/lib/mascot-context";
import { useSectionInView } from "@/lib/use-section-in-view";

const PROJECTS = [
  {
    title: "Project One",
    tag: "Computer Vision",
    desc: "Replace with a one-line description of what it does and the impact it had.",
    color: "#FF6B5E",
  },
  {
    title: "Project Two",
    tag: "NLP / LLMs",
    desc: "Replace with a one-line description of what it does and the impact it had.",
    color: "#C2F542",
  },
  {
    title: "Project Three",
    tag: "MLOps",
    desc: "Replace with a one-line description of what it does and the impact it had.",
    color: "#7C8CFF",
  },
];

export default function Projects() {
  const { setPose } = useMascot();
  const ref = useSectionInView(() => setPose("point"));

  return (
    <section
      ref={ref}
      id="projects"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <p className="font-body text-sm uppercase tracking-[0.25em] text-coral">
        selected work
      </p>
      <h2 className="mt-3 font-display text-4xl font-semibold text-foreground sm:text-5xl">
        Things I&apos;ve built
      </h2>

      <div className="mt-12 grid w-full max-w-5xl gap-6 sm:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.title}
            href="#"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col rounded-3xl border border-periwinkle/20 bg-background-soft p-6"
          >
            <div
              className="h-10 w-10 rounded-full"
              style={{ background: p.color }}
            />
            <p className="mt-5 text-xs uppercase tracking-widest text-foreground-dim">
              {p.tag}
            </p>
            <h3 className="mt-2 font-display text-xl text-foreground">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-foreground-dim">{p.desc}</p>
            <ArrowUpRight
              className="mt-6 text-foreground-dim transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-lime"
              size={18}
            />
          </motion.a>
        ))}
      </div>
    </section>
  );
}
