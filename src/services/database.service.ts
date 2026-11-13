import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { loadDatabaseConfig } from "@/configs/database.config";
import { createSslOptions } from "@/utils/database.util";

export const database = () => {
  const config = loadDatabaseConfig();

  const pool = new Pool({
    host: config.host,
    port: config.port,
    user: config.username,
    password: config.password,
    database: config.database,
    ssl: createSslOptions(config),
  });

  return drizzle({ client: pool });
};
