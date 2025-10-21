export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  registrations: number;
  capacity: number;
  organizerId: string;
  status: "upcoming" | "completed" | "cancelled";
  isLive: boolean;
}

export interface DashboardStats {
  totalEvents: number;
  totalRegistrations: number;
  upcomingEvents: number;
  successRate: number;
  avgOccupancy: number;
}
