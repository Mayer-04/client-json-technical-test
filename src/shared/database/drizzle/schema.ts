import {
	date,
	integer,
	numeric,
	pgEnum,
	pgTable,
	text,
	varchar,
} from "drizzle-orm/pg-core";

export const incomeLevelEnum = pgEnum("income_level", [
	"bajo",
	"medio",
	"alto",
]);

export const clientsTable = pgTable("clients", {
	id: text().primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	birthdate: date().notNull(),
	age: integer().notNull(),
	income: numeric({ precision: 10, scale: 2 }).notNull(),
	incomeLevel: incomeLevelEnum().notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
});
