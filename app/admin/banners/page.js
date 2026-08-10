"use client";

import React, { useEffect, useState, useRef } from 'react';
import { supabaseClient } from '../../../lib/supabase';

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    section_id: 'hero', image_url: '', link_url: '', title_overlay: '', 
    subtitle_overlay: '', button_text: '', sort_order: 0, is_published: true
  });

  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabaseClient
      .from('banners')
      .select('*')
      .order('section_id')
      .order('sort_order');
      
    if (data) setBanners(data);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabaseClient.from('banners').update(formData).eq('id', editingId);
    } else {
      await supabaseClient.from('banners').insert([formData]);
    }
    closeModal();
    fetchData();
  };

  const openModal = (item = null) => {
    setUploadError(null);
    if (item) {
      setEditingId(item.id);
      setFormData({
        section_id: item.section_id, image_url: item.image_url, link_url: item.link_url || '',
        title_overlay: item.title_overlay || '', subtitle_overlay: item.subtitle_overlay || '',
        button_text: item.button_text || '', sort_order: item.sort_order || 0, is_published: item.is_published
      });
    } else {
      setEditingId(null);
      setFormData({
        section_id: 'hero', image_url: '', link_url: '', title_overlay: '', 
        subtitle_overlay: '', button_text: '', sort_order: 0, is_published: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setUploadError(null);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this banner?")) {
      await supabaseClient.from('banners').delete().eq('id', id);
      fetchData();
    }
  };

  const togglePublish = async (id, currentStatus) => {
    await supabaseClient.from('banners').update({ is_published: !currentStatus }).eq('id', id);
    fetchData();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Invalid file type. Please select a JPG, PNG, or WebP image.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds 5MB. Please choose a smaller image.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `banners/${fileName}`;

      const { error: storageError } = await supabaseClient.storage
        .from('images')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (storageError) throw storageError;

      const { data } = supabaseClient.storage
        .from('images')
        .getPublicUrl(filePath);

      if (!data?.publicUrl) throw new Error('Could not retrieve the public URL.');

      setFormData(prev => ({ ...prev, image_url: data.publicUrl }));
    } catch (err) {
      console.error('Upload error:', err);
      setUploadError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      // Reset the file input so the same file can be re-selected if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#1a1a1a', fontSize: '1.2rem' }}>Banners &amp; Ads Management</h3>
        <button onClick={() => openModal()} style={{ padding: '10px 20px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
          + Add Banner
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        {loading ? <p style={{ padding: '20px' }}>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Section</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Image</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Text Overlay</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '15px', fontSize: '0.9rem', fontWeight: '500' }}>{item.section_id.toUpperCase()}</td>
                  <td style={{ padding: '15px' }}>
                    <img src={item.image_url} alt="Banner" style={{ width: '100px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  </td>
                  <td style={{ padding: '15px', fontSize: '0.85rem', color: '#1a1a1a' }}>
                    <strong>{item.title_overlay}</strong><br/><span style={{ color: '#64748b' }}>{item.subtitle_overlay}</span>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <button onClick={() => togglePublish(item.id, item.is_published)} style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', border: 'none', cursor: 'pointer', backgroundColor: item.is_published ? '#dcfce7' : '#f1f5f9', color: item.is_published ? '#166534' : '#64748b' }}>
                      {item.is_published ? 'Published' : 'Hidden'}
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
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '540px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem' }}>{editingId ? 'Edit Banner' : 'Add Banner'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Section ID *</label>
                  <select value={formData.section_id} onChange={e => setFormData({...formData, section_id: e.target.value})} required style={inputStyle}>
                    <option value="hero">Hero Slider (Home)</option>
                    <option value="ads_1">Promo Ads Grid (Home)</option>
                    <option value="brand_story">Brand Story Banner (Home)</option>
                    <option value="shop">Shop Page Banner</option>
                    <option value="collections">Collections Page Banner</option>
                    <option value="gifts">Gifts Page Banner</option>
                    <option value="about">About Us Page Banner</option>
                    <option value="contact">Contact Us Page Banner</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Sort Order</label>
                  <input type="number" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})} style={inputStyle} />
                </div>
              </div>

              {/* Image URL + File Upload */}
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Banner Image *</label>

                {/* Image Preview */}
                {formData.image_url && (
                  <div style={{ marginBottom: '10px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', position: 'relative' }}>
                    <img
                      src={formData.image_url}
                      alt="Banner preview"
                      style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                      onError={e => { e.target.style.display = 'none'; }}
                    />
                    <div style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', fontWeight: '500' }}>
                      Preview
                    </div>
                  </div>
                )}

                {/* URL input */}
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={e => setFormData({...formData, image_url: e.target.value})}
                  required
                  style={{ ...inputStyle, marginBottom: '8px' }}
                  placeholder="https://... or use Upload from File below"
                />

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  style={{ display: 'none' }}
                  id="bannerFileInput"
                  onChange={handleFileUpload}
                />

                {/* Upload button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    padding: '9px 16px',
                    backgroundColor: uploading ? '#e2e8f0' : '#f0f9ff',
                    color: uploading ? '#94a3b8' : '#0369a1',
                    border: '1px dashed ' + (uploading ? '#cbd5e1' : '#7dd3fc'),
                    borderRadius: '6px',
                    cursor: uploading ? 'not-allowed' : 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  {uploading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
                      </svg>
                      Upload from File
                    </>
                  )}
                </button>
                <p style={{ margin: '5px 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
                  Accepted formats: JPG, PNG, WebP · Max size: 5MB
                </p>

                {/* Upload error */}
                {uploadError && (
                  <div style={{ marginTop: '8px', padding: '8px 12px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', fontSize: '0.82rem', color: '#b91c1c' }}>
                    ⚠️ {uploadError}
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Title Overlay</label>
                  <input type="text" value={formData.title_overlay} onChange={e => setFormData({...formData, title_overlay: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Subtitle Overlay</label>
                  <input type="text" value={formData.subtitle_overlay} onChange={e => setFormData({...formData, subtitle_overlay: e.target.value})} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Button Text</label>
                  <input type="text" value={formData.button_text} onChange={e => setFormData({...formData, button_text: e.target.value})} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Link URL</label>
                  <input type="text" value={formData.link_url} onChange={e => setFormData({...formData, link_url: e.target.value})} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeModal} style={{ padding: '10px 20px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                <button
                  type="submit"
                  disabled={uploading}
                  style={{ padding: '10px 20px', backgroundColor: uploading ? '#94a3b8' : 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: uploading ? 'not-allowed' : 'pointer' }}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' };
