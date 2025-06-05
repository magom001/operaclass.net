export const runtime = 'nodejs' // Force Node.js runtime for this route

import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { createTransport } from "nodemailer"

export const authOptions = {
  providers: [
    EmailProvider({
      server: {
        host: "localhost",
        port: 1025,
        auth: {
          user: "user",
          pass: "pass",
        },
      },
      from: "noreply@example.com",
      generateVerificationToken: async () => {
        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        return otp
      },
      sendVerificationRequest: async ({ identifier: email, url, token: otp, provider }) => {
        const { host } = new URL(url)
        const transport = createTransport(provider.server)
        const result = await transport.sendMail({
          to: email,
          from: provider.from,
          subject: `Sign in to ${host}`,
          text: `Sign in to ${host}\n\nYour OTP is: ${otp}\n`,
          html: `<p>Sign in to ${host}</p><p>Your OTP is: <strong>${otp}</strong></p>`
        })
        console.log(`OTP for ${email}: ${otp} (mail sent: ${result.messageId})`)
      }
    }),
  ],
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET || "supersecretstring", // TODO: Use a proper secret from environment variables
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
