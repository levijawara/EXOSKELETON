export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-16">
      <div className="space-y-4">
        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          Operational App Shell
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Build the bureaucracy once.
        </h1>
        <p className="max-w-2xl text-pretty text-base leading-7 text-zinc-700 dark:text-zinc-300">
          This repo is a modular Next.js + Supabase starter that bakes in the
          boring essentials (auth, legal, consent, admin, audit logs, privacy
          requests, tests) so new ideas can ship without “foundational sludge.”
        </p>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
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
      </div>
    </div>
  );
}
