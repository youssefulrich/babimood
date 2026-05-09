import { createClient } from "./supabase/server";
import { Event, Spot, FilterCategory } from "@/types";

// ─── EVENTS ───────────────────────────────────────────────

export async function getEvents(filter?: FilterCategory): Promise<Event[]> {
  const supabase = await createClient();

  let query = supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .order("date", { ascending: true });

  const now = new Date();

  if (filter === "ce-soir") {
    const today = now.toISOString().split("T")[0];
    query = query.eq("date", today);
  }

  if (filter === "ce-weekend") {
    const day = now.getDay();
    const friday = new Date(now);
    friday.setDate(now.getDate() + ((5 - day + 7) % 7));
    const sunday = new Date(friday);
    sunday.setDate(friday.getDate() + 2);
    query = query
      .gte("date", friday.toISOString().split("T")[0])
      .lte("date", sunday.toISOString().split("T")[0]);
  }

  if (
    filter &&
    !["tous", "ce-soir", "ce-weekend"].includes(filter)
  ) {
    query = query.eq("category", filter);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Event[];
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .eq("is_featured", true)
    .gte("date", new Date().toISOString().split("T")[0])
    .order("date", { ascending: true })
    .limit(6);

  if (error) throw error;
  return data as Event[];
}

export async function getUpcomingEvents(limit = 8): Promise<Event[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .gte("date", new Date().toISOString().split("T")[0])
    .order("date", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data as Event[];
}

export async function getEventById(id: string): Promise<Event | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Event;
}

// ─── SPOTS ────────────────────────────────────────────────

export async function getSpots(type?: string): Promise<Spot[]> {
  const supabase = await createClient();

  let query = supabase
    .from("spots")
    .select("*")
    .eq("is_published", true)
    .order("is_featured", { ascending: false });

  if (type && type !== "tous") {
    query = query.eq("type", type);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Spot[];
}

export async function getFeaturedSpots(limit = 6): Promise<Spot[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("spots")
    .select("*")
    .eq("is_published", true)
    .eq("is_featured", true)
    .limit(limit);

  if (error) throw error;
  return data as Spot[];
}

export async function getSpotById(id: string): Promise<Spot | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("spots")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Spot;
}
