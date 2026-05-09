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
    <Link href={`/spots/${spot.id}`} className="group block">
      <div
        style={{
          background: "#1A1A1A",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "1rem",
          overflow: "hidden",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        className="group-hover:border-violet-600/30 group-hover:violet-glow"
      >
        {/* Image COMPLÈTE sans crop */}
        <div style={{ position: "relative", width: "100%", background: "#000" }}>
          <img
            src={mainImage}
            alt={spot.name}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              transition: "transform 0.5s",
            }}
            className="group-hover:scale-[1.02]"
          />

          {/* Type badge */}
          <div style={{ position: "absolute", top: "10px", left: "10px" }}>
            <span
              style={{
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(8px)",
                color: "rgba(255,255,255,0.8)",
                fontSize: "10px",
                fontWeight: 600,
                padding: "3px 10px",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.12)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {spotTypeLabels[spot.type]}
            </span>
          </div>

          {spot.is_featured && (
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
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
                ✦ Top Spot
              </span>
            </div>
          )}

          {/* Fade bottom */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60px",
              background: "linear-gradient(to top, rgba(26,26,26,1), transparent)",
            }}
          />
        </div>

        {/* Contenu texte */}
        <div style={{ padding: "1rem" }}>
          <h3
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 700,
              color: "#fff",
              fontSize: "1rem",
              marginBottom: "4px",
              transition: "color 0.2s",
            }}
            className="group-hover:text-violet-300"
          >
            {spot.name}
          </h3>

          {spot.vibe && (
            <p style={{ color: "#a78bfa", fontSize: "12px", fontStyle: "italic", marginBottom: "0.5rem" }}>
              {spot.vibe}
            </p>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "#666", fontSize: "12px", marginBottom: "0.75rem" }}>
            <MapPin size={11} />
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {spot.location}
            </span>
          </div>

          {spot.description && (
            <p
              style={{ color: "#555", fontSize: "12px", lineHeight: 1.5, marginBottom: "1rem" }}
              className="line-clamp-2"
            >
              {spot.description}
            </p>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {spot.whatsapp_number && (
              <a
                href={`https://wa.me/${spot.whatsapp_number.replace(/\D/g, "")}`}
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
                }}
              >
                <MessageCircle size={11} />
                WhatsApp
              </a>
            )}
            {spot.instagram_link && (
              <a
                href={spot.instagram_link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "12px",
                  background: "rgba(236,72,153,0.1)",
                  color: "#f472b6",
                  padding: "5px 12px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(236,72,153,0.2)",
                  textDecoration: "none",
                }}
              >
                <ExternalLink size={11} />
                Insta
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}