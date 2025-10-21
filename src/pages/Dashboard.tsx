import React, { useEffect, useState } from "react";
import { fetchUser, fetchEventsByOrganizer } from "../services/api";
import StatCard from "../components/StatsCard";
import EventCard from "../components/EventCard";
import { StatCardSkeleton, EventCardSkeleton } from "../components/Skeleton";
import type { User, Event } from "../types";
import "../styles.css"; // added import for normal CSS
import { Calendar, Clock, LogOutIcon, Medal, Users2 } from "lucide-react";

const safeSum = (arr: Event[], key: keyof Event): number =>
  arr.reduce((s, item) => s + (Number(item[key]) || 0), 0);

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const u = await fetchUser();
      const ev = await fetchEventsByOrganizer(u.id);
      setUser(u);
      setEvents(ev);
      setLoading(false);
    };
    load();
  }, []);

  const totalEvents = events.length;
  const totalRegistrations = safeSum(events, "registrations");
  const totalCapacity = safeSum(events, "capacity");

  const today = new Date();
  const upcomingEvents = events.filter(
    (e) => new Date(e.date) >= new Date(today.toDateString())
  ).length;

  const successRate = totalCapacity === 0 ? 0 : Math.round((totalRegistrations / totalCapacity) * 100);
  
  if (loading) {
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <h1 className="brand">Haaflah</h1>
            <div className="welcome">Loading...</div>
          </div>
          <button className="btn btn-secondary"><LogOutIcon width={16} height={16} /> Logout</button>
        </header>
        <div className="dashboard-body">
          <section className="stats-grid">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </section>
          <section className="events-header">
            <div>
              <h2>Your Events</h2>
              <div className="subtitle">Manage and track your events</div>
            </div>
            <button className="btn btn-primary">+ Create Event</button>
          </section>
          <section className="event-list">
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">

      <header className="dashboard-header">
        <div>
          <h1 className="brand">Haaflah</h1>
          <div className="welcome">Welcome back, {user?.name} 👋</div>
        </div>
        <button className="btn btn-secondary"><LogOutIcon width={16} height={16} /> Logout</button>
      </header>
      <div className="dashboard-body">
        <section className="stats-grid">
          <StatCard
            icon={<Calendar />}
            title="Total Events"
            value={totalEvents}
            iconcolor="#2563eb"
            bgcolor="#eff6ff"
            delta={12}
          />
          <StatCard
            icon={<Users2 />}
            title="Total Registrations"
            value={totalRegistrations}
            iconcolor="#059669"
            bgcolor="#dcfce7"
            delta={28}
          />
          <StatCard
            icon={<Clock />}
            title="Upcoming Events"
            iconcolor="#8b5cf6"
            bgcolor="#f3e8ff"
            value={upcomingEvents}
            delta={5}
          />
          <StatCard
            icon={<Medal />}
            title="Success Rate"
            value={`${successRate}%`}
            iconcolor="#ea580c"
            bgcolor="#ffedd5"
            delta={-2}
          />
        </section>

        <section className="events-header">
          <div>
            <h2>Your Events</h2>
            <div className="subtitle">Manage and track your events</div>
          </div>
          <button className="btn btn-primary">+ Create Event</button>
        </section>

        <section className="event-list">
          {events.length === 0 ? (
            <div className="empty">No events yet — create your first event.</div>
          ) : (
            [...events]
              .sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((ev) => <EventCard key={ev.id} event={ev} />)
          )}
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
