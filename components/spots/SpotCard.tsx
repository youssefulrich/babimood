"use client";

import Image from "next/image";
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
      <div className="card-dark transition-all duration-300 group-hover:border-violet-600/30 group-hover:violet-glow">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[3/2]">
          <Image
            src={mainImage}
            alt={spot.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Type badge */}
          <div className="absolute top-3 left-3">
            <span className="badge bg-black/60 backdrop-blur-sm text-gray-300 border border-white/10 text-[10px]">
              {spotTypeLabels[spot.type]}
            </span>
          </div>

          {spot.is_featured && (
            <div className="absolute top-3 right-3">
              <span className="badge bg-violet-600 text-white text-[10px]">
                ✦ Top Spot
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display font-bold text-white text-base mb-1 group-hover:text-violet-300 transition-colors">
            {spot.name}
          </h3>

          {spot.vibe && (
            <p className="text-violet-400 text-xs font-medium mb-2 italic">
              {spot.vibe}
            </p>
          )}

          <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
            <MapPin size={11} />
            <span className="truncate">{spot.location}</span>
          </div>

          {spot.description && (
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
              {spot.description}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            {spot.whatsapp_number && (
              <a
                href={`https://wa.me/${spot.whatsapp_number.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-xs bg-green-600/10 hover:bg-green-600/20 text-green-400 px-3 py-1.5 rounded-full transition-colors border border-green-600/20"
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
                className="flex items-center gap-1.5 text-xs bg-pink-600/10 hover:bg-pink-600/20 text-pink-400 px-3 py-1.5 rounded-full transition-colors border border-pink-600/20"
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
