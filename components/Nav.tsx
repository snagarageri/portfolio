"use client";

import { motion } from "framer-motion";

const LINKS = [
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 z-30 flex w-full items-center justify-between px-6 py-5 sm:px-10"
    >
      <a href="#" className="font-display text-lg text-foreground">
        Saichitra<span className="text-lime">.</span>
      </a>
      <div className="hidden items-center gap-7 rounded-full border border-periwinkle/15 bg-background-soft/60 px-6 py-2.5 backdrop-blur-sm sm:flex">
        {LINKS.map((link) => (
          
            key={link.href}
            href={link.href}
            className="text-sm text-foreground-dim transition-colors hover:text-lime"
          >
            {link.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}