"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Save, Upload, X, RefreshCw } from "lucide-react";
import Link from "next/link";
import { EventCategory } from "@/types";
import { categoryLabels } from "@/lib/utils";
import { recurrenceOptions } from "@/lib/recurrence";

const categories = Object.entries(categoryLabels) as [EventCategory, string][];

interface EventFormData {
  title: string;
  description: string;
  image_url: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  whatsapp_link: string;
  ticket_link: string;
  price: string;
  is_featured: boolean;
  is_published: boolean;
  is_recurring: boolean;
  recurrence_rule: string;
}

interface AdminEventFormProps {
  initialData?: Partial<EventFormData> & { id?: string };
}

export default function AdminEventForm({ initialData }: AdminEventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image_url ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [form, setForm] = useState<EventFormData>({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    image_url: initialData?.image_url ?? "",
    date: initialData?.date ?? "",
    time: initialData?.time ?? "",
    location: initialData?.location ?? "",
    category: initialData?.category ?? "nightclub",
    whatsapp_link: initialData?.whatsapp_link ?? "",
    ticket_link: initialData?.ticket_link ?? "",
    price: initialData?.price ?? "",
    is_featured: initialData?.is_featured ?? false,
    is_published: initialData?.is_published ?? true,
    is_recurring: initialData?.is_recurring ?? false,
    recurrence_rule: initialData?.recurrence_rule ?? "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handleRemoveImage() {
    setImagePreview("");
    setImageFile(null);
    setForm((prev) => ({ ...prev, image_url: "" }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    let image_url = form.image_url;

    // Upload image si fichier sélectionné
    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("events")
        .upload(fileName, imageFile, { upsert: true });

      if (uploadError) {
        setError("Erreur upload image : " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage.from("events").getPublicUrl(fileName);
      image_url = data.publicUrl;
    }

    const payload = {
      ...form,
      image_url,
      price: form.price ? parseInt(form.price) : null,
      recurrence_rule: form.is_recurring ? form.recurrence_rule || null : null,
    };

    let err;
    if (initialData?.id) {
      ({ error: err } = await supabase.from("events").update(payload).eq("id", initialData.id));
    } else {
      ({ error: err } = await supabase.from("events").insert([payload]));
    }

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      router.push("/admin/events");
      router.refresh();
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <Link href="/admin/events" style={{ color: "#888", lineHeight: 0, textDecoration: "none" }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.4rem", color: "#fff" }}>
          {initialData?.id ? "Modifier l'événement" : "Nouvel événement"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "600px", width: "100%" }}>

        {/* Titre */}
        <div>
          <label style={labelStyle}>Titre *</label>
          <input name="title" value={form.title} onChange={handleChange} required className="input-dark" placeholder="Ex: Luxury Friday" />
        </div>

        {/* Description */}
        <div>
          <label style={labelStyle}>Description *</label>
          <textarea name="description" value={form.description} onChange={handleChange} required rows={4} className="textarea-dark" placeholder="Décris l'événement..." />
        </div>

        {/* Upload Image */}
        <div>
          <label style={labelStyle}>Image / Flyer *</label>
          {imagePreview ? (
            <div style={{ position: "relative", width: "100%", borderRadius: "0.875rem", overflow: "hidden", background: "#000" }}>
              <img src={imagePreview} alt="preview" style={{ width: "100%", height: "auto", display: "block", maxHeight: "300px", objectFit: "contain" }} />
              <button
                type="button"
                onClick={handleRemoveImage}
                style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(0,0,0,0.7)", border: "none", borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", cursor: "pointer" }}
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "120px", border: "2px dashed rgba(255,255,255,0.1)", borderRadius: "0.875rem", cursor: "pointer", transition: "border-color 0.2s", background: "rgba(255,255,255,0.02)" }}>
              <Upload size={22} style={{ color: "#555", marginBottom: "8px" }} />
              <span style={{ fontSize: "13px", color: "#666" }}>Clique pour choisir un flyer</span>
              <span style={{ fontSize: "11px", color: "#444", marginTop: "4px" }}>JPG, PNG, WEBP</span>
              <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
            </label>
          )}
        </div>

        {/* ── RÉCURRENCE ── */}
        <div style={{ background: "#111", border: "1px solid rgba(139,92,246,0.25)", borderRadius: "0.875rem", padding: "1rem" }}>
          {/* Toggle récurrence */}
          <label style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer", marginBottom: form.is_recurring ? "1rem" : "0" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <input type="checkbox" name="is_recurring" checked={form.is_recurring} onChange={handleChange} style={{ display: "none" }} />
              <div
                onClick={() => setForm(p => ({ ...p, is_recurring: !p.is_recurring }))}
                style={{ width: "40px", height: "22px", background: form.is_recurring ? "#7c3aed" : "#2a2a2a", borderRadius: "9999px", transition: "background 0.2s", cursor: "pointer", position: "relative" }}
              >
                <div style={{ position: "absolute", top: "3px", left: form.is_recurring ? "21px" : "3px", width: "16px", height: "16px", background: "white", borderRadius: "50%", transition: "left 0.2s" }} />
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <RefreshCw size={13} style={{ color: "#a78bfa" }} />
                <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>Événement récurrent</span>
              </div>
              <p style={{ color: "#555", fontSize: "11px", marginTop: "2px" }}>Tous les samedis, chaque premier vendredi...</p>
            </div>
          </label>

          {/* Fréquence */}
          {form.is_recurring && (
            <div>
              <label style={labelStyle}>Fréquence *</label>
              <select name="recurrence_rule" value={form.recurrence_rule} onChange={handleChange} className="input-dark">
                <option value="">-- Choisir une fréquence --</option>
                {recurrenceOptions.map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Date & Heure */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div>
            <label style={labelStyle}>{form.is_recurring ? "Date de début" : "Date *"}</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} required={!form.is_recurring} className="input-dark" />
          </div>
          <div>
            <label style={labelStyle}>Heure</label>
            <input type="time" name="time" value={form.time} onChange={handleChange} className="input-dark" />
          </div>
        </div>

        {/* Lieu & Catégorie */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div>
            <label style={labelStyle}>Lieu *</label>
            <input name="location" value={form.location} onChange={handleChange} required className="input-dark" placeholder="Ex: Red Bar, Cocody..." />
          </div>
          <div>
            <label style={labelStyle}>Catégorie *</label>
            <select name="category" value={form.category} onChange={handleChange} className="input-dark">
              {categories.map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* WhatsApp & Prix */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <div>
            <label style={labelStyle}>Lien WhatsApp</label>
            <input name="whatsapp_link" value={form.whatsapp_link} onChange={handleChange} className="input-dark" placeholder="https://wa.me/225..." />
          </div>
          <div>
            <label style={labelStyle}>Prix (FCFA)</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} className="input-dark" placeholder="0 = Gratuit" />
          </div>
        </div>

        {/* Toggles Publié / Featured */}
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          {[
            { name: "is_published", label: "Publié" },
            { name: "is_featured", label: "Mis en avant ✦" },
          ].map(({ name, label }) => {
            const checked = form[name as keyof EventFormData] as boolean;
            return (
              <label key={name} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <div
                  onClick={() => setForm(p => ({ ...p, [name]: !p[name as keyof EventFormData] }))}
                  style={{ width: "40px", height: "22px", background: checked ? "#7c3aed" : "#2a2a2a", borderRadius: "9999px", transition: "background 0.2s", cursor: "pointer", position: "relative", flexShrink: 0 }}
                >
                  <div style={{ position: "absolute", top: "3px", left: checked ? "21px" : "3px", width: "16px", height: "16px", background: "white", borderRadius: "50%", transition: "left 0.2s" }} />
                </div>
                <span style={{ fontSize: "0.875rem", color: "#ccc" }}>{label}</span>
              </label>
            );
          })}
        </div>

        {/* Erreur */}
        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "0.75rem", padding: "0.875rem" }}>
            <p style={{ color: "#f87171", fontSize: "0.875rem" }}>{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            background: loading ? "#444" : "linear-gradient(135deg, #7c3aed, #6d28d9)",
            color: "white", fontWeight: 600, padding: "1rem",
            borderRadius: "9999px", fontSize: "0.95rem", border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading ? "none" : "0 0 20px rgba(124,58,237,0.3)",
            transition: "all 0.2s",
          }}
        >
          <Save size={16} />
          {loading ? "Enregistrement..." : "Enregistrer l'événement"}
        </button>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  color: "#aaa",
  fontWeight: 500,
  marginBottom: "6px",
};