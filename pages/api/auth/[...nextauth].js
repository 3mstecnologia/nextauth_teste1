import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return (
          profile.email_verified &&
          profile.email.endsWith("@uniplaclages.edu.br")
        );
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 1 month
  },
});
