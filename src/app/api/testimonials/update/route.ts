import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/adminApiGuard";
import { prisma } from "@/lib/prisma";

type TestimonialPayload = {
  id?: string;
  name?: string;
  category?: string;
  date?: string;
  text?: string;
  visible?: boolean;
};

/**
 * PUT /api/testimonials/update
 * Тіло: { testimonials: TestimonialPayload[] } — зберігає всі відгуки одним запитом.
 * Без id — створюється, відсутні в тілі — видаляються.
 */
export async function PUT(req: Request) {
  try {
    await requireAdminApi();

    const { testimonials } = (await req.json()) as {
      testimonials?: TestimonialPayload[];
    };

    if (!Array.isArray(testimonials)) {
      return NextResponse.json(
        { status: "error", message: "Очікується масив testimonials" },
        { status: 400 },
      );
    }

    await prisma.$transaction(async (tx) => {
      const keptIds: string[] = [];

      for (const [index, item] of testimonials.entries()) {
        const data = {
          name: item.name || "",
          category: item.category || "",
          date: item.date || "",
          text: item.text || "",
          visible: item.visible ?? true,
          order: index,
        };

        const saved = item.id
          ? await tx.testimonial.update({ where: { id: item.id }, data })
          : await tx.testimonial.create({ data });

        keptIds.push(saved.id);
      }

      await tx.testimonial.deleteMany({ where: { id: { notIn: keptIds } } });
    });

    const data = await prisma.testimonial.findMany({
      orderBy: { order: "asc" },
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
