"use client";

import { motion } from "framer-motion";
import { Mail, Phone, GitFork } from "lucide-react";
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
        Open to roles, collabs, or just talking shop about pipelines that
        almost worked.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        
          href="mailto:saichitranagarageri@gmail.com"
          className="flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-display text-sm font-medium text-background transition-transform hover:scale-105"
        >
          <Mail size={16} />
          Email me
        </a>
        
          href="tel:+15103964135"
          className="flex items-center gap-2 rounded-full border border-periwinkle/40 px-6 py-3 font-display text-sm font-medium text-foreground transition-colors hover:border-periwinkle"
        >
          <Phone size={16} />
          Call
        </a>
        
          href="#"
          className="flex items-center gap-2 rounded-full border border-periwinkle/40 px-6 py-3 font-display text-sm font-medium text-foreground transition-colors hover:border-periwinkle"
        >
          <GitFork size={16} />
          GitHub
        </a>
      </div>
    </section>
  );
}