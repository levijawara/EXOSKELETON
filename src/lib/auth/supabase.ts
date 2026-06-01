import { createBrowserClient } from "@supabase/ssr";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";

import type { AuthSession, AuthUser, Role } from "@/lib/auth";
import { requireEnv } from "@/lib/supabase/env";

export function createSupabaseBrowserClient() {
  return createBrowserClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  );
}

export function createSupabaseServerClient(req: NextRequest, res: NextResponse) {
  return createServerClient(
    requireEnv("NEXT_PUBLIC_SUPABASE_URL"),
    requireEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    },
  );
}

function extractRole(user: { app_metadata?: Record<string, unknown> } | null) {
  const role = user?.app_metadata?.role;
  return role === "admin" ? ("admin" as const) : ("user" as const);
}

export async function toAuthUser(supabaseUser: {
  id: string;
  email?: string | null;
  app_metadata?: Record<string, unknown>;
}): Promise<AuthUser> {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? null,
    role: extractRole(supabaseUser),
  };
}

export async function toAuthSession(s: {
  access_token: string;
  refresh_token: string;
  expires_at?: number | null;
  user: {
    id: string;
    email?: string | null;
    app_metadata?: Record<string, unknown>;
  };
}): Promise<AuthSession> {
  return {
    accessToken: s.access_token,
    refreshToken: s.refresh_token,
    expiresAt: s.expires_at ?? null,
    user: await toAuthUser(s.user),
  };
}

export function parseAdminEmailsEnv(): Set<string> {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return new Set(
    raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isAdminEmail(email: string | null): boolean {
  if (!email) return false;
  const adminEmails = parseAdminEmailsEnv();
  if (adminEmails.size === 0) return false;
  return adminEmails.has(email.toLowerCase());
}

export function resolveRole({
  appRole,
  email,
}: {
  appRole: Role;
  email: string | null;
}): Role {
  if (appRole === "admin") return "admin";
  if (isAdminEmail(email)) return "admin";
  return "user";
}

