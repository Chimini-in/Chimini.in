"use client";

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../../lib/supabase';

const STATIC_PAGE_DEFS = [
  { key: 'about_us', label: 'About Us / Our Story', route: '/about' },
  { key: 'sustainability', label: 'Sustainability & Eco Practices', route: '/sustainability' },
  { key: 'shipping_returns', label: 'Shipping & Returns Policy', route: '/shipping-returns' },
  { key: 'faq', label: 'Frequently Asked Questions (FAQ)', route: '/faq' },
  { key: 'store_locator', label: 'Atelier & Store Locator', route: '/store-locator' },
  { key: 'contact_us', label: 'Contact Us & Atelier Details', route: '/contact' }
];

export default function StaticPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState(null);
  const [contentObj, setContentObj] = useState({});
  const [rawJson, setRawJson] = useState('');
  const [mode, setMode] = useState('form'); // 'form' or 'json'

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (!supabaseClient) {
        setPages([]);
        setLoading(false);
        return;
      }
      const { data } = await supabaseClient.from('page_content').select('*');
      if (data) setPages(data);
    } catch (e) {
      console.warn("Could not fetch page_content:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingPage) return;

    let finalContent = contentObj;
    if (mode === 'json') {
      try {
        finalContent = JSON.parse(rawJson);
      } catch (err) {
        alert("Invalid JSON format. Please fix syntax errors before saving.");
        return;
      }
    }

    const exists = pages.find(p => p.page_name === editingPage);
    
    if (exists) {
      await supabaseClient.from('page_content').update({ content: finalContent }).eq('page_name', editingPage);
    } else {
      await supabaseClient.from('page_content').insert([{ page_name: editingPage, content: finalContent }]);
    }
    
    alert('Page content saved successfully!');
    setEditingPage(null);
    fetchData();
  };

  const openEditor = (pageName) => {
    setEditingPage(pageName);
    const existing = pages.find(p => p.page_name === pageName);
    let initialObj = {};
    if (existing && existing.content) {
      initialObj = typeof existing.content === 'string' ? { html: existing.content } : existing.content;
    }
    setContentObj(initialObj);
    setRawJson(JSON.stringify(initialObj, null, 2));
    setMode('form');
  };

  const handleFieldChange = (key, value) => {
    setContentObj(prev => ({ ...prev, [key]: value }));
  };

  const iStyle = { width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' };
  const lStyle = { fontSize: '0.85rem', color: '#475569', fontWeight: '500', marginBottom: '4px', display: 'block' };

  const renderFormFields = () => {
    if (editingPage === 'about_us') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h4 style={{ margin: '10px 0 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Hero Section</h4>
          <div><label style={lStyle}>Hero Title</label><input style={iStyle} value={contentObj.hero_title || ''} onChange={e => handleFieldChange('hero_title', e.target.value)} /></div>
          <div><label style={lStyle}>Hero Subtitle</label><input style={iStyle} value={contentObj.hero_subtitle || ''} onChange={e => handleFieldChange('hero_subtitle', e.target.value)} /></div>
          
          <h4 style={{ margin: '10px 0 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Our Story / Origin</h4>
          <div><label style={lStyle}>Story Heading</label><input style={iStyle} value={contentObj.story_a_heading || ''} onChange={e => handleFieldChange('story_a_heading', e.target.value)} /></div>
          <div><label style={lStyle}>Story Body Paragraph</label><textarea style={{...iStyle, minHeight: '80px'}} value={contentObj.story_a_body || ''} onChange={e => handleFieldChange('story_a_body', e.target.value)} /></div>

          <h4 style={{ margin: '10px 0 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Founder & Quote</h4>
          <div><label style={lStyle}>Signature Quote</label><input style={iStyle} value={contentObj.big_quote || ''} onChange={e => handleFieldChange('big_quote', e.target.value)} /></div>
          <div><label style={lStyle}>Founder Name</label><input style={iStyle} value={contentObj.founder_name || ''} onChange={e => handleFieldChange('founder_name', e.target.value)} /></div>
        </div>
      );
    } else if (editingPage === 'sustainability') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h4 style={{ margin: '10px 0 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Hero Header</h4>
          <div><label style={lStyle}>Page Subtitle</label><input style={iStyle} placeholder="OUR CONSCIOUS COMMITMENT" value={contentObj.subtitle || ''} onChange={e => handleFieldChange('subtitle', e.target.value)} /></div>
          <div><label style={lStyle}>Page Title</label><input style={iStyle} placeholder="Crafted with Reverence for Nature" value={contentObj.title || ''} onChange={e => handleFieldChange('title', e.target.value)} /></div>
          <div><label style={lStyle}>Introduction Description</label><textarea style={{...iStyle, minHeight: '70px'}} value={contentObj.desc || ''} onChange={e => handleFieldChange('desc', e.target.value)} /></div>
        </div>
      );
    } else if (editingPage === 'shipping_returns') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h4 style={{ margin: '10px 0 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Hero Header</h4>
          <div><label style={lStyle}>Page Subtitle</label><input style={iStyle} placeholder="TRANSPARENT & COMPLIMENTARY" value={contentObj.subtitle || ''} onChange={e => handleFieldChange('subtitle', e.target.value)} /></div>
          <div><label style={lStyle}>Page Title</label><input style={iStyle} placeholder="Shipping & Returns Policy" value={contentObj.title || ''} onChange={e => handleFieldChange('title', e.target.value)} /></div>
          <div><label style={lStyle}>Policy Summary</label><textarea style={{...iStyle, minHeight: '70px'}} value={contentObj.desc || ''} onChange={e => handleFieldChange('desc', e.target.value)} /></div>
        </div>
      );
    } else if (editingPage === 'faq') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h4 style={{ margin: '10px 0 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Hero Header</h4>
          <div><label style={lStyle}>Page Subtitle</label><input style={iStyle} placeholder="FREQUENTLY ASKED QUESTIONS" value={contentObj.subtitle || ''} onChange={e => handleFieldChange('subtitle', e.target.value)} /></div>
          <div><label style={lStyle}>Page Title</label><input style={iStyle} placeholder="Everything You Need to Know" value={contentObj.title || ''} onChange={e => handleFieldChange('title', e.target.value)} /></div>
          <div><label style={lStyle}>Description</label><textarea style={{...iStyle, minHeight: '70px'}} value={contentObj.desc || ''} onChange={e => handleFieldChange('desc', e.target.value)} /></div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>To customize or add new Q&A pairs, switch to Raw JSON mode.</p>
        </div>
      );
    } else if (editingPage === 'store_locator') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h4 style={{ margin: '10px 0 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Hero Header</h4>
          <div><label style={lStyle}>Page Subtitle</label><input style={iStyle} placeholder="EXPERIENCE THE SANCTUARY" value={contentObj.subtitle || ''} onChange={e => handleFieldChange('subtitle', e.target.value)} /></div>
          <div><label style={lStyle}>Page Title</label><input style={iStyle} placeholder="Atelier & Store Locator" value={contentObj.title || ''} onChange={e => handleFieldChange('title', e.target.value)} /></div>
          <div><label style={lStyle}>Description</label><textarea style={{...iStyle, minHeight: '70px'}} value={contentObj.desc || ''} onChange={e => handleFieldChange('desc', e.target.value)} /></div>
        </div>
      );
    } else if (editingPage === 'contact_us') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h4 style={{ margin: '10px 0 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Atelier Contact Details</h4>
          <div><label style={lStyle}>Address</label><input style={iStyle} value={contentObj.address || ''} onChange={e => handleFieldChange('address', e.target.value)} /></div>
          <div><label style={lStyle}>Email</label><input style={iStyle} value={contentObj.email || ''} onChange={e => handleFieldChange('email', e.target.value)} /></div>
          <div><label style={lStyle}>Phone Numbers</label><input style={iStyle} value={contentObj.phone || ''} onChange={e => handleFieldChange('phone', e.target.value)} /></div>
          <div><label style={lStyle}>WhatsApp Number</label><input style={iStyle} value={contentObj.whatsapp || ''} onChange={e => handleFieldChange('whatsapp', e.target.value)} /></div>
          <div><label style={lStyle}>Studio Hours</label><textarea style={{...iStyle, minHeight: '60px'}} value={contentObj.hours || ''} onChange={e => handleFieldChange('hours', e.target.value)} /></div>
        </div>
      );
    }
    return <p>Unknown page format.</p>;
  };

  return (
    <div style={{ padding: '30px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#1a1a1a', margin: '0 0 6px 0' }}>
        Static Pages & Policies
      </h1>
      <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0 0 25px 0' }}>
        Manage content, brand stories, FAQs, policies, and studio information across all storefront subpages.
      </p>

      {!editingPage ? (
        <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', padding: '20px', border: '1px solid #e2e8f0' }}>
          {loading ? <p>Loading static pages...</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {STATIC_PAGE_DEFS.map(pageDef => {
                const isConfigured = pages.find(p => p.page_name === pageDef.key);
                return (
                  <div key={pageDef.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: '#fcfcfd' }}>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '0.98rem', color: '#0f172a' }}>{pageDef.label}</h4>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '10px', backgroundColor: isConfigured ? '#dcfce7' : '#f1f5f9', color: isConfigured ? '#166534' : '#64748b' }}>
                          {isConfigured ? '✓ Custom Live Content' : 'Default Dynamic Content'}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{pageDef.route}</span>
                      </div>
                    </div>
                    <button onClick={() => openEditor(pageDef.key)} style={{ padding: '8px 16px', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}>
                      Edit Page Content
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', padding: '30px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#0f172a' }}>
              Editing: {STATIC_PAGE_DEFS.find(p => p.key === editingPage)?.label || editingPage}
            </h3>
            <button onClick={() => setEditingPage(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.9rem' }}>
              &larr; Back to Pages List
            </button>
          </div>
          
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <button type="button" onClick={() => { setMode('form'); try { setContentObj(JSON.parse(rawJson)); } catch(e){} }} style={{ padding: '6px 14px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: mode === 'form' ? '#1a1a1a' : '#f1f5f9', color: mode === 'form' ? '#fff' : '#475569', fontSize: '0.85rem' }}>Form Editor</button>
            <button type="button" onClick={() => { setMode('json'); setRawJson(JSON.stringify(contentObj, null, 2)); }} style={{ padding: '6px 14px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: mode === 'json' ? '#1a1a1a' : '#f1f5f9', color: mode === 'json' ? '#fff' : '#475569', fontSize: '0.85rem' }}>Raw JSON Editor</button>
          </div>

          <form onSubmit={handleSave}>
            <div style={{ marginBottom: '25px' }}>
              {mode === 'form' ? renderFormFields() : (
                <textarea 
                  value={rawJson}
                  onChange={e => setRawJson(e.target.value)}
                  style={{ width: '100%', minHeight: '400px', padding: '15px', border: '1px solid #e2e8f0', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              )}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" style={{ padding: '12px 25px', backgroundColor: 'var(--color-text-dark, #1a1a1a)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', fontSize: '0.9rem' }}>
                Save & Publish Page Content
              </button>
              <button type="button" onClick={() => setEditingPage(null)} style={{ padding: '12px 20px', backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #cbd5e1', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
