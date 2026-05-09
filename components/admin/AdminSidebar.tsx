"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, MapPin, FileText, LogOut, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/events", label: "Événements", icon: Calendar },
  { href: "/admin/spots", label: "Spots", icon: MapPin },
  { href: "/admin/submissions", label: "Soumissions", icon: FileText },
];

function NavContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#fff" }}>
            Babi<span style={{ color: "#a78bfa" }}>Mood</span>
          </span>
          <p style={{ color: "#555", fontSize: "11px", marginTop: "4px" }}>Admin Panel</p>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#888", cursor: "pointer" }}>
            <X size={20} />
          </button>
        )}
      </div>

      <nav style={{ flex: 1, padding: "1rem" }}>
        {navLinks.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                marginBottom: "4px",
                fontSize: "0.875rem",
                fontWeight: active ? 600 : 400,
                color: active ? "#a78bfa" : "#888",
                background: active ? "rgba(139,92,246,0.1)" : "transparent",
                textDecoration: "none",
                border: active ? "1px solid rgba(139,92,246,0.2)" : "1px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              fontSize: "0.875rem",
              color: "#666",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              width: "100%",
            }}
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </form>
      </div>
    </>
  );
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── MOBILE : topbar + drawer ── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "56px",
          background: "#0a0a0a",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.25rem",
          zIndex: 300,
        }}
        className="md:hidden"
      >
        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#fff" }}>
          Babi<span style={{ color: "#a78bfa" }}>Mood</span>
        </span>
        <button
          onClick={() => setOpen(true)}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "8px",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 400, display: "flex" }}
          className="md:hidden"
        >
          <div
            onClick={() => setOpen(false)}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 10,
              width: "260px",
              background: "#0a0a0a",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <NavContent onClose={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* ── DESKTOP : sidebar fixe ── */}
      <aside
        style={{
          width: "220px",
          flexShrink: 0,
          background: "#0a0a0a",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
        className="hidden md:flex"
      >
        <NavContent />
      </aside>
    </>
  );
}