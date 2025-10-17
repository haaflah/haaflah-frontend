import userData from "../data/user.json";
import eventsData from "../data/events.json";
import type { User, Event } from "../types";

const wait = (ms = 300) => new Promise((res) => setTimeout(res, ms));

export async function fetchUser(): Promise<User> {
  await wait(150);
  return userData as User;
}

export async function fetchEventsByOrganizer(organizerId: string): Promise<Event[]> {
  await wait(250);
  return (eventsData as Event[]).filter((e) => e.organizerId === organizerId);
}
