"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { InlineAlert } from "@/components/ui/InlineAlert";
import { Input } from "@/components/ui/Input";
import { AuthCard } from "@/app/(public)/auth/_components/AuthCard";
import { createSupabaseBrowserClient } from "@/lib/auth/supabase";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setSent(false);

    const supabase = createSupabaseBrowserClient();
    const origin =
      typeof window !== "undefined" ? window.location.origin : undefined;

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: origin ? `${origin}/auth/update-password` : undefined,
      },
    );

    setBusy(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSent(true);
  }

  return (
    <AuthCard
      title="Reset password"
      description="We’ll email you a link to set a new password."
    >
      <form className="space-y-3" onSubmit={onSubmit}>
        {error ? <InlineAlert variant="danger">{error}</InlineAlert> : null}
        {sent ? (
          <InlineAlert variant="success">
            If an account exists, you’ll receive a reset email shortly.
          </InlineAlert>
        ) : null}

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Sending…" : "Send reset link"}
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

