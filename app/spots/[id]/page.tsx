import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, ArrowLeft, MessageCircle, Phone, ExternalLink } from "lucide-react";
import { getSpotById } from "@/lib/queries";
import { spotTypeLabels } from "@/lib/utils";

export default async function SpotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const spot = await getSpotById(id);
  if (!spot) notFound();

  const images = spot.images?.length ? spot.images : ["/images/placeholder-spot.jpg"];

  return (
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero */}
      <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
        <Image
          src={images[0]}
          alt={spot.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="absolute top-8 left-4 md:left-8 z-10">
          <Link
            href="/spots"
            className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/10 text-white px-4 py-2 rounded-full text-sm hover:bg-black/70 transition-colors"
          >
            <ArrowLeft size={14} />
            Retour
          </Link>
        </div>

        <div className="absolute top-8 right-4 md:right-8 z-10">
          <span className="badge bg-black/60 backdrop-blur-sm text-gray-300 border border-white/10">
            {spotTypeLabels[spot.type]}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="card-dark p-6 md:p-10">
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-2 leading-tight">
            {spot.name}
          </h1>

          {spot.vibe && (
            <p className="text-violet-400 text-base italic mb-6">{spot.vibe}</p>
          )}

          {/* Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 pb-8 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center">
                <MapPin size={16} className="text-violet-400" />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Localisation</p>
                <p className="text-white text-sm font-medium">{spot.location}</p>
              </div>
            </div>
            {spot.opening_hours && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center">
                  <Clock size={16} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Horaires</p>
                  <p className="text-white text-sm font-medium">{spot.opening_hours}</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          {spot.description && (
            <div className="mb-8">
              <h2 className="text-white font-bold text-lg mb-4">À propos</h2>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">{spot.description}</p>
            </div>
          )}

          {/* Photo gallery */}
          {images.length > 1 && (
            <div className="mb-8">
              <h2 className="text-white font-bold text-lg mb-4">Photos</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {images.slice(1).map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                    <Image src={img} alt={`${spot.name} ${i + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            {spot.whatsapp_number && (
              <a
                href={`https://wa.me/${spot.whatsapp_number.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium px-8 py-4 rounded-full transition-colors flex-1"
              >
                <MessageCircle size={18} />
                Contacter sur WhatsApp
              </a>
            )}
            {spot.instagram_link && (
              <a
                href={spot.instagram_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-pink-600/50 hover:bg-pink-600/10 text-pink-400 font-medium px-8 py-4 rounded-full transition-colors flex-1"
              >
                <ExternalLink size={18} />
                Voir sur Instagram
              </a>
            )}
            {spot.phone && (
              <a
                href={`tel:${spot.phone}`}
                className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-gray-300 font-medium px-8 py-4 rounded-full transition-colors"
              >
                <Phone size={18} />
                Appeler
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
