"use client";

import React, { useEffect, useState, useRef } from 'react';
import { supabaseClient } from '../../../lib/supabase';

// ─────────────────────────────────────────────────────────────────────────────
// Banner slot definitions: every banner position across the entire storefront
// ─────────────────────────────────────────────────────────────────────────────
const BANNER_SLOTS = [
  // HOME PAGE
  { id: 'home_hero',          page: 'Home',        label: 'Hero Banner',           hint: 'Full-width hero image at top of the homepage' },
  { id: 'home_ads_1',         page: 'Home',        label: 'Promotional Banner 1',  hint: 'First promotional/ads banner below best sellers' },
  { id: 'home_ads_2',         page: 'Home',        label: 'Promotional Banner 2',  hint: 'Second promotional/ads banner' },
  { id: 'home_brand_story',   page: 'Home',        label: 'Brand Story Banner',    hint: 'Full-width banner in the brand story section' },
  // SHOP PAGE
  { id: 'shop_top',           page: 'Shop',        label: 'Top Banner',            hint: 'Banner at the top of the /shop page' },
  // COLLECTIONS PAGE
  { id: 'collections_top',    page: 'Collections', label: 'Top Banner',            hint: 'Banner at the top of the /collections page' },
  // GIFTS PAGE
  { id: 'gifts_top',          page: 'Gifts',       label: 'Top Banner',            hint: 'Banner at the top of the /gifts page' },
  // ABOUT PAGE
  { id: 'about_top',          page: 'About Us',    label: 'Top Banner',            hint: 'Banner at the top of the /about page' },
  // CONTACT PAGE
  { id: 'contact_top',        page: 'Contact Us',  label: 'Top Banner',            hint: 'Banner at the top of the /contact page' },
];

const PAGE_GROUPS = ['Home', 'Shop', 'Collections', 'Gifts', 'About Us', 'Contact Us'];

const EMPTY_BANNER = { image_url: '', link_url: '', offer_pct: '', is_published: true };

// ─────────────────────────────────────────────────────────────────────────────
// Helper: Supabase image upload
// ─────────────────────────────────────────────────────────────────────────────
async function uploadImage(file) {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) throw new Error('Invalid file type. Use JPG, PNG, or WebP.');
  if (file.size > 5 * 1024 * 1024) throw new Error('File too large. Max 5MB.');

  const ext = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
  const filePath = `banners/${fileName}`;

  const { error } = await supabaseClient.storage
    .from('images')
    .upload(filePath, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;

  const { data } = supabaseClient.storage.from('images').getPublicUrl(filePath);
  if (!data?.publicUrl) throw new Error('Could not retrieve public URL.');
  return data.publicUrl;
}

