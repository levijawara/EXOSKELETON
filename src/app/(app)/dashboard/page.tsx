import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          This is the authenticated app area.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What this shell gives you</CardTitle>
          <CardDescription>
            A place to plug in your future “weird goblin idea” without rebuilding the boring foundations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
            <li>Auth + roles</li>
            <li>Legal + consent</li>
            <li>Admin + audit logs</li>
            <li>Privacy requests</li>
            <li>Testing + CI scripts</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

