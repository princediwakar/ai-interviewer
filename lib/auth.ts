import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"

export const auth = betterAuth({
  database: {
    provider: "sqlite",
    url: "file:./sqlite.db",
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [nextCookies()],
  trustedOrigins: ["http://localhost:3000", "http://localhost:3002"],
  secret: process.env.BETTER_AUTH_SECRET || "your-super-secret-key-here-make-it-long-and-random",
})