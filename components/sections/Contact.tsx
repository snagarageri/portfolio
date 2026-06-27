"use client";

import { motion } from "framer-motion";
import { useMascot } from "@/lib/mascot-context";
import { useSectionInView } from "@/lib/use-section-in-view";

export default function Contact() {
  const { setPose } = useMascot();
  const ref = useSectionInView(() => setPose("celebrate"));

  return (
    <section
      ref={ref}
      id="contact"
      className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-4xl font-semibold text-foreground sm:text-5xl"
      >
        Let&apos;s build something
      </motion.h2>
      <p className="mt-4 max-w-md text-foreground-dim">
        Open to roles, collabs, or just talking shop about models that
        almost worked.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href="mailto:you@example.com"
          className="rounded-full bg-lime px-6 py-3 font-display text-sm font-medium text-background transition-transform hover:scale-105"
        >
          Email me
        </a>
        <a
          href="#"
          className="rounded-full border border-periwinkle/40 px-6 py-3 font-display text-sm font-medium text-foreground transition-colors hover:border-periwinkle"
        >
          LinkedIn
        </a>
        <a
          href="#"
          className="rounded-full border border-periwinkle/40 px-6 py-3 font-display text-sm font-medium text-foreground transition-colors hover:border-periwinkle"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
