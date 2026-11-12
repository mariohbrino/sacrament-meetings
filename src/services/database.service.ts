import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { loadDatabaseConfig } from "@/configs/database.config";

export const database = () => {
  const config = loadDatabaseConfig();

  const pool = new Pool({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password,
    database: config.database,
    ssl: config.sslMode ? { rejectUnauthorized: false } : undefined,
  });

  return drizzle({ client: pool });
};
