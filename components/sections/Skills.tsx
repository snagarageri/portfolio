"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useMascot } from "@/lib/mascot-context";
import { useSectionInView } from "@/lib/use-section-in-view";

type Node = {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  color: string;
  connections: string[];
};

const NODES: Node[] = [
  { id: "py", label: "Python", x: 100, y: 90, r: 34, color: "#C2F542", connections: ["pt", "skl", "pd"] },
  { id: "pt", label: "PyTorch", x: 260, y: 50, r: 30, color: "#7C8CFF", connections: ["py", "cv", "nlp"] },
  { id: "skl", label: "scikit-learn", x: 250, y: 170, r: 26, color: "#7C8CFF", connections: ["py", "pd"] },
  { id: "pd", label: "Pandas", x: 90, y: 210, r: 26, color: "#FF6B5E", connections: ["py", "skl"] },
  { id: "cv", label: "Computer Vision", x: 420, y: 30, r: 24, color: "#C2F542", connections: ["pt"] },
  { id: "nlp", label: "NLP", x: 430, y: 130, r: 26, color: "#C2F542", connections: ["pt", "llm"] },
  { id: "llm", label: "LLMs", x: 380, y: 220, r: 28, color: "#FF6B5E", connections: ["nlp"] },
];

export default function Skills() {
  const { setPose } = useMascot();
  const ref = useSectionInView(() => setPose("think"));
  const [active, setActive] = useState<string | null>(null);

  const isConnected = (id: string) =>
    !active ||
    active === id ||
    NODES.find((n) => n.id === active)?.connections.includes(id);

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
        Hover a node to trace how things connect — pretty fitting for an ML
        stack.
      </p>

      <div className="mt-12 w-full max-w-2xl">
        <svg viewBox="0 0 480 250" className="w-full">
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
                  whileInView={{ scale: 1, opacity: dim ? 0.25 : 0.9 }}
                  viewport={{ once: true }}
                  animate={{ scale: active === node.id ? 1.12 : 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 16 }}
                />
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                  fontFamily="var(--font-body)"
                  fontWeight={600}
                  fill="#10172A"
                  opacity={dim ? 0.3 : 1}
                  className="pointer-events-none select-none"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}
