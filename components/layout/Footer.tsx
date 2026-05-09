import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <span
              className="font-display font-extrabold text-2xl tracking-tight"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Babi<span className="text-violet-400">Mood</span>
            </span>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              La référence des sorties, événements et spots tendance à Abidjan.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-violet-400 transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-violet-400 transition-colors text-sm"
              >
                TikTok
              </a>
              <a
                href="https://wa.me/225XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-violet-400 transition-colors text-sm"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-4">
              Explorer
            </h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/events", label: "Événements" },
                { href: "/spots", label: "Top Spots" },
                { href: "/soumettre", label: "Soumettre un événement" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-gray-500 mb-4">
              Tu organises un event ?
            </h4>
            <p className="text-gray-400 text-sm mb-4">
              Soumets ton événement pour apparaître sur BabiMood.
            </p>
            <Link href="/soumettre" className="btn-primary text-xs">
              Soumettre mon event
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} BabiMood. Tous droits réservés.
          </p>
          <p className="text-gray-600 text-xs">Abidjan, Côte d'Ivoire 🇨🇮</p>
        </div>
      </div>
    </footer>
  );
}
