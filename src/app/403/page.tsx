import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Forbidden
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        You don’t have access to this page.
      </p>
      <div className="mt-6 flex gap-4 text-sm">
        <Link
          href="/"
          className="font-medium text-zinc-950 hover:underline dark:text-zinc-50"
        >
          Home
        </Link>
        <Link
          href="/dashboard"
          className="text-zinc-700 hover:underline dark:text-zinc-300"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}

