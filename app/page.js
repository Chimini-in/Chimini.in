"use client";

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

export default function HomePage() {
  const { products, categories, collections, heroSlides, testimonials, addToCart, isLoadingStore } = useStore();

  const bestSellers = products.filter(p => p.is_best_seller);
  const mainHero = heroSlides && heroSlides.length > 0 ? heroSlides[0] : null;

  return (
    <div className="home-page">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        
        .home-page { font-family: 'DM Sans', sans-serif; color: #2A2A2A; overflow-x: hidden; }
        .heading-display { font-family: 'Playfair Display', serif; font-weight: 700; }
        
        /* 1. HERO BANNER */
        .hero-section {
          position: relative; width: 100%; height: 75vh; min-height: 600px;
          display: flex; align-items: center; justify-content: center;
          text-align: center; color: #FFF;
        }
        .hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .hero-overlay { position: absolute; inset: 0; background: rgba(0, 0, 0, 0.4); }
        .hero-content { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; padding: 0 2rem; }
        .hero-title { font-size: clamp(3rem, 6vw, 5.5rem); line-height: 1.1; margin: 0 0 1.5rem 0; text-shadow: 2px 2px 15px rgba(0,0,0,0.5); }
        .hero-btn { background-color: #FFC300; color: #2A2A2A; border: none; padding: 1.2rem 2.5rem; border-radius: 50px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; cursor: pointer; text-decoration: none; transition: transform 0.3s ease; }
        .hero-btn:hover { transform: translateY(-3px); }

        /* 2. SECTION COMMON */
        .section-container { padding: 5rem 2rem; max-width: 1400px; margin: 0 auto; }
        .section-title { text-align: center; font-size: clamp(2.5rem, 4vw, 3.5rem); margin: 0 0 3rem 0; }

        /* 3. BEST SELLERS */
        .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2.5rem; }
        .prod-card { background: #FFF; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.04); display: flex; flex-direction: column; transition: transform 0.4s ease; position: relative; }
        .prod-card:hover { transform: translateY(-10px); box-shadow: 0 15px 35px rgba(0,0,0,0.08); }
        .prod-img-wrap { position: relative; width: 100%; aspect-ratio: 1; overflow: hidden; background-color: #f9f9f9; }
        .prod-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .prod-card:hover .prod-img { transform: scale(1.05); }
        .prod-badge { position: absolute; top: 16px; left: 16px; background-color: #FFC300; color: #2A2A2A; padding: 0.5rem 1.2rem; border-radius: 50px; font-weight: 700; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; z-index: 2; box-shadow: 0 4px 10px rgba(0,0,0,0.15); }
        .prod-info { padding: 1.8rem; display: flex; flex-direction: column; flex-grow: 1; }
        .prod-name { font-weight: 700; font-size: 1.15rem; color: #2A2A2A; margin: 0 0 0.8rem 0; text-decoration: none; line-height: 1.3; }
        .prod-name:hover { color: #E8533A; }
        .prod-price { color: #E8533A; font-weight: 700; font-size: 1.25rem; margin-bottom: 1.5rem; }
        .prod-btn { margin-top: auto; background-color: #F4A623; color: #2A2A2A; border: none; padding: 1rem; border-radius: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; cursor: pointer; transition: background-color 0.3s ease, transform 0.2s ease; width: 100%; }
        .prod-btn:hover { background-color: #E8533A; color: #FFF; transform: scale(1.02); }

        /* 4. SHOP BY FRAGRANCE (CATEGORIES) */
        .fragrance-section { background-color: #FFF8F0; }
        .cat-row { display: flex; gap: 2rem; overflow-x: auto; padding: 1rem 0 2rem; scroll-snap-type: x mandatory; justify-content: center; }
        .cat-row::-webkit-scrollbar { display: none; }
        .cat-item { flex: 0 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1rem; cursor: pointer; text-decoration: none; transition: transform 0.3s ease; }
        .cat-item:hover { transform: translateY(-8px); }
        .cat-img-wrap { width: 160px; height: 160px; border-radius: 50%; overflow: hidden; border: 4px solid transparent; transition: border-color 0.3s ease; box-shadow: 0 10px 20px rgba(0,0,0,0.05); background-color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 3rem; }
        .cat-item:hover .cat-img-wrap { border-color: #E8533A; }
        .cat-img { width: 100%; height: 100%; object-fit: cover; }
        .cat-label { font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #2A2A2A; }
        
        /* 5. FEATURED COLLECTIONS */
        .coll-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 3rem; }
        .coll-card { position: relative; border-radius: 20px; overflow: hidden; aspect-ratio: 16/9; text-decoration: none; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .coll-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s ease; }
        .coll-card:hover .coll-img { transform: scale(1.08); }
        .coll-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2)); }
        .coll-content { position: relative; z-index: 1; color: #FFF; text-align: center; padding: 2rem; }
        .coll-title { font-size: 2.5rem; margin: 0 0 1rem 0; }
        .coll-desc { font-size: 1.1rem; margin: 0 0 1.5rem 0; opacity: 0.9; }
        .coll-btn { background-color: #FFF; color: #2A2A2A; padding: 0.8rem 2rem; border-radius: 50px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.9rem; transition: background-color 0.3s ease; }
        .coll-card:hover .coll-btn { background-color: #FFC300; }

        /* 6. TESTIMONIALS */
        .test-section { background-color: #2A7C6F; color: #FFF; padding: 6rem 2rem; }
        .test-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; max-width: 1400px; margin: 0 auto; }
        .test-card { background: rgba(255,255,255,0.1); padding: 2.5rem; border-radius: 20px; backdrop-filter: blur(10px); }
        .test-stars { color: #FFC300; font-size: 1.5rem; margin-bottom: 1.5rem; }
        .test-content { font-size: 1.15rem; line-height: 1.6; margin-bottom: 2rem; font-style: italic; }
        .test-author { font-weight: 700; font-size: 1.1rem; margin: 0; }
        .test-city { font-size: 0.9rem; opacity: 0.8; }

        @media (max-width: 768px) {
          .coll-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 2.8rem; }
          .cat-row { justify-content: flex-start; padding-left: 1rem; }
        }
      `}} />

      {/* 1. HERO BANNER */}
      {mainHero ? (
        <section className="hero-section">
          {mainHero.image_url && <img src={mainHero.image_url} alt="Hero" className="hero-bg" />}
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title heading-display">{mainHero.title || 'Welcome to Chimini'}</h1>
            {mainHero.link_url && (
              <a href={mainHero.link_url} className="hero-btn">Shop Now</a>
            )}
          </div>
        </section>
      ) : (
        <section className="hero-section" style={{ backgroundColor: '#2A7C6F' }}>
          <div className="hero-content">
            <h1 className="hero-title heading-display">Handcrafted Luxury</h1>
            <Link href="/shop" className="hero-btn">Shop Collection</Link>
          </div>
        </section>
      )}

      {/* 2. BEST SELLERS */}
      {bestSellers.length > 0 && (
        <section className="section-container">
          <h2 className="section-title heading-display">Best Sellers</h2>
          <div className="product-grid">
            {bestSellers.map(prod => (
              <article key={prod.id} className="prod-card">
                <div className="prod-img-wrap">
                  <span className="prod-badge">★ BESTSELLER</span>
                  {prod.badge && <span className="prod-badge" style={{ top: '50px', backgroundColor: '#E8533A', color: '#FFF' }}>{prod.badge}</span>}
                  <img src={prod.image || 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=500'} alt={prod.name} className="prod-img" />
                </div>
                <div className="prod-info">
                  <Link href={`/shop`} className="prod-name">{prod.name}</Link>
                  <span className="prod-price">₹{prod.price}</span>
                  <button className="prod-btn" onClick={() => addToCart(prod)}>ADD TO CART</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 3. SHOP BY FRAGRANCE */}
      {categories.length > 0 && (
        <section className="fragrance-section section-container" style={{ maxWidth: '100%' }}>
          <h2 className="section-title heading-display">Shop by Fragrance</h2>
          <div className="cat-row">
            {categories.map(cat => (
              <Link href={`/collections#section-${cat.slug || cat.id}`} key={cat.id} className="cat-item">
                <div className="cat-img-wrap">
                  {cat.image_url ? (
                    <img src={cat.image_url} alt={cat.title} className="cat-img" />
                  ) : (
                    <span>{cat.icon || '🕯️'}</span>
                  )}
                </div>
                <span className="cat-label">{cat.title}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 4. FEATURED COLLECTIONS */}
      {collections.length > 0 && (
        <section className="section-container">
          <h2 className="section-title heading-display">Featured Collections</h2>
          <div className="coll-grid">
            {collections.map(coll => (
              <Link href={coll.link_url || '/collections'} key={coll.id} className="coll-card">
                {coll.image_url && <img src={coll.image_url} alt={coll.title} className="coll-img" />}
                <div className="coll-overlay"></div>
                <div className="coll-content">
                  <h3 className="coll-title heading-display">{coll.title}</h3>
                  {coll.description && <p className="coll-desc">{coll.description}</p>}
                  <span className="coll-btn">Explore</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 5. TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="test-section">
          <h2 className="section-title heading-display" style={{ color: '#FFF' }}>Loved by You</h2>
          <div className="test-grid">
            {testimonials.map(test => (
              <div key={test.id} className="test-card">
                <div className="test-stars">{'★'.repeat(test.rating || 5)}{'☆'.repeat(5 - (test.rating || 5))}</div>
                <p className="test-content">"{test.content}"</p>
                <p className="test-author">{test.author}</p>
                {test.city && <p className="test-city">{test.city}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
