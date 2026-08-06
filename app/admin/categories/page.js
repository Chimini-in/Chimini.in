"use client";

import React, { useEffect, useState, useRef } from 'react';
import { supabaseClient } from '../../../lib/supabase';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', slug: '', sort_order: 0, image_url: '', icon: '', is_published: true });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    setLoading(true);
    const { data, error } = await supabaseClient
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });
    if (!error && data) setCategories(data);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabaseClient.from('categories').update(formData).eq('id', editingId);
    } else {
      await supabaseClient.from('categories').insert([formData]);
    }
    setFormData({ title: '', slug: '', sort_order: 0, image_url: '', icon: '', is_published: true });
    setEditingId(null);
    fetchCategories();
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setFormData({
      title: cat.title, slug: cat.slug, sort_order: cat.sort_order,
      image_url: cat.image_url || '', icon: cat.icon || '', is_published: cat.is_published !== false
    });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      await supabaseClient.from('categories').delete().eq('id', id);
      fetchCategories();
    }
  };

  const togglePublish = async (id, current) => {
    await supabaseClient.from('categories').update({ is_published: !current }).eq('id', id);
    fetchCategories();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Please select a JPG, PNG, or WebP image.'); return;
    }
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const path = `categories/${Date.now()}_${Math.random().toString(36).substring(2,7)}.${ext}`;
      const { error } = await supabaseClient.storage.from('images').upload(path, file);
      if (error) throw error;
      const { data } = supabaseClient.storage.from('images').getPublicUrl(path);
      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (err) { alert('Upload failed: ' + err.message); }
    finally { setUploading(false); if (fileInputRef.current) fileInputRef.current.value = ''; }
  };

  const iStyle = { width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' };

  return (
    <div>
      <div style={{ display: 'flex', gap: '40px' }}>
        {/* Form */}
        <div style={{ flex: 1, backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#1a1a1a', fontSize: '1.1rem' }}>
            {editingId ? 'Edit Category' : 'Add New Category'}
          </h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#475569' }}>Title *</label>
              <input type="text" value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                required style={iStyle} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#475569' }}>Slug</label>
              <input type="text" value={formData.slug}
                onChange={e => setFormData({ ...formData, slug: e.target.value })}
                required style={iStyle} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#475569' }}>Sort Order</label>
                <input type="number" value={formData.sort_order}
                  onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  style={iStyle} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#475569' }}>Icon (emoji)</label>
                <input type="text" value={formData.icon}
                  onChange={e => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="🕯️" style={iStyle} />
              </div>
            </div>

            {/* Image */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', color: '#475569' }}>Image</label>
              {formData.image_url && (
                <img src={formData.image_url} alt="Preview" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' }} />
              )}
              <input type="text" value={formData.image_url}
                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                style={{ ...iStyle, marginBottom: '8px' }} placeholder="https://..." />
              <input ref={fileInputRef} type="file" accept="image/png, image/jpeg, image/webp" style={{ display: 'none' }} onChange={handleFileUpload} />
              <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                style={{ width: '100%', padding: '9px', backgroundColor: '#f0f9ff', color: '#0369a1', border: '1px dashed #7dd3fc', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}>
                {uploading ? 'Uploading…' : '📁 Upload from File'}
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" id="cat_pub" checked={formData.is_published}
                onChange={e => setFormData({ ...formData, is_published: e.target.checked })} />
              <label htmlFor="cat_pub" style={{ fontSize: '0.9rem' }}>Published (visible on storefront)</label>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <button type="submit" style={{ padding: '10px 15px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                {editingId ? 'Update Category' : 'Save Category'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', slug: '', sort_order: 0, image_url: '', icon: '', is_published: true }); }}
                  style={{ padding: '10px 15px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
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
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#64748b' }}>Order</th>
                  <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#64748b' }}>Image</th>
                  <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#64748b' }}>Title</th>
                  <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#64748b' }}>Slug</th>
                  <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#64748b', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr><td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>No categories found</td></tr>
                ) : categories.map(cat => (
                  <tr key={cat.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 10px', fontSize: '0.9rem' }}>{cat.sort_order}</td>
                    <td style={{ padding: '12px 10px' }}>
                      {cat.image_url
                        ? <img src={cat.image_url} alt={cat.title} style={{ width: '50px', height: '35px', objectFit: 'cover', borderRadius: '4px' }} />
                        : <span style={{ fontSize: '1.5rem' }}>{cat.icon || '—'}</span>}
                    </td>
                    <td style={{ padding: '12px 10px', fontSize: '0.9rem', fontWeight: '500' }}>{cat.icon} {cat.title}</td>
                    <td style={{ padding: '12px 10px', fontSize: '0.85rem', color: '#64748b' }}>{cat.slug}</td>
                    <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                      <button onClick={() => togglePublish(cat.id, cat.is_published !== false)}
                        style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', border: 'none', cursor: 'pointer', backgroundColor: cat.is_published !== false ? '#dcfce7' : '#f1f5f9', color: cat.is_published !== false ? '#166534' : '#64748b' }}>
                        {cat.is_published !== false ? 'Published' : 'Hidden'}
                      </button>
                    </td>
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
