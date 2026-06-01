import { PackPage } from "@/app/(packs)/packs/_components/PackPage";
import { getPackConfig } from "@/lib/flags/packs";

export default function FilesPackPage() {
  const packs = getPackConfig();
  return (
    <PackPage title="Files pack" enabled={packs.files} enableEnvVar="NEXT_PUBLIC_PACK_FILES">
      <ul className="list-inside list-disc space-y-1">
        <li>Supabase Storage buckets</li>
        <li>Signed upload/download URLs</li>
        <li>Type/size validation</li>
        <li>Deletion + retention rules</li>
      </ul>
    </PackPage>
  );
}

