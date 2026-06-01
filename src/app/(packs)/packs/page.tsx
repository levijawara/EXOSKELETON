import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { getPackConfig } from "@/lib/flags/packs";

export default function PacksIndexPage() {
  const packs = getPackConfig();
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Packs
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Optional modules mounted behind feature flags.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <PackCard
          title="Billing"
          href="/packs/billing"
          enabled={packs.billing}
          description="Stripe entitlements, webhook verification, receipts/invoices."
        />
        <PackCard
          title="UGC + moderation"
          href="/packs/ugc"
          enabled={packs.ugc}
          description="Content models, report/abuse, mod queue, takedown logs, appeals."
        />
        <PackCard
          title="B2B orgs/teams"
          href="/packs/b2b"
          enabled={packs.b2b}
          description="Orgs, invites, per-org roles, expanded audit logging."
        />
        <PackCard
          title="Files"
          href="/packs/files"
          enabled={packs.files}
          description="Storage buckets, signed URLs, type/size validation."
        />
        <PackCard
          title="AI"
          href="/packs/ai"
          enabled={packs.ai}
          description="Provider wrapper, prompt/data handling rules, cost tracking hooks."
        />
      </div>
    </div>
  );
}

function PackCard({
  title,
  description,
  href,
  enabled,
}: {
  title: string;
  description: string;
  href: string;
  enabled: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <CardTitle>{title}</CardTitle>
          <span
            className={[
              "rounded-full px-2 py-1 text-xs font-medium",
              enabled
                ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
                : "bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200",
            ].join(" ")}
          >
            {enabled ? "Enabled" : "Disabled"}
          </span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          href={href}
          className="text-sm font-medium text-zinc-950 hover:underline dark:text-zinc-50"
        >
          Open
        </Link>
      </CardContent>
    </Card>
  );
}

