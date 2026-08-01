import { requireAdmin } from "@/lib/adminGuard";
import { AdminSidebar } from "@/Components/Admin/AdminSidebar";
import { PricesEditor } from "@/Components/Admin/PricesEditor";
import "@/Components/Admin/style.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function AdminPricesPage() {
  await requireAdmin();

  return (
    <div className="admin-page default-cursor">
      <AdminSidebar />
      <main className="admin-content">
        <PricesEditor />
      </main>
    </div>
    <main className="admin-home">

    </main>
  );
}
