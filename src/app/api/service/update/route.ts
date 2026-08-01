import { requireAdminApi } from "@/lib/adminApiGuard";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    await requireAdminApi();

    const services = await req.json();

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "error" });
  }
}
