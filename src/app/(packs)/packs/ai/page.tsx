import { PackPage } from "@/app/(packs)/packs/_components/PackPage";
import { getPackConfig } from "@/lib/flags/packs";

export default function AiPackPage() {
  const packs = getPackConfig();
  return (
    <PackPage title="AI pack" enabled={packs.ai} enableEnvVar="NEXT_PUBLIC_PACK_AI">
      <ul className="list-inside list-disc space-y-1">
        <li>Provider wrapper (swap OpenAI/Anthropic/etc.)</li>
        <li>Prompt + data handling rules</li>
        <li>Cost tracking hooks</li>
        <li>Fallback behavior when models fail</li>
      </ul>
    </PackPage>
  );
}

