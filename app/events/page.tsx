"use client";

import { useState, useEffect } from "react";
import EventCard from "@/components/events/EventCard";
import EventFilters from "@/components/events/EventFilters";
import { FilterCategory, Event } from "@/types";
import { createClient } from "@/lib/supabase/client";

export default function EventsPage() {
  const [filter, setFilter] = useState<FilterCategory>("tous");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const supabase = createClient();
      const now = new Date();

      let query = supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .order("date", { ascending: true });

      if (filter === "ce-soir") {
        const today = now.toISOString().split("T")[0];
        query = query.eq("date", today);
      } else if (filter === "ce-weekend") {
        const day = now.getDay();
        const friday = new Date(now);
        friday.setDate(now.getDate() + ((5 - day + 7) % 7));
        const sunday = new Date(friday);
        sunday.setDate(friday.getDate() + 2);
        query = query
          .gte("date", friday.toISOString().split("T")[0])
          .lte("date", sunday.toISOString().split("T")[0]);
      } else if (filter !== "tous") {
        query = query.eq("category", filter);
      }

      const { data } = await query;
      setEvents((data as Event[]) ?? []);
      setLoading(false);
    }

    fetchEvents();
  }, [filter]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-violet-400 text-xs font-medium uppercase tracking-widest mb-2">
            Agenda
          </p>
          <h1 className="section-title mb-4">Événements à Abidjan</h1>
          <p className="text-gray-400 text-base max-w-xl">
            Tous les événements, soirées et sorties du moment.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <EventFilters active={filter} onChange={setFilter} />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="card-dark animate-pulse"
              >
                <div className="aspect-[4/3] bg-gray-700/50" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-700/50 rounded w-3/4" />
                  <div className="h-3 bg-gray-700/50 rounded w-1/2" />
                  <div className="h-3 bg-gray-700/50 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-white/5 rounded-2xl">
            <p className="text-4xl mb-4">😴</p>
            <p className="text-gray-400 font-medium">Aucun événement pour ce filtre.</p>
            <p className="text-gray-600 text-sm mt-2">
              Essaie un autre filtre ou reviens bientôt.
            </p>
            <button
              onClick={() => setFilter("tous")}
              className="btn-outline mt-6 text-sm"
            >
              Voir tous les événements
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
