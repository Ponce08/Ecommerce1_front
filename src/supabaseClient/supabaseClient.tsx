import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ghfsqtyoplqifittecaz.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdoZnNxdHlvcGxxaWZpdHRlY2F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMjgxODQsImV4cCI6MjA0NzcwNDE4NH0.1OhDUsdeDrNLRqLvRvBCqk0P7Jn6pi3uu4HIOPkrSLM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true, // Permite actualizar automáticamente la sesión
    autoRefreshToken: true // Habilita la actualización automática del token
  }
});
