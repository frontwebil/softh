import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  if (
    session.user.loginSecret !== process.env.LOGIN_SECRET ||
    session.user.role !== "admin"
  ) {
    redirect("/admin/login");
  }

  return (
    <main className="admin-home">

    </main>
  );
}
