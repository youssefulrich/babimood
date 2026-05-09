import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 200,
      background: "#080808",
      display: "flex",
      overflow: "hidden",
    }}>
      {/* Sidebar desktop uniquement */}
      <AdminSidebar />

      {/* Contenu scrollable */}
      <div style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        /* Sur mobile, on compense la topbar fixe de 52px */
        paddingTop: "52px",
      }}
      className="md:pt-0"
      >
        <div style={{ padding: "1.25rem", width: "100%", boxSizing: "border-box" }}>
          {children}
        </div>
      </div>
    </div>
  );
}