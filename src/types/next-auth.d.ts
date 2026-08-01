import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    role: string;
    loginSecret: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      role: string;
      loginSecret: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    role: string;
    loginSecret: string;
  }
}
