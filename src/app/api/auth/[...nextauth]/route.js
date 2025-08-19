import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

export const runtime = 'nodejs' // ensure Node runtime for NextAuth

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // must be set in env
  session: { strategy: 'jwt' },        // explicit JWT strategy

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
    // Runs on sign-in and on subsequent JWT checks.
    async jwt({ token, account }) {
      if (account) {
        if (account.provider === 'google' && account.id_token) {
          token.googleIdToken = account.id_token
    
          try {
            const resp = await fetch('https://api.gulbhahar.com/api/users/login-with-google', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ idToken: account.id_token }),
            })
    
            const data = await resp.json()
            console.log("Backend response:", data) // 👈 check actual shape
    
            // adjust depending on API
            token.backendToken = data.token || data.accessToken || data?.data?.token
          } catch (err) {
            console.error('login-with-google error', err)
          }
        } else if (account.provider === 'facebook') {
          console.log('Facebook sign-in detected.')
        }
      }
      return token
    },

    // Runs frequently; keep it cheap. Just copy values from token → session.
    async session({ session, token }) {
      if (token.backendToken) {
        session.backendToken = token.backendToken
      }
      if (token.googleIdToken) {
        session.googleIdToken = token.googleIdToken
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
