CREATE TYPE "public"."income_level" AS ENUM('bajo', 'medio', 'alto');--> statement-breakpoint
CREATE TABLE "clients" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"birthdate" date NOT NULL,
	"age" integer NOT NULL,
	"income" numeric(10, 2) NOT NULL,
	"incomeLevel" "income_level" NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "clients_email_unique" UNIQUE("email"),
	CONSTRAINT "age_check" CHECK ("clients"."age" >= 0 AND "clients"."age" <= 120),
	CONSTRAINT "income_check" CHECK ("clients"."income" >= 0)
);
