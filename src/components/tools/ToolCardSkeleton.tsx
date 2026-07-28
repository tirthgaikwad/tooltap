import React from 'react';
import { cn } from '@/lib/utils';

interface ToolCardSkeletonProps {
  className?: string;
}

export default function ToolCardSkeleton({ className }: ToolCardSkeletonProps) {
  return (
    <div
      className={cn(
        'w-full bg-[#1E1E24] border border-white/[0.08] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-lg relative overflow-hidden h-full min-h-[320px]',
        className
      )}
    >
      <div>
        {/* Top Badges row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="skeleton-shimmer h-5 w-20 rounded-full" />
          <div className="skeleton-shimmer h-5 w-16 rounded-full" />
        </div>

        {/* Header: Logo + Title + Category */}
        <div className="flex items-start gap-3 mb-3">
          <div className="skeleton-shimmer w-11 h-11 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="skeleton-shimmer h-4 w-3/4 rounded-md" />
            <div className="skeleton-shimmer h-3 w-1/2 rounded-md" />
          </div>
        </div>

        {/* Short description block */}
        <div className="space-y-2 mb-3 min-h-[2.5rem]">
          <div className="skeleton-shimmer h-3.5 w-full rounded-md" />
          <div className="skeleton-shimmer h-3.5 w-4/5 rounded-md" />
        </div>

        {/* Free plan box placeholder */}
        <div className="skeleton-shimmer h-9 w-full rounded-xl mb-3" />
      </div>

      {/* Bottom Actions row */}
      <div className="flex flex-col gap-2 mt-auto pt-2 border-t border-white/[0.06]">
        <div className="grid grid-cols-2 gap-2">
          <div className="skeleton-shimmer h-11 rounded-xl w-full" />
          <div className="skeleton-shimmer h-11 rounded-xl w-full" />
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <div className="skeleton-shimmer h-10 w-10 sm:h-8 sm:w-8 rounded-xl" />
            <div className="skeleton-shimmer h-10 w-10 sm:h-8 sm:w-8 rounded-xl" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="skeleton-shimmer h-10 w-10 sm:h-8 sm:w-8 rounded-xl" />
            <div className="skeleton-shimmer h-10 w-10 sm:h-8 sm:w-8 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ToolGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
      {Array.from({ length: count }).map((_, idx) => (
        <ToolCardSkeleton key={idx} />
      ))}
    </div>
  );
}
