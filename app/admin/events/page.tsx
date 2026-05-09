import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { formatDateShort, categoryLabels } from "@/lib/utils";
import { Event } from "@/types";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminToggleFeatured from "@/components/admin/AdminToggleFeatured";

export default async function AdminEventsPage() {
  const supabase = await createClient();
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-white mb-1">Événements</h1>
          <p className="text-gray-500 text-sm">{events?.length ?? 0} événements au total</p>
        </div>
        <Link href="/admin/events/new" className="btn-primary text-sm">
          <Plus size={16} />
          Ajouter
        </Link>
      </div>

      <div className="card-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs text-gray-500 font-medium uppercase tracking-wider">Événement</th>
                <th className="text-left p-4 text-xs text-gray-500 font-medium uppercase tracking-wider">Date</th>
                <th className="text-left p-4 text-xs text-gray-500 font-medium uppercase tracking-wider">Catégorie</th>
                <th className="text-left p-4 text-xs text-gray-500 font-medium uppercase tracking-wider">Statut</th>
                <th className="text-left p-4 text-xs text-gray-500 font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {events?.map((event: Event) => (
                <tr key={event.id} className="hover:bg-white/2 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {event.is_featured && <Star size={14} className="text-yellow-400 flex-shrink-0" />}
                      <span className="text-white text-sm font-medium truncate max-w-[200px]">
                        {event.title}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">{formatDateShort(event.date)}</td>
                  <td className="p-4">
                    <span className="badge bg-violet-600/20 text-violet-300 text-[10px]">
                      {categoryLabels[event.category]}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`badge text-[10px] ${event.is_published ? "bg-green-600/20 text-green-400" : "bg-gray-700 text-gray-500"}`}>
                      {event.is_published ? "Publié" : "Brouillon"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <AdminToggleFeatured id={event.id} table="events" featured={event.is_featured} />
                      <Link
                        href={`/admin/events/${event.id}/edit`}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <Edit size={14} />
                      </Link>
                      <AdminDeleteButton id={event.id} table="events" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {(!events || events.length === 0) && (
            <div className="text-center py-16">
              <p className="text-gray-500">Aucun événement. Créez le premier !</p>
              <Link href="/admin/events/new" className="btn-primary mt-4 inline-flex text-sm">
                <Plus size={16} /> Créer un événement
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
