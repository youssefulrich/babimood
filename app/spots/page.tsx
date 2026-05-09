"use client";

import { useState, useEffect } from "react";
import SpotCard from "@/components/spots/SpotCard";
import { Spot, SpotType } from "@/types";
import { createClient } from "@/lib/supabase/client";

const spotFilters: { value: string; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "nightclub", label: "Night Clubs" },
  { value: "rooftop", label: "Rooftops" },
  { value: "lounge", label: "Lounges" },
  { value: "plage", label: "Plages" },
  { value: "restaurant", label: "Restaurants" },
  { value: "bar", label: "Bars" },
];

export default function SpotsPage() {
  const [filter, setFilter] = useState("tous");
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpots() {
      setLoading(true);
      const supabase = createClient();

      let query = supabase
        .from("spots")
        .select("*")
        .eq("is_published", true)
        .order("is_featured", { ascending: false });

      if (filter !== "tous") {
        query = query.eq("type", filter as SpotType);
      }

      const { data } = await query;
      setSpots((data as Spot[]) ?? []);
      setLoading(false);
    }
    fetchSpots();
  }, [filter]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-violet-400 text-xs font-medium uppercase tracking-widest mb-2">
            Les meilleurs endroits
          </p>
          <h1 className="section-title mb-4">Top Spots Abidjan</h1>
          <p className="text-gray-400 text-base max-w-xl">
            Clubs, rooftops, lounges, plages — les adresses incontournables d&apos;Abidjan.
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {spotFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`filter-pill ${
                filter === f.value ? "filter-pill-active" : "filter-pill-inactive"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-dark animate-pulse">
                <div className="aspect-[3/2] bg-gray-700/50" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-700/50 rounded w-3/4" />
                  <div className="h-3 bg-gray-700/50 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : spots.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spots.map((spot) => (
              <SpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-white/5 rounded-2xl">
            <p className="text-4xl mb-4">🏝️</p>
            <p className="text-gray-400 font-medium">Aucun spot pour ce filtre.</p>
            <button onClick={() => setFilter("tous")} className="btn-outline mt-6 text-sm">
              Voir tous les spots
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
