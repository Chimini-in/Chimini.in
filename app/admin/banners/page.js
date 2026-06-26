"use client";

import React, { useEffect, useState } from 'react';
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#1a1a1a', fontSize: '1.2rem' }}>Banners & Ads Management</h3>
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
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '500px' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem' }}>{editingId ? 'Edit Banner' : 'Add Banner'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Section ID *</label>
                  <select value={formData.section_id} onChange={e => setFormData({...formData, section_id: e.target.value})} required style={inputStyle}>
                    <option value="hero">Hero Slider</option>
                    <option value="ads_1">Promo Ads Grid</option>
                    <option value="brand_story">Brand Story Banner</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Sort Order</label>
                  <input type="number" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})} style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Image URL *</label>
                <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} required style={inputStyle} placeholder="https://..." />
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
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem' };
