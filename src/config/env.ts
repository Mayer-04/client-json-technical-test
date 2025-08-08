import { existsSync } from "node:fs";
import { env, exit, loadEnvFile } from "node:process";
import { z } from "zod/v4";

// ✅ Solo cargar .env si realmente existe
if (existsSync(".env")) {
	loadEnvFile();
}

const envSchema = z.object({
	PORT: z.coerce.number().default(5000),
	DATABASE_URL: z.string(),
});

const { data, success, error } = envSchema.safeParse(env);

if (!success) {
	console.error("❌ Invalid environment variables:");
	error.issues.forEach(({ path, message }) =>
		console.error(`- ${path.join(".")}: ${message}`),
	);
	exit(1);
}

const { PORT, DATABASE_URL } = data;
export { PORT, DATABASE_URL };
