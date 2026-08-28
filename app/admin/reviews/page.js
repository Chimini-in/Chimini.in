"use client";

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../../lib/supabase';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    author: '', city: '', rating: 5, content: '', product_tag: '', is_approved: false, is_pinned: false
  });

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const fetchTimeout = setTimeout(() => setLoading(false), 3000);
    setLoading(true);
    const { data } = await supabaseClient
      .from('reviews').select('*').order('created_at', { ascending: false });
    if (data) setReviews(data);
    clearTimeout(fetchTimeout);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingId) {
      await supabaseClient.from('reviews').update(formData).eq('id', editingId);
    } else {
      await supabaseClient.from('reviews').insert([formData]);
    }
    closeModal(); fetchData();
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        author: item.author, city: item.city || '', rating: item.rating || 5,
        content: item.content, product_tag: item.product_tag || '',
        is_approved: item.is_approved, is_pinned: item.is_pinned
      });
    } else {
      setEditingId(null);
      setFormData({ author: '', city: '', rating: 5, content: '', product_tag: '', is_approved: false, is_pinned: false });
    }
    setShowModal(true);
  };

  const closeModal = () => { setShowModal(false); setEditingId(null); };

  const handleDelete = async (id) => {
    if (confirm('Delete this review permanently?')) {
      await supabaseClient.from('reviews').delete().eq('id', id);
      fetchData();
    }
  };

  const toggleField = async (id, field, current) => {
    await supabaseClient.from('reviews').update({ [field]: !current }).eq('id', id);
    fetchData();
  };

  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);
  const iStyle = { width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: 0, color: '#1a1a1a', fontSize: '1.2rem' }}>Customer Reviews</h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b' }}>Approve reviews to make them public · Pin to show on homepage</p>
        </div>
        <button onClick={() => openModal()}
          style={{ padding: '10px 20px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
          + Add Review
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        {loading ? <p style={{ padding: '20px' }}>Loading...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Author</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Review</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Product Tag</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Rating</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Approved</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Pinned</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.length === 0 ? (
                <tr><td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>No reviews yet.</td></tr>
              ) : reviews.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '15px', fontSize: '0.9rem', fontWeight: '500', color: '#1a1a1a' }}>
                    {item.author}<br/><span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 400 }}>{item.city}</span>
                  </td>
                  <td style={{ padding: '15px', fontSize: '0.85rem', color: '#475569', maxWidth: '280px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                    "{item.content}"
                  </td>
                  <td style={{ padding: '15px', fontSize: '0.82rem', color: '#64748b' }}>{item.product_tag || '—'}</td>
                  <td style={{ padding: '15px', textAlign: 'center', color: '#f59e0b', fontSize: '0.9rem' }}>{stars(item.rating || 5)}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <button onClick={() => toggleField(item.id, 'is_approved', item.is_approved)}
                      style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', border: 'none', cursor: 'pointer',
                        backgroundColor: item.is_approved ? '#dcfce7' : '#fef2f2',
                        color: item.is_approved ? '#166534' : '#b91c1c' }}>
                      {item.is_approved ? '✓ Approved' : '✗ Hidden'}
                    </button>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <button onClick={() => toggleField(item.id, 'is_pinned', item.is_pinned)}
                      style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', border: 'none', cursor: 'pointer',
                        backgroundColor: item.is_pinned ? '#fef9c3' : '#f1f5f9',
                        color: item.is_pinned ? '#854d0e' : '#64748b' }}>
                      {item.is_pinned ? '📌 Pinned' : 'Pin'}
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
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem' }}>{editingId ? 'Edit Review' : 'Add Review'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Author *</label>
                  <input type="text" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} required style={iStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>City</label>
                  <input type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} style={iStyle} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Rating (1–5)</label>
                  <input type="number" min="1" max="5" value={formData.rating} onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })} style={iStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Product Tag</label>
                  <input type="text" value={formData.product_tag} onChange={e => setFormData({ ...formData, product_tag: e.target.value })} style={iStyle} placeholder="e.g. Jasmine Candle" />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Review Content *</label>
                <textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} required style={{ ...iStyle, minHeight: '90px' }} />
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" id="r_approved" checked={formData.is_approved} onChange={e => setFormData({ ...formData, is_approved: e.target.checked })} />
                  <label htmlFor="r_approved" style={{ fontSize: '0.9rem' }}>Approved (public)</label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" id="r_pinned" checked={formData.is_pinned} onChange={e => setFormData({ ...formData, is_pinned: e.target.checked })} />
                  <label htmlFor="r_pinned" style={{ fontSize: '0.9rem' }}>📌 Pin to homepage</label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px', justifyContent: 'flex-end' }}>
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
