"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { InlineAlert } from "@/components/ui/InlineAlert";
import { Input } from "@/components/ui/Input";
import { AuthCard } from "@/app/(public)/auth/_components/AuthCard";
import { createSupabaseBrowserClient } from "@/lib/auth/supabase";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    setBusy(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }

    setDone(true);
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 600);
  }

  return (
    <AuthCard title="Set a new password">
      <form className="space-y-3" onSubmit={onSubmit}>
        {error ? <InlineAlert variant="danger">{error}</InlineAlert> : null}
        {done ? (
          <InlineAlert variant="success">Password updated.</InlineAlert>
        ) : null}

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100" htmlFor="password">
            New password
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>

        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Updating…" : "Update password"}
        </Button>

        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          <Link
            href="/auth/sign-in"
            className="font-medium text-zinc-950 hover:underline dark:text-zinc-50"
          >
            Back to sign in
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}

