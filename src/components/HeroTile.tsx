"use client";

import { motion } from "framer-motion";
import { Flame, Star } from "lucide-react";

interface HeroTileProps {
  name?: string;
  streak?: number;
}

export default function HeroTile({ name = "Alex", streak = 12 }: HeroTileProps) {
  const hours = new Date().getHours();
  const greeting =
    hours < 12 ? "Good morning" : hours < 17 ? "Good afternoon" : "Good evening";

  return (
    <article className="grain relative rounded-2xl overflow-hidden bg-[#111118] border border-white/[0.06] p-6 flex flex-col justify-between min-h-[180px] col-span-2 lg:col-span-2">
      {/* Gradient glow background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(139,92,246,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 10% 80%, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10">
        <p className="text-slate-400 text-sm mb-1">{greeting},</p>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Welcome back, {name} 👋
        </h1>
        <p className="text-slate-400 text-sm mt-2">
          You&apos;re on a roll. Keep the momentum going!
        </p>
      </div>

      {/* Streak badge */}
      <div className="relative z-10 flex items-center gap-4 mt-4">
        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5">
          <Flame size={16} className="text-orange-400" />
          <span className="text-orange-300 text-sm font-semibold">
            {streak} day streak
          </span>
        </div>

        {/* XP dots */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: i < streak % 7 ? 1 : 0.25 }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 20 }}
              className={`w-2.5 h-2.5 rounded-full ${
                i < streak % 7 ? "bg-orange-400" : "bg-slate-700"
              }`}
            />
          ))}
          <Star size={12} className="text-orange-400 ml-1" />
        </div>
      </div>
    </article>
  );
}
