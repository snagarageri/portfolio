"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function IntroVideoModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#10172A]/85 backdrop-blur-sm p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-periwinkle/30 bg-background-soft shadow-2xl"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close intro video"
              className="absolute right-4 top-4 z-10 rounded-full bg-background/70 p-2 text-foreground hover:bg-coral hover:text-background transition-colors"
            >
              <X size={18} />
            </button>

            <div className="aspect-video w-full bg-black/40">
              {/* Replace src below with your uploaded intro video, e.g. /intro.mp4 */}
              <video
                className="h-full w-full"
                controls
                autoPlay
                playsInline
                poster=""
              >
                <source src="/intro.mp4" type="video/mp4" />
                Your browser does not support video playback.
              </video>
            </div>

            <div className="p-5">
              <p className="font-display text-lg text-foreground">
                Hey, I&apos;m glad you clicked 👋
              </p>
              <p className="mt-1 text-sm text-foreground-dim">
                Drop your intro video at{" "}
                <code className="rounded bg-background px-1.5 py-0.5 text-lime">
                  /public/intro.mp4
                </code>{" "}
                and it&apos;ll play right here.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
