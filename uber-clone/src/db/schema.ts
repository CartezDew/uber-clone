import {
  integer,
  pgTable,
  serial,
  text,
  doublePrecision,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  clerkId: varchar("clerk_id", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const drivers = pgTable("drivers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 20 }),
  carModel: varchar("car_model", { length: 255 }),
  carColor: varchar("car_color", { length: 100 }),
  licensePlate: varchar("license_plate", { length: 20 }),
  rating: doublePrecision("rating").default(5.0),
  carImageUrl: text("car_image_url"),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const rides = pgTable("rides", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  driverId: integer("driver_id").references(() => drivers.id),
  originAddress: text("origin_address").notNull(),
  originLatitude: doublePrecision("origin_latitude").notNull(),
  originLongitude: doublePrecision("origin_longitude").notNull(),
  destinationAddress: text("destination_address").notNull(),
  destinationLatitude: doublePrecision("destination_latitude").notNull(),
  destinationLongitude: doublePrecision("destination_longitude").notNull(),
  fareAmount: doublePrecision("fare_amount"),
  status: varchar("status", { length: 50 }).default("pending").notNull(),
  rideTime: integer("ride_time"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
