import { requireAdmin } from "@/lib/adminGuard";
import { AdminSidebar } from "@/Components/Admin/AdminSidebar";
import { PricesEditor } from "@/Components/Admin/PricesEditor";
import "@/Components/Admin/style.css";
import { prisma } from "@/lib/prisma";

export default async function AdminPricesPage() {
  await requireAdmin();
  const Services = await prisma.service.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  return (
    <div className="admin-page default-cursor">
      <AdminSidebar />
      <main className="admin-content">
        <PricesEditor Services={Services} />
      </main>
    </div>
  );
}
