import type { Handler } from '@netlify/functions';
import { query } from '../../lib/pg';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: cors, body: 'Method not allowed' };
  }

  const checks = {
    database: false,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown'
  };

  try {
    const result = await query('SELECT 1 as ok, NOW() as db_time');
    checks.database = result.rows?.[0]?.ok === 1;
    
    const status = checks.database ? 200 : 503;
    
    return {
      statusCode: status,
      headers: { 
        ...cors,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        status: checks.database ? 'healthy' : 'unhealthy',
        checks,
        version: '1.0.0'
      })
    };
  } catch (error: any) {
    console.error('HEALTH_CHECK_ERROR', { 
      code: error.code, 
      message: error.message 
    });
    
    return {
      statusCode: 503,
      headers: { 
        ...cors,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        status: 'unhealthy',
        checks,
        error: {
          code: error.code || null,
          message: error.message || 'unknown'
        },
        version: '1.0.0'
      })
    };
  }
};