"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

export default function CollectionsPage() {
  const { products, categories, addToCart } = useStore();
  const [activeCategory, setActiveCategory] = useState(null);

  // Set initial active category when categories load
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].slug || categories[0].id);
    }
  }, [categories, activeCategory]);

  // Filter products by the chosen categories
  const getProductsForCategory = (catId) => {
    return products.filter(p => {
      const pCat = (p.category || '').toLowerCase();
      const pName = (p.name || '').toLowerCase();
      return pCat.includes(catId) || pName.includes(catId);
    });
  };

  const scrollToCategory = (id) => {
    setActiveCategory(id);
    const el = document.getElementById(`section-${id}`);
    if (el) {
      const yOffset = -80; // Offset for fixed headers if any
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Intersection Observer to update active category on scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = '';
      categories.forEach(cat => {
        const id = cat.slug || cat.id;
        const el = document.getElementById(`section-${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = cat.id;
          }
        }
      });
      if (current && current !== activeCategory) {
        setActiveCategory(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory, categories]);

  return (
    <div className="collections-page">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');

        .collections-page {
          background-color: #FFF8F0;
          font-family: 'DM Sans', sans-serif;
          color: #2A2A2A;
          overflow-x: hidden;
          padding-top: 60px; /* Offset for typical headers */
        }

        .heading-display {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
        }

        /* HERO BANNER */
        .hero-banner {
          position: relative;
          width: 100%;
          height: 60vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url('https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=2000') center/cover no-repeat;
          text-align: center;
          color: #FFF8F0;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.3);
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
          background-color: #E8533A;
          color: #FFF;
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.1em;
          font-size: 0.85rem;
        }
        .hero-title {
          font-size: clamp(3rem, 6vw, 5rem);
          line-height: 1.1;
          margin: 0;
          text-shadow: 2px 2px 15px rgba(0,0,0,0.4);
        }
        .btn-primary {
          background-color: #FFC300;
          color: #2A2A2A;
          border: none;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: transform 0.3s ease, background-color 0.3s ease;
          text-decoration: none;
          margin-top: 1rem;
        }
        .btn-primary:hover {
          transform: translateY(-3px);
          background-color: #F4A623;
        }

        /* CATEGORY FILTER TILES */
        .category-filter-wrapper {
          padding: 4rem 1rem;
          background-color: #FFF8F0;
        }
        .category-filter {
          display: flex;
          gap: 2rem;
          overflow-x: auto;
          padding-bottom: 1.5rem;
          scroll-snap-type: x mandatory;
          max-width: 1200px;
          margin: 0 auto;
        }
        .category-filter::-webkit-scrollbar {
          height: 6px;
        }
        .category-filter::-webkit-scrollbar-thumb {
          background-color: #F4A623;
          border-radius: 10px;
        }
        .category-filter::-webkit-scrollbar-track {
          background-color: rgba(244, 166, 35, 0.2);
          border-radius: 10px;
        }
        .category-tile {
          flex: 0 0 calc(20% - 1.6rem);
          min-width: 140px;
          scroll-snap-align: start;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          transition: transform 0.3s ease;
        }
        .category-tile:hover {
          transform: translateY(-5px);
        }
        .category-tile-img-wrapper {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 16px;
          overflow: hidden;
          border: 4px solid transparent;
          transition: border-color 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .category-tile.active .category-tile-img-wrapper {
          border-color: #E8533A;
        }
        .category-tile-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .category-tile:hover .category-tile-img {
          transform: scale(1.08);
        }
        .category-tile-label {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.95rem;
          padding-bottom: 0.5rem;
          border-bottom: 3px solid transparent;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .category-tile.active .category-tile-label {
          color: #E8533A;
          border-bottom-color: #E8533A;
        }

        /* CATEGORY SECTIONS */
        .category-section {
          padding-bottom: 5rem;
        }
        .category-banner {
          position: relative;
          height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4rem;
          overflow: hidden;
        }
        .category-banner-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .category-banner-overlay {
          position: absolute;
          inset: 0;
          background: rgba(42, 124, 111, 0.45); /* Earthy teal overlay */
          mix-blend-mode: multiply;
        }
        .category-banner-title {
          position: relative;
          z-index: 1;
          color: #FFF8F0;
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.4);
        }
        .category-banner-title::after {
          content: " ✦";
          color: #FFC300;
        }

        .product-grid-new {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2.5rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .prod-card {
          background: #FFF;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }
        .prod-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
        }
        .prod-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          background-color: #f9f9f9;
        }
        .prod-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .prod-card:hover .prod-img {
          transform: scale(1.05);
        }
        .prod-badge-bestseller, .prod-badge-limited {
          position: absolute;
          top: 16px;
          left: 16px;
          padding: 0.5rem 1.2rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          z-index: 2;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .prod-badge-bestseller {
          background-color: #FFC300;
          color: #2A2A2A;
        }
        .prod-badge-limited {
          background-color: #E8533A;
          color: #FFF;
        }
        
        .prod-info {
          padding: 1.8rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .prod-name {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: #2A2A2A;
          margin: 0 0 0.8rem 0;
          text-decoration: none;
          line-height: 1.3;
        }
        .prod-name:hover {
          color: #E8533A;
        }
        .prod-price {
          color: #E8533A;
          font-weight: 700;
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .prod-btn {
          margin-top: auto;
          background-color: #F4A623;
          color: #2A2A2A;
          border: none;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
          width: 100%;
        }
        .prod-btn:hover {
          background-color: #E8533A;
          color: #FFF;
          transform: scale(1.02);
        }
        .prod-btn:active {
          transform: scale(0.98);
        }

        /* EMPTY STATE */
        .empty-state {
          text-align: center;
          padding: 5rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.8rem;
          background-color: rgba(255,255,255,0.5);
          border-radius: 20px;
          border: 2px dashed #F4A623;
        }
        .empty-icon {
          font-size: 4.5rem;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .empty-text {
          font-size: 2.5rem;
          color: #2A7C6F;
          margin: 0;
        }
        .waitlist-form {
          display: flex;
          gap: 0.5rem;
          max-width: 450px;
          width: 100%;
        }
        .waitlist-input {
          flex: 1;
          padding: 1rem 1.5rem;
          border: 2px solid #F4A623;
          border-radius: 50px;
          outline: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
        }
        .waitlist-input:focus {
          border-color: #E8533A;
        }
        .waitlist-btn {
          background-color: #2A7C6F;
          color: #FFF;
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .waitlist-btn:hover {
          background-color: #1a5c51;
        }

        /* PROMO BANNER */
        .promo-banner {
          background: linear-gradient(135deg, #F4A623, #E8533A);
          padding: 5rem 2rem;
          text-align: center;
          color: #FFF;
          margin: 5rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          box-shadow: 0 10px 30px rgba(232, 83, 58, 0.3);
        }
        .promo-text {
          font-size: clamp(2rem, 4vw, 3.5rem);
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .promo-btn {
          background-color: #FFF;
          color: #E8533A;
          border: none;
          padding: 1.2rem 3rem;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          font-size: 1.1rem;
        }
        .promo-btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 25px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
          .waitlist-form {
            flex-direction: column;
          }
          .waitlist-btn {
            width: 100%;
          }
          .promo-banner {
            padding: 3rem 1rem;
          }
          .product-grid-new {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            padding: 0 1rem;
          }
        }
      `}} />

      {/* 1. HERO BANNER */}
      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-badge">New Collection ✦</span>
          <h1 className="hero-title heading-display">Light Up Every Moment</h1>
          <button className="btn-primary" onClick={() => { if (categories.length > 0) scrollToCategory(categories[0].slug || categories[0].id) }}>EXPLORE NOW →</button>
        </div>
      </section>

      {/* 2. CATEGORY FILTER */}
      <section className="category-filter-wrapper">
        <div className="category-filter">
          {categories.map(cat => {
            const catId = cat.slug || cat.id;
            return (
              <div 
                key={catId} 
                className={`category-tile ${activeCategory === catId ? 'active' : ''}`}
                onClick={() => scrollToCategory(catId)}
              >
                <div className="category-tile-img-wrapper" style={{ backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                  {cat.image_url ? (
                    <img src={cat.image_url} alt={cat.title} className="category-tile-img" />
                  ) : (
                    <span>{cat.icon || '🕯️'}</span>
                  )}
                </div>
                <span className="category-tile-label">{cat.title}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. CATEGORY SECTIONS */}
      {categories.map((cat, index) => {
        const catId = cat.slug || cat.id;
        const catProducts = getProductsForCategory(catId);
        
        return (
          <React.Fragment key={catId}>
            <section id={`section-${catId}`} className="category-section">
              <div className="category-banner">
                {cat.image_url ? (
                  <img src={cat.image_url} alt={cat.title} className="category-banner-img" />
                ) : (
                  <div className="category-banner-img" style={{ backgroundColor: '#2A7C6F' }} />
                )}
                <div className="category-banner-overlay"></div>
                <h2 className="category-banner-title heading-display">{cat.title}</h2>
              </div>

              <div className="product-grid-new">
                {catProducts.length > 0 ? (
                  catProducts.map((prod, i) => {
                    const slug = prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                    // Assign badges based on index if none provided to show off the design
                    const isBestseller = i % 3 === 0;
                    const isLimited = i % 4 === 0 && !isBestseller;
                    
                    return (
                      <article key={prod.id} className="prod-card">
                        <div className="prod-img-wrap">
                          {isBestseller && <span className="prod-badge-bestseller">★ BESTSELLER</span>}
                          {isLimited && <span className="prod-badge-limited">LIMITED STOCK</span>}
                          {prod.badge && !isBestseller && !isLimited && <span className="prod-badge-limited">{prod.badge}</span>}
                          <img src={prod.image || 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=500'} alt={prod.name} className="prod-img" />
                        </div>
                        <div className="prod-info">
                          <Link href={`/collection/${slug}`} className="prod-name">
                            {prod.name}
                          </Link>
                          {/* Formatting price with ₹ */}
                          <span className="prod-price">₹{prod.price}</span>
                          <button className="prod-btn" onClick={() => addToCart(prod)}>ADD TO CART</button>
                        </div>
                      </article>
                    )
                  })
                ) : (
                  <div className="empty-state" style={{ gridColumn: '1/-1' }}>
                    <div className="empty-icon">🕯️</div>
                    <h3 className="empty-text heading-display">Coming Soon — Stay Lit!</h3>
                    <form className="waitlist-form" onSubmit={(e) => e.preventDefault()}>
                      <input type="email" placeholder="Enter your email" className="waitlist-input" />
                      <button type="submit" className="waitlist-btn">Notify Me</button>
                    </form>
                  </div>
                )}
              </div>
            </section>

            {/* 4. MID-PAGE PROMO BANNER (after the 2nd category) */}
            {index === 1 && (
              <div className="promo-banner">
                <h2 className="promo-text heading-display">
                  <span>🎁</span> Free Gift Wrapping on Orders ₹999+
                </h2>
                <button className="promo-btn">SHOP GIFTING</button>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
