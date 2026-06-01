"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { InlineAlert } from "@/components/ui/InlineAlert";
import { Input } from "@/components/ui/Input";
import { AuthCard } from "@/app/(public)/auth/_components/AuthCard";
import { createSupabaseBrowserClient } from "@/lib/auth/supabase";

function SignInInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(() => searchParams.get("next") ?? "/dashboard", [searchParams]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setBusy(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push(nextPath);
    router.refresh();
  }

  return (
    <AuthCard
      title="Sign in"
      description="Use email + password (OAuth and magic links are easy additions later)."
    >
      <form className="space-y-3" onSubmit={onSubmit}>
        {error ? <InlineAlert variant="danger">{error}</InlineAlert> : null}

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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <Link
            href="/auth/reset-password"
            className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            Forgot password?
          </Link>
          <Link
            href="/auth/sign-up"
            className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
          >
            Create account
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <AuthCard title="Sign in">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">Loading…</div>
        </AuthCard>
      }
    >
      <SignInInner />
    </Suspense>
  );
}

