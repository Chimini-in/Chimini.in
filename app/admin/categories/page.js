"use client";

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../../lib/supabase';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', slug: '', sort_order: 0 });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabaseClient
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });
      
    if (!error && data) {
      setCategories(data);
    }
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabaseClient.from('categories').update(formData).eq('id', editingId);
    } else {
      await supabaseClient.from('categories').insert([formData]);
    }
    setFormData({ title: '', slug: '', sort_order: 0 });
    setEditingId(null);
    fetchCategories();
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setFormData({ title: cat.title, slug: cat.slug, sort_order: cat.sort_order });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await supabaseClient.from('categories').delete().eq('id', id);
      fetchCategories();
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Form */}
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1a1a1a', fontSize: '1.1rem' }}>{editingId ? 'Edit Category' : 'Add New Category'}</h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#475569' }}>Title</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} 
                required 
                style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#475569' }}>Slug (URL friendly)</label>
              <input 
                type="text" 
                value={formData.slug} 
                onChange={e => setFormData({...formData, slug: e.target.value})} 
                required 
                style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#475569' }}>Sort Order</label>
              <input 
                type="number" 
                value={formData.sort_order} 
                onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})} 
                style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button type="submit" style={{ padding: '10px 15px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {editingId ? 'Update Category' : 'Save Category'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', slug: '', sort_order: 0 }); }} style={{ padding: '10px 15px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div style={{ flex: 2, backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1a1a1a', fontSize: '1.1rem' }}>Existing Categories</h3>
          {loading ? <p>Loading...</p> : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
                  <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#64748b' }}>Order</th>
                  <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#64748b' }}>Title</th>
                  <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#64748b' }}>Slug</th>
                  <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#64748b', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr><td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>No categories found</td></tr>
                ) : categories.map(cat => (
                  <tr key={cat.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 10px', fontSize: '0.9rem', color: '#1a1a1a' }}>{cat.sort_order}</td>
                    <td style={{ padding: '12px 10px', fontSize: '0.9rem', color: '#1a1a1a', fontWeight: '500' }}>{cat.title}</td>
                    <td style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#64748b' }}>{cat.slug}</td>
                    <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                      <button onClick={() => handleEdit(cat)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '10px', fontSize: '0.85rem' }}>Edit</button>
                      <button onClick={() => handleDelete(cat.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
