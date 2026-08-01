import { requireAdmin } from "@/lib/adminGuard";
import { AdminSidebar } from "@/Components/Admin/AdminSidebar";
import { TestimonialsEditor } from "@/Components/Admin/TestimonialsEditor";
import "@/Components/Admin/style.css";

export default async function AdminTestimonialsPage() {
  await requireAdmin();

  return (
    <div className="admin-page default-cursor">
      <AdminSidebar />
      <main className="admin-content">
        <TestimonialsEditor />
      </main>
    </div>
  );
}
