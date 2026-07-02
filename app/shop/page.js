"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

export default function ShopPage() {
  const { products, categories, addToCart, isLoadingStore } = useStore();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="shop-page" style={{ padding: '4rem 2rem', maxWidth: '1400px', margin: '0 auto', fontFamily: "'DM Sans', sans-serif" }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        .shop-page { color: #2A2A2A; }
        .heading-display { font-family: 'Playfair Display', serif; font-weight: 700; }
        .page-header { text-align: center; margin-bottom: 3rem; }
        .page-title { font-size: clamp(2.5rem, 4vw, 3.5rem); margin: 0 0 1rem 0; }
        
        .filter-row { display: flex; gap: 1rem; justify-content: center; margin-bottom: 3rem; flex-wrap: wrap; }
        .filter-btn { background: #F1F5F9; border: none; padding: 0.8rem 1.5rem; border-radius: 50px; cursor: pointer; font-weight: 500; transition: all 0.3s; }
        .filter-btn:hover { background: #E2E8F0; }
        .filter-btn.active { background: #2A7C6F; color: #FFF; }

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
      `}} />

      <div className="page-header">
        <h1 className="page-title heading-display">Our Collection</h1>
        <p style={{ fontSize: '1.1rem', color: '#64748b' }}>Explore our exquisite handcrafted candles and gifts.</p>
      </div>

      <div className="filter-row">
        <button className={`filter-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>
          All Products
        </button>
        {categories.map(cat => (
          <button key={cat.id} className={`filter-btn ${activeCategory === cat.slug ? 'active' : ''}`} onClick={() => setActiveCategory(cat.slug)}>
            {cat.title}
          </button>
        ))}
      </div>

      {isLoadingStore ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#64748b' }}>No products found in this category.</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(prod => (
            <article key={prod.id} className="prod-card">
              <div className="prod-img-wrap">
                {prod.is_best_seller && <span className="prod-badge">★ BESTSELLER</span>}
                {prod.badge && <span className="prod-badge" style={{ top: prod.is_best_seller ? '50px' : '16px', backgroundColor: '#E8533A', color: '#FFF' }}>{prod.badge}</span>}
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
      )}
    </div>
  );
}
