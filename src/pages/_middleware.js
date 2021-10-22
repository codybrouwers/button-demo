export function middleware(event) {
  const { pathname } = event.request.nextUrl;
  console.log({ pathname });
}
