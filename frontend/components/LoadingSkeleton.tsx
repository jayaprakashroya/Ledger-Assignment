'use client';

export default function LoadingSkeleton() {
  return (
    <div className="card animate-pulse space-y-4">
      <div className="h-64 w-full rounded-3xl bg-slate-800" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded-full bg-slate-800" />
        <div className="h-4 w-1/2 rounded-full bg-slate-800" />
      </div>
      <div className="h-12 rounded-full bg-slate-800" />
    </div>
  );
}
