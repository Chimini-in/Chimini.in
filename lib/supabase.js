import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jvopwqkbtrupkayzfyvl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kZNSe5NLKgISdmCetfSxBw_ebT3ieem';

export const supabaseClient = SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE' 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;
