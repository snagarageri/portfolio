"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Mascot from "@/components/Mascot";
import IntroVideoModal from "@/components/IntroVideoModal";
import { useMascot } from "@/lib/mascot-context";

export default function FloatingMascot() {
  const { pose } = useMascot();
  const [videoOpen, setVideoOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 1600);
    const t2 = setTimeout(() => setShowHint(false), 7000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 md:bottom-8 md:right-8">
        <AnimatePresence>
          {showHint && (
            <motion.button
              onClick={() => {
                setVideoOpen(true);
                setShowHint(false);
              }}
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.9 }}
              className="max-w-[200px] rounded-2xl rounded-br-sm bg-background-soft border border-periwinkle/30 px-4 py-2.5 text-left text-sm text-foreground shadow-lg"
            >
              Click me to know about me! 👀
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setVideoOpen(true)}
          aria-label="Open intro video"
          whileTap={{ scale: 0.92 }}
          whileHover={{ scale: 1.06 }}
          className="cursor-pointer"
        >
          <Mascot pose={pose} />
        </motion.button>
      </div>

      <IntroVideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}
