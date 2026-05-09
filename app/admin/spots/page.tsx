import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus, Edit, Star } from "lucide-react";
import { spotTypeLabels } from "@/lib/utils";
import { Spot } from "@/types";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminToggleFeatured from "@/components/admin/AdminToggleFeatured";

export default async function AdminSpotsPage() {
  const supabase = await createClient();
  const { data: spots } = await supabase
    .from("spots")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-white mb-1">Spots</h1>
          <p className="text-gray-500 text-sm">{spots?.length ?? 0} spots au total</p>
        </div>
        <Link href="/admin/spots/new" className="btn-primary text-sm">
          <Plus size={16} />
          Ajouter
        </Link>
      </div>

      <div className="card-dark overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-xs text-gray-500 font-medium uppercase tracking-wider">Spot</th>
                <th className="text-left p-4 text-xs text-gray-500 font-medium uppercase tracking-wider">Type</th>
                <th className="text-left p-4 text-xs text-gray-500 font-medium uppercase tracking-wider">Lieu</th>
                <th className="text-left p-4 text-xs text-gray-500 font-medium uppercase tracking-wider">Statut</th>
                <th className="text-left p-4 text-xs text-gray-500 font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {spots?.map((spot: Spot) => (
                <tr key={spot.id} className="hover:bg-white/2 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {spot.is_featured && <Star size={14} className="text-yellow-400" />}
                      <span className="text-white text-sm font-medium">{spot.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="badge bg-cyan-600/20 text-cyan-300 text-[10px]">
                      {spotTypeLabels[spot.type]}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm truncate max-w-[150px]">{spot.location}</td>
                  <td className="p-4">
                    <span className={`badge text-[10px] ${spot.is_published ? "bg-green-600/20 text-green-400" : "bg-gray-700 text-gray-500"}`}>
                      {spot.is_published ? "Publié" : "Brouillon"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <AdminToggleFeatured id={spot.id} table="spots" featured={spot.is_featured} />
                      <Link href={`/admin/spots/${spot.id}/edit`} className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <Edit size={14} />
                      </Link>
                      <AdminDeleteButton id={spot.id} table="spots" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!spots || spots.length === 0) && (
            <div className="text-center py-16">
              <p className="text-gray-500">Aucun spot. Créez le premier !</p>
              <Link href="/admin/spots/new" className="btn-primary mt-4 inline-flex text-sm">
                <Plus size={16} /> Créer un spot
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
