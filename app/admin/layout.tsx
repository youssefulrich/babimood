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
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#080808",
        position: "fixed",
        inset: 0,
        zIndex: 200,
        overflowY: "auto",
      }}
    >
      <AdminSidebar />
      <div
        style={{ flex: 1, overflowX: "hidden", overflowY: "auto" }}
        className="pt-14 md:pt-0"
      >
        <div style={{ padding: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
          {children}
        </div>
      </div>
    </div>
  );
}