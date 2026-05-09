import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Zap } from "lucide-react";
import { getFeaturedEvents, getFeaturedSpots } from "@/lib/queries";
import EventCard from "@/components/events/EventCard";
import SpotCard from "@/components/spots/SpotCard";

export const revalidate = 60;

export default async function HomePage() {
  const [featuredEvents, featuredSpots] = await Promise.all([
    getFeaturedEvents().catch(() => []),
    getFeaturedSpots().catch(() => []),
  ]);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1571266028243-d220c6a8d5fd?w=1800&q=80')",
          }}
        />

        {/* Dark overlays */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

        {/* Violet neon glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-violet-900/20 rounded-full blur-3xl" />

        {/* Grid lines overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center pt-32 pb-20">

          {/* Location pill */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10"
            style={{
              background: "rgba(139,92,246,0.15)",
              border: "1px solid rgba(139,92,246,0.4)",
              backdropFilter: "blur(10px)",
            }}
          >
            <MapPin size={13} className="text-violet-400" />
            <span style={{ color: "#c4b5fd", fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Abidjan, Côte d&apos;Ivoire
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          </div>

          {/* Main title */}
          <h1
            style={{
              fontFamily: "Syne, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(3rem, 10vw, 7rem)",
              lineHeight: 1,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              marginBottom: "1.5rem",
            }}
          >
            Où sortir
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #c084fc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ce soir ?
            </span>
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              maxWidth: "520px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
          >
            Les meilleurs événements, clubs, plages et spots tendance d&apos;Abidjan — au même endroit.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link
              href="/events"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                color: "white",
                fontWeight: 600,
                padding: "1rem 2rem",
                borderRadius: "9999px",
                fontSize: "0.95rem",
                textDecoration: "none",
                boxShadow: "0 0 30px rgba(124,58,237,0.5), 0 4px 20px rgba(0,0,0,0.3)",
                transition: "all 0.3s",
                border: "1px solid rgba(167,139,250,0.3)",
              }}
            >
              <Calendar size={16} />
              Voir les événements
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/spots"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.9)",
                fontWeight: 600,
                padding: "1rem 2rem",
                borderRadius: "9999px",
                fontSize: "0.95rem",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s",
              }}
            >
              Explorer les spots
            </Link>
          </div>

          {/* Stats bar — glassmorphism */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "9999px",
              backdropFilter: "blur(20px)",
              padding: "0",
              overflow: "hidden",
            }}
          >
            {[
              { n: "50+", label: "Événements" },
              { n: "30+", label: "Top Spots" },
              { n: "10k+", label: "Followers" },
            ].map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "1rem 2rem",
                  textAlign: "center",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#fff" }}>
                  {s.n}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px", letterSpacing: "0.05em" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ── FEATURED EVENTS ─────────────────────────────── */}
      <section
        style={{
          background: "#080808",
          padding: "6rem 0",
          position: "relative",
        }}
      >
        {/* Subtle bg glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          {/* Section header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Zap size={14} className="text-violet-400" />
                <span
                  style={{
                    color: "#a78bfa",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  À ne pas manquer
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                Événements du moment
              </h2>
            </div>
            <Link
              href="/events"
              className="hidden md:flex"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.875rem",
                textDecoration: "none",
                transition: "color 0.2s",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "0.5rem 1.2rem",
                borderRadius: "9999px",
              }}
            >
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>

          {featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} featured />
              ))}
            </div>
          ) : (
            /* Empty state avec image */
            <div
              style={{
                position: "relative",
                borderRadius: "1.5rem",
                overflow: "hidden",
                minHeight: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=60')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.2)",
                }}
              />
              <div className="relative z-10 text-center">
                <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔥</p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
                  Les événements arrivent bientôt
                </p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem", marginTop: "0.5rem" }}>
                  Reviens très vite
                </p>
              </div>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/events" className="btn-outline">
              Tous les événements <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TOP SPOTS ───────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "6rem 0" }}>
        {/* Background image flouté */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1800&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.12) blur(2px)",
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,8,8,0.85)" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, #080808 0%, transparent 15%, transparent 85%, #080808 100%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} className="text-violet-400" />
                <span
                  style={{
                    color: "#a78bfa",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Les incontournables
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                Top Spots Abidjan
              </h2>
            </div>
            <Link
              href="/spots"
              className="hidden md:flex"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.875rem",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "0.5rem 1.2rem",
                borderRadius: "9999px",
              }}
            >
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>

          {featuredSpots.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSpots.map((spot) => (
                <SpotCard key={spot.id} spot={spot} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "5rem 2rem",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "1.5rem",
              }}
            >
              <p style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏝️</p>
              <p style={{ color: "rgba(255,255,255,0.5)" }}>Les spots arrivent bientôt.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────── */}
      <section style={{ padding: "6rem 0", background: "#080808" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "2rem",
              border: "1px solid rgba(139,92,246,0.25)",
              minHeight: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* BG image */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=70')",
                backgroundSize: "cover",
                backgroundPosition: "center top",
                filter: "brightness(0.25)",
              }}
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(76,29,149,0.6) 0%, rgba(8,8,8,0.4) 100%)",
              }}
            />

            {/* Glow top */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "500px",
                height: "150px",
                background: "rgba(139,92,246,0.3)",
                filter: "blur(60px)",
              }}
            />

            <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "4rem 2rem" }}>
              <span
                style={{
                  display: "inline-block",
                  background: "rgba(139,92,246,0.2)",
                  border: "1px solid rgba(139,92,246,0.4)",
                  color: "#c4b5fd",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  padding: "0.4rem 1rem",
                  borderRadius: "9999px",
                  marginBottom: "1.5rem",
                }}
              >
                Tu organises un événement ?
              </span>

              <h2
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: "1.2rem",
                }}
              >
                Rejoins BabiMood
              </h2>

              <p
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "1.05rem",
                  maxWidth: "480px",
                  margin: "0 auto 2.5rem",
                  lineHeight: 1.6,
                }}
              >
                Soumets ton événement pour toucher la communauté nightlife d&apos;Abidjan.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <Link
                  href="/soumettre"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                    color: "white",
                    fontWeight: 600,
                    padding: "1rem 2rem",
                    borderRadius: "9999px",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    boxShadow: "0 0 30px rgba(124,58,237,0.5)",
                    border: "1px solid rgba(167,139,250,0.3)",
                  }}
                >
                  Soumettre mon événement
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/225XXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 600,
                    padding: "1rem 2rem",
                    borderRadius: "9999px",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  Nous contacter sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}