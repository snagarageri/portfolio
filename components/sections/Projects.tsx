"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useMascot } from "@/lib/mascot-context";
import { useSectionInView } from "@/lib/use-section-in-view";

const PROJECTS = [
  {
    title: "RAG Search Over Enterprise Data",
    tag: "GenAI / Vertex AI",
    desc: "Built embedding-generation and vector-indexing pipelines using Vertex AI embeddings and vector search, powering RAG-based semantic search across enterprise data catalogs and cutting data-discovery time for analytics teams.",
    color: "#C2F542",
    company: "Sam's Club",
  },
  {
    title: "LLM-Powered Text-to-SQL Layer",
    tag: "Gemini / LLMs",
    desc: "Developed an LLM-powered text-to-SQL and metadata-documentation layer on Gemini that auto-generates BigQuery query suggestions and table descriptions, cutting analyst query-authoring effort and onboarding time.",
    color: "#7C8CFF",
    company: "Sam's Club",
  },
  {
    title: "Petabyte-Scale GCP Migration",
    tag: "BigQuery / Dataflow",
    desc: "Led end-to-end migration of enterprise-scale pipelines to BigQuery, GCS, and Cloud Dataflow, consolidating petabyte-scale workloads to modernize processing and improve pipeline reliability.",
    color: "#FF6B5E",
    company: "Sam's Club",
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
      <p className="mt-4 max-w-md text-center text-foreground-dim">
        Highlights from my current role. Personal projects coming soon.
      </p>

      <div className="mt-12 grid w-full max-w-5xl gap-6 sm:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col rounded-3xl border border-periwinkle/20 bg-background-soft p-6"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ background: p.color }}
            >
              <Sparkles size={18} color="#10172A" />
            </div>
            <p className="mt-5 text-xs uppercase tracking-widest text-foreground-dim">
              {p.tag} · {p.company}
            </p>
            <h3 className="mt-2 font-display text-xl text-foreground">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-foreground-dim">{p.desc}</p>
            <ArrowUpRight
              className="mt-6 text-foreground-dim transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-lime"
              size={18}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 flex items-center gap-2 rounded-full border border-dashed border-periwinkle/30 px-5 py-2.5 text-sm text-foreground-dim"
      >
        <Sparkles size={14} className="text-periwinkle" />
        Personal projects landing here soon
      </motion.div>
    </section>
  );
}