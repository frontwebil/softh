import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/adminApiGuard";
import { prisma } from "@/lib/prisma";

/** POST /api/testimonials/create */
export async function POST(req: Request) {
  try {
    await requireAdminApi();

    const body = (await req.json()) as {
      name?: string;
      category?: string;
      date?: string;
      text?: string;
      visible?: boolean;
    };

    const order = await prisma.testimonial.count();

    const testimonial = await prisma.testimonial.create({
      data: {
        name: body.name || "",
        category: body.category || "",
        date: body.date || "",
        text: body.text || "",
        visible: body.visible ?? true,
        order,
      },
    });

    return NextResponse.json(
      { status: "success", data: testimonial },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    const unauthorized = err instanceof Error && err.message === "Unauthorized";

    return NextResponse.json(
      { status: "error" },
      { status: unauthorized ? 401 : 500 },
    );
  }
}
