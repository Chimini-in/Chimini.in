"use client";

import React, { useEffect, useState, useRef } from 'react';
import { supabaseClient } from '../../../lib/supabase';

// Helper: Upload file to Supabase Storage bucket 'images'
async function uploadProductImage(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) throw new Error('Invalid file format. Please select JPG, PNG, or WebP.');
  if (file.size > 5 * 1024 * 1024) throw new Error('File size exceeds 5MB limit.');

  const ext = file.name.split('.').pop();
  const fileName = `prod_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
  const filePath = `products/${fileName}`;

  const { error } = await supabaseClient.storage
    .from('images')
    .upload(filePath, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;

  const { data } = supabaseClient.storage.from('images').getPublicUrl(filePath);
  if (!data?.publicUrl) throw new Error('Could not retrieve uploaded image URL.');
  return data.publicUrl;
}

const SLOT_LABELS = [
  { title: "1. Cover / Main Image *", desc: "Default image across catalog & homepage", required: true },
  { title: "2. Secondary Hover Image", desc: "Shown on product card hover & PDP", required: false },
  { title: "3. Gallery Image 3", desc: "Shown in Product Detail Page gallery", required: false },
  { title: "4. Gallery Image 4", desc: "Shown in Product Detail Page gallery", required: false },
  { title: "5. Gallery Image 5", desc: "Shown in Product Detail Page gallery", required: false },
  { title: "6. Gallery Image 6", desc: "Shown in Product Detail Page gallery", required: false }
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Tab state in modal: 'basic', 'media', 'details'
  const [activeTab, setActiveTab] = useState('basic');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    original_price: '',
    images: ['', '', '', '', '', ''], // Up to 6 product images
    image_url: '',
    secondary_image_url: '',
    category_id: '',
    collection_tags: [],
    collection_tag: '',
    fragrance_tag: '',
    fragrance: '',
    badges: '',
    care_info: '',
    shipping_info: '',
    returns_info: '',
    is_published: true,
    sort_order: 0,
    is_best_seller: false,
    is_gift: false,
    availability: true
  });

  const [uploadingSlots, setUploadingSlots] = useState({ 0: false, 1: false, 2: false, 3: false, 4: false, 5: false });
  const [uploadingBatch, setUploadingBatch] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const slotFileRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const batchFileInputRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const fetchTimeout = setTimeout(() => setLoading(false), 3000);
    setLoading(true);
    try {
      const catRes = await supabaseClient.from('categories').select('*').order('sort_order');
      if (catRes.data) setCategories(catRes.data);

      const collRes = await supabaseClient.from('collections').select('*').order('sort_order');
      if (collRes.data) setCollections(collRes.data);

      const prodRes = await supabaseClient
        .from('products')
        .select('*, categories(title)')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
        
      if (prodRes.data) setProducts(prodRes.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
    clearTimeout(fetchTimeout);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setUploadError(null);

    try {
      const cleanImages = (formData.images || []).map(s => (s || '').trim()).filter(Boolean);

      const payload = {
        title: formData.title,
        description: formData.description || '',
        price: parseFloat(formData.price) || 0,
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        image_url: cleanImages[0] || formData.image_url || '',
        secondary_image_url: cleanImages[1] || formData.secondary_image_url || '',
        images: cleanImages.length > 0 ? cleanImages : (formData.image_url ? [formData.image_url] : []),
        category_id: formData.category_id || null,
        collection_tag: (formData.collection_tags && formData.collection_tags.length > 0) ? formData.collection_tags.join(', ') : (formData.collection_tag || ''),
        fragrance_tag: formData.fragrance_tag || '',
        fragrance: formData.fragrance || '',
        badges: formData.badges || '',
        care_info: formData.care_info || '',
        shipping_info: formData.shipping_info || '',
        returns_info: formData.returns_info || '',
        is_published: formData.is_published,
        sort_order: parseInt(formData.sort_order) || 0,
        is_best_seller: formData.is_best_seller || false,
        is_gift: formData.is_gift || false,
        availability: formData.availability !== false
      };

      if (editingId) {
        const { error } = await supabaseClient.from('products').update(payload).eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabaseClient.from('products').insert([payload]);
        if (error) throw error;
      }
      
      closeModal();
      await fetchData();
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  const openModal = (prod = null) => {
    setUploadError(null);
    setActiveTab('basic');
    if (prod) {
      setEditingId(prod.id);
      
      let initialImages = [];
      if (Array.isArray(prod.images) && prod.images.length > 0) {
        initialImages = [...prod.images];
      } else {
        if (prod.image_url) initialImages.push(prod.image_url);
        if (prod.secondary_image_url) initialImages.push(prod.secondary_image_url);
      }
      while (initialImages.length < 6) {
        initialImages.push('');
      }

      const rawCollTags = prod.collection_tag 
        ? (Array.isArray(prod.collection_tag) ? prod.collection_tag : prod.collection_tag.split(',').map(s => s.trim()).filter(Boolean))
        : [];

      setFormData({
        title: prod.title || '',
        description: prod.description || '',
        price: prod.price || '',
        original_price: prod.original_price || '',
        images: initialImages.slice(0, 6),
        image_url: prod.image_url || '',
        secondary_image_url: prod.secondary_image_url || '',
        category_id: prod.category_id || '',
        collection_tags: rawCollTags,
        collection_tag: prod.collection_tag || '',
        fragrance_tag: prod.fragrance_tag || '',
        fragrance: prod.fragrance || '',
        badges: prod.badges || '',
        care_info: prod.care_info || '',
        shipping_info: prod.shipping_info || '',
        returns_info: prod.returns_info || '',
        is_published: prod.is_published !== false,
        sort_order: prod.sort_order || 0,
        is_best_seller: prod.is_best_seller || false,
        is_gift: prod.is_gift || false,
        availability: prod.availability !== false
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        original_price: '',
        images: ['', '', '', '', '', ''],
        image_url: '',
        secondary_image_url: '',
        category_id: '',
        collection_tags: [],
        collection_tag: '',
        fragrance_tag: '',
        fragrance: '',
        badges: '',
        care_info: '',
        shipping_info: '',
        returns_info: '',
        is_published: true,
        sort_order: 0,
        is_best_seller: false,
        is_gift: false,
    availability: true
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

  const toggleStock = async (id, currentAvailability) => {
    const newStatus = currentAvailability === false ? true : false;
    await supabaseClient.from('products').update({ availability: newStatus }).eq('id', id);
    fetchData();
  };

  const handleSlotUpload = async (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingSlots(prev => ({ ...prev, [index]: true }));
    setUploadError(null);
    try {
      const url = await uploadProductImage(file);
      setFormData(prev => {
        const newImages = [...(prev.images || ['', '', '', '', '', ''])];
        newImages[index] = url;
        return {
          ...prev,
          images: newImages,
          image_url: index === 0 ? url : prev.image_url,
          secondary_image_url: index === 1 ? url : prev.secondary_image_url
        };
      });
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploadingSlots(prev => ({ ...prev, [index]: false }));
      if (slotFileRefs[index]?.current) slotFileRefs[index].current.value = '';
    }
  };

  const handleBatchUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setUploadingBatch(true);
    setUploadError(null);
    try {
      const uploadPromises = files.slice(0, 6).map(f => uploadProductImage(f));
      const uploadedUrls = await Promise.all(uploadPromises);

      setFormData(prev => {
        const currentImages = [...(prev.images || ['', '', '', '', '', ''])];
        let urlIdx = 0;
        // First fill empty slots
        for (let i = 0; i < 6 && urlIdx < uploadedUrls.length; i++) {
          if (!currentImages[i]) {
            currentImages[i] = uploadedUrls[urlIdx++];
          }
        }
        // If still remaining urls, fill from start
        for (let i = 0; i < 6 && urlIdx < uploadedUrls.length; i++) {
          currentImages[i] = uploadedUrls[urlIdx++];
        }
        return {
          ...prev,
          images: currentImages,
          image_url: currentImages[0] || prev.image_url,
          secondary_image_url: currentImages[1] || prev.secondary_image_url
        };
      });
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploadingBatch(false);
      if (batchFileInputRef.current) batchFileInputRef.current.value = '';
    }
  };

  const removeSlotImage = (index) => {
    setFormData(prev => {
      const newImages = [...(prev.images || ['', '', '', '', '', ''])];
      newImages[index] = '';
      return {
        ...prev,
        images: newImages,
        image_url: index === 0 ? '' : prev.image_url,
        secondary_image_url: index === 1 ? '' : prev.secondary_image_url
      };
    });
  };

  const updateSlotUrl = (index, value) => {
    setFormData(prev => {
      const newImages = [...(prev.images || ['', '', '', '', '', ''])];
      newImages[index] = value;
      return {
        ...prev,
        images: newImages,
        image_url: index === 0 ? value : prev.image_url,
        secondary_image_url: index === 1 ? value : prev.secondary_image_url
      };
    });
  };

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h3 style={{ margin: 0, color: '#1a1a1a', fontSize: '1.2rem' }}>Products &amp; Shop Management</h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b' }}>
            Manage your luxury catalog, pricing, 6-image gallery, care guides, and product details.
          </p>
        </div>
        <button onClick={() => openModal()} style={{ padding: '10px 20px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <span>+</span> Add New Product
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {loading ? <p style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>Loading products...</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', backgroundColor: '#f8fafc' }}>
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b', width: '60px' }}>Image</th>
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b' }}>Title &amp; Fragrance</th>
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b' }}>Collection</th>
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b' }}>Fragrance Tag</th>
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b' }}>Photos</th>
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b' }}>Price</th>
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Badges</th>
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="9" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No products found. Create your first product above!</td></tr>
              ) : products.map(prod => {
                const totalPhotos = Array.isArray(prod.images) ? prod.images.filter(Boolean).length : (prod.image_url ? (prod.secondary_image_url ? 2 : 1) : 0);
                return (
                  <tr key={prod.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ width: '48px', height: '48px', backgroundColor: '#f1f5f9', borderRadius: '6px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                        <img src={prod.image_url || 'assets/product_jasmine.png'} alt={prod.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { e.target.src='assets/product_jasmine.png'; }} />
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontSize: '0.92rem', color: '#1a1a1a', fontWeight: '600' }}>{prod.title}</div>
                      {prod.fragrance && <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>{prod.fragrance}</div>}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#475569' }}>
                      {(() => {
                        const tags = prod.collection_tag ? prod.collection_tag.split(',').map(s => s.trim()).filter(Boolean) : [];
                        if (tags.length === 0) return <span style={{ color: '#cbd5e1' }}>—</span>;
                        return (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                            {tags.map(t => (
                              <span key={t} style={{ padding: '2px 7px', borderRadius: '4px', backgroundColor: '#f1f5f9', color: '#334155', fontSize: '0.74rem', fontWeight: '500' }}>
                                {t.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                            ))}
                          </div>
                        );
                      })()}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#475569' }}>
                      {prod.fragrance_tag || prod.categories?.title ? (
                        <span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: '#fdf4ff', color: '#86198f', fontSize: '0.78rem', fontWeight: '500' }}>
                          {(prod.fragrance_tag || prod.categories?.title).replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      ) : (
                        <span style={{ color: '#cbd5e1' }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.82rem', color: '#64748b' }}>
                      <span style={{ padding: '2px 8px', borderRadius: '12px', backgroundColor: totalPhotos >= 3 ? '#ecfdf5' : '#f8fafc', color: totalPhotos >= 3 ? '#065f46' : '#64748b', fontWeight: '600', border: '1px solid #e2e8f0' }}>
                        📷 {totalPhotos}/6
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontSize: '0.92rem', color: '#1a1a1a', fontWeight: '600' }}>
                      ₹{prod.price}
                      {prod.original_price && <span style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '6px' }}>₹{prod.original_price}</span>}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      {prod.badges ? (
                        <span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: '#fef3c7', color: '#92400e', fontSize: '0.72rem', fontWeight: '600' }}>{prod.badges}</span>
                      ) : prod.is_best_seller ? (
                        <span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: '#dbeafe', color: '#1e40af', fontSize: '0.72rem', fontWeight: '600' }}>BEST SELLER</span>
                      ) : (
                        <span style={{ color: '#cbd5e1', fontSize: '0.75rem' }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <button 
                        type="button"
                        onClick={() => toggleStock(prod.id, prod.availability)}
                        style={{ 
                          padding: '4px 10px', 
                          borderRadius: '12px', 
                          fontSize: '0.75rem', 
                          border: 'none', 
                          cursor: 'pointer', 
                          fontWeight: '600', 
                          backgroundColor: prod.availability !== false ? '#dcfce7' : '#fee2e2', 
                          color: prod.availability !== false ? '#166534' : '#991b1b',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                        title="Click to toggle Stock Status"
                      >
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: prod.availability !== false ? '#16a34a' : '#dc2626' }}></span>
                        {prod.availability !== false ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <button 
                        onClick={() => togglePublish(prod.id, prod.is_published)}
                        style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', border: 'none', cursor: 'pointer', fontWeight: '500', backgroundColor: prod.is_published !== false ? '#dcfce7' : '#f1f5f9', color: prod.is_published !== false ? '#166534' : '#64748b' }}
                      >
                        {prod.is_published !== false ? 'Published' : 'Hidden'}
                      </button>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <a href={`/product?id=${prod.id}`} target="_blank" rel="noreferrer" style={{ color: '#0369a1', textDecoration: 'none', marginRight: '14px', fontSize: '0.85rem' }}>View Live</a>
                      <button onClick={() => openModal(prod)} style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', marginRight: '14px', fontSize: '0.85rem', fontWeight: '500' }}>Edit</button>
                      <button onClick={() => handleDelete(prod.id)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '0.85rem' }}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for Add / Edit Product */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', width: '100%', maxWidth: '820px', maxHeight: '92vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1a1a1a' }}>{editingId ? 'Edit Product & 6-Image Gallery' : 'Add New Luxury Product'}</h3>
              <button onClick={closeModal} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#94a3b8' }}>&times;</button>
            </div>

            {/* Modal Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', padding: '0 24px' }}>
              <button
                type="button"
                onClick={() => setActiveTab('basic')}
                style={{ padding: '12px 16px', background: 'none', border: 'none', borderBottom: activeTab === 'basic' ? '2px solid #1a1a1a' : '2px solid transparent', fontWeight: activeTab === 'basic' ? '600' : '400', color: activeTab === 'basic' ? '#1a1a1a' : '#64748b', cursor: 'pointer', fontSize: '0.88rem' }}
              >
                1. Basic Info &amp; Pricing
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('media')}
                style={{ padding: '12px 16px', background: 'none', border: 'none', borderBottom: activeTab === 'media' ? '2px solid #1a1a1a' : '2px solid transparent', fontWeight: activeTab === 'media' ? '600' : '400', color: activeTab === 'media' ? '#1a1a1a' : '#64748b', cursor: 'pointer', fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                2. 6-Image Gallery
                <span style={{ fontSize: '0.72rem', backgroundColor: '#e2e8f0', color: '#475569', padding: '2px 6px', borderRadius: '10px' }}>
                  {(formData.images || []).filter(Boolean).length}/6
                </span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                style={{ padding: '12px 16px', background: 'none', border: 'none', borderBottom: activeTab === 'details' ? '2px solid #1a1a1a' : '2px solid transparent', fontWeight: activeTab === 'details' ? '600' : '400', color: activeTab === 'details' ? '#1a1a1a' : '#64748b', cursor: 'pointer', fontSize: '0.88rem' }}
              >
                3. PDP Accordions &amp; Care
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                
                {uploadError && (
                  <div style={{ padding: '10px 14px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', color: '#dc2626', fontSize: '0.85rem' }}>
                    ⚠ {uploadError}
                  </div>
                )}

                {/* TAB 1: BASIC INFO */}
                {activeTab === 'basic' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Product Title *</label>
                        <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={inputStyle} placeholder="e.g. Jasmine &amp; Oakwood" />
                      </div>
                      <div>
                        <label style={labelStyle}>Fragrance Tag <span style={{fontWeight:'normal', color:'#94a3b8'}}>(homepage circles)</span></label>
                        <select value={formData.fragrance_tag} onChange={e => setFormData({...formData, fragrance_tag: e.target.value})} style={inputStyle}>
                          <option value="">-- Select Fragrance --</option>
                          {categories.map(c => <option key={c.id} value={c.slug || c.title.toLowerCase()}>{c.title}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* Multi-Select Collections */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <label style={{ ...labelStyle, margin: 0 }}>
                          Assigned Collections <span style={{fontWeight:'normal', color:'#94a3b8'}}>(click to select multiple — e.g. Gifts &amp; Home Decor)</span>
                        </label>
                        {formData.collection_tags?.length > 0 && (
                          <span style={{ fontSize: '0.78rem', color: '#0369a1', fontWeight: '600' }}>
                            ✓ {formData.collection_tags.length} selected
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '8px', backgroundColor: '#f8fafc', minHeight: '48px', alignItems: 'center' }}>
                        {collections.length === 0 ? (
                          <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>No collections found. Create collections in /admin/collections first.</span>
                        ) : (
                          collections.map(c => {
                            const slug = (c.title || c.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
                            const isSelected = (formData.collection_tags || []).includes(slug);
                            return (
                              <button
                                type="button"
                                key={c.id}
                                onClick={() => {
                                  const current = formData.collection_tags || [];
                                  const updated = isSelected ? current.filter(s => s !== slug) : [...current, slug];
                                  setFormData({ ...formData, collection_tags: updated });
                                }}
                                style={{
                                  padding: '6px 14px',
                                  borderRadius: '20px',
                                  border: isSelected ? '1px solid #0f172a' : '1px solid #cbd5e1',
                                  backgroundColor: isSelected ? '#0f172a' : '#ffffff',
                                  color: isSelected ? '#ffffff' : '#475569',
                                  fontSize: '0.82rem',
                                  fontWeight: isSelected ? '600' : '400',
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '6px',
                                  transition: 'all 0.15s ease',
                                  boxShadow: isSelected ? '0 2px 6px rgba(15,23,42,0.15)' : 'none'
                                }}
                              >
                                <span style={{ fontWeight: 'bold' }}>{isSelected ? '✓' : '+'}</span>
                                <span>{c.title || c.name}</span>
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Current Price (₹) *</label>
                        <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required style={inputStyle} placeholder="28.00" />
                      </div>
                      <div>
                        <label style={labelStyle}>Original Price (₹) <span style={{fontWeight:'normal', color:'#94a3b8'}}>(for discount strikethrough)</span></label>
                        <input type="number" step="0.01" value={formData.original_price} onChange={e => setFormData({...formData, original_price: e.target.value})} style={inputStyle} placeholder="38.00" />
                      </div>
                      <div>
                        <label style={labelStyle}>Sort Order</label>
                        <input type="number" value={formData.sort_order} onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})} style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Fragrance Notes <span style={{fontWeight:'normal', color:'#94a3b8'}}>(display on product page)</span></label>
                        <input type="text" value={formData.fragrance} onChange={e => setFormData({...formData, fragrance: e.target.value})} style={inputStyle} placeholder="e.g. Night Jasmine, Smoked Oakwood, Amber Resin" />
                      </div>
                      <div>
                        <label style={labelStyle}>Badge Tag</label>
                        <input type="text" value={formData.badges} onChange={e => setFormData({...formData, badges: e.target.value})} style={inputStyle} placeholder="e.g. BEST SELLER, NEW ARRIVAL, LIMITED" />
                      </div>
                    </div>

                    
                    {/* Stock Availability Option */}
                    <div>
                      <label style={labelStyle}>Inventory Stock Availability *</label>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '6px' }}>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, availability: true })}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: formData.availability !== false ? '2px solid #16a34a' : '1px solid #cbd5e1',
                            backgroundColor: formData.availability !== false ? '#f0fdf4' : '#ffffff',
                            color: formData.availability !== false ? '#15803d' : '#64748b',
                            fontWeight: formData.availability !== false ? '600' : '500',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>✓</span> In Stock (Available for Purchase)
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, availability: false })}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '8px',
                            border: formData.availability === false ? '2px solid #dc2626' : '1px solid #cbd5e1',
                            backgroundColor: formData.availability === false ? '#fef2f2' : '#ffffff',
                            color: formData.availability === false ? '#b91c1c' : '#64748b',
                            fontWeight: formData.availability === false ? '600' : '500',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>✕</span> Out of Stock (Disables Purchasing)
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '12px 16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                        <input type="checkbox" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} />
                        Published (Visible on Live Store)
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                        <input type="checkbox" checked={formData.is_best_seller} onChange={e => setFormData({...formData, is_best_seller: e.target.checked})} />
                        ⭐ Featured / Best Seller
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                        <input type="checkbox" checked={formData.is_gift} onChange={e => setFormData({...formData, is_gift: e.target.checked})} />
                        🎁 Gift Page Feature
                      </label>
                    </div>
                  </>
                )}

                {/* TAB 2: 6-IMAGE GALLERY */}
                {activeTab === 'media' && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0f9ff', padding: '12px 16px', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: '600', color: '#0369a1' }}>
                          📷 6-Image Product Gallery System
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#0284c7', marginTop: '2px' }}>
                          Upload up to 6 high-resolution product photos. Slot 1 is Cover Photo, Slot 2 is Hover Photo, and all 6 appear in the interactive PDP thumbnail gallery.
                        </div>
                      </div>
                      <div>
                        <input
                          ref={batchFileInputRef}
                          type="file"
                          multiple
                          accept="image/png,image/jpeg,image/webp"
                          style={{ display: 'none' }}
                          onChange={handleBatchUpload}
                        />
                        <button
                          type="button"
                          onClick={() => batchFileInputRef.current?.click()}
                          disabled={uploadingBatch}
                          style={{ padding: '8px 14px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '6px', cursor: uploadingBatch ? 'wait' : 'pointer', fontSize: '0.82rem', fontWeight: '600', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          {uploadingBatch ? '⏳ Uploading...' : '⚡ Multi-Upload (Select multiple files)'}
                        </button>
                      </div>
                    </div>

                    {/* 6 Image Slots Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                      {SLOT_LABELS.map((slot, index) => {
                        const imgUrl = (formData.images && formData.images[index]) || '';
                        const isSlotUploading = uploadingSlots[index];

                        return (
                          <div key={index} style={{ padding: '12px', border: imgUrl ? '1px solid #cbd5e1' : '1px dashed #cbd5e1', borderRadius: '8px', backgroundColor: imgUrl ? '#ffffff' : '#f8fafc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <label style={{ ...labelStyle, margin: 0, fontSize: '0.8rem' }}>
                                {slot.title}
                              </label>
                              {imgUrl && (
                                <button
                                  type="button"
                                  onClick={() => removeSlotImage(index)}
                                  style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '0.72rem', fontWeight: '600', padding: 0 }}
                                  title="Remove image"
                                >
                                  ✕ Remove
                                </button>
                              )}
                            </div>

                            {/* Thumbnail Preview Box */}
                            <div style={{ width: '100%', height: '110px', backgroundColor: '#f1f5f9', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0', position: 'relative' }}>
                              {imgUrl ? (
                                <img src={imgUrl} alt={`Slot ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} onError={e => { e.target.style.opacity = '0.3'; }} />
                              ) : (
                                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.75rem' }}>
                                  <div style={{ fontSize: '1.2rem', marginBottom: '2px' }}>📷</div>
                                  <div>Empty Slot {index + 1}</div>
                                </div>
                              )}
                            </div>

                            {/* Direct URL Input */}
                            <input
                              type="text"
                              value={imgUrl}
                              onChange={e => updateSlotUrl(index, e.target.value)}
                              style={{ ...inputStyle, padding: '6px 8px', fontSize: '0.78rem' }}
                              placeholder={`Image ${index + 1} URL or upload`}
                            />

                            {/* Single Slot Upload Button */}
                            <input
                              ref={slotFileRefs[index]}
                              type="file"
                              accept="image/png,image/jpeg,image/webp"
                              style={{ display: 'none' }}
                              onChange={e => handleSlotUpload(index, e)}
                            />
                            <button
                              type="button"
                              onClick={() => slotFileRefs[index].current?.click()}
                              disabled={isSlotUploading || uploadingBatch}
                              style={{ ...uploadBtnStyle, padding: '6px 8px', fontSize: '0.78rem' }}
                            >
                              {isSlotUploading ? '⏳ Uploading...' : `⬆ Upload Image ${index + 1}`}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: '#64748b' }}>
                      💡 Tip: You can upload up to 6 images per product. You can either click <strong>Multi-Upload</strong> to pick all images at once or use the individual upload buttons for each slot.
                    </p>
                  </>
                )}

                {/* TAB 3: PDP DETAILS & ACCORDIONS */}
                {activeTab === 'details' && (
                  <>
                    <div>
                      <label style={labelStyle}>Product Description (Shown in Accordion 1)</label>
                      <textarea
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        style={{ ...inputStyle, minHeight: '85px' }}
                        placeholder="Detailed olfactory story and product notes..."
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Product Information &amp; Care (Shown in Accordion 2)</label>
                      <textarea
                        value={formData.care_info}
                        onChange={e => setFormData({...formData, care_info: e.target.value})}
                        style={{ ...inputStyle, minHeight: '75px' }}
                        placeholder="• Wick Care: Trim wick to 1/4 inch before each burn...&#10;• First Burn: Allow melt pool to reach vessel edges..."
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Shipping Information (Accordion 3)</label>
                        <textarea
                          value={formData.shipping_info}
                          onChange={e => setFormData({...formData, shipping_info: e.target.value})}
                          style={{ ...inputStyle, minHeight: '70px' }}
                          placeholder="• Complimentary shipping on orders over ₹1100&#10;• Dispatched within 24-48 business hours..."
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Returns &amp; Exchanges (Accordion 4)</label>
                        <textarea
                          value={formData.returns_info}
                          onChange={e => setFormData({...formData, returns_info: e.target.value})}
                          style={{ ...inputStyle, minHeight: '70px' }}
                          placeholder="• 7-Day Complimentary Returns on unburned items&#10;• Contact concierge@chimini.com..."
                        />
                      </div>
                    </div>
                  </>
                )}

              </div>

              {/* Modal Footer */}
              <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  {activeTab !== 'details' ? '💡 Tip: Click tab 3 to configure Care, Shipping & Returns accordions' : 'Ready to publish'}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={closeModal} style={{ padding: '9px 18px', backgroundColor: '#fff', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '6px', cursor: 'pointer', fontSize: '0.88rem' }}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saveLoading || uploadingBatch || Object.values(uploadingSlots).some(Boolean)}
                    style={{ padding: '9px 22px', backgroundColor: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '6px', cursor: saveLoading ? 'wait' : 'pointer', fontWeight: '600', fontSize: '0.88rem' }}
                  >
                    {saveLoading ? 'Saving...' : editingId ? 'Save Changes' : 'Create Product'}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '6px', fontSize: '0.82rem', fontWeight: '600', color: '#334155' };
const inputStyle = { width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.88rem', boxSizing: 'border-box' };
const uploadBtnStyle = { width: '100%', padding: '8px', backgroundColor: '#f0f9ff', color: '#0369a1', border: '1px dashed #7dd3fc', borderRadius: '6px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: '500' };
