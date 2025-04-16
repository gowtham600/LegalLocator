import { pgTable, text, serial, integer, numeric, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Legal Service Provider model
export const legalServiceProviders = pgTable("legal_service_providers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  services: jsonb("services").notNull().$type<string[]>(), // Store as JSON array
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  website: text("website"),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postalCode: text("postal_code").notNull(),
  latitude: numeric("latitude").notNull(),
  longitude: numeric("longitude").notNull(),
  description: text("description").notNull(),
  rating: numeric("rating"),
  reviewCount: integer("review_count").default(0),
  yearsExperience: integer("years_experience"),
});

export const insertLegalServiceProviderSchema = createInsertSchema(legalServiceProviders).omit({
  id: true
});

// Define relationships between tables if needed in the future
export const relations = {
  users: {},
  legalServiceProviders: {}
};

export type InsertLegalServiceProvider = z.infer<typeof insertLegalServiceProviderSchema>;
export type LegalServiceProvider = typeof legalServiceProviders.$inferSelect;

// Service Type enum for frontend use
export const serviceTypes = [
  { value: "all", label: "All Legal Services" },
  { value: "family", label: "Family Law" },
  { value: "criminal", label: "Criminal Defense" },
  { value: "corporate", label: "Corporate Law" },
  { value: "realestate", label: "Real Estate Law" },
  { value: "immigration", label: "Immigration Law" },
  { value: "personal-injury", label: "Personal Injury" },
  { value: "tax", label: "Tax Law" },
  { value: "intellectual-property", label: "Intellectual Property" },
] as const;

// Search request schema
export const searchRequestSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  serviceType: z.string().optional(),
});

export type SearchRequest = z.infer<typeof searchRequestSchema>;

// Provider with distance schema for response
export const providerWithDistanceSchema = z.object({
  provider: z.object(insertLegalServiceProviderSchema.shape).merge(z.object({
    id: z.number()
  })),
  distance: z.number(),
});

export type ProviderWithDistance = z.infer<typeof providerWithDistanceSchema>;
