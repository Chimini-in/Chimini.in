"use client";

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../../lib/supabase';

const DEFAULT_CONFIG = {
  priceTiles: [
    { label: '₹100', image: 'assets/product_jasmine.png', link: '/shop?category=gifts' },
    { label: '₹200', image: 'assets/product_sandalwood.png', link: '/shop?category=gifts' },
    { label: '₹300', image: 'assets/product_rose.png', link: '/shop?category=gifts' },
    { label: '₹400', image: 'assets/product_fig.png', link: '/shop?category=gifts' }
  ],
  recipientTiles: [
    { label: 'Girls', image: 'assets/product_rose.png', link: '/shop?category=gifts' },
    { label: 'Boyfriend', image: 'assets/product_sandalwood.png', link: '/shop?category=gifts' },
    { label: 'Sister', image: 'assets/product_jasmine.png', link: '/shop?category=gifts' },
    { label: 'Mother', image: 'assets/product_fig.png', link: '/shop?category=gifts' },
    { label: 'Father', image: 'assets/product_sandalwood.png', link: '/shop?category=gifts' },
    { label: 'Friend', image: 'assets/product_rose.png', link: '/shop?category=gifts' }
  ],
  occasionTiles: [
    { label: 'Birthday', image: 'assets/campaign_banner.png', link: '/shop?category=gifts' },
    { label: 'Housewarming', image: 'assets/promo_banner.png', link: '/shop?category=gifts' },
    { label: 'Anniversary', image: 'assets/hero_banner_1.png', link: '/shop?category=gifts' },
    { label: 'Festive', image: 'assets/story_banner.png', link: '/shop?category=gifts' }
  ],
  giftCards: [
    { title: 'Celebration Gift Card', image: 'assets/campaign_banner.png', link: '/shop?category=gifts' },
    { title: 'Luxury Scent E-Card', image: 'assets/promo_banner.png', link: '/shop?category=gifts' },
    { title: 'Festive Joy Gift Card', image: 'assets/hero_banner_1.png', link: '/shop?category=gifts' },
    { title: 'Bespoke Atelier Pass', image: 'assets/story_banner.png', link: '/shop?category=gifts' }
  ]
};

