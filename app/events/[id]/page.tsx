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
    <div className="min-h-screen pt-20 pb-20">
      {/* Hero image */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={event.image_url || "/images/placeholder-event.jpg"}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Back button */}
        <div className="absolute top-8 left-4 md:left-8 z-10">
          <Link
            href="/events"
            className="flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/10 text-white px-4 py-2 rounded-full text-sm hover:bg-black/70 transition-colors"
          >
            <ArrowLeft size={14} />
            Retour
          </Link>
        </div>

        {/* Category */}
        <div className="absolute top-8 right-4 md:right-8 z-10">
          <span className={`badge text-white ${categoryColors[event.category]}`}>
            {categoryLabels[event.category]}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-16 relative z-10">
        <div className="card-dark p-6 md:p-10">
          {/* Title */}
          <h1 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-6 leading-tight">
            {event.title}
          </h1>

          {/* Meta */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 pb-8 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0">
                <Calendar size={16} className="text-violet-400" />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Date</p>
                <p className="text-white text-sm font-medium">{formatDate(event.date)}</p>
              </div>
            </div>

            {event.time && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">Heure</p>
                  <p className="text-white text-sm font-medium">{event.time}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-600/20 flex items-center justify-center flex-shrink-0">
                <MapPin size={16} className="text-violet-400" />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wider">Lieu</p>
                <p className="text-white text-sm font-medium">{event.location}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="mb-8">
              <h2 className="text-white font-bold text-lg mb-4">À propos</h2>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>
          )}

          {/* Price */}
          {event.price !== undefined && (
            <div className="mb-8 p-4 bg-violet-600/10 border border-violet-600/20 rounded-xl">
              <p className="text-gray-400 text-sm">Tarif</p>
              <p className="text-violet-400 font-bold text-2xl">
                {event.price === 0
                  ? "Gratuit"
                  : `${event.price.toLocaleString()} FCFA`}
              </p>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            {event.whatsapp_link && (
              <a
                href={event.whatsapp_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-medium px-8 py-4 rounded-full transition-colors flex-1"
              >
                <MessageCircle size={18} />
                Réserver via WhatsApp
              </a>
            )}
            {event.ticket_link && (
              <a
                href={event.ticket_link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary justify-center flex-1 py-4"
              >
                <ExternalLink size={16} />
                Acheter un ticket
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
