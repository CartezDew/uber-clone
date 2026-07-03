import { db } from "@/db";
import { drivers } from "@/db/schema";

export async function GET() {
  const result = await db.select().from(drivers);
  return Response.json({ data: result });
}
