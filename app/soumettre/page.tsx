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
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#fff" }}>
          Soumissions
        </h1>
        <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "2px" }}>
          {submissions?.length ?? 0} soumissions · {pending} en attente
        </p>
      </div>

      {(!submissions || submissions.length === 0) ? (
        <div style={{ textAlign: "center", padding: "3rem 1rem", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "1rem" }}>
          <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</p>
          <p style={{ color: "#555" }}>Aucune soumission pour le moment.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {submissions.map((sub: Submission) => (
            <div
              key={sub.id}
              style={{
                background: "#111",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "0.875rem",
                padding: "1rem",
              }}
            >
              {/* Top : nom event + statut + actions */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.95rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {sub.event_name}
                  </p>
                  <span style={{
                    display: "inline-block", marginTop: "5px",
                    background: sub.status === "pending"
                      ? "rgba(251,191,36,0.15)"
                      : sub.status === "approved"
                      ? "rgba(34,197,94,0.15)"
                      : "rgba(239,68,68,0.15)",
                    color: sub.status === "pending" ? "#fbbf24"
                      : sub.status === "approved" ? "#4ade80"
                      : "#f87171",
                    fontSize: "10px", fontWeight: 600,
                    padding: "2px 8px", borderRadius: "9999px",
                    textTransform: "uppercase",
                  }}>
                    {sub.status === "pending" ? "En attente" : sub.status === "approved" ? "Approuvé" : "Rejeté"}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                  <AdminSubmissionStatus id={sub.id} status={sub.status} />
                  <AdminDeleteButton id={sub.id} table="submissions" />
                </div>
              </div>

              {/* Infos */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <div>
                  <p style={{ color: "#444", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Organisateur</p>
                  <p style={{ color: "#aaa", fontSize: "0.85rem", marginTop: "2px" }}>{sub.organizer_name}</p>
                </div>
                <div>
                  <p style={{ color: "#444", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</p>
                  <p style={{ color: "#aaa", fontSize: "0.85rem", marginTop: "2px" }}>{formatDateShort(sub.event_date)}</p>
                </div>
                <div>
                  <p style={{ color: "#444", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Lieu</p>
                  <p style={{ color: "#aaa", fontSize: "0.85rem", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub.event_location}</p>
                </div>
                <div>
                  <p style={{ color: "#444", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Contact</p>
                  <a href={`tel:${sub.contact_phone}`} style={{ color: "#a78bfa", fontSize: "0.85rem", marginTop: "2px", display: "block", textDecoration: "none" }}>
                    {sub.contact_phone}
                  </a>
                </div>
              </div>

              {/* Description */}
              {sub.description && (
                <p style={{ color: "#444", fontSize: "12px", marginTop: "0.75rem", lineHeight: 1.5,
                  overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>
                  {sub.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}