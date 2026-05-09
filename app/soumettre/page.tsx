"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SoumettreEventPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    organizer_name: "",
    event_name: "",
    event_date: "",
    event_location: "",
    description: "",
    contact_phone: "",
    contact_email: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = createClient();
      const { error: sbError } = await supabase.from("submissions").insert([
        {
          ...form,
          status: "pending",
        },
      ]);

      if (sbError) throw sbError;
      setSuccess(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Une erreur est survenue.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-600/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h1 className="font-display font-extrabold text-3xl text-white mb-4">
            Demande envoyée !
          </h1>
          <p className="text-gray-400 mb-8">
            Merci ! On va examiner ton événement et on te recontacte très vite.
          </p>
          <a href="/" className="btn-primary">
            Retour à l&apos;accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-10">
          <p className="text-violet-400 text-xs font-medium uppercase tracking-widest mb-2">
            Tu organises un event ?
          </p>
          <h1 className="section-title mb-4">Soumettre un événement</h1>
          <p className="text-gray-400">
            Remplis ce formulaire et on ajoutera ton événement sur BabiMood.
            On te recontacte dans les 24h.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-dark p-6 md:p-8 space-y-6">
          {/* Organisateur */}
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">
              Ton nom / Organisateur *
            </label>
            <input
              type="text"
              name="organizer_name"
              value={form.organizer_name}
              onChange={handleChange}
              required
              placeholder="Ex: DJ Koko, NightAbi Events..."
              className="input-dark"
            />
          </div>

          {/* Nom événement */}
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">
              Nom de l&apos;événement *
            </label>
            <input
              type="text"
              name="event_name"
              value={form.event_name}
              onChange={handleChange}
              required
              placeholder="Ex: Vendredi Noir Vol.3"
              className="input-dark"
            />
          </div>

          {/* Date + Lieu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 font-medium mb-2">
                Date de l&apos;événement *
              </label>
              <input
                type="date"
                name="event_date"
                value={form.event_date}
                onChange={handleChange}
                required
                className="input-dark"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 font-medium mb-2">
                Lieu *
              </label>
              <input
                type="text"
                name="event_location"
                value={form.event_location}
                onChange={handleChange}
                required
                placeholder="Ex: Cocody, La Coupole..."
                className="input-dark"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-300 font-medium mb-2">
              Description de l&apos;événement *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Décris l'ambiance, les artistes, le programme..."
              className="textarea-dark"
            />
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300 font-medium mb-2">
                Numéro WhatsApp *
              </label>
              <input
                type="tel"
                name="contact_phone"
                value={form.contact_phone}
                onChange={handleChange}
                required
                placeholder="+225 07 XX XX XX XX"
                className="input-dark"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 font-medium mb-2">
                Email (optionnel)
              </label>
              <input
                type="email"
                name="contact_email"
                value={form.contact_email}
                onChange={handleChange}
                placeholder="contact@exemple.com"
                className="input-dark"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              "Envoi en cours..."
            ) : (
              <>
                <Send size={16} />
                Envoyer ma demande
              </>
            )}
          </button>

          <p className="text-gray-600 text-xs text-center">
            On te recontacte dans les 24h sur WhatsApp ou par email.
          </p>
        </form>
      </div>
    </div>
  );
}
