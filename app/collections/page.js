"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

export default function CollectionsPage() {
  const { products, addToCart } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <h1 className="section-title">All Collections</h1>
          <p className="section-subtitle">Explore our full range of luxury fragrances</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <input 
            type="text" 
            placeholder="Search fragrances, categories..." 
            className="admin-form-control"
            style={{ maxWidth: '400px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--color-text-muted)', padding: '40px 0' }}>No products found.</p>
          ) : (
            filteredProducts.map(prod => {
              const slug = prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
              return (
                <article key={prod.id} className="product-card">
                  <div className="product-img-wrapper">
                    {prod.badge && <span className="product-badge">{prod.badge}</span>}
                    <img src={prod.image} alt={prod.name} className="product-img" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      <Link href={`/collection/${slug}`}>{prod.name}</Link>
                    </h3>
                    <span className="product-price">${prod.price.toFixed(2)}</span>
                    <button className="product-btn" onClick={() => addToCart(prod)}>Add to Cart</button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
