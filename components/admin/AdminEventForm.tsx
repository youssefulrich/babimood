"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Link from "next/link";
import { EventCategory } from "@/types";
import { categoryLabels } from "@/lib/utils";

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

    // Upload image si un fichier est sélectionné
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
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/events" className="p-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-display font-bold text-2xl text-white">
            {initialData?.id ? "Modifier l'événement" : "Nouvel événement"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card-dark p-6 md:p-8 space-y-6 max-w-2xl">

        {/* Titre */}
        <div>
          <label className="block text-sm text-gray-300 font-medium mb-2">Titre *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="input-dark"
            placeholder="Nom de l'événement"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-300 font-medium mb-2">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
            className="textarea-dark"
            placeholder="Description complète..."
          />
        </div>

        {/* Image upload */}
        <div>
          <label className="block text-sm text-gray-300 font-medium mb-2">Image / Flyer *</label>

          {imagePreview ? (
            <div className="relative w-full h-48 rounded-xl overflow-hidden">
              <img
                src={imagePreview}
                alt="preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white hover:bg-red-600 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all">
              <Upload size={24} className="text-gray-500 mb-2" />
              <span className="text-sm text-gray-400">Clique pour choisir une photo</span>
              <span className="text-xs text-gray-600 mt-1">JPG, PNG, WEBP</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>

        {/* Date & Heure */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">Date *</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="input-dark"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">Heure</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="input-dark"
            />
          </div>
        </div>

        {/* Lieu & Catégorie */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">Lieu *</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="input-dark"
              placeholder="Nom du lieu, quartier..."
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">Catégorie *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input-dark"
            >
              {categories.map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* WhatsApp & Prix */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">Lien WhatsApp</label>
            <input
              name="whatsapp_link"
              value={form.whatsapp_link}
              onChange={handleChange}
              className="input-dark"
              placeholder="https://wa.me/225..."
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">Prix (FCFA)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="input-dark"
              placeholder="0 = Gratuit"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-6 pt-2">
          {[
            { name: "is_published", label: "Publié" },
            { name: "is_featured", label: "Mis en avant ✦" },
          ].map(({ name, label }) => (
            <label key={name} className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name={name}
                  checked={form[name as keyof EventFormData] as boolean}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-gray-700 rounded-full peer peer-checked:bg-violet-600 transition-colors" />
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
              </div>
              <span className="text-sm text-gray-300">{label}</span>
            </label>
          ))}
        </div>

        {/* Erreur */}
        {error && (
          <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full justify-center py-4 disabled:opacity-50"
        >
          <Save size={16} />
          {loading ? "Enregistrement..." : "Enregistrer l'événement"}
        </button>
      </form>
    </div>
  );
}