import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    secret: process.env.AUTH_SECRET,
    pages:{
        signIn: '/login',
    },
    session:{
        strategy: "jwt",
        maxAge: 18*60*60, // 18 hours
        updateAge: 12*60*60, // 12 hours
    },
    callbacks: {
        session: async({ session, token }) => {
            if(token) {
                session.user = {
                    ...session.user,
                    name: token.name || '',
                    email: token.email || '',
                    id: typeof token.id === "string" ? token.id : '',
                }
            }
            return session;
        },
        jwt: async({token,user}) => {
            if(user){
                token.id=user.id;
                token.name=user.name;
                token.email=user.email;
            }
            return token;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnLogin = nextUrl.pathname === '/login';
            const isOnPortal = nextUrl.pathname.startsWith('/portal');
            
            // If on login page and logged in, redirect to portal
            if (isOnLogin && isLoggedIn) {
                return Response.redirect(new URL(`/portal`, nextUrl));
            }
            
            // Allow access to login page
            if (isOnLogin) {
                return true;
            }
            
            // Protect portal routes - require authentication
            if (isOnPortal) {
                return isLoggedIn;
            }
            
            // For other pages, you might want to set default access rules
            return true; // Allow access to other pages by default
        }   
    },
    providers: [],
}