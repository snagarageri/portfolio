"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { MascotPose } from "@/components/Mascot";

type MascotContextValue = {
  pose: MascotPose;
  setPose: (p: MascotPose) => void;
};

const MascotContext = createContext<MascotContextValue | null>(null);

export function MascotProvider({ children }: { children: ReactNode }) {
  const [pose, setPose] = useState<MascotPose>("idle");
  return (
    <MascotContext.Provider value={{ pose, setPose }}>
      {children}
    </MascotContext.Provider>
  );
}

export function useMascot() {
  const ctx = useContext(MascotContext);
  if (!ctx) throw new Error("useMascot must be used within MascotProvider");
  return ctx;
}
