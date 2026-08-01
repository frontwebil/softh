import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function requireAdminApi() {
  const session = await getServerSession(authOptions);

  if (
    !session ||
    session.user.loginSecret !== process.env.LOGIN_SECRET ||
    session.user.role !== "admin"
  ) {
    throw new Error("Unauthorized");
  }

  return session;
}
