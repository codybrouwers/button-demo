import type { NextFetchEvent } from "next/server";

export function middleware(event: NextFetchEvent) {
  const { pathname } = event.request.nextUrl;
  console.log({ pathname });
}
