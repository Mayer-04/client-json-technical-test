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
	id: text("id").primaryKey(),
	name: varchar("name", { length: 255 }).notNull(),
	birthdate: date("birthdate").notNull(),
	age: integer("age").notNull(),
	income: numeric("income").notNull(),
	incomeLevel: incomeLevelEnum().notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
});
