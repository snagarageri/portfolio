"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Cloud,
  Database,
  Code2,
  Workflow,
  BarChart3,
} from "lucide-react";
import { useMascot } from "@/lib/mascot-context";
import { useSectionInView } from "@/lib/use-section-in-view";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  color: string;
  icon: typeof Brain;
  tools: string[];
  connections: string[];
};

const NODES: Node[] = [
  {
    id: "ai",
    label: "AI / GenAI",
    x: 110,
    y: 60,
    r: 38,
    color: "#C2F542",
    icon: Brain,
    tools: ["Vertex AI", "Gemini", "LLMs", "RAG", "LangChain", "Vector Search", "MLflow"],
    connections: ["cloud", "data"],
  },
  {
    id: "bigdata",
    label: "Big Data",
    x: 300,
    y: 35,
    r: 32,
    color: "#7C8CFF",
    icon: Workflow,
    tools: ["Spark", "Kafka", "Hadoop", "Hive", "Beam", "NiFi"],
    connections: ["ai", "cloud"],
  },
  {
    id: "cloud",
    label: "Cloud",
    x: 230,
    y: 150,
    r: 36,
    color: "#FF6B5E",
    icon: Cloud,
    tools: ["GCP", "AWS", "Azure", "BigQuery", "Dataflow", "EMR", "Databricks"],
    connections: ["ai", "bigdata", "data", "swe"],
  },
  {
    id: "data",
    label: "Data Warehousing",
    x: 70,
    y: 190,
    r: 30,
    color: "#FF6B5E",
    icon: Database,
    tools: ["Snowflake", "Redshift", "PostgreSQL", "Teradata", "MongoDB"],
    connections: ["ai", "cloud", "bi"],
  },
  {
    id: "swe",
    label: "Software Eng",
    x: 400,
    y: 130,
    r: 30,
    color: "#C2F542",
    icon: Code2,
    tools: ["Python", "FastAPI", "REST APIs", "CI/CD", "Microservices"],
    connections: ["cloud"],
  },
  {
    id: "bi",
    label: "Analytics & BI",
    x: 150,
    y: 235,
    r: 28,
    color: "#7C8CFF",
    icon: BarChart3,
    tools: ["Tableau", "Power BI", "SQL", "Pandas", "EDA"],
    connections: ["data"],
  },
];

export default function Skills() {
  const { setPose } = useMascot();
  const ref = useSectionInView(() => setPose("think"));
  const [active, setActive] = useState<string | null>(null);

  const activeNode = NODES.find((n) => n.id === active);
  const isConnected = (id: string) =>
    !active || active === id || activeNode?.connections.includes(id);

  return (
    <section
      ref={ref}
      id="skills"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <p className="font-body text-sm uppercase tracking-[0.25em] text-lime">
        the model
      </p>
      <h2 className="mt-3 font-display text-4xl font-semibold text-foreground sm:text-5xl">
        What I work with
      </h2>
      <p className="mt-4 max-w-md text-center text-foreground-dim">
        Hover a node to trace how things connect — and see the tools inside
        each one.
      </p>

      <div className="mt-12 grid w-full max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* graph */}
        <svg viewBox="0 0 460 270" className="w-full">
          {NODES.flatMap((node) =>
            node.connections.map((targetId) => {
              const target = NODES.find((n) => n.id === targetId);
              if (!target) return null;
              const dim = active && !(isConnected(node.id) && isConnected(targetId));
              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="#7C8CFF"
                  strokeOpacity={dim ? 0.08 : 0.4}
                  strokeWidth={1.5}
                />
              );
            })
          )}

          {NODES.map((node) => {
            const dim = !isConnected(node.id);
            return (
              <g
                key={node.id}
                onMouseEnter={() => setActive(node.id)}
                onMouseLeave={() => setActive(null)}
                className="cursor-pointer"
              >
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill={node.color}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: dim ? 0.22 : 0.9 }}
                  viewport={{ once: true }}
                  animate={{ scale: active === node.id ? 1.1 : 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 16 }}
                />
                <text
                  x={node.x}
                  y={node.y + node.r + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily="var(--font-body)"
                  fontWeight={600}
                  fill="#F4F2ED"
                  opacity={dim ? 0.25 : 1}
                  className="pointer-events-none select-none"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* detail panel */}
        <motion.div
          key={active ?? "default"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl border border-periwinkle/20 bg-background-soft p-6"
        >
          {activeNode ? (
            <>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: activeNode.color }}
                >
                  <activeNode.icon size={20} color="#10172A" />
                </div>
                <h3 className="font-display text-xl text-foreground">
                  {activeNode.label}
                </h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeNode.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-periwinkle/25 px-3 py-1 text-xs text-foreground-dim"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="font-display text-xl text-foreground">
                Six areas, one pipeline
              </p>
              <p className="mt-2 text-sm text-foreground-dim">
                Hover any node on the left — this panel shows the actual
                tools behind it.
              </p>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}