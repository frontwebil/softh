import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/testimonials/get-all        — тільки видимі відгуки
 * GET /api/testimonials/get-all?all=1  — усі, включно з прихованими
 */
export async function GET(req: Request) {
  try {
    const all = new URL(req.url).searchParams.get("all") === "1";

    const testimonials = await prisma.testimonial.findMany({
      where: all ? undefined : { visible: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ status: "success", data: testimonials });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", data: [] }, { status: 500 });
  }
}
