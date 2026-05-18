"use client";

import Link from "next/link";
import { Calendar, MapPin, MessageCircle, RefreshCw } from "lucide-react";
import { Event } from "@/types";
import { formatDateShort, categoryLabels, categoryColors } from "@/lib/utils";
import { recurrenceLabels, getNextOccurrenceText } from "@/lib/recurrence";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export default function EventCard({ event, featured = false }: EventCardProps) {
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
        height: featured ? "100%" : undefined,
      }}
      className="group hover:border-violet-600/30 hover:violet-glow"
    >
      {/* Image */}
      <Link href={`/events/${event.id}`} style={{ display: "block", textDecoration: "none", position: "relative", background: "#000" }}>
        <img
          src={event.image_url || "/images/placeholder-event.jpg"}
          alt={event.title}
          style={{ width: "100%", height: "auto", display: "block", objectFit: "contain" }}
        />

        {/* Badge récurrent */}
        {event.is_recurring && (
          <div style={{ position: "absolute", top: "10px", left: "10px" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
              color: "#a78bfa", fontSize: "10px", fontWeight: 700,
              padding: "3px 10px", borderRadius: "9999px",
              border: "1px solid rgba(139,92,246,0.4)",
              textTransform: "uppercase" as const,
            }}>
              <RefreshCw size={9} />
              {event.recurrence_rule ? recurrenceLabels[event.recurrence_rule] : "Récurrent"}
            </span>
          </div>
        )}

        {/* Badge featured */}
        {event.is_featured && !event.is_recurring && (
          <div style={{ position: "absolute", top: "10px", left: "10px" }}>
            <span style={{ background: "#7c3aed", color: "white", fontSize: "10px", fontWeight: 600, padding: "3px 10px", borderRadius: "9999px", textTransform: "uppercase" as const }}>
              ✦ Featured
            </span>
          </div>
        )}

        {/* Badge catégorie */}
        <div style={{ position: "absolute", top: "10px", right: "10px" }}>
          <span className={`badge text-white ${categoryColors[event.category]}`} style={{ fontSize: "10px" }}>
            {categoryLabels[event.category]}
          </span>
        </div>

        {/* Date overlay */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem 0.75rem 0.6rem", background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.85)", fontSize: "12px", fontWeight: 500 }}>
            <Calendar size={11} />
            {event.is_recurring && event.recurrence_rule ? (
              <span>{getNextOccurrenceText(event.recurrence_rule)}</span>
            ) : (
              <>
                <span>{formatDateShort(event.date)}</span>
                {event.time && <><span style={{ color: "rgba(255,255,255,0.3)" }}>·</span><span>{event.time}</span></>}
              </>
            )}
          </div>
        </div>
      </Link>

      {/* Contenu texte */}
      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", flex: 1 }}>
        <Link href={`/events/${event.id}`} style={{ textDecoration: "none" }}>
          <h3
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, color: "#fff", fontSize: "1rem", lineHeight: 1.3, marginBottom: "0.5rem" }}
            className="group-hover:text-violet-300 line-clamp-2"
          >
            {event.title}
          </h3>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#666", fontSize: "12px", marginBottom: "0.75rem" }}>
          <MapPin size={11} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{event.location}</span>
        </div>

        {/* Prochaine occurrence pour récurrents */}
        {event.is_recurring && event.recurrence_rule && (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)",
            borderRadius: "0.5rem", padding: "5px 10px", marginBottom: "0.75rem",
          }}>
            <RefreshCw size={10} style={{ color: "#a78bfa" }} />
            <span style={{ color: "#a78bfa", fontSize: "11px", fontWeight: 600 }}>
              {recurrenceLabels[event.recurrence_rule]}
            </span>
          </div>
        )}

        {event.description && (
          <p style={{ color: "#555", fontSize: "12px", lineHeight: 1.5, marginBottom: "1rem" }} className="line-clamp-2">
            {event.description}
          </p>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          {event.price ? (
            <span style={{ color: "#a78bfa", fontSize: "0.9rem", fontWeight: 700 }}>{event.price.toLocaleString()} FCFA</span>
          ) : (
            <span style={{ color: "#22c55e", fontSize: "12px", fontWeight: 600 }}>Gratuit</span>
          )}

          {event.whatsapp_link && (
            <a
              href={event.whatsapp_link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "5px", fontSize: "12px", background: "rgba(34,197,94,0.1)", color: "#4ade80", padding: "5px 12px", borderRadius: "9999px", border: "1px solid rgba(34,197,94,0.2)", textDecoration: "none" }}
            >
              <MessageCircle size={11} /> Réserver
            </a>
          )}
        </div>
      </div>
    </div>
  );
}