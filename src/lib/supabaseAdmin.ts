import { createClient } from '@supabase/supabase-js';

// Service Role client — SERVER USE ONLY
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,                 // no VITE_ here
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);