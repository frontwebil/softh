import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (
    session?.user &&
    (session.user.role === "admin" ||
      session.user.loginSecret === process.env.LOGIN_SECRET)
  ) {
    redirect("/admin");
  }

  return (
    <main className="login-page">
      <LoginForm />
    </main>
  );
}
