

export { auth as middleware } from "@/auth";

export const config = {
  matcher: ['/portal/:path*'], // Adjust based on your protected routes
};
