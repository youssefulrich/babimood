import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowLeft, MessageCircle, ExternalLink } from "lucide-react";
import { getEventById } from "@/lib/queries";
import { formatDate, categoryLabels, categoryColors } from "@/lib/utils";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) notFound();

  return (
    <div className="min-h-screen" style={{ background: "#080808" }}>

      {/* ── IMAGE COMPLÈTE ── */}
      <div style={{ position: "relative", width: "100%", background: "#000" }}>

        {/* Boutons overlay */}
        <div style={{ position: "absolute", top: "5rem", left: "1.5rem", zIndex: 20 }}>
          <Link
            href="/events"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "white",
              padding: "0.5rem 1.2rem",
              borderRadius: "9999px",
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} />
            Retour
          </Link>
        </div>

        <div style={{ position: "absolute", top: "5rem", right: "1.5rem", zIndex: 20 }}>
          <span
            className={`badge text-white ${categoryColors[event.category]}`}
            style={{ fontSize: "11px", padding: "0.35rem 0.9rem" }}
          >
            {categoryLabels[event.category]}
          </span>
        </div>

        {/* Image COMPLÈTE — pas de crop */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img
            src={event.image_url || "/images/placeholder-event.jpg"}
            alt={event.title}
            style={{
              width: "100%",
              maxWidth: "900px",
              height: "auto",
              display: "block",
              margin: "0 auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Fade bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: "linear-gradient(to top, #080808, transparent)",
          }}
        />
      </div>

      {/* ── CONTENU ── */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <div
          style={{
            background: "rgba(26,26,26,0.9)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "1.5rem",
            padding: "2.5rem",
            marginTop: "-2rem",
            position: "relative",
            zIndex: 10,
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Titre */}
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: "2rem",
            }}
          >
            {event.title}
          </h1>

          {/* Meta infos */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
              marginBottom: "2rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {[
              { icon: <Calendar size={16} />, label: "Date", value: formatDate(event.date) },
              ...(event.time ? [{ icon: <Clock size={16} />, label: "Heure", value: event.time }] : []),
              { icon: <MapPin size={16} />, label: "Lieu", value: event.location },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  background: "rgba(139,92,246,0.08)",
                  border: "1px solid rgba(139,92,246,0.15)",
                  borderRadius: "0.75rem",
                  padding: "0.85rem 1rem",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(139,92,246,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#a78bfa",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {item.label}
                  </p>
                  <p style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 600, marginTop: "2px" }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Prix */}
          {event.price !== undefined && (
            <div
              style={{
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.2)",
                borderRadius: "0.75rem",
                padding: "1rem 1.25rem",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Tarif d&apos;entrée</p>
              <p style={{ color: "#a78bfa", fontWeight: 700, fontSize: "1.4rem" }}>
                {event.price === 0 ? "Gratuit 🎉" : `${event.price.toLocaleString()} FCFA`}
              </p>
            </div>
          )}

          {/* Description */}
          {event.description && (
            <div style={{ marginBottom: "2rem" }}>
              <h2 style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.75rem" }}>
                À propos
              </h2>
              <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.75, whiteSpace: "pre-line", fontSize: "0.95rem" }}>
                {event.description}
              </p>
            </div>
          )}

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {event.whatsapp_link && (
              <a
                href={event.whatsapp_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  background: "#16a34a",
                  color: "white",
                  fontWeight: 600,
                  padding: "1rem",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  fontSize: "1rem",
                  transition: "background 0.2s",
                }}
              >
                <MessageCircle size={20} />
                Réserver via WhatsApp
              </a>
            )}
            {event.ticket_link && (
              <a
                href={event.ticket_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                  color: "white",
                  fontWeight: 600,
                  padding: "1rem",
                  borderRadius: "9999px",
                  textDecoration: "none",
                  fontSize: "1rem",
                  boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                }}
              >
                <ExternalLink size={18} />
                Acheter un ticket
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}