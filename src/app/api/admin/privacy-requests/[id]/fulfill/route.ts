import { NextResponse } from "next/server";

import { createSupabaseRouteClient } from "@/lib/supabase/route";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { resolveRole, toAuthUser } from "@/lib/auth/supabase";
import { writeAuditLog } from "@/lib/observability/audit";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const supabase = await createSupabaseRouteClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const authUser = await toAuthUser(data.user);
  const role = resolveRole({ appRole: authUser.role, email: authUser.email });
  if (role !== "admin") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const admin = createSupabaseAdminClient();
  const { data: updated, error } = await admin
    .from("privacy_requests")
    .update({ status: "fulfilled", fulfilled_at: new Date().toISOString() })
    .eq("id", id)
    .select("id,user_id,type")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await writeAuditLog({
    actorUserId: authUser.id,
    action: "privacy.request_fulfilled",
    targetUserId: updated.user_id,
    metadata: { type: updated.type, privacy_request_id: updated.id },
  });

  return NextResponse.redirect(new URL("/admin/privacy-requests", req.url));
}

