"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

interface AdminSubmissionStatusProps {
  id: string;
  status: string;
}

export default function AdminSubmissionStatus({ id, status }: AdminSubmissionStatusProps) {
  const [current, setCurrent] = useState(status);
  const router = useRouter();

  async function update(newStatus: string) {
    const supabase = createClient();
    await supabase.from("submissions").update({ status: newStatus }).eq("id", id);
    setCurrent(newStatus);
    router.refresh();
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => update("approved")}
        className={`p-2 rounded-lg transition-colors ${current === "approved" ? "text-green-400 bg-green-400/20" : "text-gray-600 hover:text-green-400 hover:bg-green-400/10"}`}
        title="Approuver"
      >
        <CheckCircle size={16} />
      </button>
      <button
        onClick={() => update("rejected")}
        className={`p-2 rounded-lg transition-colors ${current === "rejected" ? "text-red-400 bg-red-400/20" : "text-gray-600 hover:text-red-400 hover:bg-red-400/10"}`}
        title="Rejeter"
      >
        <XCircle size={16} />
      </button>
    </div>
  );
}
