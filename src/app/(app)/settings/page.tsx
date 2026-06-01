import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { AccountActions } from "@/app/(app)/settings/_components/AccountActions";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Settings
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Account, privacy, notifications, and billing will live here.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Profile, email, password, MFA.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-zinc-700 dark:text-zinc-300">
          <p>
            Coming next: profile editing, password changes, and MFA settings.
          </p>
          <div className="mt-4">
            <AccountActions />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

