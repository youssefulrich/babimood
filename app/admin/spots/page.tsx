import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Star } from "lucide-react";
import { spotTypeLabels } from "@/lib/utils";
import { Spot } from "@/types";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminToggleFeatured from "@/components/admin/AdminToggleFeatured";

export default async function AdminSpotsPage() {
  const supabase = await createClient();
  const { data: spots } = await supabase
    .from("spots")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#fff" }}>
            Spots
          </h1>
          <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "2px" }}>
            {spots?.length ?? 0} spots au total
          </p>
        </div>
        <Link
          href="/admin/spots/new"
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

      {(!spots || spots.length === 0) ? (
        <div style={{ textAlign: "center", padding: "3rem 1rem", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "1rem" }}>
          <p style={{ color: "#555" }}>Aucun spot. Créez le premier !</p>
          <Link href="/admin/spots/new" style={{
            display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "1rem",
            background: "linear-gradient(135deg, #7c3aed, #6d28d9)", color: "white",
            fontWeight: 600, padding: "0.65rem 1.25rem", borderRadius: "9999px",
            fontSize: "0.85rem", textDecoration: "none",
          }}>
            <Plus size={15} /> Créer un spot
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {spots.map((spot: Spot) => (
            <div
              key={spot.id}
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "0.875rem",
                padding: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.6rem" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    {spot.is_featured && <Star size={12} style={{ color: "#fbbf24", flexShrink: 0 }} />}
                    <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {spot.name}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "6px", marginTop: "5px", flexWrap: "wrap" }}>
                    <span style={{
                      background: "rgba(34,211,238,0.12)", color: "#22d3ee",
                      fontSize: "10px", fontWeight: 600, padding: "2px 8px",
                      borderRadius: "9999px", textTransform: "uppercase",
                    }}>
                      {spotTypeLabels[spot.type]}
                    </span>
                    <span style={{
                      background: spot.is_published ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)",
                      color: spot.is_published ? "#4ade80" : "#555",
                      fontSize: "10px", fontWeight: 600, padding: "2px 8px",
                      borderRadius: "9999px",
                    }}>
                      {spot.is_published ? "Publié" : "Brouillon"}
                    </span>
                    {spot.is_featured && (
                      <span style={{
                        background: "rgba(139,92,246,0.15)", color: "#a78bfa",
                        fontSize: "10px", fontWeight: 600, padding: "2px 8px",
                        borderRadius: "9999px",
                      }}>
                        ✦ Top Spot
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                  <AdminToggleFeatured id={spot.id} table="spots" featured={spot.is_featured} />
                  <Link
                    href={`/admin/spots/${spot.id}/edit`}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "32px", height: "32px", borderRadius: "8px",
                      background: "rgba(255,255,255,0.04)", color: "#888",
                      textDecoration: "none",
                    }}
                  >
                    <Edit size={13} />
                  </Link>
                  <AdminDeleteButton id={spot.id} table="spots" />
                </div>
              </div>

              <p style={{ color: "#555", fontSize: "12px" }}>
                📍 {spot.location}
                {spot.vibe && <span style={{ color: "#666" }}> · {spot.vibe}</span>}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}