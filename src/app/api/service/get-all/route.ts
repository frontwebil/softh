import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/service/get-all        — тільки видимі послуги (для сайту)
 * GET /api/service/get-all?all=1  — усі, включно з прихованими (для адмінки)
 */
export async function GET(req: Request) {
  try {
    const all = new URL(req.url).searchParams.get("all") === "1";

    const services = await prisma.service.findMany({
      where: all ? undefined : { visible: true },
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });

    return NextResponse.json({ status: "success", data: services });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error", data: [] }, { status: 500 });
  }
}
