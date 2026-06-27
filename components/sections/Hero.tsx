"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
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
        AI / ML Engineer
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-4 font-display text-5xl font-semibold leading-tight text-foreground sm:text-7xl"
      >
        Hey, I&apos;m{" "}
        <span className="text-periwinkle">Your Name</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 max-w-xl font-body text-lg text-foreground-dim"
      >
        I build models that learn, ship products that think, and occasionally
        teach a neural net to behave. Scroll down — my little companion in
        the corner has opinions about my work.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#projects"
          className="rounded-full bg-coral px-6 py-3 font-display text-sm font-medium text-background transition-transform hover:scale-105"
        >
          See my work
        </a>
        <a
          href="#contact"
          className="rounded-full border border-periwinkle/40 px-6 py-3 font-display text-sm font-medium text-foreground transition-colors hover:border-periwinkle"
        >
          Get in touch
        </a>
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
