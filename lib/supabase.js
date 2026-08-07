import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jvopwqkbtrupkayzfyvl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2b3B3cWtidHJ1cGtheXpmeXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDQwMjksImV4cCI6MjA5NjgyMDAyOX0.KHWIko4CvlGHDq8QPdNEFqPMXBFkfiZTn_wr9qXWguw';

export const supabaseClient = SUPABASE_URL !== 'YOUR_SUPABASE_URL_HERE' 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;
