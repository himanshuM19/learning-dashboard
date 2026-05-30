"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

function generateActivityData() {
  const weeks = 15;
  const days = 7;
  const data: number[][] = [];

  for (let w = 0; w < weeks; w++) {
    const week: number[] = [];
    for (let d = 0; d < days; d++) {
      // Simulate realistic-looking activity (more recent = more active)
      const recency = w / weeks;
      const rand = Math.random();
      const value =
        rand > 0.45
          ? rand > 0.75
            ? rand > 0.9
              ? 4
              : 3
            : 2
          : rand > 0.3
          ? 1
          : 0;
      week.push(Math.round(value * recency * 1.5));
    }
    data.push(week);
  }
  return data;
}

const activityData = generateActivityData();

const intensityColors = [
  "bg-white/[0.04]",
  "bg-violet-900/60",
  "bg-violet-700/70",
  "bg-violet-500/80",
  "bg-violet-400",
];

const dayLabels = ["Mon", "", "Wed", "", "Fri", "", "Sun"];

export default function ActivityTile() {
  const totalContributions = activityData
    .flat()
    .reduce((sum, v) => sum + v, 0);

  return (
    <article className="grain relative rounded-2xl overflow-hidden bg-[#111118] border border-white/[0.06] p-5 flex flex-col gap-4">
      {/* Subtle glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-violet-400" />
          <h2 className="text-sm font-semibold text-white">Learning Activity</h2>
        </div>
        <span className="text-xs text-slate-500">
          {totalContributions} sessions this term
        </span>
      </div>

      {/* Contribution graph */}
      <div className="relative z-10 flex gap-1 overflow-x-auto pb-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 mr-1 shrink-0">
          {dayLabels.map((label, i) => (
            <div
              key={i}
              className="h-3 flex items-center text-[9px] text-slate-600 w-6"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Grid */}
        {activityData.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1 shrink-0">
            {week.map((value, di) => (
              <motion.div
                key={di}
                title={`${value} session${value !== 1 ? "s" : ""}`}
                className={`w-3 h-3 rounded-sm ${intensityColors[value]} transition-colors`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: (wi * 7 + di) * 0.003,
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="relative z-10 flex items-center gap-1.5 text-[10px] text-slate-600">
        <span>Less</span>
        {intensityColors.map((cls, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${cls}`} />
        ))}
        <span>More</span>
      </div>
    </article>
  );
}
