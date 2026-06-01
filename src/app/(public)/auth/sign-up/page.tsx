"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { InlineAlert } from "@/components/ui/InlineAlert";
import { Input } from "@/components/ui/Input";
import { AuthCard } from "@/app/(public)/auth/_components/AuthCard";
import { createSupabaseBrowserClient } from "@/lib/auth/supabase";

export default function SignUpPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    setBusy(false);
    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    setSent(true);
    // Many Supabase configs require email confirmation; keep UX explicit.
    setTimeout(() => router.push("/auth/sign-in"), 600);
  }

  return (
    <AuthCard
      title="Create account"
      description="You may need to confirm your email depending on Supabase settings."
    >
      <form className="space-y-3" onSubmit={onSubmit}>
        {error ? <InlineAlert variant="danger">{error}</InlineAlert> : null}
        {sent ? (
          <InlineAlert variant="success">
            Account created. If email confirmation is enabled, check your inbox.
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

        <div className="space-y-1">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100" htmlFor="password">
            Password
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
          {busy ? "Creating…" : "Create account"}
        </Button>

        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="font-medium text-zinc-950 hover:underline dark:text-zinc-50"
          >
            Sign in
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}

