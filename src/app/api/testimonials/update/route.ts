import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/adminApiGuard";
import { prisma } from "@/lib/prisma";
import { Testimonial } from "@/generated/prisma/client";

export async function PUT(req: Request) {
  try {
    await requireAdminApi();

    const { testimonials } = await req.json();

    await prisma.$transaction(
      testimonials.map((item: Testimonial) =>
        prisma.testimonial.update({
          where: {
            id: item.id,
          },
          data: {
            name: item.name || "",
            category: item.category || "",
            date: item.date || "",
            text: item.text || "",
          },
        }),
      ),
    );

    return NextResponse.json({ status: "success" });
  } catch (err){
    console.error(err);
    return NextResponse.json({ status: "error" });
  }
}
