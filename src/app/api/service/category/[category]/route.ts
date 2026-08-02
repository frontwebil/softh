import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/adminApiGuard";
import { prisma } from "@/lib/prisma";
import { Category } from "@/generated/prisma/client";

type Params = { params: Promise<{ category: string }> };

/** GET /api/service/category/:category — послуги однієї категорії */
export async function GET(req: Request, { params }: Params) {
  try {
    const { category } = (await params) as { category: Category };
    const all = new URL(req.url).searchParams.get("all") === "1";

    const services = await prisma.service.findMany({
      where: { category, ...(all ? {} : { visible: true }) },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ status: "success", data: services });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", data: [] }, { status: 500 });
  }
}

/** PUT /api/service/category/:category — показати/сховати всю категорію */
export async function PUT(req: Request, { params }: Params) {
  try {
    await requireAdminApi();

    const { category } = (await params) as { category: Category };
    const { visible } = (await req.json()) as { visible?: boolean };

    if (typeof visible !== "boolean") {
      return NextResponse.json(
        { status: "error", message: "Очікується поле visible" },
        { status: 400 },
      );
    }

    const result = await prisma.service.updateMany({
      where: { category },
      data: { visible },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (err) {
    console.error(err);
    const unauthorized = err instanceof Error && err.message === "Unauthorized";

    return NextResponse.json(
      { status: "error" },
      { status: unauthorized ? 401 : 500 },
    );
  }
}

/** DELETE /api/service/category/:category — видалити всі послуги категорії */
export async function DELETE(_req: Request, { params }: Params) {
  try {
    await requireAdminApi();

    const { category } = (await params) as { category: Category };
    const result = await prisma.service.deleteMany({ where: { category } });

    return NextResponse.json({ status: "success", data: result });
  } catch (err) {
    console.error(err);
    const unauthorized = err instanceof Error && err.message === "Unauthorized";

    return NextResponse.json(
      { status: "error" },
      { status: unauthorized ? 401 : 500 },
    );
  }
}
