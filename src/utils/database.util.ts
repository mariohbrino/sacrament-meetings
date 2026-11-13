import type { PoolConfig } from "pg";

import type { DatabaseConfig } from "@/types/database.type";

export const createSslOptions = (config: DatabaseConfig): PoolConfig["ssl"] => {
  return config.sslMode ? { rejectUnauthorized: config.sslMode } : false;
};
