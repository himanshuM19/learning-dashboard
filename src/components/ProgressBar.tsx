"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  color?: string;
  delay?: number;
}

export default function ProgressBar({
  value,
  color = "from-violet-500 to-cyan-400",
  delay = 0.3,
}: ProgressBarProps) {
  return (
    <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: value / 100 }}
        transition={{
          delay,
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{ originX: 0 }}
      />
    </div>
  );
}
