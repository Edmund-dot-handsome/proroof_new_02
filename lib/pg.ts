import { Pool } from "pg";

let _pool: Pool | undefined;

export function getPool(): Pool {
  if (_pool) return _pool;
  
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL missing");

  _pool = new Pool({
    connectionString: url,
    ssl: { require: true, rejectUnauthorized: false }
  });

  return _pool;
}

export async function query(sql: string, params?: any[]) {
  return getPool().query(sql, params);
}