import { createClient } from "@/lib/supabase/server";
import { Calendar, MapPin, FileText, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: eventsCount },
    { count: spotsCount },
    { count: submissionsCount },
    { count: pendingCount },
  ] = await Promise.all([
    supabase.from("events").select("*", { count: "exact", head: true }),
    supabase.from("spots").select("*", { count: "exact", head: true }),
    supabase.from("submissions").select("*", { count: "exact", head: true }),
    supabase
      .from("submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  const stats = [
    { label: "Événements", value: eventsCount ?? 0, icon: Calendar, href: "/admin/events", color: "text-violet-400" },
    { label: "Spots", value: spotsCount ?? 0, icon: MapPin, href: "/admin/spots", color: "text-cyan-400" },
    { label: "Soumissions", value: submissionsCount ?? 0, icon: FileText, href: "/admin/submissions", color: "text-pink-400" },
    { label: "En attente", value: pendingCount ?? 0, icon: TrendingUp, href: "/admin/submissions", color: "text-amber-400" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-white mb-1">Dashboard</h1>
        <p className="text-gray-500 text-sm">Vue d&apos;ensemble de BabiMood</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card-dark p-6 hover:border-violet-600/30 transition-colors group">
            <s.icon size={20} className={`${s.color} mb-3`} />
            <p className="font-display font-bold text-3xl text-white">{s.value}</p>
            <p className="text-gray-500 text-sm mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="font-bold text-white text-lg mb-4">Actions rapides</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/admin/events/new" className="btn-primary justify-center py-4 text-sm">
            <Calendar size={16} />
            Ajouter un événement
          </Link>
          <Link href="/admin/spots/new" className="btn-outline justify-center py-4 text-sm">
            <MapPin size={16} />
            Ajouter un spot
          </Link>
        </div>
      </div>
    </div>
  );
}
