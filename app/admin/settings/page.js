"use client";

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '../../../lib/supabase';

export default function SettingsPage() {
  const [announcements, setAnnouncements] = useState(['']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabaseClient
      .from('settings')
      .select('setting_value')
      .eq('setting_key', 'announcements')
      .single();
      
    if (data && data.setting_value && Array.isArray(data.setting_value)) {
      setAnnouncements(data.setting_value);
    } else if (data && typeof data.setting_value === 'string') {
      try {
        const parsed = JSON.parse(data.setting_value);
        setAnnouncements(Array.isArray(parsed) ? parsed : [data.setting_value]);
      } catch (e) {
        setAnnouncements([data.setting_value]);
      }
    }
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const cleanAnnouncements = announcements.filter(a => a.trim() !== '');
    
    // Check if row exists
    const { data } = await supabaseClient.from('settings').select('id').eq('setting_key', 'announcements');
    
    if (data && data.length > 0) {
      await supabaseClient.from('settings').update({ setting_value: cleanAnnouncements }).eq('setting_key', 'announcements');
    } else {
      await supabaseClient.from('settings').insert([{ setting_key: 'announcements', setting_value: cleanAnnouncements }]);
    }
    alert('Settings saved successfully!');
    fetchData();
  };

  const addAnnouncement = () => {
    setAnnouncements([...announcements, '']);
  };

  const updateAnnouncement = (index, value) => {
    const newArr = [...announcements];
    newArr[index] = value;
    setAnnouncements(newArr);
  };

  const removeAnnouncement = (index) => {
    const newArr = [...announcements];
    newArr.splice(index, 1);
    setAnnouncements(newArr);
  };

  return (
    <div>
      <h3 style={{ margin: 0, marginBottom: '20px', color: '#1a1a1a', fontSize: '1.2rem' }}>Global Settings</h3>

      <div style={{ backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', padding: '30px', maxWidth: '800px' }}>
        {loading ? <p>Loading...</p> : (
          <form onSubmit={handleSave}>
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem', color: '#1a1a1a', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Top Announcement Bar</h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '15px' }}>These messages scroll automatically at the very top of the storefront.</p>
              
              {announcements.map((ann, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input 
                    type="text" 
                    value={ann} 
                    onChange={e => updateAnnouncement(idx, e.target.value)} 
                    placeholder="e.g. Free shipping on orders over ₹1500" 
                    style={{ flex: 1, padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                  />
                  <button type="button" onClick={() => removeAnnouncement(idx)} style={{ padding: '0 15px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Remove</button>
                </div>
              ))}
              
              <button type="button" onClick={addAnnouncement} style={{ padding: '8px 15px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', marginTop: '5px' }}>+ Add Message</button>
            </div>

            <button type="submit" style={{ padding: '12px 25px', backgroundColor: 'var(--color-text-dark)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Save All Settings</button>
          </form>
        )}
      </div>
    </div>
  );
}
