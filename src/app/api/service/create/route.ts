import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/adminApiGuard";
import { prisma } from "@/lib/prisma";
import { Category } from "@/generated/prisma/client";

/** POST /api/service/create — створити одну послугу */
export async function POST(req: Request) {
  try {
    await requireAdminApi();

    const body = (await req.json()) as {
      category: Category;
      title?: string;
      price?: string;
      visible?: boolean;
    };

    if (!body?.category) {
      return NextResponse.json(
        { status: "error", message: "Потрібна категорія" },
        { status: 400 },
      );
    }

    const order = await prisma.service.count({
      where: { category: body.category },
    });

    const service = await prisma.service.create({
      data: {
        category: body.category,
        title: body.title ?? "",
        price: body.price ?? "",
        visible: body.visible ?? true,
        order,
      },
    });

    return NextResponse.json({ status: "success", data: service }, { status: 201 });
  } catch (err) {
    console.error(err);
    const unauthorized = err instanceof Error && err.message === "Unauthorized";

    return NextResponse.json(
      { status: "error" },
      { status: unauthorized ? 401 : 500 },
    );
  }
}
