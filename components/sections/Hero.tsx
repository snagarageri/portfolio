"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { Mail, Phone, MapPin, FileDown } from "lucide-react";
import { useMascot } from "@/lib/mascot-context";
import { useSectionInView } from "@/lib/use-section-in-view";

export default function Hero() {
  const { setPose } = useMascot();
  const ref = useSectionInView(() => setPose("wave"));

  useEffect(() => {
    setPose("wave");
  }, [setPose]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-body text-sm uppercase tracking-[0.25em] text-lime"
      >
        Senior Data &amp; AI/ML Engineer
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-4 font-display text-5xl font-semibold leading-tight text-foreground sm:text-7xl"
      >
        Hey, I&apos;m{" "}
        <span className="text-periwinkle">Saichitra</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 max-w-xl font-body text-lg text-foreground-dim"
      >
        7+ years building scalable data platforms, ML pipelines, and GenAI
        infrastructure across GCP, AWS, and Azure — from BigQuery and Spark
        to Vertex AI feature stores, RAG pipelines, and MLOps at petabyte
        scale. My little companion in the corner has opinions about my work.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        
          href="#projects"
          className="rounded-full bg-coral px-6 py-3 font-display text-sm font-medium text-background transition-transform hover:scale-105"
        >
          See my work
        </a>
        
          href="#contact"
          className="rounded-full border border-periwinkle/40 px-6 py-3 font-display text-sm font-medium text-foreground transition-colors hover:border-periwinkle"
        >
          Get in touch
        </a>
        
          href="/resume.pdf"
          download
          className="flex items-center gap-2 rounded-full border border-lime/40 px-6 py-3 font-display text-sm font-medium text-lime transition-colors hover:border-lime"
        >
          <FileDown size={16} />
          Resume
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-foreground-dim"
      >
        
          href="mailto:saichitranagarageri@gmail.com"
          className="flex items-center gap-2 transition-colors hover:text-lime"
        >
          <Mail size={15} />
          saichitranagarageri@gmail.com
        </a>
        
          href="tel:+15103964135"
          className="flex items-center gap-2 transition-colors hover:text-lime"
        >
          <Phone size={15} />
          +1 (510) 396-4135
        </a>
        <span className="flex items-center gap-2">
          <MapPin size={15} />
          Dallas, TX
        </span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 text-foreground-dim text-xs uppercase tracking-widest"
      >
        scroll ↓
      </motion.div>
    </section>
  );
}