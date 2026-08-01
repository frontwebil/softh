import { requireAdmin } from "@/lib/adminGuard";
import { AdminSidebar } from "@/Components/Admin/AdminSidebar";
import { PricesEditor } from "@/Components/Admin/PricesEditor";
import "@/Components/Admin/style.css";

export default async function AdminPricesPage() {
  await requireAdmin();

  return (
    <div className="admin-page default-cursor">
      <AdminSidebar />
      <main className="admin-content">
        <PricesEditor />
      </main>
    </div>
  );
}
