"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import type { NavItem } from "@/types";

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "#" },
  { label: "My Courses", icon: <BookOpen size={18} />, href: "#" },
  { label: "Analytics", icon: <BarChart2 size={18} />, href: "#" },
  { label: "Achievements", icon: <Trophy size={18} />, href: "#" },
  { label: "Settings", icon: <Settings size={18} />, href: "#" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("Dashboard");

  useEffect(() => {
    const handleResize = () => setCollapsed(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.nav
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative hidden md:flex flex-col shrink-0 h-full bg-[#111118] border-r border-white/[0.06] overflow-hidden"
      aria-label="Primary navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/[0.06]">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-600 shrink-0">
          <Zap size={15} className="text-white" />
        </div>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
              className="text-sm font-semibold text-white whitespace-nowrap"
            >
              LearnFlow
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav items */}
      <ul className="flex flex-col gap-1 px-2 pt-4 flex-1" role="list">
        {navItems.map((item) => (
          <li key={item.label}>
            <button
              onClick={() => setActive(item.label)}
              className="relative w-full flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-current={active === item.label ? "page" : undefined}
            >
              {/* Animated background highlight */}
              {active === item.label && (
                <motion.span
                  layoutId="nav-highlight"
                  className="absolute inset-0 rounded-lg bg-violet-600/20 border border-violet-500/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 shrink-0 transition-colors ${
                  active === item.label ? "text-violet-400" : "text-slate-400"
                }`}
              >
                {item.icon}
              </span>
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.15 }}
                    className={`relative z-10 whitespace-nowrap transition-colors ${
                      active === item.label
                        ? "text-white font-medium"
                        : "text-slate-400"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </li>
        ))}
      </ul>

      {/* Collapse toggle */}
      <div className="px-2 pb-4">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center justify-center gap-2 px-2 py-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] transition-colors text-sm"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          <AnimatePresence initial={false}>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="whitespace-nowrap"
              >
                Collapse
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.nav>
  );
}

/* Mobile bottom navigation */
export function BottomNav() {
  const [active, setActive] = useState("Dashboard");

  const mobileItems = navItems.slice(0, 4);

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 flex items-center justify-around bg-[#111118] border-t border-white/[0.06] px-2 pb-safe"
      aria-label="Mobile navigation"
    >
      {mobileItems.map((item) => (
        <button
          key={item.label}
          onClick={() => setActive(item.label)}
          className="relative flex flex-col items-center gap-1 py-3 px-4 text-xs"
          aria-current={active === item.label ? "page" : undefined}
        >
          {active === item.label && (
            <motion.span
              layoutId="mobile-highlight"
              className="absolute inset-0 rounded-xl bg-violet-600/20"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 ${
              active === item.label ? "text-violet-400" : "text-slate-500"
            }`}
          >
            {item.icon}
          </span>
          <span
            className={`relative z-10 ${
              active === item.label ? "text-violet-300" : "text-slate-500"
            }`}
          >
            {item.label}
          </span>
        </button>
      ))}
    </nav>
  );
}
