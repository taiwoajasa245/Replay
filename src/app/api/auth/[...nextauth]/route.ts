import { fetchFromAPI } from "@/lib/api";
import { Session } from "next-auth";
// @ts-ignore
import { NextAuthOptions } from "next-auth";
import {  User } from "next-auth";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
interface CustomUser extends User {
  id: string;
  token: string;
}

type LoginResponse = {
  status: boolean;
  data: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      photo?: string;
    };
  };
  token: string;
  message: string;
};




export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const data = await fetchFromAPI("/api/v1/replay/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
          }) as LoginResponse;

          if (data.status) {
            const user: CustomUser = {
              id: data.data.user.id,
              name: `${data.data.user.firstName} ${data.data.user.lastName}`,
              email: data.data.user.email,
              image: data.data.user.photo,
              token: data.token,  
            };
            return user;
          } else {
            throw new Error(data.message || "Incorrect email or password.");
          }
        } catch (error: unknown) {
          const errorMessage = error instanceof Error 
            ? error.message 
            : "An error occurred during login, please try again.";
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: {token: JWT, user: CustomUser}) {
      if (user) {
        token.id = (user as CustomUser).id ;
        token.token = (user as CustomUser).token;
      }
      return token;
    },
    async session({ session, token }: {session: Session, token: JWT}) {
      
      session.user.id = token.id as string;
      session.user.token = token.token as string;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

// @ts-ignore
const handler = NextAuth(authOptions) as any;
export { handler as GET, handler as POST };
