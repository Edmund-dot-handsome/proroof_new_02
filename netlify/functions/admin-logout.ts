import type { Handler } from '@netlify/functions';

export const runtime = 'nodejs';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: cors, body: 'Method not allowed' };
  }

  // Clear the admin session cookie
  const cookieOptions = [
    'HttpOnly',
    'SameSite=Lax',
    'Path=/',
    'Max-Age=0' // Expire immediately
  ].join('; ');

  return {
    statusCode: 200,
    headers: {
      ...cors,
      'Content-Type': 'application/json',
      'Set-Cookie': `admin_session=; ${cookieOptions}`
    },
    body: JSON.stringify({ success: true })
  };
};