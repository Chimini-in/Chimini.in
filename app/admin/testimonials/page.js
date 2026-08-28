"use client";

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../../lib/supabase';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    author: '', city: '', caption: '', content: '', rating: 5,
    theme: 'gold', sort_order: 0, is_published: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchTimeout = setTimeout(() => setLoading(false), 3000);
    setLoading(true);
    const { data } = await supabaseClient
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true });
      
    if (data) setTestimonials(data);
    clearTimeout(fetchTimeout);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabaseClient.from('testimonials').update(formData).eq('id', editingId);
    } else {
      await supabaseClient.from('testimonials').insert([formData]);
    }
    
    closeModal();
    fetchData();
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        author: item.author, city: item.city || '', caption: item.caption || '',
        content: item.content, rating: item.rating || 5, theme: item.theme || 'gold',
        sort_order: item.sort_order || 0, is_published: item.is_published
      });
    } else {
      setEditingId(null);
      setFormData({
        author: '', city: '', caption: '', content: '', rating: 5,
        theme: 'gold', sort_order: 0, is_published: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this testimonial?")) {
      await supabaseClient.from('testimonials').delete().eq('id', id);
      fetchData();
    }
  };

  const togglePublish = async (id, currentStatus) => {
    await supabaseClient.from('testimonials').update({ is_published: !currentStatus }).eq('id', id);
    fetchData();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#1a1a1a', fontSize: '1.2rem' }}>Testimonials Management</h3>
        <button onClick={() => openModal()} style={{ padding: '10px 20px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
          + Add Testimonial
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        {loading ? <p style={{ padding: '20px' }}>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Order</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Author</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Content snippet</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Theme</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '15px', fontSize: '0.9rem' }}>{item.sort_order}</td>
                  <td style={{ padding: '15px', fontSize: '0.9rem', color: '#1a1a1a', fontWeight: '500' }}>
                    {item.author}<br/><span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '400' }}>{item.city}</span>
                  </td>
                  <td style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    "{item.content}"
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', 
                      backgroundColor: item.theme === 'gold' ? '#fef3c7' : item.theme === 'teal' ? '#ccfbf1' : '#ffe4e6',
                      color: item.theme === 'gold' ? '#92400e' : item.theme === 'teal' ? '#115e59' : '#9f1239'
                    }}>{item.theme}</span>
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
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem' }}>{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Author *</label>
                  <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} required style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>City</label>
                  <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Caption (e.g. "Client photo")</label>
                <input type="text" value={formData.caption} onChange={e => setFormData({...formData, caption: e.target.value})} style={inputStyle} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Review Content *</label>
                <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} required style={{...inputStyle, minHeight: '80px'}} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Rating (1-5)</label>
                  <input type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Theme</label>
                  <select value={formData.theme} onChange={e => setFormData({...formData, theme: e.target.value})} style={inputStyle}>
                    <option value="gold">Gold</option>
                    <option value="teal">Teal</option>
                    <option value="coral">Coral</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Order</label>
                  <input type="number" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})} style={inputStyle} />
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
