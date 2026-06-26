"use client";

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../../lib/supabase';

export default function StaticPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPage, setEditingPage] = useState(null);
  const [content, setContent] = useState('');

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

    // See if it exists
    const exists = pages.find(p => p.page_name === editingPage);
    
    if (exists) {
      await supabaseClient.from('page_content').update({ content: { html: content } }).eq('page_name', editingPage);
    } else {
      await supabaseClient.from('page_content').insert([{ page_name: editingPage, content: { html: content } }]);
    }
    
    alert('Page content saved successfully!');
    setEditingPage(null);
    fetchData();
  };

  const openEditor = (pageName) => {
    setEditingPage(pageName);
    const existing = pages.find(p => p.page_name === pageName);
    if (existing && existing.content && existing.content.html) {
      setContent(existing.content.html);
    } else {
      setContent('');
    }
  };

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
                        {isConfigured ? 'Custom Content Set' : 'Using Default Hardcoded Content'}
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
          
          <form onSubmit={handleSave}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.9rem', color: '#475569' }}>Page Content (HTML supported)</label>
              <textarea 
                value={content}
                onChange={e => setContent(e.target.value)}
                style={{ width: '100%', minHeight: '400px', padding: '15px', border: '1px solid #e2e8f0', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.9rem' }}
                placeholder="<h1>About Us</h1><p>Welcome to Chimini...</p>"
              />
            </div>
            <button type="submit" style={{ padding: '12px 25px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Save Page</button>
          </form>
        </div>
      )}
    </div>
  );
}
