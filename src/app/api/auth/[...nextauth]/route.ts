import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"
import { onLogin } from "@/lib/actions/userActions"

const authOptions = {
  providers: [
    GoogleProvider({
      // clientId: process.env.GOOGLE_CLIENT_ID as string,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      clientId: '273891134722-2d4pm5iqfsgevt4ihio0fl5puf6td26t.apps.googleusercontent.com',
      clientSecret: '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',
    }),
  ],
  events: {
    signIn: async (message: any) => {
      onLogin(message.user)
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }