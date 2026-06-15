"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

export default function Home() {
  const { products, addToCart } = useStore();
  const [banners, setBanners] = useState(null);
  const [heroSlides, setHeroSlides] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [heroIdx, setHeroIdx] = useState(0);
  const [testmIdx, setTestmIdx] = useState(0);

  useEffect(() => {
    const localBanners = localStorage.getItem('chimini_banners');
    if (localBanners) setBanners(JSON.parse(localBanners));
    
    const localHero = localStorage.getItem('chimini_hero_slides');
    if (localHero) setHeroSlides(JSON.parse(localHero));

    const localTestm = localStorage.getItem('chimini_testimonials');
    if (localTestm) setTestimonials(JSON.parse(localTestm));

    const localCats = localStorage.getItem('chimini_categories');
    if (localCats) setCategories(JSON.parse(localCats));

    const localColls = localStorage.getItem('chimini_collections');
    if (localColls) setCollections(JSON.parse(localColls));
  }, []);

  // Hero Slider
  useEffect(() => {
    if (!heroSlides.length) return;
    const interval = setInterval(() => {
      setHeroIdx(i => (i + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides]);

  // Testimonials Slider
  useEffect(() => {
    if (!testimonials.length) return;
    const interval = setInterval(() => {
      setTestmIdx(i => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials]);

  // Featured Products (fallback to first 4 if not set)
  let featuredIds = [];
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('chimini_featured');
    if (stored) featuredIds = JSON.parse(stored);
  }
  const featuredProds = featuredIds.length > 0 
    ? featuredIds.map(id => products.find(p => p.id === id)).filter(Boolean).slice(0, 4)
    : products.slice(0, 4);

  return (
    <>
      {/* 3. Hero Banner Slider */}
      <section className="hero-slider-section" aria-label="Hero Showcase">
        <div className="hero-slider" id="heroSlider" style={{ transform: `translateX(-${heroIdx * 100}%)` }}>
          {heroSlides.map((slide, idx) => (
            <Link key={idx} href={slide.link} className="hero-slide">
              <img src={slide.image} alt={slide.title} className="hero-slide-img" />
              <div className="hero-slide-overlay">
                <div className="hero-slide-content">
                  <span className="hero-slide-subtitle">{slide.subtitle}</span>
                  <h1 className="hero-slide-title">{slide.title}</h1>
                  <span className="hero-slide-btn">Shop Collection</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {heroSlides.length > 1 && (
          <>
            <button className="slider-arrow slider-arrow-prev" onClick={() => setHeroIdx((heroIdx - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous Slide">
              <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
            </button>
            <button className="slider-arrow slider-arrow-next" onClick={() => setHeroIdx((heroIdx + 1) % heroSlides.length)} aria-label="Next Slide">
              <svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
            </button>
            <div className="slider-dots">
              {heroSlides.map((_, idx) => (
                <button key={idx} className={`slider-dot ${idx === heroIdx ? 'active' : ''}`} onClick={() => setHeroIdx(idx)}></button>
              ))}
            </div>
          </>
        )}
      </section>

      {/* 4. Best Sellers Section */}
      <section className="best-sellers-section" id="bestSellers">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-subtitle">Exquisite aromas crafted to warm your soul and lift your space</p>
          </div>
          
          <div className="product-grid">
            {featuredProds.length === 0 ? (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--color-text-muted)', padding: '40px 0' }}>Loading products...</p>
            ) : (
              featuredProds.map(prod => (
                <article key={prod.id} className="product-card">
                  <div className="product-img-wrapper">
                    {prod.badge && <span className="product-badge">{prod.badge}</span>}
                    <img src={prod.image} alt={prod.name} className="product-img" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      <Link href={`/collection/${prod.id}`}>{prod.name}</Link>
                    </h3>
                    <span className="product-price">${prod.price.toFixed(2)}</span>
                    <button className="product-btn" onClick={() => addToCart(prod)}>Add to Cart</button>
                  </div>
                </article>
              ))
            )}
          </div>

          <div className="text-center">
            <button className="btn-outline" onClick={() => window.location.href='/collections'}>View All Products</button>
          </div>
        </div>
      </section>

      {/* 5. Shop by Fragrance */}
      <section className="shop-fragrance-section" id="shopFragrance">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Shop by Fragrance</h2>
            <p className="section-subtitle">Discover a sensory signature matching your environment</p>
          </div>

          <div className="fragrance-list">
            {categories.map((cat, idx) => (
              <Link key={idx} href={`/collections?category=${encodeURIComponent(cat.name)}`} className="fragrance-item">
                <div className="fragrance-thumb-wrapper">
                  <img src={cat.image} alt={cat.name} className="fragrance-thumb" />
                </div>
                <span className="fragrance-name">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Offer Section */}
      {banners?.promoBanner && (
        <section className="promo-offer-section" style={{ padding: 0, lineHeight: 0 }}>
          <Link href={banners.promoBanner.link} style={{ display: 'block', width: '100%' }}>
            <img src={banners.promoBanner.image} alt="Promotional Offer" style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover', display: 'block' }} />
          </Link>
        </section>
      )}
      
      {/* 6. Featured Collections Grid */}
      <section className="featured-collections-section">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title">Featured Collections</h2>
            <p className="section-subtitle">Curation of premium designs & luxury gift packs</p>
          </div>

          <div className="collections-grid">
            {collections.map((col, index) => (
              <Link key={index} href={`/collections`} className="collection-card">
                <img src={col.image} alt={col.title} className="collection-img" />
                <div className="collection-overlay">
                  <h3 className="collection-title">{col.title}</h3>
                  <span className="collection-link">
                    Explore 
                    <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Campaign Banner */}
      {banners?.campaignBanner && (
        <section className="seasonal-campaign-section" style={{ padding: 0, lineHeight: 0 }}>
          <Link href={banners.campaignBanner.link} style={{ display: 'block', width: '100%' }}>
            <img src={banners.campaignBanner.image} alt="Seasonal Campaign" style={{ width: '100%', height: 'auto', maxHeight: '400px', objectFit: 'cover', display: 'block' }} />
          </Link>
        </section>
      )}

      {/* 10. Customer Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '20px' }}>
            <h2 className="section-title">Words of Light</h2>
          </div>

          <div className="testimonials-wrapper">
            <div className="testimonials-container" style={{ transform: `translateX(-${testmIdx * 100}%)` }}>
              {testimonials.map((test, idx) => (
                <div key={idx} className="testimonial-card">
                  <p className="testimonial-text">{test.text}</p>
                  <span className="testimonial-author">&mdash; {test.author}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="testimonials-dots">
            {testimonials.map((_, idx) => (
              <button key={idx} className={`testimonial-dot ${idx === testmIdx ? 'active' : ''}`} onClick={() => setTestmIdx(idx)}></button>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      {banners?.storyBanner && (
        <section className="brand-story-section" style={{ padding: 0, lineHeight: 0 }}>
          <Link href={banners.storyBanner.link || "/about"} style={{ display: 'block', width: '100%' }}>
            <img src={banners.storyBanner.image} alt="Brand Story" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </Link>
        </section>
      )}
    </>
  );
}
