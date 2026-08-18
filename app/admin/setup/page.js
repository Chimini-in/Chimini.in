"use client";

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../../lib/supabase';

const SUPABASE_PROJECT_REF = 'jvopwqkbtrupkayzfyvl';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2b3B3cWtidHJ1cGtheXpmeXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDQwMjksImV4cCI6MjA5NjgyMDAyOX0.KHWIko4CvlGHDq8QPdNEFqPMXBFkfiZTn_wr9qXWguw';

const TABLES_TO_CHECK = ['banners', 'products', 'categories', 'testimonials', 'settings', 'page_content'];

const SQL_FIX = `
-- 1. Grant ALL table permissions to anon & authenticated
GRANT ALL ON public.banners TO anon, authenticated;
GRANT ALL ON public.products TO anon, authenticated;
GRANT ALL ON public.categories TO anon, authenticated;
GRANT ALL ON public.testimonials TO anon, authenticated;
GRANT ALL ON public.settings TO anon, authenticated;
GRANT ALL ON public.page_content TO anon, authenticated;
GRANT ALL ON public.collections TO anon, authenticated;
GRANT ALL ON public.reviews TO anon, authenticated;

-- 2. Sequence access
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 3. Enable RLS
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 4. Full access policies for anon & authenticated
DROP POLICY IF EXISTS "anon_full_banners" ON public.banners;
DROP POLICY IF EXISTS "admin_all_banners" ON public.banners;
DROP POLICY IF EXISTS "anon_read_banners" ON public.banners;
CREATE POLICY "full_access_banners" ON public.banners FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_products" ON public.products;
DROP POLICY IF EXISTS "admin_all_products" ON public.products;
DROP POLICY IF EXISTS "anon_read_products" ON public.products;
CREATE POLICY "full_access_products" ON public.products FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_categories" ON public.categories;
DROP POLICY IF EXISTS "admin_all_categories" ON public.categories;
DROP POLICY IF EXISTS "anon_read_categories" ON public.categories;
CREATE POLICY "full_access_categories" ON public.categories FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "admin_all_testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "anon_read_testimonials" ON public.testimonials;
CREATE POLICY "full_access_testimonials" ON public.testimonials FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_settings" ON public.settings;
DROP POLICY IF EXISTS "admin_all_settings" ON public.settings;
DROP POLICY IF EXISTS "anon_read_settings" ON public.settings;
CREATE POLICY "full_access_settings" ON public.settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_page_content" ON public.page_content;
DROP POLICY IF EXISTS "admin_all_page_content" ON public.page_content;
DROP POLICY IF EXISTS "anon_read_page_content" ON public.page_content;
CREATE POLICY "full_access_page_content" ON public.page_content FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_collections" ON public.collections;
DROP POLICY IF EXISTS "admin_all_collections" ON public.collections;
DROP POLICY IF EXISTS "anon_read_collections" ON public.collections;
CREATE POLICY "full_access_collections" ON public.collections FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_reviews" ON public.reviews;
DROP POLICY IF EXISTS "admin_all_reviews" ON public.reviews;
DROP POLICY IF EXISTS "anon_read_reviews" ON public.reviews;
CREATE POLICY "full_access_reviews" ON public.reviews FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
`.trim();

