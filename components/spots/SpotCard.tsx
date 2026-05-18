"use client";

import Link from "next/link";
import { MapPin, MessageCircle, ExternalLink } from "lucide-react";
import { Spot } from "@/types";
import { spotTypeLabels } from "@/lib/utils";

interface SpotCardProps {
  spot: Spot;
}

export default function SpotCard({ spot }: SpotCardProps) {
  const mainImage = spot.images?.[0] || "/images/placeholder-spot.jpg";

  return (
    <div
      style={{
        background: "#1A1A1A",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "1rem",
        overflow: "hidden",
        transition: "border-color 0.3s",
        display: "flex",
        flexDirection: "column",
      }}
      className="group hover:border-violet-600/30 hover:violet-glow"
    >
      {/* Image cliquable */}
      <Link href={`/spots/${spot.id}`} style={{ display: "block", textDecoration: "none", position: "relative", background: "#000" }}>
        <img
          src={mainImage}
          alt={spot.name}
          style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
        />

        <div style={{ position: "absolute", top: "10px", left: "10px" }}>
          <span style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.8)", fontSize: "10px", fontWeight: 600, padding: "3px 10px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.12)", textTransform: "uppercase" as const }}>
            {spotTypeLabels[spot.type]}
          </span>
        </div>

        {spot.is_featured && (
          <div style={{ position: "absolute", top: "10px", right: "10px" }}>
            <span style={{ background: "#7c3aed", color: "white", fontSize: "10px", fontWeight: 600, padding: "3px 10px", borderRadius: "9999px", textTransform: "uppercase" as const }}>
              ✦ Top Spot
            </span>
          </div>
        )}

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to top, rgba(26,26,26,1), transparent)" }} />
      </Link>

      {/* Contenu */}
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <Link href={`/spots/${spot.id}`} style={{ textDecoration: "none" }}>
          <h3
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#fff", fontSize: "1rem", marginBottom: "4px", transition: "color 0.2s" }}
            className="group-hover:text-violet-300"
          >
            {spot.name}
          </h3>
        </Link>

        {spot.vibe && (
          <p style={{ color: "#a78bfa", fontSize: "12px", fontStyle: "italic", marginBottom: "0.5rem" }}>{spot.vibe}</p>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#666", fontSize: "12px", marginBottom: "0.75rem" }}>
          <MapPin size={11} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{spot.location}</span>
        </div>

        {spot.description && (
          <p style={{ color: "#555", fontSize: "12px", lineHeight: 1.5, marginBottom: "1rem" }} className="line-clamp-2">
            {spot.description}
          </p>
        )}

        {/* Boutons — pas dans un <a> parent */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "auto" }}>
          {spot.whatsapp_number && (
            <a
              href={`https://wa.me/${spot.whatsapp_number.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", background: "rgba(34,197,94,0.1)", color: "#4ade80", padding: "5px 12px", borderRadius: "9999px", border: "1px solid rgba(34,197,94,0.2)", textDecoration: "none" }}
            >
              <MessageCircle size={11} /> WhatsApp
            </a>
          )}
          {spot.instagram_link && (
            <a
              href={spot.instagram_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", background: "rgba(236,72,153,0.1)", color: "#f472b6", padding: "5px 12px", borderRadius: "9999px", border: "1px solid rgba(236,72,153,0.2)", textDecoration: "none" }}
            >
              <ExternalLink size={11} /> Insta
            </a>
          )}
        </div>
      </div>
    </div>
  );
}