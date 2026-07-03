import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const clerkId = url.searchParams.get("clerkId");

  if (!clerkId) {
    return Response.json({ error: "Missing clerkId parameter" }, { status: 400 });
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId));

  if (result.length === 0) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  return Response.json({ data: result[0] });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, clerkId } = body;

  if (!name || !email || !clerkId) {
    return Response.json(
      { error: "Missing required fields: name, email, clerkId" },
      { status: 400 }
    );
  }

  const result = await db
    .insert(users)
    .values({ name, email, clerkId })
    .returning();

  return Response.json({ data: result[0] }, { status: 201 });
}
