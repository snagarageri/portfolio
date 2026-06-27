"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { useMascot } from "@/lib/mascot-context";
import { useSectionInView } from "@/lib/use-section-in-view";

const JOBS = [
  {
    role: "Senior Data Engineer — AI/ML & GenAI Infrastructure",
    company: "Sam's Club",
    location: "Dallas, TX",
    period: "Feb 2024 – Present",
    color: "#C2F542",
    points: [
      "Led migration of enterprise-scale pipelines to GCP (BigQuery, GCS, Dataflow) at petabyte scale.",
      "Built RAG-based semantic search over enterprise data catalogs using Vertex AI embeddings and vector search.",
      "Shipped an LLM-powered text-to-SQL layer on Gemini, cutting analyst query-authoring time.",
      "Operationalized MLOps practices — deployment, versioning, and drift detection via Vertex AI Pipelines.",
    ],
  },
  {
    role: "Data Engineer — ML Pipelines & Big Data",
    company: "PayPal",
    location: "Austin, TX",
    period: "Apr 2022 – Jan 2024",
    color: "#7C8CFF",
    points: [
      "Built large-scale ingestion frameworks with PySpark, Spark SQL, Hive, and Kafka on Amazon EMR.",
      "Engineered feature pipelines for risk and forecasting models with partitioning and parallelism tuning.",
      "Developed near-real-time inference pipelines with Spark Streaming into Redshift and HDFS.",
      "Partnered with data science to productionize reproducible training-data snapshots.",
    ],
  },
  {
    role: "Senior Data Engineer — Data Platforms & Predictive Modeling",
    company: "DXC Technology",
    location: "India",
    period: "May 2019 – May 2021",
    color: "#FF6B5E",
    points: [
      "Architected platform migration from BigQuery to Salesforce across North America and EU with zero data loss.",
      "Built and validated predictive models (regression, decision trees, clustering) using SAS and R.",
      "Implemented PostgreSQL-backed APIs for inventory forecasting — improved forecast accuracy by 25%.",
    ],
  },
];

export default function Experience() {
  const { setPose } = useMascot();
  const ref = useSectionInView(() => setPose("think"));

  return (
    <section
      ref={ref}
      id="experience"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      <p className="font-body text-sm uppercase tracking-[0.25em] text-periwinkle">
        the timeline
      </p>
      <h2 className="mt-3 font-display text-4xl font-semibold text-foreground sm:text-5xl">
        Where I&apos;ve worked
      </h2>

      <div className="relative mt-14 w-full max-w-3xl">
        <div className="absolute left-[18px] top-2 bottom-2 w-px bg-periwinkle/20 sm:left-[22px]" />

        <div className="flex flex-col gap-10">
          {JOBS.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex gap-5 pl-1 sm:gap-6"
            >
              <div
                className="relative z-10 flex h-9 w-9 flex-none items-center justify-center rounded-full sm:h-11 sm:w-11"
                style={{ background: job.color }}
              >
                <Briefcase size={16} color="#10172A" />
              </div>

              <div className="flex-1 rounded-3xl border border-periwinkle/20 bg-background-soft p-5 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg text-foreground sm:text-xl">
                    {job.role}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-foreground-dim">
                    {job.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-foreground-dim">
                  {job.company} · {job.location}
                </p>
                <ul className="mt-4 space-y-2">
                  {job.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex gap-2 text-sm text-foreground-dim"
                    >
                      <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-lime" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: JOBS.length * 0.1 }}
            className="relative flex gap-5 pl-1 sm:gap-6"
          >
            <div className="relative z-10 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-foreground-dim/30 sm:h-11 sm:w-11">
              <GraduationCap size={16} color="#10172A" />
            </div>
            <div className="flex-1 rounded-3xl border border-periwinkle/20 bg-background-soft p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-lg text-foreground sm:text-xl">
                  Master of Science, Data Science
                </h3>
                <span className="text-xs uppercase tracking-widest text-foreground-dim">
                  Dec 2022
                </span>
              </div>
              <p className="mt-1 text-sm text-foreground-dim">
                Saint Peter&apos;s University, Jersey City, NJ
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}