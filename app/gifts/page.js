"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

const OCCASIONS = [
  { id: 'birthday', label: 'Birthday', icon: '🎂', image: 'https://images.unsplash.com/photo-1530103862676-de8892ebe6fd?auto=format&fit=crop&q=80&w=500' },
  { id: 'housewarming', label: 'Housewarming', icon: '🏡', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=500' },
  { id: 'corporate', label: 'Corporate', icon: '💼', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80&w=500' },
  { id: 'wedding', label: 'Wedding', icon: '💍', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=500' },
  { id: 'festive', label: 'Festive', icon: '🎉', image: 'https://images.unsplash.com/photo-1543880458-1dae6c27fc1b?auto=format&fit=crop&q=80&w=500' },
  { id: 'just-because', label: 'Just Because', icon: '💖', image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=500' },
];

const PRICE_TIERS = [
  { label: 'Under ₹499', bg: '#2A7C6F', icon: '✨' },
  { label: 'Under ₹999', bg: '#E8533A', icon: '💫' },
  { label: 'Under ₹1999', bg: '#F4A623', icon: '🌟' },
  { label: 'Premium Sets', bg: '#2A2A2A', icon: '👑' },
];

const PROMISES = [
  { icon: '🎁', title: 'FREE WRAPPING', desc: 'Beautifully boxed with a ribbon' },
  { icon: '✉️', title: 'HANDWRITTEN NOTE', desc: 'Personalise your message' },
  { icon: '🚚', title: 'EXPRESS DELIVERY', desc: 'Fast & tracked shipping' },
  { icon: '♻️', title: 'ECO PACKAGING', desc: '100% recyclable materials' },
];

export default function GiftsPage() {
  const { addToCart } = useStore();
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    // If we have actual gifts in local storage, use them.
    // Otherwise use some demo data for the UI
    const localGifts = localStorage.getItem('chimini_gifts');
    if (localGifts) {
      setGifts(JSON.parse(localGifts));
    } else {
      setGifts([
        { id: 'g1', name: 'The Festive Glow Box', price: 1499, contents: '2x Large Candles, 1x Diffuser, Matches', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=500', badge: '★ BESTSELLER' },
        { id: 'g2', name: 'Mini Indulgence Trio', price: 899, contents: '3x Mini Travel Candles, Silk Pouch', image: 'https://images.unsplash.com/photo-1605814561005-59b85c3dc09b?auto=format&fit=crop&q=80&w=500', badge: 'NEW ARRIVAL' },
        { id: 'g3', name: 'The Wellness Retreat', price: 2199, contents: 'Large Soy Candle, Bath Salts, Essential Oil', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=500' },
      ]);
    }
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="gifts-page">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');

        .gifts-page {
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

        /* HERO BANNER */
        .hero-banner {
          position: relative;
          width: 100%;
          height: 65vh;
          min-height: 550px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url('https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=2000') center/cover no-repeat;
          text-align: center;
          color: #FFF8F0;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
        }
        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          padding: 0 1.5rem;
        }
        .hero-badge {
          background-color: #FFF;
          color: #2A7C6F;
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.1em;
          font-size: 0.85rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .hero-title {
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 1.1;
          margin: 0;
          text-shadow: 2px 2px 15px rgba(0,0,0,0.5);
        }
        .hero-btns {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .btn-saffron {
          background-color: #FFC300;
          color: #2A2A2A;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .btn-saffron:hover { transform: translateY(-3px); background-color: #F4A623; }
        .btn-coral {
          background-color: #E8533A;
          color: #FFF;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .btn-coral:hover { transform: translateY(-3px); background-color: #d6422b; }

        /* OCCASION TILES */
        .occasions-section {
          padding: 5rem 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .occasions-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .occasion-tile {
          position: relative;
          aspect-ratio: 1;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          border: 4px solid transparent;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .occasion-tile:hover {
          transform: translateY(-8px);
          border-color: #E8533A;
          box-shadow: 0 15px 30px rgba(232, 83, 58, 0.2);
        }
        .occasion-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .occasion-tile:hover .occasion-img {
          transform: scale(1.05);
        }
        .occasion-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-end;
          padding: 1.5rem;
          color: #FFF;
        }
        .occasion-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }
        .occasion-label {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 1.3rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0;
        }

        @media (max-width: 900px) {
          .occasions-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 1rem;
          }
          .occasion-tile {
            flex: 0 0 calc(60% - 1rem);
            scroll-snap-align: center;
          }
        }

        /* SECTION HEADER */
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
          padding: 0 1rem;
        }
        .section-title {
          font-size: 3.5rem;
          color: #2A2A2A;
          margin: 0;
        }

        /* GIFT SETS GRID */
        .gift-sets-section {
          padding: 2rem 1rem 5rem;
          background-color: #FFF8F0;
        }
        .gift-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .gift-card {
          background: #FFF;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: transform 0.4s ease;
        }
        .gift-card:hover { transform: translateY(-10px); }
        .gift-img-wrap {
          width: 100%;
          aspect-ratio: 4/3;
          position: relative;
          overflow: hidden;
        }
        .gift-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .gift-card:hover .gift-img { transform: scale(1.05); }
        .gift-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background-color: #FFC300;
          color: #2A2A2A;
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          z-index: 2;
        }
        .gift-badge.new { background-color: #E8533A; color: #FFF; }
        .gift-info {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .gift-name {
          font-size: 1.8rem;
          color: #2A2A2A;
          margin: 0 0 0.5rem 0;
          line-height: 1.2;
        }
        .gift-contents {
          font-style: italic;
          color: #555;
          margin: 0 0 1.5rem 0;
          font-size: 0.95rem;
        }
        .gift-price {
          color: #E8533A;
          font-weight: 700;
          font-size: 1.4rem;
          margin-bottom: 1.5rem;
        }
        .btn-marigold {
          margin-top: auto;
          background-color: #F4A623;
          color: #2A2A2A;
          border: none;
          padding: 1.2rem;
          border-radius: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: 100%;
        }
        .btn-marigold:hover { background-color: #E8533A; color: #FFF; }

        /* CUSTOMISE YOUR GIFT */
        .customise-section {
          background-color: #2A7C6F; /* Rich Teal */
          padding: 5rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 4rem 0;
        }
        .customise-container {
          max-width: 1200px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        .customise-img-wrap {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          aspect-ratio: 4/5;
        }
        .customise-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .customise-content { color: #FFF; }
        .customise-title {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          margin: 0 0 2.5rem 0;
          line-height: 1.1;
        }
        .customise-steps {
          list-style: none;
          padding: 0;
          margin: 0 0 3rem 0;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .step-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-size: 1.2rem;
          font-weight: 500;
        }
        .step-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: #FFC300;
          font-weight: 700;
        }
        .btn-white {
          background-color: #FFF;
          color: #2A7C6F;
          border: none;
          padding: 1.2rem 2.5rem;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .btn-white:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.15); }

        @media (max-width: 900px) {
          .customise-container { grid-template-columns: 1fr; }
          .customise-img-wrap { aspect-ratio: 16/9; }
        }

        /* SHOP BY PRICE */
        .price-tiers-section {
          padding: 2rem 1rem 5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .price-tiers-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        .price-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1rem;
          border-radius: 16px;
          color: #FFF;
          cursor: pointer;
          transition: transform 0.3s ease;
          text-decoration: none;
        }
        .price-tile:hover { transform: translateY(-5px); }
        .price-icon { font-size: 2.5rem; margin-bottom: 1rem; }
        .price-label { font-weight: 700; font-size: 1.2rem; text-transform: uppercase; }

        @media (max-width: 768px) {
          .price-tiers-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* GIFTING PROMISE */
        .promise-section {
          background-color: #FFF;
          padding: 4rem 1rem;
          margin: 4rem 0;
        }
        .promise-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          text-align: center;
        }
        .promise-item { display: flex; flex-direction: column; align-items: center; }
        .promise-icon-wrap {
          width: 80px;
          height: 80px;
          background-color: #FFF8F0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #2A7C6F;
        }
        .promise-title {
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.1em;
          margin: 0 0 0.5rem 0;
        }
        .promise-desc { color: #555; font-size: 0.95rem; margin: 0; }

        @media (max-width: 768px) {
          .promise-grid { grid-template-columns: repeat(2, 1fr); gap: 3rem 1.5rem; }
        }

        /* CORPORATE GIFTING BANNER */
        .corporate-banner {
          background-color: #2A2A2A;
          color: #FFF;
          text-align: center;
          padding: 6rem 2rem;
          margin-top: 4rem;
        }
        .corporate-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin: 0 0 1rem 0;
        }
        .corporate-sub {
          font-size: 1.2rem;
          color: #CCC;
          margin: 0 0 3rem 0;
        }
      `}} />

      {/* 1. HERO BANNER */}
      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">Handcrafted • Beautifully Wrapped • Delivered with Love</span>
          <h1 className="hero-title heading-display">The Perfect Gift,<br/>Every Time 🎁</h1>
          <div className="hero-btns">
            <button className="btn-saffron" onClick={() => scrollToSection('gift-sets')}>SHOP GIFT SETS</button>
            <button className="btn-coral" onClick={() => scrollToSection('customise')}>BUILD YOUR OWN</button>
          </div>
        </div>
      </section>

      {/* 2. OCCASION TILES */}
      <section className="occasions-section">
        <div className="occasions-grid">
          {OCCASIONS.map(occ => (
            <div key={occ.id} className="occasion-tile">
              <img src={occ.image} alt={occ.label} className="occasion-img" />
              <div className="occasion-overlay">
                <span className="occasion-icon">{occ.icon}</span>
                <h3 className="occasion-label">{occ.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. GIFT SETS GRID */}
      <section id="gift-sets" className="gift-sets-section">
        <div className="section-header">
          <h2 className="section-title heading-display">Curated Gift Sets</h2>
        </div>
        <div className="gift-grid">
          {gifts.map((gift, i) => {
            const isBestseller = i === 0 || gift.badge === '★ BESTSELLER';
            const isNew = i === 1 || gift.badge === 'NEW ARRIVAL';
            const price = gift.price || 1499;
            
            return (
              <article key={gift.id} className="gift-card">
                <div className="gift-img-wrap">
                  {isBestseller && <span className="gift-badge">★ BESTSELLER</span>}
                  {isNew && !isBestseller && <span className="gift-badge new">NEW ARRIVAL</span>}
                  <img src={gift.image || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=500'} alt={gift.name} className="gift-img" />
                </div>
                <div className="gift-info">
                  <h3 className="gift-name heading-display">{gift.name}</h3>
                  <p className="gift-contents">{gift.contents || '2x Candles, Silk Pouch, Matchbox'}</p>
                  <span className="gift-price">₹{price}</span>
                  <button className="btn-marigold" onClick={() => addToCart(gift)}>ADD TO CART</button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* 4. CUSTOMISE YOUR GIFT */}
      <section id="customise" className="customise-section">
        <div className="customise-container">
          <div className="customise-img-wrap">
            <img src="https://images.unsplash.com/photo-1548690457-3f339eb3dc96?auto=format&fit=crop&q=80&w=800" alt="Custom Gift Wrapping" className="customise-img" />
          </div>
          <div className="customise-content">
            <h2 className="customise-title heading-display">Make It Yours —<br/>Customise Your Gift</h2>
            <ul className="customise-steps">
              <li className="step-item"><span className="step-num">01</span> Pick your candles</li>
              <li className="step-item"><span className="step-num">02</span> Choose your box</li>
              <li className="step-item"><span className="step-num">03</span> Add a note</li>
              <li className="step-item"><span className="step-num">04</span> Pick your ribbon</li>
              <li className="step-item"><span className="step-num">05</span> We do the rest ✦</li>
            </ul>
            <button className="btn-white">START CUSTOMISING</button>
          </div>
        </div>
      </section>

      {/* 5. SHOP BY PRICE */}
      <section className="price-tiers-section">
        <div className="section-header">
          <h2 className="section-title heading-display">Shop by Budget</h2>
        </div>
        <div className="price-tiers-grid">
          {PRICE_TIERS.map((tier, i) => (
            <Link href="#gift-sets" key={i} className="price-tile" style={{ backgroundColor: tier.bg }}>
              <span className="price-icon">{tier.icon}</span>
              <span className="price-label">{tier.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. GIFTING PROMISE */}
      <section className="promise-section">
        <div className="promise-grid">
          {PROMISES.map((promise, i) => (
            <div key={i} className="promise-item">
              <div className="promise-icon-wrap">{promise.icon}</div>
              <h4 className="promise-title">{promise.title}</h4>
              <p className="promise-desc">{promise.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CORPORATE GIFTING BANNER */}
      <section className="corporate-banner">
        <h2 className="corporate-title heading-display">Gifting at Scale?<br/>We've Got You.</h2>
        <p className="corporate-sub">Special pricing, custom branding, and seamless delivery for bulk orders.</p>
        <button className="btn-saffron">ENQUIRE NOW</button>
      </section>
    </div>
  );
}
