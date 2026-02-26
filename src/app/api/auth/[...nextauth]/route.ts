import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import { onLogin } from "@/lib/actions/userActions"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
  ],
  pages: {
    signIn: '/login',
  },
  events: {
    signIn: async (message: any) => {
      onLogin(message.user)
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
