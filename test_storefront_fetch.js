const https = require('https');

const SUPABASE_URL = 'jvopwqkbtrupkayzfyvl.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2b3B3cWtidHJ1cGtheXpmeXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDQwMjksImV4cCI6MjA5NjgyMDAyOX0.KHWIko4CvlGHDq8QPdNEFqPMXBFkfiZTn_wr9qXWguw';

function supabaseRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: SUPABASE_URL,
      path: `/rest/v1/${path}`,
      method: 'GET',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, body: data });
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function testStorefrontFetch() {
  console.log('=== Storefront Supabase Anon Key Data Test (Clean URL) ===\n');

  // Test 1: Banners
  console.log('1. Banners table:');
  const banners = await supabaseRequest('banners?select=*&is_published=eq.true&order=sort_order.asc');
  console.log(`   Status: ${banners.status}`);
  if (banners.status === 200) {
    const data = JSON.parse(banners.body);
    console.log(`   Count: ${data.length}`);
    console.log('   Data:', JSON.stringify(data, null, 2));
  } else {
    console.log('   Error:', banners.body);
  }

  // Test 2: Settings
  console.log('\n2. Settings table:');
  const settings = await supabaseRequest('settings?select=*');
  console.log(`   Status: ${settings.status}`);
  if (settings.status === 200) {
    const data = JSON.parse(settings.body);
    console.log(`   Count: ${data.length}`);
    console.log('   Data:', JSON.stringify(data, null, 2));
  } else {
    console.log('   Error:', settings.body);
  }
}

testStorefrontFetch().catch(console.error);
