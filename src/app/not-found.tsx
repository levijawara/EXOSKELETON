import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        The page you’re looking for doesn’t exist.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-50"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

