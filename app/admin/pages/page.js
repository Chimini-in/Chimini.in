"use client";

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../../lib/supabase';

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
    const { data } = await supabaseClient.from('page_content').select('*');
    if (data) setPages(data);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editingPage) return;

    let finalContent = contentObj;
    if (mode === 'json') {
      try {
        finalContent = JSON.parse(rawJson);
      } catch (err) {
        alert("Invalid JSON format. Please fix errors before saving.");
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
      initialObj = existing.content;
    }
    setContentObj(initialObj);
    setRawJson(JSON.stringify(initialObj, null, 2));
    setMode('form');
  };

  const handleFieldChange = (key, value) => {
    setContentObj(prev => ({ ...prev, [key]: value }));
  };

  const renderFormFields = () => {
    if (editingPage === 'about_us') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h4 style={{ margin: '10px 0 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Hero Section</h4>
          <input style={iStyle} placeholder="Hero Title" value={contentObj.hero_title || ''} onChange={e => handleFieldChange('hero_title', e.target.value)} />
          <input style={iStyle} placeholder="Hero Subtitle" value={contentObj.hero_subtitle || ''} onChange={e => handleFieldChange('hero_subtitle', e.target.value)} />
          <input style={iStyle} placeholder="Hero Image URL" value={contentObj.hero_image || ''} onChange={e => handleFieldChange('hero_image', e.target.value)} />
          
          <h4 style={{ margin: '10px 0 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Story Section A</h4>
          <input style={iStyle} placeholder="Heading" value={contentObj.story_a_heading || ''} onChange={e => handleFieldChange('story_a_heading', e.target.value)} />
          <textarea style={{...iStyle, minHeight: '60px'}} placeholder="Body" value={contentObj.story_a_body || ''} onChange={e => handleFieldChange('story_a_body', e.target.value)} />
          <input style={iStyle} placeholder="Quote" value={contentObj.story_a_quote || ''} onChange={e => handleFieldChange('story_a_quote', e.target.value)} />
          <input style={iStyle} placeholder="Image URL" value={contentObj.story_a_image || ''} onChange={e => handleFieldChange('story_a_image', e.target.value)} />

          <h4 style={{ margin: '10px 0 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Story Section B</h4>
          <input style={iStyle} placeholder="Heading" value={contentObj.story_b_heading || ''} onChange={e => handleFieldChange('story_b_heading', e.target.value)} />
          <textarea style={{...iStyle, minHeight: '60px'}} placeholder="Body" value={contentObj.story_b_body || ''} onChange={e => handleFieldChange('story_b_body', e.target.value)} />
          <input style={iStyle} placeholder="Image URL" value={contentObj.story_b_image || ''} onChange={e => handleFieldChange('story_b_image', e.target.value)} />

          <h4 style={{ margin: '10px 0 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Founder & Quotes</h4>
          <input style={iStyle} placeholder="Big Quote" value={contentObj.big_quote || ''} onChange={e => handleFieldChange('big_quote', e.target.value)} />
          <input style={iStyle} placeholder="Founder Name" value={contentObj.founder_name || ''} onChange={e => handleFieldChange('founder_name', e.target.value)} />
          <textarea style={{...iStyle, minHeight: '60px'}} placeholder="Founder Quote" value={contentObj.founder_quote || ''} onChange={e => handleFieldChange('founder_quote', e.target.value)} />
          <input style={iStyle} placeholder="Founder Image URL" value={contentObj.founder_image || ''} onChange={e => handleFieldChange('founder_image', e.target.value)} />
          
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '10px' }}>Note: Arrays like values, process_steps, trust_badges are better edited in JSON mode.</p>
        </div>
      );
    } else if (editingPage === 'contact_us') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h4 style={{ margin: '10px 0 0', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>Contact Details</h4>
          <label style={lStyle}>Address</label>
          <input style={iStyle} value={contentObj.address || ''} onChange={e => handleFieldChange('address', e.target.value)} />
          <label style={lStyle}>Email</label>
          <input style={iStyle} value={contentObj.email || ''} onChange={e => handleFieldChange('email', e.target.value)} />
          <label style={lStyle}>Phone</label>
          <input style={iStyle} value={contentObj.phone || ''} onChange={e => handleFieldChange('phone', e.target.value)} />
          <label style={lStyle}>WhatsApp Number</label>
          <input style={iStyle} value={contentObj.whatsapp || ''} onChange={e => handleFieldChange('whatsapp', e.target.value)} />
          <label style={lStyle}>Store Hours</label>
          <textarea style={{...iStyle, minHeight: '60px'}} value={contentObj.hours || ''} onChange={e => handleFieldChange('hours', e.target.value)} />
          
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '10px' }}>Note: FAQs array is better edited in JSON mode.</p>
        </div>
      );
    }
    return <p>Unknown page format.</p>;
  };

  const iStyle = { width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.9rem', boxSizing: 'border-box' };
  const lStyle = { fontSize: '0.85rem', color: '#475569', marginBottom: '-10px' };

  return (
    <div>
      <h3 style={{ margin: 0, marginBottom: '20px', color: '#1a1a1a', fontSize: '1.2rem' }}>Static Pages Management</h3>

      {!editingPage ? (
        <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', padding: '20px' }}>
          {loading ? <p>Loading...</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {['about_us', 'contact_us'].map(pageName => {
                const isConfigured = pages.find(p => p.page_name === pageName);
                return (
                  <div key={pageName} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                    <div>
                      <h4 style={{ margin: '0 0 5px 0', textTransform: 'capitalize' }}>{pageName.replace('_', ' ')}</h4>
                      <span style={{ fontSize: '0.8rem', padding: '3px 8px', borderRadius: '10px', backgroundColor: isConfigured ? '#dcfce7' : '#f1f5f9', color: isConfigured ? '#166534' : '#64748b' }}>
                        {isConfigured ? 'Content Configured' : 'Needs Configuration'}
                      </span>
                    </div>
                    <button onClick={() => openEditor(pageName)} style={{ padding: '8px 15px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                      Edit Content
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, textTransform: 'capitalize' }}>Editing {editingPage.replace('_', ' ')}</h3>
            <button onClick={() => setEditingPage(null)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>&larr; Back to List</button>
          </div>
          
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <button onClick={() => { setMode('form'); setContentObj(JSON.parse(rawJson)); }} style={{ padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: mode === 'form' ? '#1a1a1a' : '#f1f5f9', color: mode === 'form' ? '#fff' : '#475569' }}>Form Editor</button>
            <button onClick={() => { setMode('json'); setRawJson(JSON.stringify(contentObj, null, 2)); }} style={{ padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', backgroundColor: mode === 'json' ? '#1a1a1a' : '#f1f5f9', color: mode === 'json' ? '#fff' : '#475569' }}>Raw JSON</button>
          </div>

          <form onSubmit={handleSave}>
            <div style={{ marginBottom: '20px' }}>
              {mode === 'form' ? renderFormFields() : (
                <textarea 
                  value={rawJson}
                  onChange={e => setRawJson(e.target.value)}
                  style={{ width: '100%', minHeight: '400px', padding: '15px', border: '1px solid #e2e8f0', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.9rem', boxSizing: 'border-box' }}
                />
              )}
            </div>
            <button type="submit" style={{ padding: '12px 25px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Save Page</button>
          </form>
        </div>
      )}
    </div>
  );
}
