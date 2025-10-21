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
    <div className="event-card">
      <div className="event-details">

        <div className="event-info">
          <h3 className="event-title">{event.title}</h3>
          <span
            className={`badge ${
              event.status === "completed" ? "badge-success" : "badge-primary"
            }`}
          >
            {event.status}
          </span>
          {event.isLive && <span className="badge badge-danger">● Live</span>}
        </div>


        <div className="event-meta">
          <div className="meta-item">
            📅 {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="meta-item"><MapPin width={16} height={16} /> {event.location}</div>
          <div className="event-count meta-item">
            <Users width={16} height={16} />
            {event.registrations} / {event.capacity}
          </div>
        </div>


        <div className="event-progress">
          <div className="progress">
            <div
              className="progress-bar"
              style={{
                width: `${pct}%`,
              }}
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="progress-label">{pct}% registration progress</div>
        </div>
      </div>
      <div className="event-actions">
        <button className="btn btn-sm"><Settings width={16} height={16} />Manage</button>
      </div>

    </div>
  );
};

export default EventCard;
