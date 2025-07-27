import { env, exit, loadEnvFile } from "node:process";
import { z } from "zod/v4";

const loadValidatedEnv = () => {
	// Cargar archivo .env (por defecto desde la raíz)
	loadEnvFile();

	// Esquema de validación
	const envSchema = z.object({
		PORT: z.coerce.number().default(5000),
		DATABASE_URL: z.string(),
	});

	const { data, success, error } = envSchema.safeParse(env);

	if (!success) {
		console.error("Error validating environment variables");
		error.issues.forEach(({ path, message }) =>
			console.error(`- ${path.join(".")}: ${message}`),
		);
		exit(1);
	}

	return data;
};

const { PORT, DATABASE_URL } = loadValidatedEnv();

export { PORT, DATABASE_URL };
