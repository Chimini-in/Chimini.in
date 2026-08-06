// config.js - Supabase Configuration
// ===================================
// IMPORTANT: Replace the placeholders below with your actual Supabase project credentials.
// You can find these in your Supabase Dashboard under Settings > API.

const SUPABASE_URL = 'https://jvopwqkbtrupkayzfyvl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_kZNSe5NLKgISdmCetfSxBw_ebT3ieem';

// Initialize the Supabase client
// We check if supabase is defined to prevent errors if the CDN script fails to load
let supabaseClient = null;
if (typeof supabase !== 'undefined') {
  if (SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase client initialized.");
  } else {
    console.warn("Supabase credentials missing! Please update config.js with your URL and Anon Key.");
  }
} else {
  console.error("Supabase CDN not loaded.");
}

export { supabaseClient };

