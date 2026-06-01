"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { InlineAlert } from "@/components/ui/InlineAlert";
import { createSupabaseBrowserClient } from "@/lib/auth/supabase";

export function AccountActions() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function signOut() {
    setBusy(true);
    setError(null);
    setNotice(null);
    const supabase = createSupabaseBrowserClient();
    const { error: signOutError } = await supabase.auth.signOut();
    setBusy(false);
    if (signOutError) {
      setError(signOutError.message);
      return;
    }
    router.push("/");
    router.refresh();
  }

  async function requestDelete() {
    setBusy(true);
    setError(null);
    setNotice(null);
    const res = await fetch("/api/privacy/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "delete" }),
    });
    setBusy(false);
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(body?.error ?? "Failed to create request");
      return;
    }
    setNotice("Delete request submitted. An admin will fulfill it.");
  }

  async function exportData() {
    setBusy(true);
    setError(null);
    setNotice(null);
    try {
      // Trigger a file download by navigating to the export endpoint.
      window.location.href = "/api/privacy/export";
      setNotice("Preparing export… your download should start shortly.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      {error ? <InlineAlert variant="danger">{error}</InlineAlert> : null}
      {notice ? <InlineAlert variant="success">{notice}</InlineAlert> : null}
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={signOut} disabled={busy}>
          Sign out
        </Button>
        <Button type="button" variant="ghost" onClick={exportData} disabled={busy}>
          Export my data
        </Button>
        <Button type="button" variant="danger" onClick={requestDelete} disabled={busy}>
          Request account deletion
        </Button>
      </div>
    </div>
  );
}

