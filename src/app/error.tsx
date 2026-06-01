"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
        Something went wrong
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Try again, or return home.
      </p>
      <div className="mt-6 flex gap-4 text-sm">
        <button
          type="button"
          onClick={() => reset()}
          className="font-medium text-zinc-950 hover:underline dark:text-zinc-50"
        >
          Retry
        </button>
        <Link
          href="/"
          className="text-zinc-700 hover:underline dark:text-zinc-300"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

