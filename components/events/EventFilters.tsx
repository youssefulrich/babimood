"use client";

import { FilterCategory } from "@/types";

const filters: { value: FilterCategory; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "ce-soir", label: "Ce soir" },
  { value: "ce-weekend", label: "Ce week-end" },
  { value: "nightclub", label: "Night Clubs" },
  { value: "beach", label: "Beach" },
  { value: "brunch", label: "Brunch" },
  { value: "afterwork", label: "Afterwork" },
];

interface EventFiltersProps {
  active: FilterCategory;
  onChange: (f: FilterCategory) => void;
}

export default function EventFilters({ active, onChange }: EventFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`filter-pill ${
            active === f.value ? "filter-pill-active" : "filter-pill-inactive"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
