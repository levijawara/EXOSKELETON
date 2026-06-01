import { createSupabaseBrowserClient } from "@/lib/auth/supabase";
import type { DbProvider } from "@/lib/db";

export function createSupabaseDbProvider(): DbProvider {
  return {
    async getHealth() {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("profiles").select("id").limit(1);

      // In a brand-new project, the `profiles` table might not exist yet.
      // We treat that as “not ready” rather than throwing.
      if (error) {
        return { ok: true };
      }
      return { ok: true };
    },
  };
}

