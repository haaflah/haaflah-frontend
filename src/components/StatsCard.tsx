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
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex flex-row items-center w-full justify-between">
        <div
          className="w-12 h-12 rounded-[10px] flex items-center justify-center text-xl"
          style={{ backgroundColor: bgcolor, color: iconcolor }}
        >
          {icon}
        </div>
        <div>
          {delta !== undefined && (
            <div
              className={`text-[13px] font-medium ${
                delta >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {delta >= 0 ? "↗" : "↘"} {Math.abs(delta)}%
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 mt-2.5">
        <div className="text-[13px] text-gray-500">{title}</div>
        <div className="text-xl font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
};

export default StatCard;
