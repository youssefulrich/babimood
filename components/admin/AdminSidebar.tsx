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

function SidebarLinks({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  return (
    <nav style={{ flex: 1, padding: "0.75rem" }}>
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
              gap: "10px",
              padding: "0.7rem 1rem",
              borderRadius: "0.65rem",
              marginBottom: "2px",
              fontSize: "0.9rem",
              fontWeight: active ? 600 : 400,
              color: active ? "#a78bfa" : "#777",
              background: active ? "rgba(139,92,246,0.12)" : "transparent",
              textDecoration: "none",
              border: active ? "1px solid rgba(139,92,246,0.25)" : "1px solid transparent",
            }}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ═══ MOBILE TOPBAR ═══ */}
      <div
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: "52px",
          background: "#0a0a0a",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1rem",
          zIndex: 1000,
        }}
        className="md:hidden"
      >
        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "#fff" }}>
          Babi<span style={{ color: "#a78bfa" }}>Mood</span>
        </span>
        <button
          onClick={() => setOpen(true)}
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            padding: "7px 9px",
            color: "#fff",
            cursor: "pointer",
            lineHeight: 0,
          }}
        >
          <Menu size={18} />
        </button>
      </div>

      {/* ═══ MOBILE DRAWER ═══ */}
      {open && (
        <div style={{ position: "fixed", inset: 0, zIndex: 2000 }} className="md:hidden">
          {/* backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
          />
          {/* panel */}
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, bottom: 0,
              width: "240px",
              background: "#0a0a0a",
              borderRight: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 1.25rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "#fff" }}>
                Babi<span style={{ color: "#a78bfa" }}>Mood</span>
              </span>
              <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", lineHeight: 0 }}>
                <X size={18} />
              </button>
            </div>
            <SidebarLinks onClose={() => setOpen(false)} />
            <div style={{ padding: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <form action="/api/admin/logout" method="POST">
                <button type="submit" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.7rem 1rem", borderRadius: "0.65rem", fontSize: "0.875rem", color: "#555", background: "transparent", border: "none", cursor: "pointer", width: "100%" }}>
                  <LogOut size={15} /> Déconnexion
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ═══ DESKTOP SIDEBAR ═══ */}
      <aside
        style={{
          width: "210px",
          minWidth: "210px",
          background: "#0a0a0a",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: "sticky",
          top: 0,
          flexShrink: 0,
        }}
        className="hidden md:flex"
      >
        <div style={{ padding: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#fff" }}>
            Babi<span style={{ color: "#a78bfa" }}>Mood</span>
          </span>
          <p style={{ color: "#444", fontSize: "11px", marginTop: "3px" }}>Admin Panel</p>
        </div>
        <SidebarLinks />
        <div style={{ padding: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "0.7rem 1rem", borderRadius: "0.65rem", fontSize: "0.875rem", color: "#555", background: "transparent", border: "none", cursor: "pointer", width: "100%" }}>
              <LogOut size={15} /> Déconnexion
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}