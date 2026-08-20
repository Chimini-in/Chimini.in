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

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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
    image_url: '',
    secondary_image_url: '',
    gallery_images: '', // newline or comma separated
    category_id: '',
    fragrance_tag: '',
    fragrance: '',
    badges: '',
    care_info: '',
    shipping_info: '',
    returns_info: '',
    is_published: true,
    sort_order: 0,
    is_best_seller: false,
    is_gift: false
  });

  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingSecondary, setUploadingSecondary] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [saveLoading, setSaveLoading] = useState(false);

  const mainFileRef = useRef(null);
  const secondaryFileRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const catRes = await supabaseClient.from('categories').select('*').order('sort_order');
      if (catRes.data) setCategories(catRes.data);

      const prodRes = await supabaseClient
        .from('products')
        .select('*, categories(title)')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
        
      if (prodRes.data) setProducts(prodRes.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaveLoading(true);
    setUploadError(null);

    try {
      // Parse gallery images
      const galleryArr = formData.gallery_images
        ? formData.gallery_images.split(/[\\n,]+/).map(s => s.trim()).filter(Boolean)
        : [];

      const payload = {
        title: formData.title,
        description: formData.description || '',
        price: parseFloat(formData.price) || 0,
        original_price: formData.original_price ? parseFloat(formData.original_price) : null,
        image_url: formData.image_url || '',
        secondary_image_url: formData.secondary_image_url || '',
        images: galleryArr.length > 0 ? galleryArr : (formData.image_url ? [formData.image_url] : []),
        category_id: formData.category_id || null,
        fragrance_tag: formData.fragrance_tag || '',
        fragrance: formData.fragrance || '',
        badges: formData.badges || '',
        care_info: formData.care_info || '',
        shipping_info: formData.shipping_info || '',
        returns_info: formData.returns_info || '',
        is_published: formData.is_published,
        sort_order: parseInt(formData.sort_order) || 0,
        is_best_seller: formData.is_best_seller || false,
        is_gift: formData.is_gift || false
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
      const galleryStr = Array.isArray(prod.images) ? prod.images.join('\\n') : '';
      setFormData({
        title: prod.title || '',
        description: prod.description || '',
        price: prod.price || '',
        original_price: prod.original_price || '',
        image_url: prod.image_url || '',
        secondary_image_url: prod.secondary_image_url || '',
        gallery_images: galleryStr,
        category_id: prod.category_id || '',
        fragrance_tag: prod.fragrance_tag || '',
        fragrance: prod.fragrance || '',
        badges: prod.badges || '',
        care_info: prod.care_info || '',
        shipping_info: prod.shipping_info || '',
        returns_info: prod.returns_info || '',
        is_published: prod.is_published !== false,
        sort_order: prod.sort_order || 0,
        is_best_seller: prod.is_best_seller || false,
        is_gift: prod.is_gift || false
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        original_price: '',
        image_url: '',
        secondary_image_url: '',
        gallery_images: '',
        category_id: '',
        fragrance_tag: '',
        fragrance: '',
        badges: '',
        care_info: '',
        shipping_info: '',
        returns_info: '',
        is_published: true,
        sort_order: 0,
        is_best_seller: false,
        is_gift: false
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

  const handleMainUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingMain(true);
    setUploadError(null);
    try {
      const url = await uploadProductImage(file);
      setFormData(prev => ({
        ...prev,
        image_url: url,
        gallery_images: prev.gallery_images ? `${url}\\n${prev.gallery_images}` : url
      }));
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploadingMain(false);
      if (mainFileRef.current) mainFileRef.current.value = '';
    }
  };

  const handleSecondaryUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingSecondary(true);
    setUploadError(null);
    try {
      const url = await uploadProductImage(file);
      setFormData(prev => ({
        ...prev,
        secondary_image_url: url,
        gallery_images: prev.gallery_images ? `${prev.gallery_images}\\n${url}` : url
      }));
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploadingSecondary(false);
      if (secondaryFileRef.current) secondaryFileRef.current.value = '';
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h3 style={{ margin: 0, color: '#1a1a1a', fontSize: '1.2rem' }}>Products &amp; Shop Management</h3>
          <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b' }}>
            Manage your luxury catalog, pricing, gallery images, care guides, and product details.
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
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b' }}>Fragrance Tag</th>
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b' }}>Price</th>
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Badges</th>
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '14px 16px', fontSize: '0.85rem', color: '#64748b', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="7" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>No products found. Create your first product above!</td></tr>
              ) : products.map(prod => (
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
                    {prod.fragrance_tag || prod.categories?.title || <span style={{ color: '#cbd5e1' }}>—</span>}
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
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for Add / Edit Product */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '12px', width: '100%', maxWidth: '720px', maxHeight: '92vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            
            {/* Modal Header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1a1a1a' }}>{editingId ? 'Edit Product & PDP Details' : 'Add New Luxury Product'}</h3>
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
                style={{ padding: '12px 16px', background: 'none', border: 'none', borderBottom: activeTab === 'media' ? '2px solid #1a1a1a' : '2px solid transparent', fontWeight: activeTab === 'media' ? '600' : '400', color: activeTab === 'media' ? '#1a1a1a' : '#64748b', cursor: 'pointer', fontSize: '0.88rem' }}
              >
                2. Media &amp; Gallery
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
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={labelStyle}>Product Title *</label>
                        <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required style={inputStyle} placeholder="e.g. Jasmine &amp; Oakwood" />
                      </div>
                      <div>
                        <label style={labelStyle}>Fragrance Tag <span style={{fontWeight:'normal', color:'#94a3b8'}}>(links to homepage circle filter)</span></label>
                        <select value={formData.fragrance_tag} onChange={e => setFormData({...formData, fragrance_tag: e.target.value})} style={inputStyle}>
                          <option value="">-- Select Fragrance --</option>
                          {categories.map(c => <option key={c.id} value={c.slug || c.title.toLowerCase()}>{c.title}</option>)}
                        </select>
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

                {/* TAB 2: MEDIA & GALLERY */}
                {activeTab === 'media' && (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      {/* Main Image */}
                      <div style={{ padding: '14px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                        <label style={labelStyle}>Main Image *</label>
                        {formData.image_url && (
                          <div style={{ marginBottom: '8px', width: '100%', height: '140px', backgroundColor: '#f8fafc', borderRadius: '6px', overflow: 'hidden' }}>
                            <img src={formData.image_url} alt="Main" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          </div>
                        )}
                        <input type="text" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} style={{ ...inputStyle, marginBottom: '8px' }} placeholder="Image URL or upload below" />
                        <input ref={mainFileRef} type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={handleMainUpload} />
                        <button type="button" onClick={() => mainFileRef.current?.click()} disabled={uploadingMain} style={uploadBtnStyle}>
                          {uploadingMain ? '⏳ Uploading...' : '⬆ Upload Main Image from File'}
                        </button>
                      </div>

                      {/* Secondary Hover Image */}
                      <div style={{ padding: '14px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                        <label style={labelStyle}>Secondary Image (Card Hover)</label>
                        {formData.secondary_image_url && (
                          <div style={{ marginBottom: '8px', width: '100%', height: '140px', backgroundColor: '#f8fafc', borderRadius: '6px', overflow: 'hidden' }}>
                            <img src={formData.secondary_image_url} alt="Secondary" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          </div>
                        )}
                        <input type="text" value={formData.secondary_image_url} onChange={e => setFormData({...formData, secondary_image_url: e.target.value})} style={{ ...inputStyle, marginBottom: '8px' }} placeholder="Secondary Image URL" />
                        <input ref={secondaryFileRef} type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={handleSecondaryUpload} />
                        <button type="button" onClick={() => secondaryFileRef.current?.click()} disabled={uploadingSecondary} style={uploadBtnStyle}>
                          {uploadingSecondary ? '⏳ Uploading...' : '⬆ Upload Hover Image from File'}
                        </button>
                      </div>
                    </div>

                    {/* Gallery Thumbnails List */}
                    <div>
                      <label style={labelStyle}>Gallery Thumbnails (1 URL per line for Product Detail Page thumbnails)</label>
                      <textarea
                        value={formData.gallery_images}
                        onChange={e => setFormData({...formData, gallery_images: e.target.value})}
                        style={{ ...inputStyle, minHeight: '100px', fontFamily: 'monospace', fontSize: '0.82rem' }}
                        placeholder={"https://.../img1.jpg\\nhttps://.../img2.jpg\\nhttps://.../img3.jpg"}
                      />
                      <p style={{ margin: '4px 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
                        These images display as interactive thumbnails on the Product Detail Page gallery.
                      </p>
                    </div>
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
                          placeholder="• Complimentary shipping on orders over ₹100&#10;• Dispatched within 24-48 business hours..."
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
                    disabled={saveLoading || uploadingMain || uploadingSecondary}
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
