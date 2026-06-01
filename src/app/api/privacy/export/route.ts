import { NextResponse } from "next/server";

import { createSupabaseRouteClient } from "@/lib/supabase/route";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { writeAuditLog } from "@/lib/observability/audit";

export async function GET() {
  const supabase = await createSupabaseRouteClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const admin = createSupabaseAdminClient();
  const userId = auth.user.id;

  const [profile, consents, tickets, requests] = await Promise.all([
    admin.from("profiles").select("*").eq("id", userId).maybeSingle(),
    admin.from("consents").select("*").eq("user_id", userId),
    admin.from("support_tickets").select("*").eq("user_id", userId),
    admin.from("privacy_requests").select("*").eq("user_id", userId),
  ]);

  const payload = {
    generated_at: new Date().toISOString(),
    user: {
      id: userId,
      email: auth.user.email ?? null,
    },
    profile: profile.data ?? null,
    consents: consents.data ?? [],
    support_tickets: tickets.data ?? [],
    privacy_requests: requests.data ?? [],
  };

  // Track export as a privacy request (fulfilled immediately).
  const { data: pr } = await admin
    .from("privacy_requests")
    .insert({
      user_id: userId,
      type: "export",
      status: "fulfilled",
      fulfilled_at: new Date().toISOString(),
    })
    .select("id")
    .single();

  await writeAuditLog({
    actorUserId: userId,
    action: "privacy.request_fulfilled",
    targetUserId: userId,
    metadata: { type: "export", privacy_request_id: pr?.id ?? null },
  });

  return new NextResponse(JSON.stringify(payload, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="data-export-${userId}.json"`,
    },
  });
}

