export { default } from "next-auth/middleware"
export const config = {
    matcher: [
        "/balance/:path*",
        "/payment/:path*",
        "/history/:path*",
    ]
}