import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/adminApiGuard";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

const errorResponse = (err: unknown) => {
  console.error(err);
  const unauthorized = err instanceof Error && err.message === "Unauthorized";

  return NextResponse.json(
    { status: "error" },
    { status: unauthorized ? 401 : 500 },
  );
};

/** GET /api/testimonials/:id */
export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const testimonial = await prisma.testimonial.findUnique({ where: { id } });

    if (!testimonial) {
      return NextResponse.json({ status: "error" }, { status: 404 });
    }

    return NextResponse.json({ status: "success", data: testimonial });
  } catch (err) {
    return errorResponse(err);
  }
}

/** PUT /api/testimonials/:id — часткове оновлення (у т.ч. visible) */
export async function PUT(req: Request, { params }: Params) {
  try {
    await requireAdminApi();

    const { id } = await params;
    const body = (await req.json()) as {
      name?: string;
      category?: string;
      date?: string;
      text?: string;
      visible?: boolean;
      order?: number;
    };

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: {
        ...(body.name !== undefined ? { name: body.name } : {}),
        ...(body.category !== undefined ? { category: body.category } : {}),
        ...(body.date !== undefined ? { date: body.date } : {}),
        ...(body.text !== undefined ? { text: body.text } : {}),
        ...(body.visible !== undefined ? { visible: body.visible } : {}),
        ...(body.order !== undefined ? { order: body.order } : {}),
      },
    });

    return NextResponse.json({ status: "success", data: testimonial });
  } catch (err) {
    return errorResponse(err);
  }
}

/** DELETE /api/testimonials/:id */
export async function DELETE(_req: Request, { params }: Params) {
  try {
    await requireAdminApi();

    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    return errorResponse(err);
  }
}
