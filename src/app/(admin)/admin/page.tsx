import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Admin console
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          User lookup, role changes, audit logs, privacy requests, and overrides.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
          <CardDescription>
            This page is protected by admin checks in middleware.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-zinc-700 dark:text-zinc-300">
          <div className="space-y-2">
            <div>Coming next: audit log feed + user lookup.</div>
            <div>
              <Link
                href="/admin/privacy-requests"
                className="font-medium text-zinc-950 hover:underline dark:text-zinc-50"
              >
                Open privacy request queue
              </Link>
            </div>
            <div>
              <Link
                href="/admin/audit-logs"
                className="font-medium text-zinc-950 hover:underline dark:text-zinc-50"
              >
                Open audit logs
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

