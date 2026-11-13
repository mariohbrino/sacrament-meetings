import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import { loadDatabaseConfig } from "@/configs/database.config";
import { createSslOptions } from "@/utils/database.util";

const config = loadDatabaseConfig();

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password,
    database: config.database,
    ssl: createSslOptions(config),
  },
});
