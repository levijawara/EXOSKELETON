import { PackPage } from "@/app/(packs)/packs/_components/PackPage";
import { getPackConfig } from "@/lib/flags/packs";

export default function B2bPackPage() {
  const packs = getPackConfig();
  return (
    <PackPage title="B2B orgs/teams pack" enabled={packs.b2b} enableEnvVar="NEXT_PUBLIC_PACK_B2B">
      <ul className="list-inside list-disc space-y-1">
        <li>Organizations + membership</li>
        <li>Invites + onboarding</li>
        <li>Per-org roles/permissions</li>
        <li>Audit logs for sensitive actions</li>
      </ul>
    </PackPage>
  );
}

