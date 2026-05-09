import { createClient } from "@/lib/supabase/server";
import { Calendar, MapPin, FileText, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: eventsCount },
    { count: spotsCount },
    { count: submissionsCount },
    { count: pendingCount },
  ] = await Promise.all([
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("spots").select("*", { count: "exact", head: true }),
    supabase.from("submissions").select("*", { count: "exact", head: true }),
    supabase.from("submissions").select("*", { count: "exact", head: true }).eq("status", "pending"),
  ]);

  const stats = [
    { label: "Événements", value: eventsCount ?? 0, icon: Calendar, href: "/admin/events", color: "#a78bfa" },
    { label: "Spots", value: spotsCount ?? 0, icon: MapPin, href: "/admin/spots", color: "#22d3ee" },
    { label: "Soumissions", value: submissionsCount ?? 0, icon: FileText, href: "/admin/submissions", color: "#f472b6" },
    { label: "En attente", value: pendingCount ?? 0, icon: TrendingUp, href: "/admin/submissions", color: "#fbbf24" },
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.6rem", color: "#fff" }}>
          Dashboard
        </h1>
        <p style={{ color: "#555", fontSize: "0.875rem", marginTop: "4px" }}>
          Vue d&apos;ensemble de BabiMood
        </p>
      </div>

      {/* Stats grid — 2 colonnes mobile, 4 desktop */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0.75rem",
          marginBottom: "2rem",
        }}
      >
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            style={{
              display: "block",
              background: "#111",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "1rem",
              padding: "1.25rem",
              textDecoration: "none",
              transition: "border-color 0.2s",
            }}
          >
            <s.icon size={20} style={{ color: s.color, marginBottom: "0.75rem" }} />
            <p
              style={{
                fontFamily: "Syne, sans-serif",
                fontWeight: 800,
                fontSize: "2rem",
                color: "#fff",
                lineHeight: 1,
              }}
            >
              {s.value}
            </p>
            <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "6px" }}>{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Actions rapides */}
      <div>
        <h2
          style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            color: "#fff",
            fontSize: "1.1rem",
            marginBottom: "1rem",
          }}
        >
          Actions rapides
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <Link
            href="/admin/events/new"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
              color: "white",
              fontWeight: 600,
              padding: "1rem",
              borderRadius: "9999px",
              fontSize: "0.9rem",
              textDecoration: "none",
              boxShadow: "0 0 20px rgba(124,58,237,0.3)",
            }}
          >
            <Calendar size={16} />
            Ajouter un événement
          </Link>
          <Link
            href="/admin/spots/new"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              background: "transparent",
              color: "rgba(255,255,255,0.8)",
              fontWeight: 600,
              padding: "1rem",
              borderRadius: "9999px",
              fontSize: "0.9rem",
              textDecoration: "none",
              border: "1px solid rgba(139,92,246,0.4)",
            }}
          >
            <MapPin size={16} />
            Ajouter un spot
          </Link>
        </div>
      </div>
    </div>
  );
}