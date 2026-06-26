"use client";

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../../lib/supabase';

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    banners: 0,
    testimonials: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      if (!supabaseClient) return;
      
      const p = supabaseClient.from('products').select('*', { count: 'exact', head: true });
      const c = supabaseClient.from('categories').select('*', { count: 'exact', head: true });
      const b = supabaseClient.from('banners').select('*', { count: 'exact', head: true });
      const t = supabaseClient.from('testimonials').select('*', { count: 'exact', head: true });
      
      const [pRes, cRes, bRes, tRes] = await Promise.all([p, c, b, t]);
      
      setStats({
        products: pRes.count || 0,
        categories: cRes.count || 0,
        banners: bRes.count || 0,
        testimonials: tRes.count || 0
      });
      setLoading(false);
    }
    
    loadStats();
  }, []);

  return (
    <div>
      <h3 style={{ fontSize: '1.2rem', color: '#1a1a1a', marginBottom: '20px', fontWeight: '500' }}>Store Overview</h3>
      
      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <StatCard title="Total Products" value={stats.products} color="#3b82f6" />
          <StatCard title="Categories" value={stats.categories} color="#10b981" />
          <StatCard title="Active Banners" value={stats.banners} color="#f59e0b" />
          <StatCard title="Testimonials" value={stats.testimonials} color="#8b5cf6" />
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', borderLeft: `4px solid ${color}` }}>
      <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</p>
      <p style={{ margin: '10px 0 0', fontSize: '2rem', fontWeight: '700', color: '#1a1a1a' }}>{value}</p>
    </div>
  );
}
