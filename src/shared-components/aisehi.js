import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || "gulbhahar",
  
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // This runs whenever a token is created/updated
      if (account) {
        token.id_token = account.id_token // Store Google's ID token
      }
      return token
    },
    async session({ session, token }) {
      // Expose id_token in the session object
      const response = await fetch('https://api.gulbhahar.com/api/users/login-with-google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: token.id_token })
      })
      const data = await response.json()
  
      session.id_token = data.token
      // session.id_token = token.id_token // Add id_token to session
      return session
    }
  }
})

export { handler as GET, handler as POST }
