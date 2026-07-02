"use client";

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase';

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      const { data } = await supabaseClient.from('page_content').select('content').eq('page_name', 'contact_us').single();
      if (data && data.content) {
        setContent(data.content);
      }
      setLoading(false);
    }
    fetchContent();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent! We'll get back to you within 24 hours.");
  };

  if (loading) return <div style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>;

  const c = content || {};
  const faqs = c.faqs || [
    { question: 'How do I track my order?', answer: 'Once your order ships, we will send you a tracking link via email and SMS so you can follow its journey to your door.' },
    { question: 'Do you offer gift wrapping?', answer: 'Yes! All our gift sets come beautifully wrapped. You can also add custom gift wrapping to individual items at checkout.' },
    { question: 'Can I customise a candle?', answer: 'Absolutely. Use our "Build Your Own" section on the Gifts page to pick your favourite scent, box, ribbon, and add a handwritten note.' },
    { question: 'Do you accept bulk or corporate orders?', answer: 'We do! We offer special pricing and custom branding for bulk corporate orders. Select "Corporate Orders" in the form above and we will be in touch.' }
  ];

  const email = c.email || 'hello@chimini.in';
  const phone = c.phone || '+91 98765 43210';
  const address = c.address || '124 Artisan Lane,\nBandra West, Mumbai 400050\nIndia';
  const hours = c.hours || 'Mon - Sat: 10:00 AM - 8:00 PM\nSun: Closed';

  return (
    <div className="contact-page">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');

        .contact-page {
          background-color: #FFF8F0;
          font-family: 'DM Sans', sans-serif;
          color: #2A2A2A;
          overflow-x: hidden;
          padding-top: 60px;
        }

        .heading-display {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
        }

        /* 1. PAGE HERO */
        .hero-banner {
          background: linear-gradient(135deg, #F4A623, #E8533A);
          padding: 6rem 2rem;
          text-align: center;
          color: #FFF;
        }
        .hero-title {
          font-size: clamp(3rem, 6vw, 4.5rem);
          margin: 0 0 1rem 0;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.2);
          line-height: 1.1;
        }
        .hero-subtext {
          font-size: 1.25rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          margin: 0;
        }

        /* 2. CONTACT SECTION */
        .contact-section {
          padding: 5rem 2rem;
          max-width: 1200px;
          margin: -4rem auto 0;
          position: relative;
          z-index: 10;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 3rem;
        }
        /* Left: Form Card */
        .form-card {
          background-color: #FFF;
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-label {
          display: block;
          font-weight: 700;
          color: #2A2A2A;
          margin-bottom: 0.5rem;
          font-size: 1.05rem;
        }
        .form-control {
          width: 100%;
          padding: 1rem 1.2rem;
          border: 2px solid #EEE;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          transition: border-color 0.3s ease;
          background-color: #FDFDFD;
        }
        .form-control:focus {
          outline: none;
          border-color: #F4A623;
        }
        .btn-submit {
          width: 100%;
          background-color: #F4A623;
          color: #FFF;
          border: none;
          padding: 1.2rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          margin-top: 1rem;
        }
        .btn-submit:hover {
          background-color: #E8533A;
          transform: translateY(-2px);
        }

        /* Right: Info Card */
        .info-card {
          background-color: #2A7C6F; /* Teal */
          border-radius: 24px;
          padding: 3rem;
          color: #FFF;
          box-shadow: 0 15px 40px rgba(42, 124, 111, 0.2);
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .info-icon {
          font-size: 1.8rem;
          line-height: 1;
        }
        .info-text {
          font-size: 1.1rem;
          line-height: 1.6;
          white-space: pre-wrap;
        }
        .info-text strong {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          margin-bottom: 0.3rem;
        }
        .btn-whatsapp {
          display: inline-block;
          background-color: #FFF;
          color: #2A7C6F;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-decoration: none;
          text-align: center;
          margin-top: auto;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .btn-whatsapp:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.15);
        }

        /* 3. THREE QUICK CONTACT TILES */
        .quick-tiles-section {
          padding: 2rem 2rem 5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .quick-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .quick-tile {
          border-radius: 20px;
          padding: 2.5rem 1.5rem;
          text-align: center;
          color: #FFF;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          transition: transform 0.3s ease;
        }
        .quick-tile:hover {
          transform: translateY(-8px);
        }
        .tile-coral { background-color: #E8533A; }
        .tile-marigold { background-color: #F4A623; }
        .tile-teal { background-color: #2A7C6F; }
        .qt-icon { font-size: 2.5rem; }
        .qt-label {
          font-size: 1.5rem;
          margin: 0;
          font-family: 'Playfair Display', serif;
        }
        .qt-subtext {
          font-size: 1rem;
          margin: 0 0 1rem 0;
          opacity: 0.9;
        }
        .btn-white-pill {
          background-color: #FFF;
          color: #2A2A2A;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          font-size: 0.9rem;
        }
        .tile-coral .btn-white-pill { color: #E8533A; }
        .tile-marigold .btn-white-pill { color: #F4A623; }
        .tile-teal .btn-white-pill { color: #2A7C6F; }

        /* 4. FAQ SECTION */
        .faq-section {
          padding: 5rem 2rem;
          max-width: 800px;
          margin: 0 auto;
        }
        .faq-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .faq-title {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          color: #2A2A2A;
          margin: 0;
        }
        .faq-title::after {
          content: " ✦";
          color: #F4A623;
        }
        .accordion-item {
          background: #FFF;
          border-radius: 16px;
          margin-bottom: 1rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .accordion-header {
          padding: 1.5rem 2rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #FFF;
          border: none;
          width: 100%;
          text-align: left;
        }
        .accordion-q {
          font-weight: 700;
          font-size: 1.2rem;
          color: #2A2A2A;
          margin: 0;
        }
        .accordion-icon {
          color: #E8533A;
          font-weight: 700;
          font-size: 1.5rem;
          transition: transform 0.3s ease;
        }
        .accordion-item.open .accordion-icon {
          transform: rotate(45deg);
        }
        .accordion-body {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease;
          background: #FAFAFA;
        }
        .accordion-item.open .accordion-body {
          max-height: 200px;
        }
        .accordion-content {
          padding: 0 2rem 1.5rem 2rem;
          color: #555;
          line-height: 1.6;
          font-size: 1.05rem;
        }

        /* 5. STORE LOCATOR CTA BANNER */
        .locator-banner {
          background: linear-gradient(135deg, #2A7C6F, #1a5c51);
          color: #FFF;
          text-align: center;
          padding: 6rem 2rem;
          margin: 2rem 0 4rem;
        }
        .locator-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin: 0 0 1rem 0;
        }
        .locator-address {
          font-size: 1.2rem;
          margin: 0 0 2rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          white-space: pre-wrap;
        }
        .btn-locator {
          background-color: #FFF;
          color: #2A7C6F;
          border: none;
          padding: 1.2rem 3rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .btn-locator:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }

        /* 6. SOCIAL STRIP */
        .social-strip {
          padding: 4rem 1rem 6rem;
          text-align: center;
          background-color: #FFF8F0;
        }
        .social-title {
          font-size: 2.5rem;
          color: #2A2A2A;
          margin: 0 0 2.5rem 0;
        }
        .social-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          max-width: 1200px;
          margin: 0 auto 3rem;
        }
        .social-img-wrap {
          aspect-ratio: 1;
          border-radius: 16px;
          overflow: hidden;
        }
        .social-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .social-img-wrap:hover .social-img {
          transform: scale(1.05);
        }
        .btn-social {
          display: inline-block;
          background-color: #2A2A2A;
          color: #FFF;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          transition: background-color 0.3s ease;
        }
        .btn-social:hover {
          background-color: #E8533A;
        }

        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr; }
          .quick-grid { grid-template-columns: 1fr; }
          .social-grid { grid-template-columns: repeat(2, 1fr); }
          .contact-section { margin-top: -2rem; }
        }
      `}} />

      {/* 1. PAGE HERO */}
      <section className="hero-banner">
        <h1 className="hero-title heading-display">Say Hello!<br/>We'd Love to Hear from You 👋</h1>
        <p className="hero-subtext">We reply to every message within 24 hours</p>
      </section>

      {/* 2. CONTACT SECTION */}
      <section className="contact-section">
        <div className="contact-grid">
          {/* Left: Form */}
          <div className="form-card">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" placeholder="Your full name" required />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <select className="form-control" required defaultValue="">
                  <option value="" disabled>What is this regarding?</option>
                  <option value="order">Order Tracking & Help</option>
                  <option value="gifting">Gifting & Customisation</option>
                  <option value="bulk">Bulk & Corporate Orders</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="5" placeholder="How can we help you today?" required></textarea>
              </div>
              <button type="submit" className="btn-submit">SEND MESSAGE →</button>
            </form>
          </div>

          {/* Right: Info */}
          <div className="info-card">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div className="info-text">
                <strong>Visit Our Studio</strong>
                {address}
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div className="info-text">
                <strong>Email Us</strong>
                {email}
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div className="info-text">
                <strong>Call Us</strong>
                {phone}
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🕒</span>
              <div className="info-text">
                <strong>Store Hours</strong>
                {hours}
              </div>
            </div>
            <a href="#" className="btn-whatsapp">Chat on WhatsApp</a>
          </div>
        </div>
      </section>

      {/* 3. THREE QUICK CONTACT TILES */}
      <section className="quick-tiles-section">
        <div className="quick-grid">
          <div className="quick-tile tile-coral">
            <span className="qt-icon">💬</span>
            <h3 className="qt-label">WhatsApp</h3>
            <p className="qt-subtext">Quick chats & product questions.</p>
            <button className="btn-white-pill">Message Us</button>
          </div>
          <div className="quick-tile tile-marigold">
            <span className="qt-icon">📧</span>
            <h3 className="qt-label">Email Us</h3>
            <p className="qt-subtext">Detailed queries & corporate orders.</p>
            <button className="btn-white-pill">Write to Us</button>
          </div>
          <div className="quick-tile tile-teal">
            <span className="qt-icon">🛍️</span>
            <h3 className="qt-label">Order Help</h3>
            <p className="qt-subtext">Tracking, shipping & returns support.</p>
            <button className="btn-white-pill">Get Support</button>
          </div>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="faq-section">
        <div className="faq-header">
          <h2 className="faq-title heading-display">Quick Answers</h2>
        </div>
        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div key={index} className={`accordion-item ${openFaq === index ? 'open' : ''}`}>
              <button className="accordion-header" onClick={() => toggleFaq(index)}>
                <h4 className="accordion-q">{faq.question}</h4>
                <span className="accordion-icon">+</span>
              </button>
              <div className="accordion-body">
                <div className="accordion-content">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. STORE LOCATOR CTA BANNER */}
      <section className="locator-banner">
        <h2 className="locator-title heading-display">Visit Us In-Store</h2>
        <p className="locator-address">
          <span>📍</span> {address.replace(/\n/g, ' ')}
        </p>
        <button className="btn-locator">FIND OUR STORE</button>
      </section>

      {/* 6. SOCIAL STRIP */}
      <section className="social-strip">
        <h2 className="social-title heading-display">Follow Our Journey</h2>
        <div className="social-grid">
          <div className="social-img-wrap"><img src="https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=400" alt="Instagram 1" className="social-img" /></div>
          <div className="social-img-wrap"><img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=400" alt="Instagram 2" className="social-img" /></div>
          <div className="social-img-wrap"><img src="https://images.unsplash.com/photo-1596431969695-1f9db8d26c5f?auto=format&fit=crop&q=80&w=400" alt="Instagram 3" className="social-img" /></div>
          <div className="social-img-wrap"><img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400" alt="Instagram 4" className="social-img" /></div>
        </div>
        <a href="#" className="btn-social">@CHIMINI_IN — FOLLOW US</a>
      </section>
    </div>
  );
}
