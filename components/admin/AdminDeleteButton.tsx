"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface AdminDeleteButtonProps {
  id: string;
  table: "events" | "spots" | "submissions";
}

export default function AdminDeleteButton({ id, table }: AdminDeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const supabase = createClient();
    await supabase.from(table).delete().eq("id", id);
    router.refresh();
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          className="text-xs bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-500 transition-colors"
        >
          Confirmer
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-gray-400 px-2 py-1 rounded-lg hover:text-white transition-colors"
        >
          Non
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
    >
      <Trash2 size={14} />
    </button>
  );
}
