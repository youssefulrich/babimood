import { EventCategory, SpotType } from "@/types";

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "short",
  }).format(date);
}

export function isToday(dateStr: string): boolean {
  const today = new Date().toISOString().split("T")[0];
  return dateStr === today;
}

export function isThisWeekend(dateStr: string): boolean {
  const date = new Date(dateStr);
  const day = date.getDay();
  return day === 5 || day === 6 || day === 0;
}

export const categoryLabels: Record<EventCategory, string> = {
  nightclub: "Night Club",
  beach: "Beach",
  brunch: "Brunch",
  afterwork: "Afterwork",
  rooftop: "Rooftop",
  lounge: "Lounge",
  concert: "Concert",
  autre: "Autre",
};

export const spotTypeLabels: Record<SpotType, string> = {
  nightclub: "Night Club",
  rooftop: "Rooftop",
  lounge: "Lounge",
  plage: "Plage",
  restaurant: "Restaurant",
  bar: "Bar",
};

export const categoryColors: Record<EventCategory, string> = {
  nightclub: "bg-violet-600",
  beach: "bg-cyan-600",
  brunch: "bg-orange-500",
  afterwork: "bg-amber-500",
  rooftop: "bg-purple-500",
  lounge: "bg-pink-600",
  concert: "bg-red-500",
  autre: "bg-gray-600",
};

export function buildWhatsAppUrl(number: string, message?: string): string {
  const encoded = encodeURIComponent(message ?? "Bonjour, je veux des infos");
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encoded}`;
}
