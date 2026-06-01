import { NextResponse } from "next/server";

import { createSupabaseRouteClient } from "@/lib/supabase/route";
import { writeAuditLog } from "@/lib/observability/audit";

export async function POST(req: Request) {
  const supabase = await createSupabaseRouteClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | { type?: "export" | "delete" }
    | null;
  const type = body?.type;
  if (type !== "export" && type !== "delete") {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("privacy_requests")
    .insert({ user_id: auth.user.id, type })
    .select("id,type,status,requested_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  await writeAuditLog({
    actorUserId: auth.user.id,
    action: "privacy.request_created",
    targetUserId: auth.user.id,
    metadata: { type },
  });

  return NextResponse.json({ request: data });
}

