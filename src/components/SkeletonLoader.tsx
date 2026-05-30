export function SkeletonTile({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`skeleton-pulse rounded-2xl bg-white/[0.04] border border-white/[0.05] ${className}`}
    />
  );
}

export function CourseSkeleton() {
  return (
    <div className="skeleton-pulse rounded-2xl bg-white/[0.04] border border-white/[0.05] p-5 flex flex-col gap-4 min-h-[160px]">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-xl bg-white/[0.06]" />
        <div className="w-10 h-5 rounded-full bg-white/[0.06]" />
      </div>
      <div className="flex-1">
        <div className="h-3.5 w-3/4 rounded bg-white/[0.06] mb-2" />
        <div className="h-3 w-1/2 rounded bg-white/[0.04]" />
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <div className="h-2.5 w-12 rounded bg-white/[0.04]" />
          <div className="h-2.5 w-8 rounded bg-white/[0.04]" />
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/[0.06]" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 md:p-6">
      {/* Hero */}
      <SkeletonTile className="col-span-2 lg:col-span-2 min-h-[180px]" />
      {/* Activity */}
      <SkeletonTile className="col-span-2 lg:col-span-2 min-h-[180px]" />
      {/* Courses */}
      {[0, 1, 2, 3].map((i) => (
        <CourseSkeleton key={i} />
      ))}
    </section>
  );
}
