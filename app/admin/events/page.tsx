import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Star } from "lucide-react";
import { formatDateShort, categoryLabels } from "@/lib/utils";
import { Event } from "@/types";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminToggleFeatured from "@/components/admin/AdminToggleFeatured";

export default async function AdminEventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#fff" }}>
            Événements
          </h1>
          <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "2px" }}>
            {events?.length ?? 0} événements
          </p>
        </div>
        <Link
          href="/admin/events/new"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
            color: "white", fontWeight: 600,
            padding: "0.6rem 1.1rem",
            borderRadius: "9999px", fontSize: "0.85rem",
            textDecoration: "none", flexShrink: 0,
          }}
        >
          <Plus size={15} /> Ajouter
        </Link>
      </div>

      {/* Liste cards mobile au lieu d'un tableau */}
      {(!events || events.length === 0) ? (
        <div style={{ textAlign: "center", padding: "3rem 1rem", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "1rem" }}>
          <p style={{ color: "#555" }}>Aucun événement. Créez le premier !</p>
          <Link href="/admin/events/new" style={{
            display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "1rem",
            background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "white",
            fontWeight: 600, padding: "0.65rem 1.25rem", borderRadius: "9999px",
            fontSize: "0.85rem", textDecoration: "none",
          }}>
            <Plus size={15} /> Créer un événement
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {events.map((event: Event) => (
            <div
              key={event.id}
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "0.875rem",
                padding: "1rem",
              }}
            >
              {/* Top row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.6rem" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    {event.is_featured && <Star size={12} style={{ color: "#fbbf24", flexShrink: 0 }} />}
                    <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {event.title}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "6px", marginTop: "5px", flexWrap: "wrap" }}>
                    <span style={{
                      background: "rgba(139,92,246,0.15)", color: "#a78bfa",
                      fontSize: "10px", fontWeight: 600, padding: "2px 8px",
                      borderRadius: "9999px", textTransform: "uppercase",
                    }}>
                      {categoryLabels[event.category]}
                    </span>
                    <span style={{
                      background: event.is_published ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
                      color: event.is_published ? "#4ade80" : "#555",
                      fontSize: "10px", fontWeight: 600, padding: "2px 8px",
                      borderRadius: "9999px",
                    }}>
                      {event.is_published ? "Publié" : "Brouillon"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                  <AdminToggleFeatured id={event.id} table="events" featured={event.is_featured} />
                  <Link
                    href={`/admin/events/${event.id}/edit`}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "32px", height: "32px", borderRadius: "8px",
                      background: "rgba(255,255,255,0.04)", color: "#888",
                      textDecoration: "none",
                    }}
                  >
                    <Edit size={13} />
                  </Link>
                  <AdminDeleteButton id={event.id} table="events" />
                </div>
              </div>

              {/* Date + lieu */}
              <p style={{ color: "#555", fontSize: "12px" }}>
                📅 {formatDateShort(event.date)} · 📍 {event.location}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}