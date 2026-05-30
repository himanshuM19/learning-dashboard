import { DashboardSkeleton } from "@/components/SkeletonLoader";

export default function Loading() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar skeleton */}
      <div className="hidden md:block w-[220px] shrink-0 bg-[#111118] border-r border-white/[0.06]" />

      <div className="flex-1 overflow-hidden">
        {/* Header skeleton */}
        <div className="skeleton-pulse flex items-center justify-between px-4 md:px-6 py-3 border-b border-white/[0.06]">
          <div className="space-y-1.5">
            <div className="h-3.5 w-20 rounded bg-white/[0.06]" />
            <div className="h-2.5 w-32 rounded bg-white/[0.04]" />
          </div>
          <div className="w-7 h-7 rounded-full bg-white/[0.06]" />
        </div>

        <DashboardSkeleton />
      </div>
    </div>
  );
}
