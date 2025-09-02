import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const userCookie = req.cookies.get("user")?.value;
    const user = userCookie ? JSON.parse(userCookie) : null;

    const { pathname } = req.nextUrl;

    const protectedRoutes = ["/", "/articles", "/admin"];

    if (protectedRoutes.some((route) => pathname === route || pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/admin") && user?.role !== "Admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/articles/:path*", "/admin/:path*"],
};
