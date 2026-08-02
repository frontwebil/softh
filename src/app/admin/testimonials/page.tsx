import { requireAdmin } from "@/lib/adminGuard";
import { AdminSidebar } from "@/Components/Admin/AdminSidebar";
import { TestimonialsEditor } from "@/Components/Admin/TestimonialsEditor";
import "@/Components/Admin/style.css";
import { prisma } from "@/lib/prisma";

export default async function AdminTestimonialsPage() {
  await requireAdmin();
  const Testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="admin-page default-cursor">
      <AdminSidebar />
      <main className="admin-content">
        <TestimonialsEditor Testimonials={Testimonials}/>
      </main>
    </div>
  );
}
