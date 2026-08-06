"use client";

import React, { useEffect, useState, useRef } from 'react';
import { supabaseClient } from '../../../lib/supabase';

export default function CollectionsAdminPage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', image_url: '', link_url: '', sort_order: 0, is_published: true
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabaseClient
      .from('collections').select('*').order('sort_order').order('created_at');
    if (data) setCollections(data);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabaseClient.from('collections').update(formData).eq('id', editingId);
    } else {
      await supabaseClient.from('collections').insert([formData]);
    }
    closeModal(); fetchData();
  };

  const openModal = (item = null) => {
    setUploadError(null);
    if (item) {
      setEditingId(item.id);
      setFormData({
        title: item.title, description: item.description || '',
        image_url: item.image_url || '', link_url: item.link_url || '',
        sort_order: item.sort_order || 0, is_published: item.is_published !== false
      });
    } else {
      setEditingId(null);
      setFormData({ title: '', description: '', image_url: '', link_url: '', sort_order: 0, is_published: true });
    }
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditingId(null); setUploadError(null); };

  const handleDelete = async (id) => {
    if (confirm('Delete this collection?')) {
      await supabaseClient.from('collections').delete().eq('id', id);
      fetchData();
    }
  };

  const togglePublish = async (id, current) => {
    await supabaseClient.from('collections').update({ is_published: !current }).eq('id', id);
    fetchData();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setUploadError('Please select a JPG, PNG, or WebP image.'); return;
    }
    if (file.size > 5 * 1024 * 1024) { setUploadError('Max file size is 5MB.'); return; }
    setUploading(true); setUploadError(null);
    try {
      const ext = file.name.split('.').pop();
      const path = `collections/${Date.now()}_${Math.random().toString(36).substring(2,7)}.${ext}`;
      const { error } = await supabaseClient.storage.from('images').upload(path, file, { cacheControl: '3600', upsert: false });
      if (error) throw error;
      const { data } = supabaseClient.storage.from('images').getPublicUrl(path);
      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (err) { setUploadError(err.message || 'Upload failed.'); }
    finally { setUploading(false); if (fileInputRef.current) fileInputRef.current.value = ''; }
  };

  const iStyle = { width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#1a1a1a', fontSize: '1.2rem' }}>Featured Collections</h3>
        <button onClick={() => openModal()}
          style={{ padding: '10px 20px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
          + Add Collection
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        {loading ? <p style={{ padding: '20px' }}>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Order</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Image</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Title</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Link</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {collections.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>No collections yet. Add one above!</td></tr>
              ) : collections.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '15px', fontSize: '0.9rem', color: '#64748b' }}>{item.sort_order}</td>
                  <td style={{ padding: '15px' }}>
                    {item.image_url
                      ? <img src={item.image_url} alt={item.title} style={{ width: '80px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                      : <div style={{ width: '80px', height: '45px', backgroundColor: '#f1f5f9', borderRadius: '4px' }} />}
                  </td>
                  <td style={{ padding: '15px', fontSize: '0.9rem', fontWeight: '500', color: '#1a1a1a' }}>{item.title}<br/>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 400 }}>{item.description}</span>
                  </td>
                  <td style={{ padding: '15px', fontSize: '0.82rem', color: '#64748b' }}>{item.link_url || '—'}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <button onClick={() => togglePublish(item.id, item.is_published !== false)}
                      style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', border: 'none', cursor: 'pointer',
                        backgroundColor: item.is_published !== false ? '#dcfce7' : '#f1f5f9',
                        color: item.is_published !== false ? '#166534' : '#64748b' }}>
                      {item.is_published !== false ? 'Published' : 'Hidden'}
                    </button>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'right' }}>
                    <button onClick={() => openModal(item)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '15px', fontSize: '0.85rem' }}>Edit</button>
                    <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem' }}>{editingId ? 'Edit Collection' : 'Add Collection'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Title *</label>
                <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required style={iStyle} placeholder="e.g. Festive Collection" />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Description</label>
                <input type="text" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} style={iStyle} placeholder="Short tagline" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Link URL</label>
                  <input type="text" value={formData.link_url} onChange={e => setFormData({ ...formData, link_url: e.target.value })} style={iStyle} placeholder="/collections" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Sort Order</label>
                  <input type="number" value={formData.sort_order} onChange={e => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })} style={iStyle} />
                </div>
              </div>

              {/* Image */}
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Collection Image</label>
                {formData.image_url && (
                  <img src={formData.image_url} alt="Preview" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '8px', border: '1px solid #e2e8f0' }} />
                )}
                <input type="text" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} style={{ ...iStyle, marginBottom: '8px' }} placeholder="https://..." />
                <input ref={fileInputRef} type="file" accept="image/png, image/jpeg, image/webp" style={{ display: 'none' }} onChange={handleFileUpload} />
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading}
                  style={{ width: '100%', padding: '9px', backgroundColor: uploading ? '#e2e8f0' : '#f0f9ff', color: uploading ? '#94a3b8' : '#0369a1', border: '1px dashed #7dd3fc', borderRadius: '6px', cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '0.85rem', fontWeight: '500' }}>
                  {uploading ? 'Uploading…' : '📁 Upload from File'}
                </button>
                {uploadError && <div style={{ marginTop: '6px', padding: '8px 12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', fontSize: '0.82rem', color: '#b91c1c' }}>⚠️ {uploadError}</div>}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="checkbox" id="col_pub" checked={formData.is_published} onChange={e => setFormData({ ...formData, is_published: e.target.checked })} />
                <label htmlFor="col_pub" style={{ fontSize: '0.9rem' }}>Published (visible on homepage)</label>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeModal} style={{ padding: '10px 20px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={uploading} style={{ padding: '10px 20px', backgroundColor: uploading ? '#94a3b8' : 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: uploading ? 'not-allowed' : 'pointer' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
