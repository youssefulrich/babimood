import { createClient } from "@/lib/supabase/server";
import { Submission } from "@/types";
import { formatDateShort } from "@/lib/utils";
import AdminDeleteButton from "@/components/admin/AdminDeleteButton";
import AdminSubmissionStatus from "@/components/admin/AdminSubmissionStatus";

export default async function AdminSubmissionsPage() {
  const supabase = await createClient();
  const { data: submissions } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  const pending = submissions?.filter((s: Submission) => s.status === "pending").length ?? 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl text-white mb-1">Soumissions</h1>
        <p className="text-gray-500 text-sm">
          {submissions?.length ?? 0} soumissions · {pending} en attente
        </p>
      </div>

      <div className="space-y-4">
        {submissions?.map((sub: Submission) => (
          <div key={sub.id} className="card-dark p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-white text-base">{sub.event_name}</h3>
                  <span className={`badge text-[10px] ${
                    sub.status === "pending" ? "bg-amber-500/20 text-amber-400" :
                    sub.status === "approved" ? "bg-green-600/20 text-green-400" :
                    "bg-red-600/20 text-red-400"
                  }`}>
                    {sub.status === "pending" ? "En attente" : sub.status === "approved" ? "Approuvé" : "Rejeté"}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Organisateur</p>
                    <p className="text-gray-300">{sub.organizer_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Date</p>
                    <p className="text-gray-300">{formatDateShort(sub.event_date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Lieu</p>
                    <p className="text-gray-300 truncate">{sub.event_location}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Contact</p>
                    <a href={`tel:${sub.contact_phone}`} className="text-violet-400 hover:underline">
                      {sub.contact_phone}
                    </a>
                  </div>
                </div>

                {sub.description && (
                  <p className="text-gray-500 text-sm mt-3 line-clamp-2">{sub.description}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <AdminSubmissionStatus id={sub.id} status={sub.status} />
                <AdminDeleteButton id={sub.id} table="submissions" />
              </div>
            </div>
          </div>
        ))}

        {(!submissions || submissions.length === 0) && (
          <div className="text-center py-20 border border-white/5 rounded-2xl">
            <p className="text-gray-500">Aucune soumission pour le moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
