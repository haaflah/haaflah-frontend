import userData from "../data/user.json";
import eventsData from "../data/events.json";
import type { User, Event } from "../types";

const wait = (ms = 300) => new Promise((res) => setTimeout(res, ms));

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Auth API
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'organizer' | 'vendor';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Login failed');
  }
  
  return response.json();
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Registration failed');
  }
  
  return response.json();
}

export async function forgotPassword(email: string): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }
  
  return response.json();
}

export async function resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Reset failed');
  }
  
  return response.json();
}

export async function logout(): Promise<void> {
  const token = localStorage.getItem('token');
  if (token) {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export async function fetchUser(): Promise<User> {
  await wait(150);
  return userData as User;
}

export async function fetchEventsByOrganizer(organizerId: string): Promise<Event[]> {
  await wait(250);
  return (eventsData as Event[]).filter((e) => e.organizerId === organizerId);
}
