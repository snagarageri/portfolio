"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export type MascotPose = "idle" | "wave" | "point" | "think" | "celebrate";

const BLOB = "#7C8CFF";
const BLOB_DARK = "#5E6FE0";

export default function Mascot({ pose = "idle" }: { pose?: MascotPose }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);

  // eye tracking
  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);
  const springX = useSpring(eyeX, { stiffness: 120, damping: 12 });
  const springY = useSpring(eyeY, { stiffness: 120, damping: 12 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const maxPull = 4.5;
      eyeX.set((dx / dist) * Math.min(maxPull, dist / 40));
      eyeY.set((dy / dist) * Math.min(maxPull, dist / 40));
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [eyeX, eyeY]);

  const armRight =
    pose === "wave"
      ? { rotate: [0, -25, 10, -25, 0] }
      : pose === "point"
      ? { rotate: -35 }
      : pose === "celebrate"
      ? { rotate: [-10, -70, -10] }
      : { rotate: 0 };

  const bodyBounce =
    pose === "celebrate"
      ? { y: [0, -10, 0] }
      : { y: [0, -6, 0] };

  return (
    <motion.div
      ref={wrapRef}
      className="relative h-40 w-40 select-none"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      animate={bodyBounce}
      transition={{ duration: pose === "celebrate" ? 0.6 : 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.svg
        viewBox="0 0 200 200"
        className="h-full w-full drop-shadow-[0_12px_24px_rgba(124,140,255,0.35)]"
        animate={hover ? { scale: 1.05 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
      >
        {/* shadow */}
        <ellipse cx="100" cy="178" rx="42" ry="8" fill="#000" opacity="0.18" />

        {/* body blob */}
        <path
          d="M100 30c34 0 56 26 56 64s-22 78-56 78-56-40-56-78 22-64 56-64Z"
          fill={BLOB}
        />
        <path
          d="M100 30c34 0 56 26 56 64s-22 78-56 78"
          fill="none"
          stroke={BLOB_DARK}
          strokeOpacity="0.25"
          strokeWidth="3"
        />

        {/* left arm */}
        <motion.g
          style={{ originX: "62px", originY: "108px" }}
          animate={pose === "think" ? { rotate: 15 } : { rotate: -5 }}
        >
          <rect x="40" y="100" width="24" height="14" rx="7" fill={BLOB} />
          <circle cx="38" cy="107" r="9" fill={BLOB} />
        </motion.g>

        {/* right arm (the one that waves/points/celebrates) */}
        <motion.g
          style={{ originX: "140px", originY: "108px" }}
          animate={armRight}
          transition={{ duration: pose === "wave" ? 1.1 : 0.5, repeat: pose === "wave" || pose === "celebrate" ? Infinity : 0, repeatDelay: 0.4 }}
        >
          <rect x="136" y="100" width="24" height="14" rx="7" fill={BLOB} />
          <circle cx="162" cy="107" r="9" fill={BLOB} />
        </motion.g>

        {/* feet */}
        <ellipse cx="78" cy="196" rx="14" ry="6" fill={BLOB_DARK} opacity="0.5" />
        <ellipse cx="122" cy="196" rx="14" ry="6" fill={BLOB_DARK} opacity="0.5" />

        {/* cheeks */}
        <circle cx="72" cy="100" r="9" fill="#FF6B5E" opacity="0.35" />
        <circle cx="128" cy="100" r="9" fill="#FF6B5E" opacity="0.35" />

        {/* eyes (white) */}
        <circle cx="82" cy="88" r="16" fill="#10172A" />
        <circle cx="118" cy="88" r="16" fill="#10172A" />
        <circle cx="82" cy="88" r="13.5" fill="#F4F2ED" />
        <circle cx="118" cy="88" r="13.5" fill="#F4F2ED" />

        {/* pupils — these track the cursor */}
        <motion.circle
          cx={82}
          cy={88}
          r="6.5"
          fill="#10172A"
          style={{ x: springX, y: springY }}
        />
        <motion.circle
          cx={118}
          cy={88}
          r="6.5"
          fill="#10172A"
          style={{ x: springX, y: springY }}
        />
        {/* eye shine */}
        <circle cx="86" cy="84" r="2.4" fill="#fff" />
        <circle cx="122" cy="84" r="2.4" fill="#fff" />

        {/* mouth */}
        {pose === "think" ? (
          <ellipse cx="100" cy="115" rx="6" ry="4" fill="#10172A" opacity="0.7" />
        ) : (
          <path
            d="M88 113 Q100 124 112 113"
            stroke="#10172A"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* antenna - nods to "neural" / signal theme */}
        <line x1="100" y1="30" x2="100" y2="14" stroke={BLOB_DARK} strokeWidth="3" />
        <motion.circle
          cx="100"
          cy="10"
          r="6"
          fill="#C2F542"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </motion.svg>
    </motion.div>
  );
}
