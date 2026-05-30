"use client";

import { motion } from "framer-motion";
import type { Course } from "@/types";
import DynamicIcon from "./DynamicIcon";
import ProgressBar from "./ProgressBar";

const cardGradients = [
  {
    bg: "from-violet-900/40 via-[#111118] to-[#111118]",
    glow: "rgba(139,92,246,0.2)",
    bar: "from-violet-500 to-purple-400",
    icon: "text-violet-400",
    iconBg: "bg-violet-500/10",
  },
  {
    bg: "from-cyan-900/40 via-[#111118] to-[#111118]",
    glow: "rgba(6,182,212,0.2)",
    bar: "from-cyan-500 to-blue-400",
    icon: "text-cyan-400",
    iconBg: "bg-cyan-500/10",
  },
  {
    bg: "from-emerald-900/40 via-[#111118] to-[#111118]",
    glow: "rgba(16,185,129,0.2)",
    bar: "from-emerald-500 to-teal-400",
    icon: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
  {
    bg: "from-rose-900/40 via-[#111118] to-[#111118]",
    glow: "rgba(244,63,94,0.2)",
    bar: "from-rose-500 to-pink-400",
    icon: "text-rose-400",
    iconBg: "bg-rose-500/10",
  },
];

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const theme = cardGradients[index % cardGradients.length];

  return (
    <motion.article
      className={`grain relative rounded-2xl overflow-hidden bg-gradient-to-br ${theme.bg} border border-white/[0.06] p-5 flex flex-col gap-4 cursor-pointer`}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(255,255,255,0.12)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      style={{ willChange: "transform" }}
    >
      {/* Glow on hover */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          boxShadow: `inset 0 0 30px ${theme.glow}`,
          background: `radial-gradient(ellipse 70% 60% at 50% 0%, ${theme.glow} 0%, transparent 80%)`,
        }}
      />

      {/* Icon + progress % */}
      <div className="relative z-10 flex items-start justify-between">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-xl ${theme.iconBg}`}
        >
          <DynamicIcon name={course.icon_name} size={20} className={theme.icon} />
        </div>
        <span className="text-xs font-semibold text-slate-400 bg-white/[0.05] px-2 py-1 rounded-full">
          {course.progress}%
        </span>
      </div>

      {/* Title */}
      <div className="relative z-10 flex-1">
        <h2 className="text-sm font-semibold text-white leading-snug line-clamp-2">
          {course.title}
        </h2>
      </div>

      {/* Animated progress bar */}
      <div className="relative z-10">
        <div className="flex justify-between text-[11px] text-slate-500 mb-1.5">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <ProgressBar
          value={course.progress}
          color={theme.bar}
          delay={0.3 + index * 0.1}
        />
      </div>
    </motion.article>
  );
}
