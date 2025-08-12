import type { Handler } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import { query } from '../../src/lib/pg';

export const runtime = 'nodejs';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Cookie',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Credentials': 'true',
};

function verifyAdminToken(cookieHeader: string | undefined): boolean {
  if (!cookieHeader) return false;
  
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return false;
  
  // Parse admin_session cookie
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  const token = cookies.admin_session;
  if (!token) return false;
  
  try {
    jwt.verify(token, jwtSecret);
    return true;
  } catch {
    return false;
  }
}

async function getValidTables(): Promise<string[]> {
  try {
    const result = await query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_type='BASE TABLE'
        AND table_schema NOT IN ('pg_catalog','information_schema')
      ORDER BY table_name;
    `);
    
    return result.rows.map(row => row.table_name);
  } catch (error) {
    console.error('Error fetching valid tables:', error);
    return [];
  }
}

async function getRows(params: {
  table: string;
  page: number;
  limit: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  q?: string;
}) {
  const { table, page, limit, sortBy, sortDir, q } = params;
  
  // Validate and sanitize inputs
  const safePage = Math.max(1, Math.min(1000, page));
  const safeLimit = Math.max(1, Math.min(100, limit));
  const offset = (safePage - 1) * safeLimit;
  
  let whereClause = '';
  let orderClause = '';
  let queryParams: any[] = [safeLimit, offset];
  let paramIndex = 3;
  
  // Add search if provided
  if (q && q.trim()) {
    const searchTerm = `%${q.trim()}%`;
    if (table === 'inspections') {
      whereClause = `WHERE name ILIKE $${paramIndex} OR phone ILIKE $${paramIndex + 1} OR address ILIKE $${paramIndex + 2} OR message ILIKE $${paramIndex + 3}`;
      queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
      paramIndex += 4;
    }
  }
  
  // Add sorting
  if (sortBy) {
    const direction = sortDir === 'desc' ? 'DESC' : 'ASC';
    orderClause = `ORDER BY "${sortBy}" ${direction}`;
  } else {
    // Default sort by created_at desc if available
    orderClause = 'ORDER BY created_at DESC';
  }
  
  // Build the main query
  const mainQuery = `
    SELECT * FROM "${table}"
    ${whereClause}
    ${orderClause}
    LIMIT $1 OFFSET $2
  `;
  
  // Build the count query
  const countQuery = `
    SELECT COUNT(*) as count FROM "${table}"
    ${whereClause}
  `;
  
  // Execute queries
  const [rowsResult, countResult] = await Promise.all([
    query(mainQuery, queryParams),
    query(countQuery, queryParams.slice(2))
  ]);
  
  // Get column names from first row
  const columns = rowsResult.rows && rowsResult.rows.length > 0 ? Object.keys(rowsResult.rows[0]) : [];
  
  return {
    rows: rowsResult.rows || [],
    totalCount: parseInt(countResult.rows[0]?.count || '0'),
    columns
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: cors, body: 'Method not allowed' };
  }

  // Verify authentication
  if (!verifyAdminToken(event.headers.cookie)) {
    return {
      statusCode: 401,
      headers: cors,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    const params = new URLSearchParams(event.queryStringParameters || {});
    const action = params.get('action') || 'tables';

    if (action === 'tables') {
      const validTables = await getValidTables();
      const tables = validTables.map(name => ({ name, schema: 'public' }));
      
      return {
        statusCode: 200,
        headers: { ...cors, 'X-Robots-Tag': 'noindex, nofollow' },
        body: JSON.stringify({ 
          ok: true,
          driver: 'postgresql',
          tables 
        })
      };
    }

    if (action === 'rows') {
      const table = params.get('table');
      if (!table) {
        return {
          statusCode: 400,
          headers: cors,
          body: JSON.stringify({ error: 'Table parameter required' })
        };
      }

      const page = Math.max(1, parseInt(params.get('page') || '1'));
      const limit = Math.max(1, Math.min(100, parseInt(params.get('limit') || '20')));
      const sortBy = params.get('sortBy') || undefined;
      const sortDir = (params.get('sortDir') === 'desc' ? 'desc' : 'asc') as 'asc' | 'desc';
      const q = params.get('q') || undefined;

      // Validate table exists
      const validTables = await getValidTables();
      if (!validTables.includes(table)) {
        return {
          statusCode: 400,
          headers: cors,
          body: JSON.stringify({ error: 'Invalid table name' })
        };
      }

      const result = await getRows({
        table,
        page,
        limit,
        sortBy,
        sortDir,
        q
      });

      return {
        statusCode: 200,
        headers: { ...cors, 'X-Robots-Tag': 'noindex, nofollow' },
        body: JSON.stringify({
          ok: true,
          ...result
        })
      };
    }

    return {
      statusCode: 400,
      headers: cors,
      body: JSON.stringify({ error: 'Invalid action' })
    };
  } catch (error: any) {
    console.error('Admin data error:', error);
    return {
      statusCode: 500,
      headers: cors,
      body: JSON.stringify({ 
        ok: false,
        error: 'Internal server error' 
      })
    };
  }
};