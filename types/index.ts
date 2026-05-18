export type EventCategory =
  | "nightclub"
  | "beach"
  | "brunch"
  | "afterwork"
  | "rooftop"
  | "lounge"
  | "concert"
  | "autre";

export type SpotType =
  | "nightclub"
  | "rooftop"
  | "lounge"
  | "plage"
  | "restaurant"
  | "bar";

export type RecurrenceRule =
  | "weekly_friday"
  | "weekly_saturday"
  | "weekly_sunday"
  | "every_weekend"
  | "monthly_first_saturday"
  | "monthly_last_friday"
  | "biweekly";

export interface Event {
  id: string;
  title: string;
  description: string;
  image_url: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  whatsapp_link?: string;
  ticket_link?: string;
  is_featured: boolean;
  is_published: boolean;
  is_recurring: boolean;
  recurrence_rule?: RecurrenceRule | null;
  price?: number;
  created_at: string;
}

export interface Spot {
  id: string;
  name: string;
  description: string;
  vibe: string;
  images: string[];
  location: string;
  type: SpotType;
  instagram_link?: string;
  whatsapp_number?: string;
  phone?: string;
  opening_hours?: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
}

export interface Submission {
  id: string;
  organizer_name: string;
  event_name: string;
  flyer_url?: string;
  event_date: string;
  event_location: string;
  description: string;
  contact_phone: string;
  contact_email?: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export type FilterCategory =
  | "tous"
  | "ce-soir"
  | "ce-weekend"
  | "nightclub"
  | "beach"
  | "brunch"
  | "afterwork";