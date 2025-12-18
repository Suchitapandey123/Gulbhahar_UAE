import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

export const runtime = 'nodejs'

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },

  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  // 🔥 IMPORTANT: Configure pages to use custom callback
  pages: {
    signIn: '/login',
    error: '/login', // Error code passed in query string as ?error=
  },

  callbacks: {
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
            // console.log("Google backend response:", data)
    
            token.backendToken = data.token || data.accessToken || data?.data?.token
            
            if (token.backendToken) {
              try {
                const userResp = await fetch('https://api.gulbhahar.com/api/users/user-by-token', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.backendToken}`
                  },
                  body: JSON.stringify({})
                })
                
                const userResponse = await userResp.json()
                const userData = userResponse.user
                
                token.userData = {
                  email: userData.email,
                  name: userData.name,
                  firstName: userData.firstName || userData.first_name || userData.user?.firstName || '',
                  lastName: userData.lastName || userData.last_name || userData.user?.lastName || '',
                  userId: userData.userId || userData.id || userData.user?.id || '',
                  location: userData.location || userData.user?.location || '',
                  phoneNumber: userData.phoneNumber || userData.phone || userData.user?.phoneNumber || '',
                  profilePicture: userData.profilePicture || userData.avatar || userData.user?.profilePicture || userData?.image || '',
                  emailVerified: userData.emailVerified !== undefined ? userData.emailVerified : true,
                  phoneVerified: userData.phoneVerified !== undefined ? userData.phoneVerified : true,
                  ...userData.user
                }
              } catch (userErr) {
                console.error('Error fetching user data:', userErr)
              }
            }
          } catch (err) {
            console.error('login-with-google error', err)
          }
        } else if (account.provider === 'facebook' && account.access_token) {
          try {
            const resp = await fetch('https://api.gulbhahar.com/api/users/login-with-facebook', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ accessToken: account.access_token }),
            })
    
            const data = await resp.json()
            // console.log("Facebook backend response:", data)
    
            token.backendToken = data.token || data.accessToken || data?.data?.token
            
            if (token.backendToken) {
              try {
                const userResp = await fetch('https://api.gulbhahar.com/api/users/user-by-token', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.backendToken}`
                  },
                  body: JSON.stringify({})
                })
                
                const userResponse = await userResp.json()
                const userData = userResponse.user
                
                token.userData = {
                  email: userData.email,
                  name: userData.name,
                  firstName: userData.firstName || userData.first_name || userData.user?.firstName || '',
                  lastName: userData.lastName || userData.last_name || userData.user?.lastName || '',
                  userId: userData.userId || userData.id || userData.user?.id || '',
                  location: userData.location || userData.user?.location || '',
                  phoneNumber: userData.phoneNumber || userData.phone || userData.user?.phoneNumber || '',
                  profilePicture: userData.profilePicture || userData.avatar || userData.user?.profilePicture || userData?.image || '',
                  emailVerified: userData.emailVerified !== undefined ? userData.emailVerified : true,
                  phoneVerified: userData.phoneVerified !== undefined ? userData.phoneVerified : true,
                  ...userData.user
                }
              } catch (userErr) {
                console.error('Error fetching Facebook user data:', userErr)
              }
            }
          } catch (err) {
            console.error('login-with-facebook error', err)
          }
        }
      }
      return token
    },

    async session({ session, token }) {
      if (token.backendToken) {
        session.backendToken = token.backendToken
      }
      if (token.googleIdToken) {
        session.googleIdToken = token.googleIdToken
      }
      if (token.userData) {
        session.userData = token.userData
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }