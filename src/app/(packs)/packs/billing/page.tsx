import { PackPage } from "@/app/(packs)/packs/_components/PackPage";
import { getPackConfig } from "@/lib/flags/packs";

export default function BillingPackPage() {
  const packs = getPackConfig();
  return (
    <PackPage title="Billing pack" enabled={packs.billing} enableEnvVar="NEXT_PUBLIC_PACK_BILLING">
      <ul className="list-inside list-disc space-y-1">
        <li>Entitlements table + plan gating</li>
        <li>Stripe checkout + customer portal</li>
        <li>Webhook verification + webhook event logs</li>
        <li>Receipts/invoices views</li>
      </ul>
    </PackPage>
  );
}

