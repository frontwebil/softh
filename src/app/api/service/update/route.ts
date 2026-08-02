import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/adminApiGuard";
import { prisma } from "@/lib/prisma";
import { Category } from "@/generated/prisma/client";

type ServicePayload = {
  id?: string;
  category: Category;
  title: string;
  price: string;
  visible?: boolean;
  order?: number;
};

/**
 * PUT /api/service/update
 * Тіло: { services: ServicePayload[] } — зберігає весь прайс одним запитом.
 * Записи без id створюються, наявні оновлюються, відсутні — видаляються.
 */
export async function PUT(req: Request) {
  try {
    await requireAdminApi();

    const { services } = (await req.json()) as { services?: ServicePayload[] };

    if (!Array.isArray(services)) {
      return NextResponse.json(
        { status: "error", message: "Очікується масив services" },
        { status: 400 },
      );
    }

    await prisma.$transaction(async (tx) => {
      const keptIds: string[] = [];
      const orderByCategory = new Map<Category, number>();

      for (const service of services) {
        const order =
          service.order ?? orderByCategory.get(service.category) ?? 0;
        orderByCategory.set(service.category, order + 1);

        const data = {
          category: service.category,
          title: service.title ?? "",
          price: service.price ?? "",
          visible: service.visible ?? true,
          order,
        };

        const saved = service.id
          ? await tx.service.update({ where: { id: service.id }, data })
          : await tx.service.create({ data });

        keptIds.push(saved.id);
      }

      await tx.service.deleteMany({ where: { id: { notIn: keptIds } } });
    });

    const data = await prisma.service.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });

    return NextResponse.json({ status: "success", data });
  } catch (err) {
    console.error(err);
    const unauthorized = err instanceof Error && err.message === "Unauthorized";

    return NextResponse.json(
      { status: "error" },
      { status: unauthorized ? 401 : 500 },
    );
  }
}
