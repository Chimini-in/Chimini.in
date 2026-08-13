const https = require('https');

const SUPABASE_URL = 'jvopwqkbtrupkayzfyvl.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2b3B3cWtidHJ1cGtheXpmeXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDQwMjksImV4cCI6MjA5NjgyMDAyOX0.KHWIko4CvlGHDq8QPdNEFqPMXBFkfiZTn_wr9qXWguw';

function supabaseRequest(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: SUPABASE_URL,
      path: `/rest/v1/${path}`,
      method: method,
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
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
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function diagnose() {
  console.log('=== CHIMINI Supabase Diagnosis ===\n');

  // Test 1: Read banners
  console.log('1. Testing READ banners (anon key)...');
  const read = await supabaseRequest('GET', 'banners?select=*&limit=3');
  console.log(`   Status: ${read.status}`);
  if (read.status === 200) {
    const rows = JSON.parse(read.body);
    console.log(`   ✓ READ works — found ${rows.length} rows`);
    if (rows.length > 0) console.log(`   Sample row IDs: ${rows.map(r => r.id || 'no-id').join(', ')}`);
  } else {
    console.log(`   ✗ READ FAILED — body: ${read.body}`);
  }

  // Test 2: INSERT into banners
  console.log('\n2. Testing INSERT into banners (anon key)...');
  const insert = await supabaseRequest('POST', 'banners', {
    section_id: 'test_diagnosis_' + Date.now(),
    image_url: 'https://test.example.com/test.jpg',
    link_url: '/test',
    is_published: false,
    sort_order: 999
  });
  console.log(`   Status: ${insert.status}`);
  if (insert.status === 201) {
    const created = JSON.parse(insert.body);
    const newId = created[0]?.id || created?.id;
    console.log(`   ✓ INSERT works — new ID: ${newId}`);

    // Test 3: DELETE the test row
    if (newId) {
      console.log('\n3. Testing DELETE (cleaning up test row)...');
      const del = await supabaseRequest('DELETE', `banners?id=eq.${newId}`);
      console.log(`   Status: ${del.status} — ${del.status === 204 ? '✓ DELETE works' : '✗ DELETE failed: ' + del.body}`);
    }
  } else if (insert.status === 403 || insert.status === 401) {
    console.log(`   ✗ INSERT BLOCKED — RLS policy blocking writes with anon key`);
    console.log(`   Body: ${insert.body}`);
    console.log('\n   DIAGNOSIS: Row Level Security (RLS) is blocking INSERT/UPDATE.');
    console.log('   SOLUTION: Need to add RLS policies to allow anon key to write, OR use service_role key for admin portal.');
  } else {
    console.log(`   ✗ INSERT FAILED — body: ${insert.body}`);
  }

  // Test 4: Test products table
  console.log('\n4. Testing READ products...');
  const products = await supabaseRequest('GET', 'products?select=id,title&limit=2');
  console.log(`   Status: ${products.status} — ${products.status === 200 ? '✓' : '✗'} body: ${products.body.substring(0, 100)}`);

  // Test 5: Test settings table
  console.log('\n5. Testing READ settings...');
  const settings = await supabaseRequest('GET', 'settings?select=setting_key&limit=5');
  console.log(`   Status: ${settings.status} — ${settings.status === 200 ? '✓' : '✗'} body: ${settings.body.substring(0, 150)}`);

  console.log('\n=== Diagnosis Complete ===');
}

diagnose().catch(console.error);
