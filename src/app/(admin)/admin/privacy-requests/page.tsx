import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default async function AdminPrivacyRequestsPage() {
  let error: string | null = null;
  let rows:
    | Array<{
        id: string;
        user_id: string;
        type: string;
        status: string;
        requested_at: string;
        fulfilled_at: string | null;
        notes: string | null;
      }>
    | null = null;

  try {
    const supabase = createSupabaseAdminClient();
    const { data, error: qError } = await supabase
      .from("privacy_requests")
      .select("id,user_id,type,status,requested_at,fulfilled_at,notes")
      .order("requested_at", { ascending: false })
      .limit(50);

    if (qError) error = qError.message;
    rows = data ?? [];
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Privacy requests
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          DSAR-style tracking for export/delete requests.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Queue</CardTitle>
          <CardDescription>Latest 50 requests.</CardDescription>
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
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">User</th>
                  <th className="py-2 pr-4">Requested</th>
                  <th className="py-2 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {(rows ?? []).map((r) => (
                  <tr key={r.id}>
                    <td className="py-2 pr-4">{r.type}</td>
                    <td className="py-2 pr-4">{r.status}</td>
                    <td className="py-2 pr-4 font-mono text-xs">{r.user_id}</td>
                    <td className="py-2 pr-4">{new Date(r.requested_at).toLocaleString()}</td>
                    <td className="py-2 pr-4">
                      <form action={`/api/admin/privacy-requests/${r.id}/fulfill`} method="post">
                        <Button type="submit" size="sm" variant="secondary" disabled={r.status === "fulfilled"}>
                          Mark fulfilled
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))}
                {rows && rows.length === 0 ? (
                  <tr>
                    <td className="py-4 text-sm text-zinc-600 dark:text-zinc-400" colSpan={5}>
                      No requests yet.
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

