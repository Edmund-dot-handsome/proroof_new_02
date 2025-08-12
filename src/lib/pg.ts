import { Pool } from 'pg';

let _pool: Pool | undefined;

export function getPool(): Pool {
  if (_pool) return _pool;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL missing');

  _pool = new Pool({
    connectionString: url,
    // Quick fix for self-signed CA issues in serverless:
    ssl: { require: true, rejectUnauthorized: false },
  });

  return _pool;
}

export async function query(text: string, params?: any[]) {
  return getPool().query(text, params);
}

export { _pool as pool };