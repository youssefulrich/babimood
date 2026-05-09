"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Link from "next/link";
import { SpotType } from "@/types";
import { spotTypeLabels } from "@/lib/utils";

const spotTypes = Object.entries(spotTypeLabels) as [SpotType, string][];

interface SpotFormData {
  name: string;
  description: string;
  vibe: string;
  location: string;
  type: SpotType;
  instagram_link: string;
  whatsapp_number: string;
  phone: string;
  opening_hours: string;
  is_featured: boolean;
  is_published: boolean;
}

interface AdminSpotFormProps {
  initialData?: Partial<SpotFormData> & { id?: string; images?: string[] };
}

export default function AdminSpotForm({ initialData }: AdminSpotFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Images : liste de { file?, preview, url }
  const [images, setImages] = useState<{ file?: File; preview: string; url: string }[]>(
    (initialData?.images ?? []).map((url) => ({ preview: url, url }))
  );

  const [form, setForm] = useState<SpotFormData>({
    name: initialData?.name ?? "",
    description: initialData?.description ?? "",
    vibe: initialData?.vibe ?? "",
    location: initialData?.location ?? "",
    type: initialData?.type ?? "nightclub",
    instagram_link: initialData?.instagram_link ?? "",
    whatsapp_number: initialData?.whatsapp_number ?? "",
    phone: initialData?.phone ?? "",
    opening_hours: initialData?.opening_hours ?? "",
    is_featured: initialData?.is_featured ?? false,
    is_published: initialData?.is_published ?? true,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  function handleAddImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      url: "",
    }));
    setImages((prev) => [...prev, ...newImages]);
    // Reset input pour permettre de re-sélectionner les mêmes fichiers
    e.target.value = "";
  }

  function handleRemoveImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const finalUrls: string[] = [];

    // Upload chaque image qui a un fichier (nouvelles images)
    for (const img of images) {
      if (img.file) {
        const ext = img.file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("spots")
          .upload(fileName, img.file, { upsert: true });

        if (uploadError) {
          setError("Erreur upload image : " + uploadError.message);
          setLoading(false);
          return;
        }

        const { data } = supabase.storage.from("spots").getPublicUrl(fileName);
        finalUrls.push(data.publicUrl);
      } else {
        // Image déjà existante (URL Supabase)
        finalUrls.push(img.url);
      }
    }

    const payload = {
      ...form,
      images: finalUrls,
    };

    let err;
    if (initialData?.id) {
      ({ error: err } = await supabase.from("spots").update(payload).eq("id", initialData.id));
    } else {
      ({ error: err } = await supabase.from("spots").insert([payload]));
    }

    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      router.push("/admin/spots");
      router.refresh();
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/spots" className="p-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-display font-bold text-2xl text-white">
          {initialData?.id ? "Modifier le spot" : "Nouveau spot"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="card-dark p-6 md:p-8 space-y-6 max-w-2xl">

        {/* Nom */}
        <div>
          <label className="block text-sm text-gray-300 font-medium mb-2">Nom du spot *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="input-dark"
            placeholder="Ex: La Coupole Rooftop"
          />
        </div>

        {/* Ambiance */}
        <div>
          <label className="block text-sm text-gray-300 font-medium mb-2">Ambiance (courte phrase) *</label>
          <input
            name="vibe"
            value={form.vibe}
            onChange={handleChange}
            className="input-dark"
            placeholder="Ex: Rooftop vue mer, musique afrobeats..."
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
            placeholder="Description complète du lieu..."
          />
        </div>

        {/* Photos upload */}
        <div>
          <label className="block text-sm text-gray-300 font-medium mb-2">
            Photos du spot
            <span className="text-gray-600 font-normal ml-2">(la première sera la photo principale)</span>
          </label>

          {/* Grille des images sélectionnées */}
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                  <img
                    src={img.preview}
                    alt={`photo ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Badge "Principal" sur la première */}
                  {i === 0 && (
                    <span className="absolute bottom-1 left-1 text-[10px] bg-violet-600 text-white px-1.5 py-0.5 rounded-md">
                      Principal
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {/* Bouton ajouter dans la grille */}
              <label className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all">
                <Upload size={18} className="text-gray-600 mb-1" />
                <span className="text-xs text-gray-600">Ajouter</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleAddImages}
                />
              </label>
            </div>
          )}

          {/* Zone upload vide */}
          {images.length === 0 && (
            <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-violet-500/50 hover:bg-violet-500/5 transition-all">
              <Upload size={24} className="text-gray-500 mb-2" />
              <span className="text-sm text-gray-400">Clique pour choisir des photos</span>
              <span className="text-xs text-gray-600 mt-1">JPG, PNG, WEBP — plusieurs fichiers acceptés</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleAddImages}
              />
            </label>
          )}
        </div>

        {/* Localisation & Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">Localisation *</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              className="input-dark"
              placeholder="Ex: Cocody, Abidjan"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">Type *</label>
            <select name="type" value={form.type} onChange={handleChange} className="input-dark">
              {spotTypes.map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Instagram & WhatsApp */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">Instagram</label>
            <input
              name="instagram_link"
              value={form.instagram_link}
              onChange={handleChange}
              className="input-dark"
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">WhatsApp</label>
            <input
              name="whatsapp_number"
              value={form.whatsapp_number}
              onChange={handleChange}
              className="input-dark"
              placeholder="+225 07..."
            />
          </div>
        </div>

        {/* Horaires */}
        <div>
          <label className="block text-sm text-gray-300 font-medium mb-2">Horaires d&apos;ouverture</label>
          <input
            name="opening_hours"
            value={form.opening_hours}
            onChange={handleChange}
            className="input-dark"
            placeholder="Ex: Ven-Sam 22h - 5h"
          />
        </div>

        {/* Toggles */}
        <div className="flex gap-6">
          {[
            { name: "is_published", label: "Publié" },
            { name: "is_featured", label: "Top Spot ✦" },
          ].map(({ name, label }) => (
            <label key={name} className="flex items-center gap-3 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  name={name}
                  checked={form[name as keyof SpotFormData] as boolean}
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
          {loading ? "Enregistrement..." : "Enregistrer le spot"}
        </button>
      </form>
    </div>
  );
}