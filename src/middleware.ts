import { NextResponse, type NextRequest } from "next/server";

import {
  createSupabaseServerClient,
  resolveRole,
  toAuthUser,
} from "@/lib/auth/supabase";

function addSecurityHeaders(res: NextResponse) {
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  res.headers.set("Cross-Origin-Opener-Policy", "same-origin");

  // Note: Add/iterate CSP once you know all external origins you need.
  // Setting an overly strict CSP too early can break auth redirects and assets.
  return res;
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  addSecurityHeaders(res);
  res.headers.set("X-Request-Id", crypto.randomUUID());

  if (process.env.SKIP_AUTH === "true") {
    return res;
  }

  const pathname = req.nextUrl.pathname;
  const isAppRoute =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/settings" ||
    pathname.startsWith("/settings/");
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAppRoute || isAdminRoute) {
    // Fast path: if there is clearly no auth cookie, avoid the Supabase network roundtrip.
    const hasAuthCookie = req.cookies
      .getAll()
      .some((c) => c.name.startsWith("sb-") || c.name.includes("supabase"));

    if (!hasAuthCookie) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/sign-in";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    // Create a Supabase client tied to the request/response cookie jar.
    const supabase = createSupabaseServerClient(req, res);
    const { data } = await supabase.auth.getUser();
    const user = data.user ? await toAuthUser(data.user) : null;

    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/sign-in";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    if (isAdminRoute) {
      const role = resolveRole({ appRole: user.role, email: user.email });
      if (role !== "admin") {
        const url = req.nextUrl.clone();
        url.pathname = "/403";
        url.search = "";
        return NextResponse.redirect(url);
      }
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

