"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [footerContent, setFooterContent] = useState({
    about: 'Crafting ambient luxury with organic botanicals. Elevate your space with our signature hand-poured soy candles.',
    quickLinks: [
      { label: 'Shop All', href: '/collections' },
      { label: 'Our Story', href: '/about' },
      { label: 'Gift Hampers', href: '/gifts' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Admin Portal', href: '/admin/login' }
    ],
    customerCare: [
      { label: 'Shipping & Returns', href: '#' },
      { label: 'Candle Care Guide', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' }
    ]
  });

  useEffect(() => {
    const saved = localStorage.getItem('chimini_footer_content');
    if (saved) {
      setFooterContent(JSON.parse(saved));
    }
  }, []);

  return (
    <footer id="footer">
      <div className="container" id="dynamicFooter">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-brand">CHIMINI</h3>
            <p className="footer-desc">{footerContent.about}</p>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {footerContent.quickLinks.map(l => (
                <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Customer Care</h4>
            <ul className="footer-links">
              {footerContent.customerCare.map(l => (
                <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="footer-desc" style={{ marginBottom: '15px' }}>Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Chimini Newsletter!'); }}>
              <input type="email" placeholder="Enter your email address" className="newsletter-input" required />
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} CHIMINI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
