"use client";

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { useParams, useRouter } from 'next/navigation';

export default function CollectionDetailPage() {
  const { products, addToCart } = useStore();
  const { slug } = useParams();
  const router = useRouter();

  // Find product by slugification
  const product = products.find(p => {
    const pSlug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    return pSlug === slug;
  });

  if (products.length > 0 && !product) {
    return (
      <div style={{ paddingTop: '100px', textAlign: 'center' }}>
        <div className="container">
          <h2>Product not found.</h2>
          <button className="btn-primary" onClick={() => router.push('/collections')} style={{ marginTop: '20px' }}>
            Back to Collections
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div style={{ paddingTop: '100px', textAlign: 'center' }}><p>Loading...</p></div>;
  }

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        <div style={{ flex: '1 1 400px' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
        </div>
        
        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {product.badge && <span className="product-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '10px' }}>{product.badge}</span>}
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--color-text-dark)' }}>{product.name}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '20px' }}>
            {product.category} {product.fragrance ? `| ${product.fragrance}` : ''}
          </p>
          <div style={{ fontSize: '2rem', fontWeight: '500', color: 'var(--color-accent)', marginBottom: '30px' }}>
            ${product.price.toFixed(2)}
          </div>
          
          <p style={{ lineHeight: '1.8', color: 'var(--color-text-dark)', marginBottom: '30px' }}>
            Immerse yourself in the bespoke luxury of our {product.name}. Hand-poured with 100% natural soy wax 
            and infused with artisanal botanical oils, this exquisite fragrance transforms any space into a sanctuary of warmth and light.
          </p>
          
          <button className="btn-accent" style={{ padding: '15px 30px', fontSize: '1.1rem' }} onClick={() => addToCart(product)}>
            Add to Cart
          </button>
          
          <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            <p>✓ 100% Natural Soy Wax</p>
            <p>✓ Artisanal Botanical Oils</p>
            <p>✓ Sustainable & Eco-friendly Packaging</p>
            <p>✓ {product.availability || 'In Stock'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
