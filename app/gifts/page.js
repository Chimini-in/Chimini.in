"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

export default function GiftsPage() {
  const { addToCart } = useStore();
  const [gifts, setGifts] = useState([]);

  useEffect(() => {
    const localGifts = localStorage.getItem('chimini_gifts');
    if (localGifts) {
      setGifts(JSON.parse(localGifts));
    }
  }, []);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <h1 className="section-title">Luxury Gift Hampers</h1>
          <p className="section-subtitle">Curated botanical selections for unforgettable gifting</p>
        </div>

        <div className="product-grid" id="giftsGrid">
          {gifts.length === 0 ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading gift hampers...</p>
          ) : (
            gifts.map(gift => (
              <article key={gift.id} className="product-card">
                <div className="product-img-wrapper">
                  {gift.badge && <span className="product-badge">{gift.badge}</span>}
                  <img src={gift.image} alt={gift.name} className="product-img" />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{gift.name}</h3>
                  <span className="product-price">${gift.price.toFixed(2)}</span>
                  <button className="product-btn" onClick={() => addToCart(gift)}>Add to Cart</button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
