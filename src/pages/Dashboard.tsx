import React, { useEffect, useState } from "react";
import { fetchUser, fetchEventsByOrganizer } from "../services/api";
import StatCard from "../components/StatsCard";
import EventCard from "../components/EventCard";
import { StatCardSkeleton, EventCardSkeleton } from "../components/Skeleton";
import type { User, Event } from "../types";
import { Calendar, Clock, LogOutIcon, Medal, Users2, Plus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const safeSum = (arr: Event[], key: keyof Event): number =>
  arr.reduce((s, item) => s + (Number(item[key]) || 0), 0);

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
      <div className="w-full min-h-screen bg-gray-50">
        <header className="flex bg-white justify-between items-center px-8 py-5 max-w-full mb-8 shadow-sm">
          <div>
            <h1 className="text-xl font-semibold mb-1 text-blue-700">Haaflah</h1>
            <div className="text-sm text-gray-800">Loading...</div>
          </div>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
            <LogOutIcon width={16} height={16} /> Logout
          </button>
        </header>
        <div className="px-6 py-8 mx-auto max-w-7xl">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-9">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </section>
          <section className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">Your Events</h2>
              <div className="text-sm text-gray-500 mt-1">Manage and track your events</div>
            </div>
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              <Plus width={16} height={16} /> Create Event
            </button>
          </section>
          <section className="space-y-5">
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <header className="flex bg-white justify-between items-center px-8 py-5 max-w-full mb-8 shadow-sm sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-semibold mb-1 text-blue-700">Haaflah</h1>
          <div className="text-sm text-gray-800">Welcome back, {authUser?.name || user?.name} 👋</div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm border border-gray-300 bg-white hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <LogOutIcon width={16} height={16} /> Logout
        </button>
      </header>
      
      <div className="px-6 py-8 mx-auto max-w-7xl pb-16">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-9">
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

        <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Your Events</h2>
            <div className="text-sm text-gray-500 mt-1">Manage and track your events</div>
          </div>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm bg-blue-600 text-white border-0 hover:bg-blue-700 transition-colors cursor-pointer shadow-md hover:shadow-lg">
            <Plus width={16} height={16} /> Create Event
          </button>
        </section>

        <section className="space-y-5">
          {events.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No events yet</h3>
              <p className="text-gray-500 mb-6">Create your first event to get started</p>
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                <Plus className="w-4 h-4" />
                Create Event
              </button>
            </div>
          ) : (
            [...events]
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((ev) => <EventCard key={ev.id} event={ev} />)
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
