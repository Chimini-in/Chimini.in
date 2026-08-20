"use client";

import React, { useEffect, useState, useRef } from 'react';
import { supabaseClient } from '../../../lib/supabase';

export default function CollectionsAdminPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', image_url: '', link_url: '', sort_order: 0, is_published: true, is_featured: false
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabaseClient
        .from('collections')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Collections fetch error:', error);
      } else if (data) {
        setCollections(data);
      }
    } catch (err) {
      console.error('Collections fetch exception:', err);
    }
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    const slug = formData.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const customLink = formData.link_url?.trim();
    const finalLink = (!customLink || customLink === '/shop' || customLink === '/shop?category=all')
      ? `/shop?category=${slug}`
      : customLink;

    const payload = {
      title: formData.title.trim(),
      description: formData.description?.trim() || '',
      image_url: formData.image_url?.trim() || '',
      link_url: finalLink,
      sort_order: parseInt(formData.sort_order) || 0,
      is_published: formData.is_published !== false,
      is_featured: formData.is_featured === true
    };

    if (!payload.title) {
      setSaveError('Please enter a collection title.');
      setSaving(false);
      return;
    }

    try {
      if (editingId) {
        const { error } = await supabaseClient
          .from('collections')
          .update(payload)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabaseClient
          .from('collections')
          .insert([payload]);

        if (error) throw error;
      }

      closeModal();
      await fetchData();
    } catch (err) {
      console.error('Error saving collection:', err);
      const errMsg = err.message || 'Save failed. Please check database permissions.';
      setSaveError(errMsg);
      alert('Save failed: ' + errMsg);
    } finally {
      setSaving(false);
    }
  };

  const openModal = (item = null) => {
    setUploadError(null);
    setSaveError(null);
    if (item) {
      setEditingId(item.id);
      setFormData({
        title: item.title || item.name || '',
        description: item.description || '',
        image_url: item.image_url || item.image || '',
        link_url: item.link_url || item.link || '',
        sort_order: item.sort_order || 0,
        is_published: item.is_published !== false,
        is_featured: item.is_featured === true || item.is_featured === 'true'
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        image_url: '',
        link_url: '',
        sort_order: collections.length,
        is_published: true,
        is_featured: false
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setUploadError(null);
    setSaveError(null);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      try {
        const { error } = await supabaseClient.from('collections').delete().eq('id', id);
        if (error) {
          alert('Delete failed: ' + error.message);
        } else {
          fetchData();
        }
      } catch (err) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  const togglePublish = async (id, current) => {
    try {
      const { error } = await supabaseClient
        .from('collections')
        .update({ is_published: !current })
        .eq('id', id);

      if (error) {
        alert('Update failed: ' + error.message);
      } else {
        fetchData();
      }
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  };

  const toggleFeatured = async (id, current) => {
    try {
      const { error } = await supabaseClient
        .from('collections')
        .update({ is_featured: !current })
        .eq('id', id);

      if (error) {
        alert('Update failed: ' + error.message);
      } else {
        fetchData();
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
      const path = `collections/${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
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

  const featuredCount = collections.filter(c => c.is_featured === true || c.is_featured === 'true').length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: 0, color: '#1a1a1a', fontSize: '1.2rem' }}>Featured Collections</h3>
          <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.85rem' }}>
            Manage collections. Collections marked as <strong>★ Featured</strong> (up to 4) appear on the Home page grid; all published collections appear on the /collections page.
          </p>
        </div>
        <button
          onClick={() => openModal()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1a1a1a',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          + Add Collection
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '20px', color: '#64748b' }}>Loading collections...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Order</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Image</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Title</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Link</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Home Featured</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {collections.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>
                    No collections yet. Click "+ Add Collection" above!
                  </td>
                </tr>
              ) : collections.map(item => {
                const isItemFeatured = item.is_featured === true || item.is_featured === 'true';
                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '15px', fontSize: '0.9rem', color: '#64748b' }}>{item.sort_order ?? 0}</td>
                    <td style={{ padding: '15px' }}>
                      {item.image_url || item.image ? (
                        <img
                          src={item.image_url || item.image}
                          alt={item.title || item.name}
                          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                        />
                      ) : (
                        <div style={{ width: '60px', height: '60px', backgroundColor: '#f1f5f9', borderRadius: '6px' }} />
                      )}
                    </td>
                    <td style={{ padding: '15px', fontSize: '0.9rem', fontWeight: '500', color: '#1a1a1a' }}>
                      {item.title || item.name}
                      {item.description && (
                        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 400, marginTop: '2px' }}>
                          {item.description}
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '15px', fontSize: '0.82rem', color: '#64748b' }}>
                      {item.link_url || item.link || '—'}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <button
                        onClick={() => toggleFeatured(item.id, isItemFeatured)}
                        title="Click to toggle homepage featured status (max 4 on home)"
                        style={{
                          padding: '5px 12px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: '600',
                          backgroundColor: isItemFeatured ? '#fef3c7' : '#f1f5f9',
                          color: isItemFeatured ? '#b45309' : '#94a3b8'
                        }}
                      >
                        {isItemFeatured ? '★ Featured' : '☆ Not on Home'}
                      </button>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <button
                        onClick={() => togglePublish(item.id, item.is_published !== false)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: '600',
                          backgroundColor: item.is_published !== false ? '#dcfce7' : '#f1f5f9',
                          color: item.is_published !== false ? '#166534' : '#64748b'
                        }}
                      >
                        {item.is_published !== false ? 'Published' : 'Hidden'}
                      </button>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'right' }}>
                      <button
                        onClick={() => openModal(item)}
                        style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '15px', fontSize: '0.85rem', fontWeight: '500' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem', color: '#1a1a1a' }}>
              {editingId ? 'Edit Collection' : 'Add Collection'}
            </h3>
            
            {saveError && (
              <div style={{ marginBottom: '15px', padding: '10px 14px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', fontSize: '0.85rem', color: '#b91c1c' }}>
                ⚠️ {saveError}
              </div>
            )}

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  required
                  style={iStyle}
                  placeholder="e.g. Festive Collection"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
                  Description (optional)
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  style={iStyle}
                  placeholder="Short tagline or subtitle"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
                    Link URL (Destination)
                  </label>
                  <input
                    type="text"
                    value={formData.link_url}
                    onChange={e => setFormData({ ...formData, link_url: e.target.value })}
                    style={iStyle}
                    placeholder={formData.title ? `/shop?category=${formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` : "/shop?category=home-decor"}
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

              {/* Image */}
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
                  Collection Image
                </label>
                {formData.image_url && (
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px', border: '1px solid #e2e8f0' }}
                  />
                )}
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                  style={{ ...iStyle, marginBottom: '8px' }}
                  placeholder="https://... or upload from file below"
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
                    padding: '9px',
                    backgroundColor: uploading ? '#e2e8f0' : '#f0f9ff',
                    color: uploading ? '#94a3b8' : '#0369a1',
                    border: '1px dashed #7dd3fc',
                    borderRadius: '6px',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '500'
                  }}
                >
                  {uploading ? '⏳ Uploading…' : '📁 Upload from File'}
                </button>
                {uploadError && (
                  <div style={{ marginTop: '6px', padding: '8px 12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', fontSize: '0.82rem', color: '#b91c1c' }}>
                    ⚠️ {uploadError}
                  </div>
                )}
              </div>

              {/* Featured & Published checkboxes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="col_featured"
                    checked={formData.is_featured}
                    onChange={e => setFormData({ ...formData, is_featured: e.target.checked })}
                  />
                  <label htmlFor="col_featured" style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e293b', cursor: 'pointer' }}>
                    ★ Feature on Homepage (Display in 4-card grid on Home)
                  </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="checkbox"
                    id="col_pub"
                    checked={formData.is_published}
                    onChange={e => setFormData({ ...formData, is_published: e.target.checked })}
                  />
                  <label htmlFor="col_pub" style={{ fontSize: '0.9rem', color: '#334155', cursor: 'pointer' }}>
                    Published (visible on Collections page and storefront)
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f1f5f9',
                    color: '#475569',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: saving ? 'not-allowed' : 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || saving}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: (uploading || saving) ? '#94a3b8' : '#1a1a1a',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: (uploading || saving) ? 'not-allowed' : 'pointer',
                    fontWeight: '500'
                  }}
                >
                  {saving ? 'Saving…' : 'Save Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
