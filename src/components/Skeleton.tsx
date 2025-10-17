import React from "react";

export const Skeleton: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`skeleton ${className}`} />
);

export const StatCardSkeleton: React.FC = () => (
  <div className="stat-card">
    <Skeleton className="skeleton-icon" />
    <Skeleton className="skeleton-title" />
    <Skeleton className="skeleton-value" />
  </div>
);

export const EventCardSkeleton: React.FC = () => (
  <div className="event-card">
    <Skeleton className="skeleton-event-title" />
    <Skeleton className="skeleton-event-date" />
    <Skeleton className="skeleton-event-meta" />
  </div>
);
