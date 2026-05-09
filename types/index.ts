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

export interface Event {
  id: string;
  title: string;
  description: string;
  image_url: string;
  date: string; // ISO string
  time: string;
  location: string;
  category: EventCategory;
  whatsapp_link?: string;
  ticket_link?: string;
  is_featured: boolean;
  is_published: boolean;
  price?: number;
  created_at: string;
}

export interface Spot {
  id: string;
  name: string;
  description: string;
  vibe: string; // courte description de l'ambiance
  images: string[]; // tableau d'URLs
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
