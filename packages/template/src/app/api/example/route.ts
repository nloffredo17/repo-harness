import { NextResponse } from "next/server";
import { z } from "zod";
import { exampleRuntime } from "@/domains/example/runtime";

const BodySchema = z.object({
  id: z.string().min(1),
});

export async function POST(request: Request) {
  const parsed = BodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const { id } = parsed.data;
  const item = exampleRuntime.findExample(id);
  if (!item) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(item);
}
