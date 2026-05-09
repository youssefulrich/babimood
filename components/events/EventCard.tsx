import Image from "next/image";
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
        className={`card-dark transition-all duration-300 group-hover:border-violet-600/30 group-hover:violet-glow ${
          featured ? "h-full" : ""
        }`}
      >
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <Image
            src={event.image_url || "/images/placeholder-event.jpg"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Featured badge */}
          {event.is_featured && (
            <div className="absolute top-3 left-3">
              <span className="badge bg-violet-600 text-white text-[10px]">
                ✦ Featured
              </span>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 right-3">
            <span className={`badge text-white text-[10px] ${categoryColors[event.category]}`}>
              {categoryLabels[event.category]}
            </span>
          </div>

          {/* Date overlay */}
          <div className="absolute bottom-3 left-3">
            <div className="flex items-center gap-1.5 text-white/90 text-xs font-medium">
              <Calendar size={12} />
              <span>{formatDateShort(event.date)}</span>
              {event.time && (
                <>
                  <span className="text-white/40">·</span>
                  <span>{event.time}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display font-bold text-white text-base leading-tight mb-2 line-clamp-2 group-hover:text-violet-300 transition-colors">
            {event.title}
          </h3>

          <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
            <MapPin size={11} />
            <span className="truncate">{event.location}</span>
          </div>

          {event.description && (
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
              {event.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            {event.price ? (
              <span className="text-violet-400 text-sm font-bold">
                {event.price.toLocaleString()} FCFA
              </span>
            ) : (
              <span className="text-green-500 text-xs font-medium">Gratuit</span>
            )}

            {event.whatsapp_link && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(event.whatsapp_link!, "_blank", "noopener,noreferrer");
                }}
                className="flex items-center gap-1.5 text-xs bg-green-600/10 hover:bg-green-600/20 text-green-400 px-3 py-1.5 rounded-lg transition-colors"
              >
                <MessageCircle size={11} />
                Réserver
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}