import { PackPage } from "@/app/(packs)/packs/_components/PackPage";
import { getPackConfig } from "@/lib/flags/packs";

export default function UgcPackPage() {
  const packs = getPackConfig();
  return (
    <PackPage title="UGC + moderation pack" enabled={packs.ugc} enableEnvVar="NEXT_PUBLIC_PACK_UGC">
      <ul className="list-inside list-disc space-y-1">
        <li>Content tables (posts/comments/uploads)</li>
        <li>Report/abuse flow</li>
        <li>Moderation queue + decision history</li>
        <li>Appeals/dispute workflow</li>
      </ul>
    </PackPage>
  );
}

