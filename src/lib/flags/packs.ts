export type PackId = "billing" | "ugc" | "b2b" | "files" | "ai";

export type PackConfig = Record<PackId, boolean>;

function envBool(name: string, defaultValue = false) {
  const raw = process.env[name];
  if (raw == null) return defaultValue;
  return ["1", "true", "yes", "on"].includes(raw.toLowerCase());
}

export function getPackConfig(): PackConfig {
  return {
    billing: envBool("NEXT_PUBLIC_PACK_BILLING", false),
    ugc: envBool("NEXT_PUBLIC_PACK_UGC", false),
    b2b: envBool("NEXT_PUBLIC_PACK_B2B", false),
    files: envBool("NEXT_PUBLIC_PACK_FILES", false),
    ai: envBool("NEXT_PUBLIC_PACK_AI", false),
  };
}

