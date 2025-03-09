import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/services/supabase/middleware";
import { checkUserRole } from "@/utils/auth";
import { LOGIN, ROOT, ADMIN_ROUTES, USER_ROUTES } from "@/lib/routes";

export async function middleware(request: NextRequest) {
  // Update the session using Supabase middleware
  await updateSession(request);

  // Perform role checking
  const { role } = await checkUserRole();
  const isAuthenticated = role !== "unidentified";

  const { pathname } = request.nextUrl;

  const isAdminRoute = ADMIN_ROUTES.some((route) => pathname.startsWith(route));
  const isUserRoute = USER_ROUTES.some((route) => pathname.startsWith(route));

  const isProtectedRoute = isAdminRoute || isUserRoute;

  if (!isAuthenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL(LOGIN, request.url));
  }

  if (isAuthenticated && isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL(ROOT, request.url));
  }

  if (isAuthenticated && isUserRoute && role !== "user" && role !== "admin") {
    return NextResponse.redirect(new URL(ROOT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/account/:path*",
    "/orders/:path*",
    "/checkout/:path*",
  ],
};