export default function DatabaseSetupPage() {
  const [tableStatus, setTableStatus] = useState({});
  const [checking, setChecking] = useState(true);
  const [serviceKey, setServiceKey] = useState('');
  const [applying, setApplying] = useState(false);
  const [applyResult, setApplyResult] = useState(null);
  const [showSql, setShowSql] = useState(false);

  useEffect(() => { runChecks(); }, []);

  const runChecks = async () => {
    setChecking(true);
    const results = {};
    for (const table of TABLES_TO_CHECK) {
      try {
        const { data, error } = await supabaseClient.from(table).select('*').limit(1);
        results[table] = {
          read: !error,
          readError: error?.message || null,
          rowCount: data?.length ?? 0,
        };
      } catch (e) {
        results[table] = { read: false, readError: e.message, rowCount: 0 };
      }
    }
    // Also test write on banners
    try {
      const { error } = await supabaseClient.from('banners').insert([{
        section_id: '__permission_test__',
        image_url: 'test',
        link_url: '/',
        is_published: false,
        sort_order: 9999,
      }]);
      if (!error) {
        // Clean up test row
        await supabaseClient.from('banners').delete().eq('section_id', '__permission_test__');
        results['banners'].write = true;
      } else {
        results['banners'].write = false;
        results['banners'].writeError = error.message;
      }
    } catch (e) {
      results['banners'].write = false;
      results['banners'].writeError = e.message;
    }
    setTableStatus(results);
    setChecking(false);
  };

  const handleApplyFix = async () => {
    if (!serviceKey.trim()) {
      alert('Please enter your Supabase Service Role key first.');
      return;
    }
    setApplying(true);
    setApplyResult(null);
    try {
      const response = await fetch(
        `https://${SUPABASE_PROJECT_REF}.supabase.co/rest/v1/rpc/exec_sql`,
        {
          method: 'POST',
          headers: {
            'apikey': serviceKey.trim(),
            'Authorization': `Bearer ${serviceKey.trim()}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: SQL_FIX }),
        }
      );
      // The Supabase management API or custom RPC might not exist.
      // Service role key approach via direct SQL:
      const data = await response.json();
      if (response.ok) {
        setApplyResult({ success: true, message: 'Permissions applied successfully! Re-checking...' });
      } else {
        setApplyResult({ success: false, message: `API Error: ${data?.message || JSON.stringify(data)}. Please run the SQL manually instead (see below).` });
      }
    } catch (e) {
      setApplyResult({ success: false, message: `Error: ${e.message}. Please run the SQL manually (see below).` });
    }
    await runChecks();
    setApplying(false);
  };

  const allReadOk = TABLES_TO_CHECK.every(t => tableStatus[t]?.read);
  const writeOk = tableStatus['banners']?.write;
  const allOk = allReadOk && writeOk;

  const StatusBadge = ({ ok, label }) => (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '3px 10px', borderRadius: '12px', fontSize: '0.78rem', fontWeight: '600',
      backgroundColor: ok ? '#dcfce7' : '#fef2f2',
      color: ok ? '#166534' : '#dc2626',
    }}>
      {ok ? '✓' : '✗'} {label}
    </span>
  );

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', color: '#1a1a1a' }}>Database Setup & Permissions</h3>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
          Diagnoses and fixes Supabase table permissions so admin changes reflect on the live site.
        </p>
      </div>

      {/* Overall Status Banner */}
      <div style={{
        padding: '16px 20px', borderRadius: '10px', marginBottom: '24px',
        backgroundColor: allOk ? '#f0fdf4' : '#fef2f2',
        border: `1px solid ${allOk ? '#86efac' : '#fca5a5'}`,
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <span style={{ fontSize: '1.5rem' }}>{checking ? '⏳' : allOk ? '✅' : '❌'}</span>
        <div>
          <div style={{ fontWeight: '700', color: allOk ? '#166534' : '#dc2626', marginBottom: '2px' }}>
            {checking ? 'Checking database...' : allOk ? 'Database permissions are correctly configured' : 'Database permissions need to be fixed'}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
            {!checking && !allOk && 'Admin changes are not saving because Supabase table permissions are missing. Follow the fix steps below.'}
          </div>
        </div>
      </div>

      {/* Table Status Grid */}
      <div style={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '20px', marginBottom: '24px' }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: '#1a1a1a' }}>Table Permission Status</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {TABLES_TO_CHECK.map(table => {
            const s = tableStatus[table] || {};
            return (
              <div key={table} style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #f1f5f9', backgroundColor: '#f8fafc' }}>
                <div style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '8px', color: '#1a1a1a' }}>
                  📋 {table}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <StatusBadge ok={s.read} label="Read" />
                  {table === 'banners' && <StatusBadge ok={s.write} label="Write" />}
                </div>
                {(s.readError || s.writeError) && (
                  <div style={{ marginTop: '6px', fontSize: '0.72rem', color: '#dc2626' }}>
                    {s.readError || s.writeError}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button onClick={runChecks} disabled={checking} style={{ marginTop: '16px', padding: '8px 16px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}>
          {checking ? '⏳ Checking...' : '↻ Re-check'}
        </button>
      </div>

      {/* Fix Instructions */}
      {!allOk && (
        <div style={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '24px', marginBottom: '24px' }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '1rem', color: '#1a1a1a' }}>🔧 How to Fix (2 minutes)</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Step 1 */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#1a1a1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', flexShrink: 0 }}>1</div>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Open the Supabase SQL Editor</div>
                <a href={`https://supabase.com/dashboard/project/${SUPABASE_PROJECT_REF}/sql/new`} target="_blank" rel="noreferrer"
                  style={{ color: '#2563eb', fontSize: '0.9rem' }}>
                  → Open SQL Editor ↗
                </a>
              </div>
            </div>

            {/* Step 2 */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#1a1a1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', flexShrink: 0 }}>2</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', marginBottom: '8px' }}>Copy and paste this SQL, then click "Run"</div>
                <button onClick={() => setShowSql(s => !s)} style={{ padding: '6px 12px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', marginBottom: '8px' }}>
                  {showSql ? 'Hide SQL' : 'Show SQL to Copy'}
                </button>
                {showSql && (
                  <div style={{ position: 'relative' }}>
                    <textarea
                      readOnly
                      value={SQL_FIX}
                      style={{ width: '100%', height: '200px', fontFamily: 'monospace', fontSize: '0.75rem', padding: '12px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', resize: 'vertical', boxSizing: 'border-box' }}
                    />
                    <button
                      onClick={() => { navigator.clipboard.writeText(SQL_FIX); }}
                      style={{ position: 'absolute', top: '8px', right: '8px', padding: '4px 10px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}
                    >
                      Copy
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3 */}
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#1a1a1a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', flexShrink: 0 }}>3</div>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>Come back and click "Re-check" above</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>All status badges should turn green ✓</div>
              </div>
            </div>
          </div>

          {applyResult && (
            <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '8px', backgroundColor: applyResult.success ? '#f0fdf4' : '#fef2f2', border: `1px solid ${applyResult.success ? '#86efac' : '#fca5a5'}`, fontSize: '0.88rem', color: applyResult.success ? '#166534' : '#dc2626' }}>
              {applyResult.message}
            </div>
          )}
        </div>
      )}

      {allOk && (
        <div style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f0fdf4', border: '1px solid #86efac', fontSize: '0.9rem', color: '#166534' }}>
          ✅ All permissions are correctly set. Admin changes will now save to Supabase and appear immediately on the live site.
        </div>
      )}
    </div>
  );
}
