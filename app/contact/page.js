"use client";

import React from 'react';

export default function ContactPage() {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-subtitle">We would love to hear from you</p>
        </div>

        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message Sent! We will get back to you soon.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-dark)', fontWeight: '500' }}>Name</label>
            <input type="text" className="admin-form-control" required placeholder="Your full name" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-dark)', fontWeight: '500' }}>Email</label>
            <input type="email" className="admin-form-control" required placeholder="your.email@example.com" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-dark)', fontWeight: '500' }}>Message</label>
            <textarea className="admin-form-control" rows="5" required placeholder="How can we help you?" style={{ resize: 'vertical' }}></textarea>
          </div>
          <button type="submit" className="btn-accent" style={{ marginTop: '10px' }}>Send Message</button>
        </form>
      </div>
    </div>
  );
}
