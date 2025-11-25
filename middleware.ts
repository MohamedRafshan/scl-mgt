import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Skip middleware for static files and API routes
  if (
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path === "/" ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  console.log("=== Middleware Debug ===");
  console.log("Path:", path);
  console.log("Session exists:", !!session);
  console.log("User email:", user?.email || "Not authenticated");
  console.log("=======================");

  // Get user role
  let userRole = null;
  if (user) {
    const { data: profile } = await supabase
      .from("users")
      .select("role")
      .eq("email", user.email)
      .maybeSingle();

    userRole = profile?.role;
    console.log("User role:", userRole);
  }

  // Protect admin, teacher, student routes
  const protectedPaths = ["/admin", "/teacher", "/student"];
  const isProtectedPath = protectedPaths.some((p) => path.startsWith(p));

  if (isProtectedPath && !user) {
    console.log("❌ Not authenticated - redirecting to login");
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", path);
    return NextResponse.redirect(url);
  }

  // Role-based access control
  if (user && userRole && isProtectedPath) {
    if (path.startsWith("/admin") && userRole !== "admin") {
      console.log("❌ Not admin - redirecting");
      const target = userRole === "teacher" ? "/teacher" : "/student";
      return NextResponse.redirect(new URL(target, request.url));
    }

    if (path.startsWith("/teacher") && userRole !== "teacher") {
      const target = userRole === "admin" ? "/admin" : "/student";
      return NextResponse.redirect(new URL(target, request.url));
    }

    if (path.startsWith("/student") && userRole !== "student") {
      const target = userRole === "admin" ? "/admin" : "/teacher";
      return NextResponse.redirect(new URL(target, request.url));
    }

    console.log("✅ Access granted to", path);
  }

  // Redirect logged-in users away from login
  if (path === "/login" && user && userRole) {
    const target =
      userRole === "admin" ? "/admin" : userRole === "teacher" ? "/teacher" : "/student";
    return NextResponse.redirect(new URL(target, request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
