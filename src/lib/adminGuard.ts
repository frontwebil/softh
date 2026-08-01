import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

/** Перевірка доступу до адмінки. Редіректить на /admin/login. */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    session.user.loginSecret !== process.env.LOGIN_SECRET ||
    session.user.role !== "admin"
  ) {
    redirect("/admin/login");
  }

  return session;
}
