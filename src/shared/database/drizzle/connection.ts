import { DATABASE_URL } from "@config/envs";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
	connectionString: DATABASE_URL,
	max: 10,
	ssl: {
		rejectUnauthorized: false, // Set to true in production with valid SSL certificates
	},
});

export const db = drizzle({ client: pool, casing: "snake_case" });
