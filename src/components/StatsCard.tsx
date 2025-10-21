import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  iconcolor: string;
  bgcolor: string;
  delta?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, delta, iconcolor, bgcolor }) => {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div className="stat-icon" style={{ backgroundColor: bgcolor, color: iconcolor }}>
          {icon}
        </div>
        <div>
          {delta !== undefined && (
            <div
              className={`delta ${
                delta >= 0 ? "delta-positive" : "delta-negative"
              }`}
            >
              {delta >= 0 ? "↗" : "↘"} {Math.abs(delta)}%
            </div>
          )}
        </div>
      </div>
      <div className="stat-text">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
