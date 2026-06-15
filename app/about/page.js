import React from 'react';

export default function AboutPage() {
  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 className="section-title">Our Story</h1>
        <p className="section-subtitle">Crafting ambient luxury with organic botanicals</p>
        
        <div style={{ marginTop: '40px', lineHeight: '1.8', color: 'var(--color-text-dark)', fontSize: '1.1rem' }}>
          <p style={{ marginBottom: '20px' }}>
            CHIMINI was born out of a desire to create a sensory sanctuary within the home. We believe that a fragrance has the power to transform a space, elevate a mood, and capture a memory.
          </p>
          <p style={{ marginBottom: '20px' }}>
            Every candle is meticulously hand-poured using 100% natural soy wax and infused with premium, artisanal botanical oils. We are committed to sustainable practices, ensuring our luxury is as kind to the earth as it is to your senses.
          </p>
          <p>
            Welcome to the CHIMINI experience—where light meets luxury.
          </p>
        </div>
      </div>
    </div>
  );
}
