import type { Handler } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import { query } from '../../lib/pg';

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

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: cors, body: 'Method not allowed' };
  }

  if (!verifyAdminToken(event.headers.cookie)) {
    return {
      statusCode: 401,
      headers: cors,
      body: JSON.stringify({ error: 'Unauthorized' })
    };
  }

  try {
    const params = new URLSearchParams(event.queryStringParameters || {});
    const table = params.get('table');
    const limit = Math.min(parseInt(params.get('limit') || '10', 10), 100);

    if (!table) {
      return {
        statusCode: 400,
        headers: { 
          ...cors, 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Table parameter required' })
      };
    }

    const validTables = await getValidTables();
    if (!validTables.includes(table)) {
      return {
        statusCode: 400,
        headers: { 
          ...cors, 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ error: 'Invalid table name' })
      };
    }

    const result = await query(`SELECT * FROM "${table}" LIMIT $1`, [limit]);
    
    const columns = result.rows && result.rows.length > 0 ? Object.keys(result.rows[0]) : [];
    
    return {
      statusCode: 200,
      headers: { 
        ...cors, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ok: true,
        rows: result.rows || [],
        totalCount: result.rows?.length || 0,
        columns
      })
    };
  } catch (error: any) {
    console.error('SAMPLE_ERROR', { 
      code: error.code, 
      message: error.message 
    });
    
    return {
      statusCode: 500,
      headers: { 
        ...cors, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        ok: false,
        code: error.code || null,
        message: error.message || 'unknown'
      })
    };
  }
};