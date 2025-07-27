import { defineConfig } from "drizzle-kit";
import { DATABASE_URL } from "./src/config/envs";

export default defineConfig({
  schema: "./src/shared/database/drizzle/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
