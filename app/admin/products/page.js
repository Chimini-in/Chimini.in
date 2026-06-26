"use client";

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../../lib/supabase';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', image_url: '', category_id: '',
    fragrance: '', badges: '', is_published: true, sort_order: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const catRes = await supabaseClient.from('categories').select('*').order('sort_order');
    if (catRes.data) setCategories(catRes.data);

    const prodRes = await supabaseClient
      .from('products')
      .select('*, categories(title)')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false });
      
    if (prodRes.data) setProducts(prodRes.data);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      category_id: formData.category_id || null
    };

    if (editingId) {
      await supabaseClient.from('products').update(payload).eq('id', editingId);
    } else {
      await supabaseClient.from('products').insert([payload]);
    }
    
    closeModal();
    fetchData();
  };

  const openModal = (prod = null) => {
    if (prod) {
      setEditingId(prod.id);
      setFormData({
        title: prod.title,
        description: prod.description || '',
        price: prod.price,
        image_url: prod.image_url || '',
        category_id: prod.category_id || '',
        fragrance: prod.fragrance || '',
        badges: prod.badges || '',
        is_published: prod.is_published,
        sort_order: prod.sort_order || 0
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '', description: '', price: '', image_url: '', category_id: '',
        fragrance: '', badges: '', is_published: true, sort_order: 0
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this product permanently?")) {
      await supabaseClient.from('products').delete().eq('id', id);
      fetchData();
    }
  };

  const togglePublish = async (id, currentStatus) => {
    await supabaseClient.from('products').update({ is_published: !currentStatus }).eq('id', id);
    fetchData();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, color: '#1a1a1a', fontSize: '1.2rem' }}>Products Management</h3>
        <button onClick={() => openModal()} style={{ padding: '10px 20px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
          + Add New Product
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        {loading ? <p style={{ padding: '20px' }}>Loading products...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', width: '60px' }}>Img</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Title</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Category</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>Price</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#94a3b8' }}>No products found. Create one above!</td></tr>
              ) : products.map(prod => (
                <tr key={prod.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '15px' }}>
                    <div style={{ width: '40px', height: '40px', backgroundColor: '#e2e8f0', borderRadius: '4px', backgroundImage: `url(${prod.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  </td>
                  <td style={{ padding: '15px', fontSize: '0.9rem', color: '#1a1a1a', fontWeight: '500' }}>{prod.title}</td>
                  <td style={{ padding: '15px', fontSize: '0.85rem', color: '#64748b' }}>{prod.categories?.title || 'Uncategorized'}</td>
                  <td style={{ padding: '15px', fontSize: '0.9rem', color: '#1a1a1a' }}>₹{prod.price}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <button 
                      onClick={() => togglePublish(prod.id, prod.is_published)}
                      style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.75rem', border: 'none', cursor: 'pointer', backgroundColor: prod.is_published ? '#dcfce7' : '#f1f5f9', color: prod.is_published ? '#166534' : '#64748b' }}
                    >
                      {prod.is_published ? 'Published' : 'Hidden'}
                    </button>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'right' }}>
                    <button onClick={() => openModal(prod)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '15px', fontSize: '0.85rem' }}>Edit</button>
                    <button onClick={() => handleDelete(prod.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem' }}>{editingId ? 'Edit Product' : 'Add Product'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Title *</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Price *</label>
                  <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required style={inputStyle} />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Category</label>
                  <select value={formData.category_id} onChange={e => setFormData({...formData, category_id: e.target.value})} style={inputStyle}>
                    <option value="">-- Select Category --</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Sort Order</label>
                  <input type="number" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})} style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Image URL</label>
                <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} style={inputStyle} placeholder="https://..." />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{...inputStyle, minHeight: '80px'}} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Fragrance Notes</label>
                  <input type="text" value={formData.fragrance} onChange={e => setFormData({...formData, fragrance: e.target.value})} style={inputStyle} placeholder="e.g. Vanilla, Sandalwood" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.85rem' }}>Badges</label>
                  <input type="text" value={formData.badges} onChange={e => setFormData({...formData, badges: e.target.value})} style={inputStyle} placeholder="e.g. NEW, BESTSELLER" />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                <input type="checkbox" id="is_pub" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} />
                <label htmlFor="is_pub" style={{ fontSize: '0.9rem' }}>Publish immediately</label>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={closeModal} style={{ padding: '10px 20px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>{editingId ? 'Save Changes' : 'Create Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const inputStyle = { width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem' };
