"use client";

import React, { useState } from 'react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('tabBanners');

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div className="admin-header" style={{ padding: '20px 30px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', margin: 0, color: 'var(--color-text-dark)' }}>CHIMINI Brand Management Portal</h2>
          </div>
          
          <div className="admin-layout" style={{ display: 'flex', minHeight: '600px' }}>
            <div className="admin-sidebar" style={{ width: '250px', backgroundColor: '#f9f9f9', borderRight: '1px solid var(--color-border)', padding: '20px 0' }}>
              <button 
                className={`admin-tab-btn ${activeTab === 'tabBanners' ? 'active' : ''}`} 
                onClick={() => setActiveTab('tabBanners')}
              >Banners & Hero</button>
              <button 
                className={`admin-tab-btn ${activeTab === 'tabProducts' ? 'active' : ''}`} 
                onClick={() => setActiveTab('tabProducts')}
              >Best Sellers</button>
              <button 
                className={`admin-tab-btn ${activeTab === 'tabSettings' ? 'active' : ''}`} 
                onClick={() => setActiveTab('tabSettings')}
              >Announcement Bar</button>
            </div>
            
            <div className="admin-main-content" style={{ flex: 1, padding: '30px' }}>
              {activeTab === 'tabBanners' && (
                <div className="admin-section active">
                  <h3>Custom Graphics & Banners</h3>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>Configure your homepage layout and imagery.</p>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Saved (Mock)'); }}>
                    <div className="admin-form-group">
                      <label>Hero Carousel Slide 1 Image URL</label>
                      <input type="text" className="admin-form-control" placeholder="https://..." />
                    </div>
                    <div className="admin-form-group">
                      <label>Hero Slide 1 Title Overlay</label>
                      <input type="text" className="admin-form-control" placeholder="Enter title..." />
                    </div>
                    <hr style={{ margin: '25px 0', borderTop: '1px solid var(--color-border)' }} />
                    <button type="submit" className="btn-accent" style={{ width: '100%' }}>Save Banner Setup</button>
                  </form>
                </div>
              )}

              {activeTab === 'tabProducts' && (
                <div className="admin-section active">
                  <h3>Manage Best Sellers Grid</h3>
                  <p style={{ color: 'var(--color-text-muted)', marginBottom: '20px' }}>Select products to feature on the homepage.</p>
                  <div style={{ overflowX: 'auto', marginBottom: '30px' }}>
                    <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                          <th style={{ textAlign: 'left', padding: '10px' }}>Product</th>
                          <th style={{ textAlign: 'left', padding: '10px' }}>Name</th>
                          <th style={{ textAlign: 'left', padding: '10px' }}>Price</th>
                          <th style={{ textAlign: 'left', padding: '10px' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Product management mock view</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'tabSettings' && (
                <div className="admin-section active">
                  <h3>Store Announcements</h3>
                  <form onSubmit={(e) => { e.preventDefault(); alert('Announcements Saved (Mock)'); }}>
                    <div className="admin-form-group">
                      <label>Announcement Text 1</label>
                      <input type="text" className="admin-form-control" />
                    </div>
                    <div className="admin-form-group">
                      <label>Announcement Text 2</label>
                      <input type="text" className="admin-form-control" />
                    </div>
                    <button type="submit" className="btn-accent" style={{ width: '100%', marginTop: '20px' }}>Save Announcements</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
