import React from "react";

export const Skeleton: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div
    className={`bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded ${className}`}
  />
);

export const StatCardSkeleton: React.FC = () => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
    <Skeleton className="w-10 h-10 rounded-lg mb-3" />
    <Skeleton className="w-3/5 h-4 mb-2" />
    <Skeleton className="w-2/5 h-6" />
  </div>
);

export const EventCardSkeleton: React.FC = () => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 lg:p-5 mb-5">
    <Skeleton className="w-4/5 h-5 mb-3" />
    <Skeleton className="w-1/2 h-4 mb-2" />
    <Skeleton className="w-1/3 h-3.5" />
  </div>
);
