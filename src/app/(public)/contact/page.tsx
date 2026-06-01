"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { InlineAlert } from "@/components/ui/InlineAlert";
import { Input } from "@/components/ui/Input";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
          <CardDescription>
            Basic support/contact intake. Wire this to email or a ticket system.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <InlineAlert variant="success">Message queued (stub).</InlineAlert>
          ) : null}

          <form
            className="mt-4 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100" htmlFor="email">
                Email
              </label>
              <Input id="email" type="email" autoComplete="email" required />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="min-h-28 w-full resize-y rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-950 shadow-sm transition placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 focus-visible:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:placeholder:text-zinc-500"
                required
              />
            </div>

            <Button type="submit">Send</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

