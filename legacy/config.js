// config.js - Supabase Configuration
// ===================================
// IMPORTANT: Replace the placeholders below with your actual Supabase project credentials.
// You can find these in your Supabase Dashboard under Settings > API.

const SUPABASE_URL = 'https://jvopwqkbtrupkayzfyvl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2b3B3cWtidHJ1cGtheXpmeXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDQwMjksImV4cCI6MjA5NjgyMDAyOX0.KHWIko4CvlGHDq8QPdNEFqPMXBFkfiZTn_wr9qXWguw';

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
