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
    }
  };

  // Tile items handlers
  const addTile = (key, defaultLabel) => {
    const newItem = key === 'giftCards' 
      ? { title: defaultLabel, image: 'assets/campaign_banner.png', link: '/shop?category=gifts' }
      : { label: defaultLabel, image: 'assets/product_jasmine.png', link: '/shop?category=gifts' };
    setConfig({ ...config, [key]: [...(config[key] || []), newItem] });
  };

  const updateTile = (key, index, field, val) => {
    const arr = [...(config[key] || [])];
    arr[index][field] = val;
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
        <h3 style={{ margin: 0, color: '#1a1a1a', fontSize: '1.2rem' }}>Gifts Page Manager</h3>
        <button onClick={handleSave} disabled={saving} style={{ padding: '10px 22px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('priceTiles')} style={tabBtnStyle('priceTiles')}>Shop by Price Tiles ({(config.priceTiles || []).length})</button>
        <button onClick={() => setActiveTab('recipientTiles')} style={tabBtnStyle('recipientTiles')}>Recipient Tiles ({(config.recipientTiles || []).length})</button>
        <button onClick={() => setActiveTab('occasionTiles')} style={tabBtnStyle('occasionTiles')}>Occasion Tiles ({(config.occasionTiles || []).length})</button>
        <button onClick={() => setActiveTab('giftCards')} style={tabBtnStyle('giftCards')}>Gift Cards ({(config.giftCards || []).length})</button>
      </div>

      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', padding: '25px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ margin: 0, textTransform: 'capitalize' }}>
              {activeTab === 'priceTiles' && 'Shop by Price Tiles (Round)'}
              {activeTab === 'recipientTiles' && 'Shop by Recipient Tiles (3 Per Row, Box)'}
              {activeTab === 'occasionTiles' && 'Shop by Occasion Tiles (4 Per Row, Box)'}
              {activeTab === 'giftCards' && 'Gift Cards (4 Per Row, 500x625px)'}
            </h4>
            <button onClick={() => addTile(activeTab, activeTab === 'priceTiles' ? '₹100' : 'New Tile')} style={{ padding: '8px 16px', backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>
              + Add Item
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {(config[activeTab] || []).map((item, idx) => (
              <div key={idx} style={{ padding: '18px', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>Item #{idx + 1}</span>
                  <button onClick={() => deleteTile(activeTab, idx)} style={{ backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}>&times;</button>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img src={item.image || 'assets/product_jasmine.png'} alt="Preview" style={{ width: activeTab === 'priceTiles' ? '60px' : '70px', height: activeTab === 'priceTiles' ? '60px' : '70px', borderRadius: activeTab === 'priceTiles' ? '50%' : '6px', objectFit: 'cover', border: '1px solid #cbd5e1' }} />
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Upload Image</label>
                    <input type="file" accept="image/*" onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0], activeTab, idx)} style={{ fontSize: '0.8rem' }} />
                    {uploadingIdx === `${activeTab}-${idx}` && <span style={{ fontSize: '0.75rem', color: '#0284c7' }}>Uploading...</span>}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Title / Label</label>
                  <input type="text" value={item.title || item.label || ''} onChange={e => updateTile(activeTab, idx, activeTab === 'giftCards' ? 'title' : 'label', e.target.value)} style={inputStyle} />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Link URL</label>
                  <input type="text" value={item.link || ''} onChange={e => updateTile(activeTab, idx, 'link', e.target.value)} style={inputStyle} placeholder="/shop?category=gifts" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
