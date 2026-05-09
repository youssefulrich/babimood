import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AdminSpotForm from "@/components/admin/AdminSpotForm";

export default async function EditSpotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: spot } = await supabase.from("spots").select("*").eq("id", id).single();
  if (!spot) notFound();
  return <AdminSpotForm initialData={spot} />;
}
