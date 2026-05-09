import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import AdminEventForm from "@/components/admin/AdminEventForm";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event } = await supabase.from("events").select("*").eq("id", id).single();

  if (!event) notFound();

  return <AdminEventForm initialData={{ ...event, price: event.price?.toString() }} />;
}
