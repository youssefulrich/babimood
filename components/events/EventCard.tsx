import Link from "next/link";
import { Calendar, MapPin, MessageCircle } from "lucide-react";
import { Event } from "@/types";
import { formatDateShort, categoryLabels, categoryColors } from "@/lib/utils";

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

export default function EventCard({ event, featured = false }: EventCardProps) {
  return (
    <Link href={`/events/${event.id}`} className="group block">
      <div
        style={{
          background: "#1A1A1A",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "1rem",
          overflow: "hidden",
          transition: "border-color 0.3s, box-shadow 0.3s",
          height: featured ? "100%" : undefined,
        }}
        className="group-hover:border-violet-600/30 group-hover:violet-glow"
      >
        {/* Image COMPLÈTE sans crop */}
        <div style={{ position: "relative", width: "100%", background: "#000" }}>
          <img
            src={event.image_url || "/images/placeholder-event.jpg"}
            alt={event.title}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.5s",
            }}
            className="group-hover:scale-[1.02]"
          />

          {/* Badges */}
          {event.is_featured && (
            <div style={{ position: "absolute", top: "10px", left: "10px" }}>
              <span
                style={{
                  background: "#7c3aed",
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: "9999px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                ✦ Featured
              </span>
            </div>
          )}

          <div style={{ position: "absolute", top: "10px", right: "10px" }}>
            <span
              className={`badge text-white ${categoryColors[event.category]}`}
              style={{ fontSize: "10px" }}
            >
              {categoryLabels[event.category]}
            </span>
          </div>

          {/* Date en bas de l'image */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "1.5rem 0.75rem 0.6rem",
              background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.85)", fontSize: "12px", fontWeight: 500 }}>
              <Calendar size={11} />
              <span>{formatDateShort(event.date)}</span>
              {event.time && (
                <>
                  <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
                  <span>{event.time}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Contenu texte */}
        <div style={{ padding: "1rem" }}>
          <h3
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              color: "#fff",
              fontSize: "1rem",
              lineHeight: 1.3,
              marginBottom: "0.5rem",
              transition: "color 0.2s",
            }}
            className="group-hover:text-violet-300 line-clamp-2"
          >
            {event.title}
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#666", fontSize: "12px", marginBottom: "0.75rem" }}>
            <MapPin size={11} />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {event.location}
            </span>
          </div>

          {event.description && (
            <p
              style={{ color: "#555", fontSize: "12px", lineHeight: 1.5, marginBottom: "1rem" }}
              className="line-clamp-2"
            >
              {event.description}
            </p>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {event.price ? (
              <span style={{ color: "#a78bfa", fontSize: "0.9rem", fontWeight: 700 }}>
                {event.price.toLocaleString()} FCFA
              </span>
            ) : (
              <span style={{ color: "#22c55e", fontSize: "12px", fontWeight: 600 }}>Gratuit</span>
            )}

            {event.whatsapp_link && (
              <a
                href={event.whatsapp_link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "12px",
                  background: "rgba(34,197,94,0.1)",
                  color: "#4ade80",
                  padding: "5px 12px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(34,197,94,0.2)",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
              >
                <MessageCircle size={11} />
                Réserver
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}