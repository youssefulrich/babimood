"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface AdminToggleFeaturedProps {
  id: string;
  table: "events" | "spots";
  featured: boolean;
}

export default function AdminToggleFeatured({ id, table, featured }: AdminToggleFeaturedProps) {
  const [active, setActive] = useState(featured);
  const router = useRouter();

  async function toggle() {
    const supabase = createClient();
    const newVal = !active;
    setActive(newVal);
    await supabase.from(table).update({ is_featured: newVal }).eq("id", id);
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-lg transition-colors ${
        active
          ? "text-yellow-400 bg-yellow-400/10"
          : "text-gray-600 hover:text-yellow-400 hover:bg-yellow-400/10"
      }`}
      title={active ? "Retirer de la mise en avant" : "Mettre en avant"}
    >
      <Star size={14} />
    </button>
  );
}
