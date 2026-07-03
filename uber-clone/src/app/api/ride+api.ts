import { db } from "@/db";
import { rides } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "Missing userId parameter" }, { status: 400 });
  }

  const result = await db
    .select()
    .from(rides)
    .where(eq(rides.userId, parseInt(userId)));

  return Response.json({ data: result });
}

export async function POST(request: Request) {
  const body = await request.json();
  const {
    userId,
    originAddress,
    originLatitude,
    originLongitude,
    destinationAddress,
    destinationLatitude,
    destinationLongitude,
    fareAmount,
    driverId,
    rideTime,
  } = body;

  if (
    !userId ||
    !originAddress ||
    originLatitude == null ||
    originLongitude == null ||
    !destinationAddress ||
    destinationLatitude == null ||
    destinationLongitude == null
  ) {
    return Response.json(
      { error: "Missing required ride fields" },
      { status: 400 }
    );
  }

  const result = await db
    .insert(rides)
    .values({
      userId,
      driverId,
      originAddress,
      originLatitude,
      originLongitude,
      destinationAddress,
      destinationLatitude,
      destinationLongitude,
      fareAmount,
      rideTime,
    })
    .returning();

  return Response.json({ data: result[0] }, { status: 201 });
}
