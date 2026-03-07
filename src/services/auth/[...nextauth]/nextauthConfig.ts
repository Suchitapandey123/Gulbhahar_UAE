import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    backendToken?: string;
    googleIdToken?: string;
    userData?: Record<string, unknown>;
  }
}

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },

  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        if (account.provider === "google" && account.id_token) {
          token.googleIdToken = account.id_token;

          try {
            const resp = await fetch(
              "https://api.gulbhahar.com/api/users/login-with-google",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken: account.id_token }),
              }
            );
            const data = await resp.json();
            token.backendToken =
              data.token || data.accessToken || data?.data?.token;

            if (token.backendToken) {
              const userResp = await fetch(
                "https://api.gulbhahar.com/api/users/user-by-token",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.backendToken}`,
                  },
                  body: JSON.stringify({}),
                }
              );
              const { user: userData } = await userResp.json();
              token.userData = {
                email: userData.email,
                name: userData.name,
                firstName:
                  userData.firstName ||
                  userData.first_name ||
                  userData.user?.firstName ||
                  "",
                lastName:
                  userData.lastName ||
                  userData.last_name ||
                  userData.user?.lastName ||
                  "",
                userId:
                  userData.userId || userData.id || userData.user?.id || "",
                location: userData.location || userData.user?.location || "",
                phoneNumber:
                  userData.phoneNumber ||
                  userData.phone ||
                  userData.user?.phoneNumber ||
                  "",
                profilePicture:
                  userData.profilePicture ||
                  userData.avatar ||
                  userData.user?.profilePicture ||
                  userData?.image ||
                  "",
                emailVerified:
                  userData.emailVerified !== undefined
                    ? userData.emailVerified
                    : true,
                phoneVerified:
                  userData.phoneVerified !== undefined
                    ? userData.phoneVerified
                    : true,
                ...userData.user,
              };
            }
          } catch (err) {
            console.error("Google login error:", err);
          }
        } else if (account.provider === "facebook" && account.access_token) {
          try {
            const resp = await fetch(
              "https://api.gulbhahar.com/api/users/login-with-facebook",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ accessToken: account.access_token }),
              }
            );
            const data = await resp.json();
            token.backendToken =
              data.token || data.accessToken || data?.data?.token;

            if (token.backendToken) {
              const userResp = await fetch(
                "https://api.gulbhahar.com/api/users/user-by-token",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token.backendToken}`,
                  },
                  body: JSON.stringify({}),
                }
              );
              const { user: userData } = await userResp.json();
              token.userData = {
                email: userData.email,
                name: userData.name,
                firstName:
                  userData.firstName ||
                  userData.first_name ||
                  userData.user?.firstName ||
                  "",
                lastName:
                  userData.lastName ||
                  userData.last_name ||
                  userData.user?.lastName ||
                  "",
                userId:
                  userData.userId || userData.id || userData.user?.id || "",
                location: userData.location || userData.user?.location || "",
                phoneNumber:
                  userData.phoneNumber ||
                  userData.phone ||
                  userData.user?.phoneNumber ||
                  "",
                profilePicture:
                  userData.profilePicture ||
                  userData.avatar ||
                  userData.user?.profilePicture ||
                  userData?.image ||
                  "",
                emailVerified:
                  userData.emailVerified !== undefined
                    ? userData.emailVerified
                    : true,
                phoneVerified:
                  userData.phoneVerified !== undefined
                    ? userData.phoneVerified
                    : true,
                ...userData.user,
              };
            }
          } catch (err) {
            console.error("Facebook login error:", err);
          }
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token.backendToken)
        session.backendToken = token.backendToken as string;
      if (token.googleIdToken)
        session.googleIdToken = token.googleIdToken as string;
      if (token.userData)
        session.userData = token.userData as Record<string, unknown>;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
export default handler;
