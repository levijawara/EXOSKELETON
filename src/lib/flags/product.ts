export type ProductMode =
  | "utility"
  | "saas"
  | "community"
  | "marketplace"
  | "internal";

export type ProductProfile = {
  mode: ProductMode;
  authEnabled: boolean;
  adminEnabled: boolean;
  billingEnabled: boolean;
  ugcEnabled: boolean;
  /** Suggested pack env vars for docs / onboarding (not applied automatically). */
  suggestedPacks: {
    billing: boolean;
    ugc: boolean;
    b2b: boolean;
    files: boolean;
    ai: boolean;
  };
};

const MODES: ProductMode[] = [
  "utility",
  "saas",
  "community",
  "marketplace",
  "internal",
];

function envBool(name: string): boolean {
  const raw = process.env[name];
  if (raw == null) return false;
  return ["1", "true", "yes", "on"].includes(raw.toLowerCase());
}

function resolveMode(): ProductMode {
  const raw = process.env.NEXT_PUBLIC_PRODUCT_MODE?.trim().toLowerCase();
  if (raw && MODES.includes(raw as ProductMode)) {
    return raw as ProductMode;
  }

  // Legacy: SKIP_AUTH=true implies utility when mode is unset.
  if (envBool("SKIP_AUTH")) {
    return "utility";
  }

  return "saas";
}

function profileForMode(mode: ProductMode): ProductProfile {
  switch (mode) {
    case "utility":
      return {
        mode,
        authEnabled: false,
        adminEnabled: false,
        billingEnabled: false,
        ugcEnabled: false,
        suggestedPacks: {
          billing: false,
          ugc: false,
          b2b: false,
          files: false,
          ai: false,
        },
      };
    case "saas":
      return {
        mode,
        authEnabled: true,
        adminEnabled: true,
        billingEnabled: false,
        ugcEnabled: false,
        suggestedPacks: {
          billing: false,
          ugc: false,
          b2b: false,
          files: false,
          ai: false,
        },
      };
    case "community":
      return {
        mode,
        authEnabled: true,
        adminEnabled: true,
        billingEnabled: false,
        ugcEnabled: true,
        suggestedPacks: {
          billing: false,
          ugc: true,
          b2b: false,
          files: true,
          ai: false,
        },
      };
    case "marketplace":
      return {
        mode,
        authEnabled: true,
        adminEnabled: true,
        billingEnabled: true,
        ugcEnabled: false,
        suggestedPacks: {
          billing: true,
          ugc: false,
          b2b: false,
          files: true,
          ai: false,
        },
      };
    case "internal":
      return {
        mode,
        authEnabled: true,
        adminEnabled: true,
        billingEnabled: false,
        ugcEnabled: false,
        suggestedPacks: {
          billing: false,
          ugc: false,
          b2b: false,
          files: false,
          ai: false,
        },
      };
  }
}

export function getProductProfile(): ProductProfile {
  return profileForMode(resolveMode());
}
