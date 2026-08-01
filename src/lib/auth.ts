import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Admin",

      credentials: {
        login: {
          label: "Login",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.login || !credentials?.password) {
          return null;
        }

        if (credentials.login !== process.env.ADMIN_LOGIN) {
          return null;
        }

        const isValidPassword =
          credentials.password == process.env.ADMIN_PASSWORD;

        if (!isValidPassword) {
          return null;
        }

        return {
          id: "admin",
          name: "Administrator",
          role: "admin",
          loginSecret: process.env.LOGIN_SECRET || "",
        };
      },
    }),
  ],

  pages: {
    signIn: "/admin/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
        token.loginSecret = user.loginSecret;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        name: token.name as string,
        role: token.role as string,
        loginSecret: token.loginSecret as string,
      };

      return session;
    },
  },
};
