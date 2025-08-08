import { sql } from "drizzle-orm";
import {
	check,
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

export const clientsTable = pgTable(
	"clients",
	{
		id: text().primaryKey(),
		name: varchar({ length: 255 }).notNull(),
		birthdate: date().notNull(),
		age: integer().notNull(),
		income: numeric({ precision: 10, scale: 2 }).notNull(),
		incomeLevel: incomeLevelEnum().notNull(),
		email: varchar({ length: 255 }).notNull().unique(),
	},
	//   Constraints
	(table) => [
		check("age_check", sql`${table.age} >= 0 AND ${table.age} <= 120`),
		check("income_check", sql`${table.income} >= 0`),
	],
);
