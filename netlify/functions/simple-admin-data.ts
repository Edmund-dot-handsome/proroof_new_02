import type { Handler } from '@netlify/functions';
import { supabaseAdmin } from '../../src/lib/supabaseAdmin';

export const runtime = 'nodejs';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function json(status: number, body: any) {
  return { 
    statusCode: status, 
    headers: { 
      ...cors,
      'Content-Type': 'application/json' 
    }, 
    body: JSON.stringify(body) 
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: cors, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    let payload: any = {};
    try { 
      payload = JSON.parse(event.body || '{}'); 
    } catch {
      return json(400, { error: 'Invalid JSON in request body' });
    }
    
    const pw = payload?.password;

    if (!process.env.ADMIN_PASSWORD) {
      return json(500, { error: 'Server configuration error' });
    }
    
    if (!pw) {
      return json(401, { error: 'No password provided' });
    }
    
    if (pw !== process.env.ADMIN_PASSWORD) {
      return json(401, { error: 'Incorrect password' });
    }

    // Debug logging (temporary)
    console.log('[env]', !!process.env.SUPABASE_SERVICE_ROLE_KEY, (process.env.SUPABASE_URL||'').slice(0,30));
    
    // Query specific columns with service role
    const { data, error } = await supabaseAdmin
      .from('inspections')
      .select('id, name, phone, address, message, preferred_time, source_page, utm_source, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return json(500, { error: error.message });
    }
    
    console.log('[simple-admin-data] rows found:', data?.length ?? 0);
    return json(200, data ?? []);
  } catch (error: any) {
    console.error('Admin data error:', error);
    return json(500, { error: error?.message || 'Server error' });
  }
};