import { z } from "zod";

import type { DatabaseConfig } from "@/types/database.type";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  POSTGRES_HOST: z.string().min(1),
  POSTGRES_PORT: z.coerce.number().int().min(5432).max(5599).default(5432),
  POSTGRES_DATABASE: z.string().min(1),
  POSTGRES_USER: z.string().min(1),
  POSTGRES_PASSWORD: z.string().min(1),
  POSTGRES_SSLMODE: z.enum(["disable", "require"]).default("require"),
});

export const loadDatabaseConfig = (): DatabaseConfig => {
  const { data, error } = schema.safeParse(process.env);

  if (error) {
    throw new Error(`Invalid environment variables: ${error.message}`);
  }

  return {
    host: data.POSTGRES_HOST,
    port: data.POSTGRES_PORT,
    database: data.POSTGRES_DATABASE,
    username: data.POSTGRES_USER,
    password: data.POSTGRES_PASSWORD,
    sslMode: data.POSTGRES_SSLMODE === "require",
    isDevelopment: data.NODE_ENV === "development",
  };
};
