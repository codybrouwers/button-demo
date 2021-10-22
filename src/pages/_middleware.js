import { NextFetchEvent, NextResponse } from "next/server";

// const BLOCKED_COUNTRY = "US";

// async function handler(event: NextFetchEvent) {
//   const res = await fetch(event.request);
//   if (res.status !== 200) return res;
//
//   res.headers.set("content-type", "application/json");
//
//   return new Response(JSON.stringify({ done: true }), {
//     status: 200,
//     headers: res.headers,
//   });
// }

export function middleware(event: NextFetchEvent) {
  // const country = event.request.geo.country ?? "US";
  console.log(event);
  // // If the request is not from the blocked country,
  // // run the handler function and make a fetch request to New York
  // if (country !== BLOCKED_COUNTRY) {
  //   return event.respondWith(handler(event));
  // }
  return event.respondWith(NextResponse.rewrite("https://www.google.com"));
}
