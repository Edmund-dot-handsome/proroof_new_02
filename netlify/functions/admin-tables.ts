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
    const sql = `
      SELECT table_schema, table_name
      FROM information_schema.tables
      WHERE table_type='BASE TABLE' 
        AND table_schema NOT IN ('pg_catalog','information_schema')
      ORDER BY table_schema, table_name;
    `;
    
    const result = await query(sql);
    
    const tables = result.rows.map(row => ({
      name: row.table_name,
      schema: row.table_schema
    }));
    
    return {
      statusCode: 200,
      headers: { 
        ...cors, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        ok: true, 
        driver: 'postgresql',
        tables 
      })
    };
  } catch (error: any) {
    console.error('LIST_TABLES_ERROR', { 
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