export default function AdminGiftsPage() {
  const [config, setConfig] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const local = localStorage.getItem('chimini_gifts_config');
        if (local) return { ...DEFAULT_CONFIG, ...JSON.parse(local) };
      } catch (e) {}
    }
    return DEFAULT_CONFIG;
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('priceTiles');
  const [uploadingIdx, setUploadingIdx] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (supabaseClient) {
        const fetchPromise = supabaseClient
          .from('settings')
          .select('setting_value')
          .eq('setting_key', 'gifts_page_config')
          .limit(1);

        const timeoutPromise = new Promise(resolve => setTimeout(() => resolve({ data: null }), 2000));
        const res = await Promise.race([fetchPromise, timeoutPromise]);

        if (res?.data && res.data.length > 0 && res.data[0]?.setting_value) {
          const raw = res.data[0].setting_value;
          const val = typeof raw === 'string' ? JSON.parse(raw) : raw;
          setConfig(prev => ({ ...prev, ...val }));
          localStorage.setItem('chimini_gifts_config', JSON.stringify(val));
        }
      }
    } catch (err) {
      console.log('Using local gifts config');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (supabaseClient) {
        const { data } = await supabaseClient.from('settings').select('id').eq('setting_key', 'gifts_page_config');
        if (data && data.length > 0) {
          await supabaseClient.from('settings').update({ setting_value: config }).eq('setting_key', 'gifts_page_config');
        } else {
          await supabaseClient.from('settings').insert([{ setting_key: 'gifts_page_config', setting_value: config }]);
        }
      }
      localStorage.setItem('chimini_gifts_config', JSON.stringify(config));
      alert('Gifts page settings saved successfully!');
    } catch (err) {
      alert('Error saving settings: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (file, sectionKey, index) => {
    if (!file || !supabaseClient) return;
    setUploadingIdx(`${sectionKey}-${index}`);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `gifts/${fileName}`;

      const { error: uploadErr } = await supabaseClient.storage
        .from('images')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadErr) throw uploadErr;

      const { data } = supabaseClient.storage.from('images').getPublicUrl(filePath);
      if (data?.publicUrl) {
        const newArr = [...(config[sectionKey] || [])];
        newArr[index] = { ...newArr[index], image: data.publicUrl };
        setConfig({ ...config, [sectionKey]: newArr });
      }
    } catch (err) {
      alert('Image upload failed: ' + err.message);
    } finally {
      setUploadingIdx(null);
      // Tile items handlers
    }
  };

  const addTile = (key, defaultLabel) => {
    let newItem;
    const slug = defaultLabel.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    if (key === 'priceTiles') {
      const existingCount = (config.priceTiles || []).length;
      const defaultThreshold = (existingCount + 1) * 100;
      newItem = {
        threshold: defaultThreshold,
        label: `₹${defaultThreshold}`,
        image: 'assets/product_jasmine.png',
        link: `/shop?maxPrice=${defaultThreshold}`
      };
    } else if (key === 'giftCards') {
      newItem = { title: defaultLabel, image: 'assets/campaign_banner.png', link: `/shop?category=${slug || 'gift-cards'}` };
    } else if (key === 'recipientTiles') {
      newItem = { label: defaultLabel, image: 'assets/product_rose.png', link: `/shop?category=${slug || 'recipient'}` };
    } else {
      newItem = { label: defaultLabel, image: 'assets/campaign_banner.png', link: `/shop?category=${slug || 'occasion'}` };
    }
    setConfig({ ...config, [key]: [...(config[key] || []), newItem] });
  };

  const updatePriceTileThreshold = (index, val) => {
    const arr = [...(config.priceTiles || [])];
    const num = val ? val.replace(/[^0-9.]/g, '') : '';
    arr[index] = {
      ...arr[index],
      threshold: num,
      label: num ? `₹${num}` : (arr[index].label || ''),
      link: num ? `/shop?maxPrice=${num}` : '/shop'
    };
    setConfig({ ...config, priceTiles: arr });
  };

  const updateTile = (key, index, field, val) => {
    const arr = [...(config[key] || [])];
    const prev = arr[index] || {};
    const updated = { ...prev, [field]: val };

    // Auto-update link if title/label changed and link was default or empty
    if ((field === 'label' || field === 'title') && val && key !== 'priceTiles') {
      const slug = val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
      const prevSlug = (prev.label || prev.title || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
      if (!prev.link || prev.link === '/shop?category=gifts' || prev.link === `/shop?category=${prevSlug}`) {
        updated.link = `/shop?category=${slug}`;
      }
    }

    arr[index] = updated;
    setConfig({ ...config, [key]: arr });
  };

  const deleteTile = (key, index) => {
    const arr = [...(config[key] || [])];
    arr.splice(index, 1);
    setConfig({ ...config, [key]: arr });
  };

  const inputStyle = { width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' };
  const tabBtnStyle = (tab) => ({
    padding: '10px 18px',
    backgroundColor: activeTab === tab ? '#1a1a1a' : '#f1f5f9',
    color: activeTab === tab ? '#ffffff' : '#475569',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.85rem'
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h3 style={{ margin: '0 0 4px 0', color: '#1a1a1a', fontSize: '1.2rem' }}>Gifts Page & Price Circles Manager</h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
            Manage the "Shop by Price" threshold filters, Recipients, Occasions, and Gift Cards.
          </p>
        </div>
        <button onClick={handleSave} disabled={saving} style={{ padding: '10px 22px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('priceTiles')} style={tabBtnStyle('priceTiles')}>Shop by Price Circles ({(config.priceTiles || []).length})</button>
        <button onClick={() => setActiveTab('recipientTiles')} style={tabBtnStyle('recipientTiles')}>Recipient Tiles ({(config.recipientTiles || []).length})</button>
        <button onClick={() => setActiveTab('occasionTiles')} style={tabBtnStyle('occasionTiles')}>Occasion Tiles ({(config.occasionTiles || []).length})</button>
        <button onClick={() => setActiveTab('giftCards')} style={tabBtnStyle('giftCards')}>Gift Cards ({(config.giftCards || []).length})</button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', padding: '25px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0', textTransform: 'capitalize' }}>
                {activeTab === 'priceTiles' && 'Shop by Price Circles (Auto-Filter by Product Price)'}
                {activeTab === 'recipientTiles' && 'Shop by Recipient Tiles (Auto-Filter by Category Tag)'}
                {activeTab === 'occasionTiles' && 'Shop by Occasion Tiles (Auto-Filter by Category Tag)'}
                {activeTab === 'giftCards' && 'Gift Cards (Auto-Filter by Category Tag)'}
              </h4>
              {activeTab === 'priceTiles' && (
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#0369a1', backgroundColor: '#f0f9ff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #bae6fd' }}>
                  ⚡ <strong>Auto-detection logic:</strong> Admin only sets the price threshold number (e.g. 200, 300, 400, 5000). Clicking a circle automatically filters the Shop page to show products with price ≤ threshold based on each product's price field. No manual product mapping needed.
                </p>
              )}
              {activeTab !== 'priceTiles' && (
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#0369a1', backgroundColor: '#f0f9ff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #bae6fd' }}>
                  🏷️ <strong>Collections Pattern:</strong> Clicking a tile automatically filters the Shop page by category tag (e.g. <code>/shop?category=mother</code>, <code>/shop?category=birthday</code>). Tag products in <a href="/admin/products" style={{ fontWeight: 'bold', color: '#0284c7', textDecoration: 'underline' }}>Products &amp; Shop</a> to show them here.
                </p>
              )}
            </div>
            <button onClick={() => addTile(activeTab, activeTab === 'priceTiles' ? '500' : 'New Tile')} style={{ padding: '8px 16px', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', whiteSpace: 'nowrap', marginLeft: '12px' }}>
              + Add {activeTab === 'priceTiles' ? 'Price Circle' : 'Tile'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {(config[activeTab] || []).map((item, idx) => {
              const name = item.title || item.label || '';
              const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
              const autoLink = `/shop?category=${slug || 'gifts'}`;

              return (
              <div key={idx} style={{ padding: '18px', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>
                    {activeTab === 'priceTiles' ? `Price Circle #${idx + 1}` : `Tile #${idx + 1}`}
                  </span>
                  <button onClick={() => deleteTile(activeTab, idx)} title="Delete" style={{ backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}>&times;</button>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img src={item.image || 'assets/product_jasmine.png'} alt="Preview" style={{ width: activeTab === 'priceTiles' ? '65px' : '70px', height: activeTab === 'priceTiles' ? '65px' : '70px', borderRadius: activeTab === 'priceTiles' ? '50%' : '6px', objectFit: 'cover', border: '2px solid #e2e8f0', backgroundColor: '#fff' }} />
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '600' }}>{activeTab === 'priceTiles' ? 'Circle Image' : 'Tile Image'}</label>
                    <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], activeTab, idx)} style={{ fontSize: '0.8rem' }} />
                    {uploadingIdx === `${activeTab}-${idx}` && <span style={{ fontSize: '0.75rem', color: '#0284c7', display: 'block', marginTop: '2px' }}>Uploading...</span>}
                  </div>
                </div>

                {activeTab === 'priceTiles' ? (
                  <>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#334155', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Price Threshold (₹)</label>
                      <input 
                        type="number" 
                        value={item.threshold !== undefined && item.threshold !== null ? item.threshold : (item.label ? item.label.replace(/[^0-9.]/g, '') : '')} 
                        onChange={e => updatePriceTileThreshold(idx, e.target.value)} 
                        placeholder="e.g. 200, 300, 5000"
                        style={inputStyle} 
                      />
                      <span style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '3px', display: 'block' }}>
                        Auto-filters products with price ≤ this value
                      </span>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#334155', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Circle Display Label</label>
                      <input 
                        type="text" 
                        value={item.label || ''} 
                        onChange={e => updateTile(activeTab, idx, 'label', e.target.value)} 
                        placeholder="e.g. ₹200 or Under ₹200"
                        style={inputStyle} 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#334155', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Click Destination URL</label>
                      <input 
                        type="text" 
                        value={item.link || (item.threshold ? `/shop?maxPrice=${item.threshold}` : '/shop')} 
                        onChange={e => updateTile(activeTab, idx, 'link', e.target.value)} 
                        style={inputStyle} 
                        placeholder="/shop?maxPrice=200" 
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#334155', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Title / Label</label>
                      <input type="text" value={item.title || item.label || ''} onChange={e => updateTile(activeTab, idx, activeTab === 'giftCards' ? 'title' : 'label', e.target.value)} style={inputStyle} />
                      {slug && (
                        <span style={{ fontSize: '0.72rem', color: '#0369a1', marginTop: '4px', display: 'block' }}>
                          Product Tag: <strong>{slug}</strong> (links to: <code>{item.link || autoLink}</code>)
                        </span>
                      )}
                    </div>

                    <div>
                      <label style={{ fontSize: '0.75rem', color: '#334155', display: 'block', marginBottom: '4px', fontWeight: '600' }}>Link URL</label>
                      <input 
                        type="text" 
                        value={item.link || autoLink} 
                        onChange={e => updateTile(activeTab, idx, 'link', e.target.value)} 
                        style={inputStyle} 
                        placeholder={autoLink} 
                      />
                    </div>
                  </>
                )}
              </div>
            );})}
          </div>
        </div>
      </div>
    </div>
  );
}
