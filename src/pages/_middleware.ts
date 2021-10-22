import { NextFetchEvent, NextResponse } from "next/server";

export function middleware(event: NextFetchEvent) {
  return event.respondWith(NextResponse.rewrite("https://www.google.com"));
}
