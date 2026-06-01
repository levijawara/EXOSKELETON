import { ProductModeBanner } from "@/components/ProductModeBanner";
import { getProductProfile } from "@/lib/flags/product";

export default function Home() {
  const profile = getProductProfile();

  return (
    <>
      <ProductModeBanner />
      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-16">
        <div className="space-y-4">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Operational App Shell
            {profile.mode !== "saas" ? (
              <span className="ml-2 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {profile.mode}
              </span>
            ) : null}
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Build the bureaucracy once.
          </h1>
          <p className="max-w-2xl text-pretty text-base leading-7 text-zinc-700 dark:text-zinc-300">
            {profile.authEnabled
              ? "This repo is a modular Next.js + Supabase starter that bakes in the boring essentials (auth, legal, consent, admin, audit logs, privacy requests, tests) so new ideas can ship without foundational sludge."
              : "Utility mode: build stateless tools without sign-in. Auth routes remain in the repo but are hidden and ungated—use public routes under / for your tool."}
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {profile.authEnabled ? (
            <a
              className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              href="/auth/sign-in"
            >
              <div className="font-medium text-zinc-950 dark:text-zinc-50">
                Auth
              </div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Sign in / sign up / reset password
              </div>
            </a>
          ) : null}

          {profile.authEnabled ? (
            <a
              className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              href="/dashboard"
            >
              <div className="font-medium text-zinc-950 dark:text-zinc-50">
                App
              </div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Dashboard + settings (requires auth)
              </div>
            </a>
          ) : null}

          {profile.adminEnabled ? (
            <a
              className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
              href="/admin"
            >
              <div className="font-medium text-zinc-950 dark:text-zinc-50">
                Admin
              </div>
              <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Role-gated admin console + audit logs
              </div>
            </a>
          ) : null}

          <a
            className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
            href="/legal/privacy"
          >
            <div className="font-medium text-zinc-950 dark:text-zinc-50">
              Legal
            </div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Terms, privacy, cookies, disclaimer, contact
            </div>
          </a>

          <a
            className="rounded-xl border border-zinc-200 bg-white p-4 transition hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-900"
            href="/packs"
          >
            <div className="font-medium text-zinc-950 dark:text-zinc-50">
              Packs
            </div>
            <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Optional modules (billing, UGC, files, AI)
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
