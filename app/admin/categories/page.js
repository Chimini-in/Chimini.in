"use client";

import React, { useEffect, useState, useRef } from 'react';
import { supabaseClient } from '../../../lib/supabase';

export default function FragrancesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    sort_order: 0,
    image_url: '',
    is_published: true
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch fragrances error:', error);
      } else if (data) {
        setCategories(data);
      }
    } catch (err) {
      console.error('Fetch exception:', err);
    }
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const titleTrimmed = formData.title.trim();
    if (!titleTrimmed) {
      setSaveError('Please enter a fragrance heading.');
      setSaving(false);
      return;
    }

    const slugVal = formData.slug.trim() || titleTrimmed.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const payload = {
      title: titleTrimmed,
      slug: slugVal,
      sort_order: parseInt(formData.sort_order) || 0,
      image_url: formData.image_url.trim(),
      is_published: formData.is_published !== false
    };

    try {
      if (editingId) {
        const { error } = await supabaseClient
          .from('categories')
          .update(payload)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabaseClient
          .from('categories')
          .insert([payload]);

        if (error) throw error;
      }

      setFormData({ title: '', slug: '', sort_order: categories.length + 1, image_url: '', is_published: true });
      setEditingId(null);
      await fetchCategories();
    } catch (err) {
      console.error('Save fragrance error:', err);
      const msg = err.message || 'Failed to save fragrance. Please check database permissions.';
      setSaveError(msg);
      alert('Save failed: ' + msg);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat.id);
    setSaveError(null);
    setUploadError(null);
    setFormData({
      title: cat.title || '',
      slug: cat.slug || '',
      sort_order: cat.sort_order || 0,
      image_url: cat.image_url || '',
      is_published: cat.is_published !== false
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setSaveError(null);
    setUploadError(null);
    setFormData({ title: '', slug: '', sort_order: categories.length, image_url: '', is_published: true });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this fragrance circle?')) {
      try {
        const { error } = await supabaseClient.from('categories').delete().eq('id', id);
        if (error) {
          alert('Delete failed: ' + error.message);
        } else {
          fetchCategories();
        }
      } catch (err) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  const togglePublish = async (id, current) => {
    try {
      const { error } = await supabaseClient
        .from('categories')
        .update({ is_published: !current })
        .eq('id', id);

      if (error) {
        alert('Update failed: ' + error.message);
      } else {
        fetchCategories();
      }
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Please select a JPG, PNG, or WebP image.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Max file size is 5MB.');
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      const ext = file.name.split('.').pop();
      const path = `categories/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
      const { error } = await supabaseClient.storage.from('images').upload(path, file, { cacheControl: '3600', upsert: false });
      if (error) throw error;
      const { data } = supabaseClient.storage.from('images').getPublicUrl(path);
      if (data?.publicUrl) {
        setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
      }
    } catch (err) {
      setUploadError(err.message || 'Upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const iStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    fontSize: '0.9rem',
    boxSizing: 'border-box'
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: 0, color: '#1a1a1a', fontSize: '1.3rem' }}>Shop By Fragrance (Homepage Circles)</h3>
        <p style={{ margin: '6px 0 0', color: '#64748b', fontSize: '0.88rem' }}>
          Manage the circular fragrance icons shown in the &quot;Shop By Fragrance&quot; section on the homepage (e.g. Rose, Jasmine, Sandalwood, Citrus, Honey). Clicking any circle takes customers to the shop filtered by that fragrance.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '30px', alignItems: 'start' }}>
        {/* Form Panel */}
        <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0' }}>
          <h4 style={{ marginTop: 0, marginBottom: '18px', color: '#1a1a1a', fontSize: '1.1rem' }}>
            {editingId ? 'Edit Fragrance Circle' : '+ Add New Fragrance Circle'}
          </h4>

          {saveError && (
            <div style={{ marginBottom: '15px', padding: '10px 14px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', fontSize: '0.85rem', color: '#b91c1c' }}>
              ⚠️ {saveError}
            </div>
          )}

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
                Fragrance Heading / Name *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                required
                style={iStyle}
                placeholder="e.g. Rose, Jasmine, Sandalwood, Citrus, Honey"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
                  Filter Slug / Tag
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                  style={iStyle}
                  placeholder="e.g. rose"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
                  Sort Order
                </label>
                <input
                  type="number"
                  value={formData.sort_order}
                  onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                  style={iStyle}
                />
              </div>
            </div>

            {/* Circular Preview & Image Input */}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
                Fragrance Circle Image
              </label>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '10px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: '#f8fafc',
                  border: '2px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {formData.image_url ? (
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', textAlign: 'center', padding: '4px' }}>No Image</span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                    style={{ ...iStyle, marginBottom: '8px' }}
                    placeholder="https://... image URL"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    style={{ display: 'none' }}
                    onChange={handleFileUpload}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      backgroundColor: uploading ? '#e2e8f0' : '#f0f9ff',
                      color: uploading ? '#94a3b8' : '#0369a1',
                      border: '1px dashed #7dd3fc',
                      borderRadius: '6px',
                      cursor: uploading ? 'not-allowed' : 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: '500'
                    }}
                  >
                    {uploading ? '⏳ Uploading…' : '📁 Upload Photo from File'}
                  </button>
                </div>
              </div>

              {uploadError && (
                <div style={{ padding: '8px 12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', fontSize: '0.82rem', color: '#b91c1c' }}>
                  ⚠️ {uploadError}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '6px' }}>
              <input
                type="checkbox"
                id="cat_pub"
                checked={formData.is_published}
                onChange={e => setFormData({ ...formData, is_published: e.target.checked })}
              />
              <label htmlFor="cat_pub" style={{ fontSize: '0.88rem', color: '#334155', cursor: 'pointer' }}>
                Published (visible on Homepage)
              </label>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={saving}
                  style={{
                    flex: 1,
                    padding: '10px',
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={uploading || saving}
                style={{
                  flex: 2,
                  padding: '10px',
                  backgroundColor: (uploading || saving) ? '#94a3b8' : '#1a1a1a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: (uploading || saving) ? 'not-allowed' : 'pointer',
                  fontWeight: '500'
                }}
              >
                {saving ? 'Saving…' : (editingId ? 'Update Fragrance' : 'Save Fragrance')}
              </button>
            </div>
          </form>
        </div>

        {/* List Table */}
        <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ margin: 0, fontSize: '1rem', color: '#1a1a1a' }}>Active Fragrances ({categories.length})</h4>
          </div>

          {loading ? (
            <p style={{ padding: '24px', color: '#64748b', textAlign: 'center' }}>Loading fragrances...</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', backgroundColor: '#f8fafc' }}>
                  <th style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748b', width: '50px' }}>Order</th>
                  <th style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748b', width: '70px' }}>Circle</th>
                  <th style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748b' }}>Heading</th>
                  <th style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748b' }}>Filter Tag</th>
                  <th style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748b', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748b', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                      No fragrances created yet. Add one on the left!
                    </td>
                  </tr>
                ) : categories.map(cat => (
                  <tr key={cat.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontSize: '0.88rem', color: '#64748b' }}>{cat.sort_order ?? 0}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                        {cat.image_url ? (
                          <img src={cat.image_url} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.style.display = 'none'; }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', backgroundColor: '#f1f5f9' }} />
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a' }}>
                      {cat.title}
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '0.82rem', color: '#64748b' }}>
                      <code>{cat.slug || cat.title.toLowerCase()}</code>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                      <button
                        onClick={() => togglePublish(cat.id, cat.is_published !== false)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: '600',
                          backgroundColor: cat.is_published !== false ? '#dcfce7' : '#f1f5f9',
                          color: cat.is_published !== false ? '#166534' : '#64748b'
                        }}
                      >
                        {cat.is_published !== false ? 'Published' : 'Hidden'}
                      </button>
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleEdit(cat)}
                        style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', marginRight: '12px', fontSize: '0.85rem', fontWeight: '500' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}
                      >
                        Delete
                      </button>
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