// ─────────────────────────────────────────────────────────────────────────────
// BannerSlotCard — one inline card per banner slot
// ─────────────────────────────────────────────────────────────────────────────
function BannerSlotCard({ slot, record, onChange }) {
  const [localImageUrl, setLocalImageUrl] = useState(record?.image_url || '');
  const [localLinkUrl, setLocalLinkUrl] = useState(record?.link_url || '');
  const [localOfferPct, setLocalOfferPct] = useState(record?.offer_pct != null ? String(record.offer_pct) : '');
  const [destType, setDestType] = useState(
    (record?.offer_pct != null && String(record.offer_pct).trim() !== '') ? 'offer' : 'link'
  );
  const [isPublished, setIsPublished] = useState(record?.is_published !== false);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileRef = useRef(null);

  // Sync state whenever record prop changes from Supabase fetch
  useEffect(() => {
    setLocalImageUrl(record?.image_url || '');
    const offerVal = (record?.offer_pct != null && String(record.offer_pct).trim() !== '') ? String(record.offer_pct) : '';
    const linkVal = record?.link_url || '';
    setLocalOfferPct(offerVal);
    setLocalLinkUrl(linkVal);
    setDestType(offerVal ? 'offer' : 'link');
    setIsPublished(record?.is_published !== false);
  }, [record?.image_url, record?.link_url, record?.offer_pct, record?.is_published]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadErr(null);
    try {
      const url = await uploadImage(file);
      setLocalImageUrl(url);
    } catch (err) {
      setUploadErr(err.message);
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleSelectOfferMode = () => {
    setDestType('offer');
    setLocalLinkUrl('');
  };

  const handleSelectLinkMode = () => {
    setDestType('link');
    setLocalOfferPct('');
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const isOffer = destType === 'offer';
      const cleanDigits = localOfferPct.replace(/[^0-9]/g, '');
      const offerNum = (isOffer && cleanDigits !== '') ? parseInt(cleanDigits, 10) : null;
      const finalLink = isOffer ? '' : localLinkUrl.trim();

      await onChange(slot.id, {
        image_url: localImageUrl,
        link_url: finalLink,
        offer_pct: offerNum,
        is_published: isPublished,
      });

      // Keep local state in sync
      if (isOffer) {
        setLocalOfferPct(offerNum ? String(offerNum) : '');
        setLocalLinkUrl('');
      } else {
        setLocalLinkUrl(finalLink);
        setLocalOfferPct('');
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      alert('Save failed: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const cardStyle = {
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div style={cardStyle}>
      {/* Preview strip */}
      <div style={{ width: '100%', height: '140px', backgroundColor: '#f8fafc', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {localImageUrl ? (
          <img
            src={localImageUrl}
            alt={slot.label}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
            No Image Set
          </div>
        )}
        <span style={{
          position: 'absolute', top: '8px', right: '8px',
          padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '600',
          backgroundColor: isPublished ? '#dcfce7' : '#fee2e2',
          color: isPublished ? '#166534' : '#991b1b',
        }}>
          {isPublished ? 'LIVE' : 'HIDDEN'}
        </span>
      </div>

      {/* Card Body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        <div>
          <h4 style={{ margin: '0 0 2px 0', fontSize: '1rem', color: '#1a1a1a' }}>{slot.label}</h4>
          <p style={{ margin: 0, fontSize: '0.78rem', color: '#64748b' }}>{slot.hint}</p>
        </div>

        {/* Image URL Input */}
        <div>
          <label style={{ fontSize: '0.72rem', fontWeight: '600', color: '#475569', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Banner Image URL</label>
          <input
            type="text"
            value={localImageUrl}
            onChange={e => setLocalImageUrl(e.target.value)}
            placeholder="https://... or upload below"
            style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.82rem', boxSizing: 'border-box' }}
          />
        </div>

        {/* File Upload */}
        <div>
          <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={handleFileChange} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            style={{ width: '100%', padding: '8px', backgroundColor: '#f0f9ff', color: '#0369a1', border: '1px dashed #7dd3fc', borderRadius: '6px', cursor: uploading ? 'not-allowed' : 'pointer', fontSize: '0.82rem', fontWeight: '500' }}
          >
            {uploading ? '⏳ Uploading...' : '⬆ Upload Image from File'}
          </button>
          {uploadErr && <p style={{ color: '#dc2626', fontSize: '0.75rem', marginTop: '4px' }}>{uploadErr}</p>}
        </div>

        {/* Click Destination — Offer % OR Link URL with Interactive Radio Tabs */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
            Click Destination — choose one:
          </div>

          {/* Radio Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <label
              onClick={handleSelectOfferMode}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                border: `1.5px solid ${destType === 'offer' ? '#7c3aed' : '#e2e8f0'}`,
                backgroundColor: destType === 'offer' ? '#f5f3ff' : '#fff',
                color: destType === 'offer' ? '#6d28d9' : '#64748b',
                fontWeight: '600',
                fontSize: '0.78rem',
                userSelect: 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <input
                type="radio"
                name={`dest_${slot.id}`}
                checked={destType === 'offer'}
                onChange={handleSelectOfferMode}
                style={{ accentColor: '#7c3aed', cursor: 'pointer' }}
              />
              Offer % (Auto-filter)
            </label>

            <label
              onClick={handleSelectLinkMode}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 10px',
                borderRadius: '6px',
                cursor: 'pointer',
                border: `1.5px solid ${destType === 'link' ? '#0369a1' : '#e2e8f0'}`,
                backgroundColor: destType === 'link' ? '#f0f9ff' : '#fff',
                color: destType === 'link' ? '#0369a1' : '#64748b',
                fontWeight: '600',
                fontSize: '0.78rem',
                userSelect: 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <input
                type="radio"
                name={`dest_${slot.id}`}
                checked={destType === 'link'}
                onChange={handleSelectLinkMode}
                style={{ accentColor: '#0369a1', cursor: 'pointer' }}
              />
              Manual Link URL
            </label>
          </div>

          {/* Active Field */}
          {destType === 'offer' ? (
            <div style={{ paddingTop: '2px' }}>
              <label style={{ fontSize: '0.73rem', fontWeight: '600', color: '#7c3aed', display: 'block', marginBottom: '5px' }}>
                Offer % (e.g. 10 → auto-filters shop with &ge;10% off)
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '100px' }}>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={localOfferPct}
                    onChange={e => setLocalOfferPct(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="e.g. 10"
                    style={{
                      width: '100%',
                      padding: '8px 24px 8px 10px',
                      border: '1.5px solid #7c3aed',
                      borderRadius: '6px',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      boxSizing: 'border-box',
                      background: '#fff',
                      color: '#1a1a1a'
                    }}
                  />
                  <span style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', color: '#7c3aed', fontWeight: '700', fontSize: '0.85rem', pointerEvents: 'none' }}>%</span>
                </div>
                {localOfferPct && (
                  <span style={{ fontSize: '0.78rem', color: '#7c3aed', fontWeight: '600' }}>
                    &rarr; /shop?discount={localOfferPct}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div style={{ paddingTop: '2px' }}>
              <label style={{ fontSize: '0.73rem', fontWeight: '600', color: '#0369a1', display: 'block', marginBottom: '5px' }}>
                Link URL Destination
              </label>
              <input
                type="text"
                value={localLinkUrl}
                onChange={e => setLocalLinkUrl(e.target.value)}
                placeholder="/shop, /collections, or https://..."
                style={{
                  width: '100%',
                  padding: '9px',
                  border: '1.5px solid #0369a1',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box',
                  background: '#fff',
                  color: '#1a1a1a'
                }}
              />
            </div>
          )}
        </div>

        {/* Publish Toggle + Save */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
          <button
            type="button"
            onClick={() => setIsPublished(p => !p)}
            style={{ padding: '7px 12px', backgroundColor: isPublished ? '#fef2f2' : '#f0fdf4', color: isPublished ? '#dc2626' : '#16a34a', border: `1px solid ${isPublished ? '#fecaca' : '#bbf7d0'}`, borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', whiteSpace: 'nowrap' }}
          >
            {isPublished ? 'Hide Banner' : 'Show Banner'}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            style={{ flex: 1, padding: '9px', backgroundColor: saved ? '#dcfce7' : '#1a1a1a', color: saved ? '#166534' : '#fff', border: 'none', borderRadius: '6px', cursor: saving ? 'wait' : 'pointer', fontWeight: '600', fontSize: '0.85rem', transition: 'background-color 0.3s' }}
          >
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Banner'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main BannersPage component
// ─────────────────────────────────────────────────────────────────────────────
export default function BannersPage() {
  const [records, setRecords] = useState({});      // keyed by slot.id
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState('Home');

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const { data } = await supabaseClient
        .from('banners')
        .select('*');

      const map = {};
      if (data) {
        data.forEach(row => {
          map[row.section_id] = {
            id: row.id,
            image_url: row.image_url || '',
            link_url: row.link_url || '',
            offer_pct: row.offer_pct != null ? String(row.offer_pct) : '',
            is_published: row.is_published !== false,
          };
        });
      }
      setRecords(map);
    } catch (err) {
      console.error('Banner fetch error:', err);
    }
    setLoading(false);
  };

  const handleChange = async (slotId, updates) => {
    const existing = records[slotId];
    const cleanOfferStr = (updates.offer_pct != null && String(updates.offer_pct).trim() !== '') ? String(updates.offer_pct) : '';
    const cleanOfferNum = cleanOfferStr ? parseInt(cleanOfferStr, 10) : null;
    const cleanLink = updates.link_url || '';

    const dbPayload = {
      image_url: updates.image_url || '',
      link_url: cleanLink,
      offer_pct: cleanOfferNum,
      is_published: updates.is_published !== false,
    };

    const statePayload = {
      image_url: updates.image_url || '',
      link_url: cleanLink,
      offer_pct: cleanOfferStr,
      is_published: updates.is_published !== false,
    };

    if (existing && existing.id) {
      // Update existing row
      const { error } = await supabaseClient
        .from('banners')
        .update(dbPayload)
        .eq('id', existing.id);
      if (error) throw error;
      setRecords(prev => ({
        ...prev,
        [slotId]: { ...(prev[slotId] || {}), ...statePayload, id: existing.id }
      }));
    } else {
      // Insert new row
      const { data, error } = await supabaseClient
        .from('banners')
        .insert([{
          section_id: slotId,
          ...dbPayload,
          sort_order: 0,
        }])
        .select()
        .single();
      if (error) throw error;
      if (data) {
        setRecords(prev => ({
          ...prev,
          [slotId]: { id: data.id, ...statePayload }
        }));
      }
    }
  };

  const slotsForPage = BANNER_SLOTS.filter(s => s.page === activePage);

  const tabStyle = (pg) => ({
    padding: '9px 18px',
    backgroundColor: activePage === pg ? '#1a1a1a' : '#f1f5f9',
    color: activePage === pg ? '#ffffff' : '#475569',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.85rem',
    whiteSpace: 'nowrap',
  });

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 6px 0', color: '#1a1a1a', fontSize: '1.2rem' }}>Banners Manager</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
          Every banner on every page — image + link only. No text overlays, no buttons. Clicking the banner image navigates to the link.
        </p>
      </div>

      {/* Page tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {PAGE_GROUPS.map(pg => (
          <button key={pg} onClick={() => setActivePage(pg)} style={tabStyle(pg)}>{pg}</button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: '#64748b' }}>Loading banners...</p>
      ) : (
        <>
          <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '20px' }}>
            Showing <strong>{slotsForPage.length}</strong> banner slot{slotsForPage.length !== 1 ? 's' : ''} for <strong>{activePage}</strong>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {slotsForPage.map(slot => (
              <BannerSlotCard
                key={slot.id}
                slot={slot}
                record={records[slot.id] || EMPTY_BANNER}
                onChange={handleChange}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
