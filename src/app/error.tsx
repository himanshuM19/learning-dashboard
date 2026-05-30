"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-6 text-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20">
        <AlertTriangle size={24} className="text-red-400" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-white mb-1">
          Something went wrong
        </h2>
        <p className="text-slate-400 text-sm max-w-sm">
          We couldn&apos;t load your dashboard. This is usually a temporary
          issue — please try again.
        </p>
        {error.digest && (
          <p className="text-slate-600 text-xs mt-2 font-mono">
            Error ID: {error.digest}
          </p>
        )}
      </div>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium transition-colors"
      >
        <RefreshCw size={14} />
        Try again
      </button>
    </main>
  );
}
