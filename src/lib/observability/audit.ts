import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { captureException } from "@/lib/observability/errors";

export type AuditAction =
  | "admin.role_set"
  | "admin.user_suspended"
  | "admin.user_unsuspended"
  | "privacy.request_created"
  | "privacy.request_fulfilled";

export async function writeAuditLog({
  actorUserId,
  action,
  targetUserId,
  metadata,
}: {
  actorUserId: string | null;
  action: AuditAction;
  targetUserId?: string | null;
  metadata?: Record<string, unknown>;
}) {
  try {
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase.from("audit_logs").insert({
      actor_user_id: actorUserId,
      action,
      target_user_id: targetUserId ?? null,
      metadata: metadata ?? {},
    });

    if (error) {
      captureException(error, { action });
    }
  } catch (err) {
    captureException(err, { action });
  }
}

