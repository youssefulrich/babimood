import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
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
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-violet-950/40 via-black to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-800/10 rounded-full blur-3xl pointer-events-none" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center pt-24 pb-16">
          <div className="inline-flex items-center gap-2 border border-violet-600/30 bg-violet-600/10 px-4 py-2 rounded-full mb-8">
            <MapPin size={12} className="text-violet-400" />
            <span className="text-violet-300 text-xs font-medium uppercase tracking-widest">
              Abidjan, Côte d&apos;Ivoire
            </span>
          </div>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl text-white leading-none tracking-tight mb-6">
            Où sortir<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">
              ce soir ?
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Les meilleurs événements, clubs, plages et spots tendance d&apos;Abidjan — au même endroit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/events" className="btn-primary text-base px-8 py-4">
              Voir les événements <ArrowRight size={16} />
            </Link>
            <Link href="/spots" className="btn-outline text-base px-8 py-4">
              Explorer les spots
            </Link>
          </div>
          <div className="flex items-center justify-center gap-8 mt-16 pt-8 border-t border-white/5">
            {[{ n: "50+", label: "Événements" }, { n: "30+", label: "Top Spots" }, { n: "10k+", label: "Followers" }].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-extrabold text-2xl text-white">{s.n}</div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-violet-400 text-xs font-medium uppercase tracking-widest mb-2">À ne pas manquer</p>
            <h2 className="section-title">Événements du moment</h2>
          </div>
          <Link href="/events" className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
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
          <div className="text-center py-20 border border-white/5 rounded-2xl">
            <p className="text-gray-500">Aucun événement pour le moment. Reviens bientôt 🔥</p>
          </div>
        )}
        <div className="mt-8 text-center md:hidden">
          <Link href="/events" className="btn-outline">Tous les événements <ArrowRight size={14} /></Link>
        </div>
      </section>

      {/* TOP SPOTS */}
      <section className="bg-gray-900/30 border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-violet-400 text-xs font-medium uppercase tracking-widest mb-2">Les incontournables</p>
              <h2 className="section-title">Top Spots Abidjan</h2>
            </div>
            <Link href="/spots" className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
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
            <div className="text-center py-20 border border-white/5 rounded-2xl">
              <p className="text-gray-500">Les spots arrivent bientôt.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="relative overflow-hidden rounded-3xl border border-violet-600/20 bg-gradient-to-br from-violet-950/40 to-black p-10 md:p-16 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-violet-600/20 blur-3xl" />
          <p className="text-violet-400 text-xs font-medium uppercase tracking-widest mb-4 relative z-10">Tu organises un événement ?</p>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4 relative z-10">Rejoins BabiMood</h2>
          <p className="text-gray-400 text-base max-w-lg mx-auto mb-8 relative z-10">
            Soumets ton événement pour toucher la communauté nightlife d&apos;Abidjan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/soumettre" className="btn-primary text-base px-8 py-4">
              Soumettre mon événement <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/225XXXXXXXXX" target="_blank" rel="noopener noreferrer" className="btn-outline text-base px-8 py-4">
              Nous contacter sur WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
