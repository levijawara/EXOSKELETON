import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export default async function AdminAuditLogsPage() {
  let error: string | null = null;
  let rows:
    | Array<{
        id: string;
        actor_user_id: string | null;
        action: string;
        target_user_id: string | null;
        created_at: string;
      }>
    | null = null;

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error: qError } = await supabase
      .from("audit_logs")
      .select("id,actor_user_id,action,target_user_id,created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (qError) error = qError.message;
    rows = data ?? [];
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Audit logs
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          A minimal “why did this happen?” view for admin actions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent events</CardTitle>
          <CardDescription>Latest 100 events.</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          ) : null}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-zinc-500">
                <tr>
                  <th className="py-2 pr-4">When</th>
                  <th className="py-2 pr-4">Action</th>
                  <th className="py-2 pr-4">Actor</th>
                  <th className="py-2 pr-4">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {(rows ?? []).map((r) => (
                  <tr key={r.id}>
                    <td className="py-2 pr-4">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                    <td className="py-2 pr-4">{r.action}</td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      {r.actor_user_id ?? "—"}
                    </td>
                    <td className="py-2 pr-4 font-mono text-xs">
                      {r.target_user_id ?? "—"}
                    </td>
                  </tr>
                ))}
                {rows && rows.length === 0 ? (
                  <tr>
                    <td
                      className="py-4 text-sm text-zinc-600 dark:text-zinc-400"
                      colSpan={4}
                    >
                      No events yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

