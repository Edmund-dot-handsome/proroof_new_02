import type { Handler } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// Simple rate limiting (in-memory, resets on function restart)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const RATE_LIMIT = 5; // attempts
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const attempts = loginAttempts.get(ip);
  
  if (!attempts) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Reset if window expired
  if (now - attempts.lastAttempt > RATE_WINDOW) {
    loginAttempts.set(ip, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Check if over limit
  if (attempts.count >= RATE_LIMIT) {
    return false;
  }
  
  // Increment count
  attempts.count++;
  attempts.lastAttempt = now;
  return true;
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: cors, body: 'Method not allowed' };
  }

  try {
    // Rate limiting
    const clientIP = event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';
    if (!checkRateLimit(clientIP)) {
      return {
        statusCode: 429,
        headers: cors,
        body: JSON.stringify({ error: 'Too many login attempts. Try again later.' })
      };
    }

    const { username, password } = JSON.parse(event.body || '{}');
    
    if (!username || !password) {
      return {
        statusCode: 400,
        headers: cors,
        body: JSON.stringify({ error: 'Username and password required' })
      };
    }

    // Check credentials
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    if (!adminUsername || !adminPassword || !jwtSecret) {
      return {
        statusCode: 500,
        headers: cors,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    if (username !== adminUsername || password !== adminPassword) {
      return {
        statusCode: 401,
        headers: cors,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }

    // Create JWT token
    const token = jwt.sign(
      { username, role: 'admin' },
      jwtSecret,
      { expiresIn: '24h' }
    );

    // Set secure cookie
    const cookieOptions = [
      'HttpOnly',
      'SameSite=Lax',
      'Path=/',
      `Max-Age=${24 * 60 * 60}` // 24 hours
    ].join('; ');

    return {
      statusCode: 200,
      headers: {
        ...cors,
        'Content-Type': 'application/json',
        'Set-Cookie': `admin_session=${token}; ${cookieOptions}`
      },
      body: JSON.stringify({ success: true })
    };
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      statusCode: 500,
      headers: {
        ...cors,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};