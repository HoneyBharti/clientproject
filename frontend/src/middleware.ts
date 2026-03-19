import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/blog" || pathname === "/blog/") {
    return NextResponse.next();
  }

  if (!pathname.startsWith("/blog/")) {
    return NextResponse.next();
  }

  if (searchParams.has("legacy")) {
    return NextResponse.next();
  }

  const slugPath = pathname.replace(/^\/blog\//, "");
  if (!slugPath) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/blog-cms/${slugPath}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/blog/:path*"],
};
