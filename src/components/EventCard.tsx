import React from "react";
import type { Event } from "../types";
import { MapPin, Settings, Users } from "lucide-react";

interface EventCardProps {
  event: Event;
}

const progressPercentage = (reg: number, cap: number): number => {
  if (!cap) return 0;
  return Math.min(100, Math.round((reg / cap) * 100));
};

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const pct = progressPercentage(event.registrations, event.capacity);

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 bg-white border border-gray-200 rounded-xl shadow-sm p-4 lg:p-5 mb-5 hover:shadow-md transition-shadow">
      <div className="flex-1 flex flex-col justify-between gap-5 w-full">
        {/* Event Info */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <h3 className="text-base font-semibold m-0 text-gray-900">
            {event.title}
          </h3>
          <span
            className={`text-xs font-medium rounded-full px-2.5 py-1 capitalize ${
              event.status === "completed"
                ? "bg-green-50 text-green-600"
                : "bg-blue-50 text-blue-600"
            }`}
          >
            {event.status}
          </span>
          {event.isLive && (
            <span className="text-xs font-medium rounded-full px-2.5 py-1 bg-red-50 text-red-600">
              ● Live
            </span>
          )}
        </div>

        {/* Event Meta */}
        <div className="flex flex-wrap items-center justify-between w-full lg:w-4/5 gap-3">
          <div className="flex items-center text-[13px] text-gray-500 gap-1">
            📅 {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center text-[13px] text-gray-500 gap-1">
            <MapPin width={16} height={16} /> {event.location}
          </div>
          <div className="flex items-center text-sm text-gray-700 font-semibold gap-1">
            <Users width={16} height={16} />
            {event.registrations} / {event.capacity}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3.5">
          <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="mt-1.5 text-xs text-gray-500 text-right">
            {pct}% registration progress
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full lg:w-auto flex lg:block justify-end">
        <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm border border-gray-300 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
          <Settings width={16} height={16} />
          Manage
        </button>
      </div>
    </div>
  );
};

export default EventCard;
