import { database } from "@/services/database.service";

export type DatabaseConfig = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  sslMode: boolean;
  isDevelopment: boolean;
};

export type Database = typeof database;
