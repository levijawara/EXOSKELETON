import Link from "next/link";

import { InlineAlert } from "@/components/ui/InlineAlert";

export function PackPage({
  title,
  enabled,
  enableEnvVar,
  children,
}: {
  title: string;
  enabled: boolean;
  enableEnvVar: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          {title}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Pack status: <span className="font-medium">{enabled ? "enabled" : "disabled"}</span>
        </p>
      </div>

      {!enabled ? (
        <InlineAlert variant="warning">
          This pack is disabled. Enable it with <code>{enableEnvVar}=true</code> and restart dev server.
        </InlineAlert>
      ) : null}

      <div className="text-sm text-zinc-700 dark:text-zinc-300">{children}</div>

      <div className="text-sm">
        <Link href="/packs" className="font-medium text-zinc-950 hover:underline dark:text-zinc-50">
          Back to packs
        </Link>
      </div>
    </div>
  );
}

