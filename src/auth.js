import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                    scope: "openid email profile", // Ensure 'openid' is included
                },
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, account, profile }) {
            // Store the id_token in the JWT
            if (account) {
                token.accessToken = account.access_token;
                token.idToken = account.id_token; // Google's id_token
            }
            return token;
        },
        async session({ session, token }) {
            // Pass id_token to the client session
            session.accessToken = token.accessToken;
            session.idToken = token.idToken; // Available in session
            return session;
        },
    },
});

