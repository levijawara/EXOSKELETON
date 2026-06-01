import Link from "next/link";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b border-zinc-200 bg-white/70 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/50">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-semibold tracking-tight text-zinc-950 dark:text-zinc-50"
          >
            EXOSKELETON
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/legal/privacy"
              className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              Terms
            </Link>
            <Link
              href="/auth/sign-in"
              className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              Sign in
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col">{children}</main>

      <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-5xl px-6 py-8 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/legal/privacy" className="hover:text-zinc-950 dark:hover:text-zinc-50">
              Privacy
            </Link>
            <Link href="/legal/cookies" className="hover:text-zinc-950 dark:hover:text-zinc-50">
              Cookies
            </Link>
            <Link href="/legal/terms" className="hover:text-zinc-950 dark:hover:text-zinc-50">
              Terms
            </Link>
            <Link href="/legal/disclaimer" className="hover:text-zinc-950 dark:hover:text-zinc-50">
              Disclaimer
            </Link>
            <Link href="/contact" className="hover:text-zinc-950 dark:hover:text-zinc-50">
              Contact
            </Link>
          </div>
          <div className="mt-4 text-xs">
            © {new Date().getFullYear()} EXOSKELETON. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

