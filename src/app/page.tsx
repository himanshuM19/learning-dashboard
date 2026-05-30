export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Sidebar, { BottomNav } from "@/components/Sidebar";
import BentoGrid from "@/components/BentoGrid";
import { DashboardSkeleton } from "@/components/SkeletonLoader";
import { getCourses } from "@/lib/supabase";
import type { Course } from "@/types";

async function DashboardContent() {
  let courses: Course[] = [];

  try {
    courses = await getCourses();
  } catch (error) {
    console.error("Supabase fetch error:", error);
    // Fallback to demo data if Supabase isn't connected
    courses = [
      {
        id: "1",
        title: "Advanced React Patterns",
        progress: 75,
        icon_name: "Layers",
        created_at: new Date().toISOString(),
      },
      {
        id: "2",
        title: "TypeScript Deep Dive",
        progress: 48,
        icon_name: "Code2",
        created_at: new Date().toISOString(),
      },
      {
        id: "3",
        title: "System Design Fundamentals",
        progress: 30,
        icon_name: "Network",
        created_at: new Date().toISOString(),
      },
      {
        id: "4",
        title: "Next.js & App Router",
        progress: 92,
        icon_name: "Rocket",
        created_at: new Date().toISOString(),
      },
    ];
  }

  return <BentoGrid courses={courses} />;
}

export default function HomePage() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar — desktop */}
      <Sidebar />

      {/* Main content area */}
      <main className="flex-1 overflow-y-auto pb-16 md:pb-0" id="main-content">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-4 md:px-6 py-3 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/[0.06]">
          <div>
            <h1 className="text-sm font-semibold text-white">Dashboard</h1>
            <p className="text-xs text-slate-500">Track your learning progress</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              A
            </div>
          </div>
        </header>

        {/* Dashboard tiles with Suspense */}
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent />
        </Suspense>
      </main>

      {/* Bottom nav — mobile */}
      <BottomNav />
    </div>
  );
}
