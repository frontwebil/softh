import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/adminApiGuard";
import { prisma } from "@/lib/prisma";
import { Category } from "@/generated/prisma/client";

type Params = { params: Promise<{ id: string }> };

const errorResponse = (err: unknown) => {
  console.error(err);
  const unauthorized = err instanceof Error && err.message === "Unauthorized";

  return NextResponse.json(
    { status: "error" },
    { status: unauthorized ? 401 : 500 },
  );
};

/** GET /api/service/:id */
export async function GET(_req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const service = await prisma.service.findUnique({ where: { id } });

    if (!service) {
      return NextResponse.json({ status: "error" }, { status: 404 });
    }

    return NextResponse.json({ status: "success", data: service });
  } catch (err) {
    return errorResponse(err);
  }
}

/** PUT /api/service/:id — часткове оновлення (у т.ч. visible) */
export async function PUT(req: Request, { params }: Params) {
  try {
    await requireAdminApi();

    const { id } = await params;
    const body = (await req.json()) as {
      title?: string;
      price?: string;
      category?: Category;
      visible?: boolean;
      order?: number;
    };

    const service = await prisma.service.update({
      where: { id },
      data: {
        ...(body.title !== undefined ? { title: body.title } : {}),
        ...(body.price !== undefined ? { price: body.price } : {}),
        ...(body.category !== undefined ? { category: body.category } : {}),
        ...(body.visible !== undefined ? { visible: body.visible } : {}),
        ...(body.order !== undefined ? { order: body.order } : {}),
      },
    });

    return NextResponse.json({ status: "success", data: service });
  } catch (err) {
    return errorResponse(err);
  }
}

/** DELETE /api/service/:id */
export async function DELETE(_req: Request, { params }: Params) {
  try {
    await requireAdminApi();

    const { id } = await params;
    await prisma.service.delete({ where: { id } });

    return NextResponse.json({ status: "success" });
  } catch (err) {
    return errorResponse(err);
  }
}
