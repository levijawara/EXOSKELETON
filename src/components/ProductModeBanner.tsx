import { getProductProfile } from "@/lib/flags/product";

export function ProductModeBanner() {
  const profile = getProductProfile();
  if (profile.mode !== "utility") return null;

  return (
    <div
      className="border-b border-amber-200 bg-amber-50 px-4 py-2 text-center text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-100"
      role="status"
    >
      Utility mode — auth and accounts are disabled. Set{" "}
      <code className="rounded bg-amber-100 px-1 dark:bg-amber-900/60">
        NEXT_PUBLIC_PRODUCT_MODE=saas
      </code>{" "}
      for a full app.
    </div>
  );
}
