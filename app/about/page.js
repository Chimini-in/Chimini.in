import React from 'react';

export default function AboutPage() {
  return (
    <div className="about-page">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');

        .about-page {
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

        /* 1. HERO */
        .hero-banner {
          position: relative;
          width: 100%;
          height: 70vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url('https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=2000') center/cover no-repeat;
          text-align: center;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: rgba(42, 124, 111, 0.45); /* soft warm teal wash */
          mix-blend-mode: multiply;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          color: #FFF;
          padding: 0 1.5rem;
          max-width: 800px;
        }
        .hero-title {
          font-size: clamp(3rem, 6vw, 5rem);
          line-height: 1.1;
          margin: 0 0 1.5rem 0;
          text-shadow: 2px 2px 10px rgba(0,0,0,0.4);
        }
        .hero-subtext {
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          font-weight: 500;
          letter-spacing: 0.05em;
          margin: 0;
          text-shadow: 1px 1px 5px rgba(0,0,0,0.4);
        }

        /* 2. OUR STORY */
        .story-section {
          padding: 6rem 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .story-section-b {
          background-color: #FFF3E0;
        }
        .story-container {
          max-width: 1200px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .story-img-wrap {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          aspect-ratio: 4/5;
        }
        .story-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .story-heading {
          font-size: clamp(2.5rem, 4vw, 3.5rem);
          margin: 0 0 1.5rem 0;
          color: #2A2A2A;
          line-height: 1.15;
        }
        .story-body {
          color: #444;
          font-size: 1.15rem;
          line-height: 1.8;
          margin-bottom: 2rem;
        }
        .story-quote {
          font-size: 1.8rem;
          color: #E8533A;
          font-family: 'Playfair Display', serif;
          font-style: italic;
          line-height: 1.4;
          margin: 2.5rem 0;
          border-left: 5px solid #F4A623;
          padding-left: 1.5rem;
        }
        .bullet-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          font-size: 1.15rem;
          line-height: 1.6;
        }
        .bullet-dot {
          color: #F4A623;
          font-size: 1.5rem;
          line-height: 1;
        }

        /* 3. OUR VALUES */
        .values-section {
          padding: 6rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .section-title {
          font-size: clamp(3rem, 5vw, 4rem);
          color: #2A2A2A;
          margin: 0;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .value-card {
          padding: 3.5rem 2rem;
          border-radius: 16px;
          color: #FFF;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }
        .bg-marigold { background-color: #F4A623; }
        .bg-coral { background-color: #E8533A; }
        .bg-teal { background-color: #2A7C6F; }
        .value-icon {
          font-size: 3.5rem;
        }
        .value-title {
          font-size: 1.8rem;
          margin: 0;
        }
        .value-desc {
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0;
        }

        /* 4. FULL-BLEED QUOTE BANNER */
        .quote-banner {
          background-color: #2A2A2A; /* Rich Charcoal */
          padding: 6rem 2rem;
          text-align: center;
          color: #FFF8F0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        .quote-banner-text {
          font-size: clamp(2.5rem, 5vw, 4rem);
          max-width: 1000px;
          margin: 0;
          line-height: 1.3;
        }
        .quote-star {
          color: #FFC300;
          font-size: 2.5rem;
        }

        /* 5. FOUNDER SECTION */
        .founder-section {
          padding: 7rem 2rem;
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          align-items: center;
        }
        .founder-img-wrap {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
          border: 10px solid #FFF;
        }
        .founder-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .founder-heading {
          font-size: clamp(2rem, 4vw, 3rem);
          margin: 0 0 1.5rem 0;
          color: #2A2A2A;
        }
        .founder-note {
          font-size: 1.25rem;
          line-height: 1.8;
          font-style: italic;
          color: #444;
          margin-bottom: 2rem;
        }
        .founder-sign {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          color: #E8533A;
          margin: 0;
          font-style: italic;
          font-weight: 700;
        }

        /* 6. CRAFT PROCESS */
        .process-section {
          background-color: #FFF3E0;
          padding: 6rem 2rem;
        }
        .process-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .process-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          position: relative;
          margin-top: 4rem;
        }
        .process-step {
          flex: 1;
          text-align: center;
          position: relative;
          z-index: 2;
          padding: 0 1rem;
        }
        .process-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          color: #F4A623;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .process-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFF;
          width: 90px;
          height: 90px;
          margin-left: auto;
          margin-right: auto;
          border-radius: 50%;
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        }
        .process-title {
          font-size: 1.25rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 0.8rem 0;
          color: #2A2A2A;
        }
        .process-desc {
          font-size: 1rem;
          color: #555;
          margin: 0;
          line-height: 1.5;
        }
        /* Arrow connectors */
        .process-row::before {
          content: "";
          position: absolute;
          top: 110px;
          left: 10%;
          right: 10%;
          border-top: 2px dashed #E8533A;
          z-index: 1;
        }

        /* 7. TRUST BADGES ROW */
        .trust-section {
          padding: 5rem 2rem;
          background-color: #FFF8F0;
        }
        .trust-row {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          flex-wrap: wrap;
          max-width: 1000px;
          margin: 0 auto;
        }
        .trust-badge {
          background-color: #F4A623;
          color: #FFF;
          padding: 1.2rem 2.5rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          box-shadow: 0 6px 15px rgba(244, 166, 35, 0.25);
          transition: transform 0.3s ease;
        }
        .trust-badge:hover {
          transform: translateY(-5px);
        }

        /* Responsive adjustments */
        @media (max-width: 900px) {
          .story-container { grid-template-columns: 1fr !important; gap: 3rem; }
          .story-img-wrap { order: -1; aspect-ratio: 16/9; }
          .values-grid { grid-template-columns: 1fr; }
          .founder-section { grid-template-columns: 1fr; text-align: center; gap: 2rem; }
          .founder-img-wrap { max-width: 250px; margin: 0 auto; }
          .process-row { flex-direction: column; gap: 4rem; }
          .process-row::before { display: none; }
          .process-step { width: 100%; }
        }
      `}} />

      {/* 1. HERO */}
      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title heading-display">Born from the Heart of India 🕯️</h1>
          <p className="hero-subtext">Every candle tells a story of craft, scent, and celebration</p>
        </div>
      </section>

      {/* 2. OUR STORY - Section A */}
      <section className="story-section">
        <div className="story-container">
          <div className="story-text">
            <h2 className="story-heading heading-display">Where It All Began</h2>
            <p className="story-body">
              CHIMINI was born from a simple desire: to create a sensory sanctuary that feels vibrant, joyful, and deeply rooted in Indian culture. We believe that a fragrance isn't just a scent—it's a gateway to a memory, a mood, and a moment of pure celebration.
            </p>
            <blockquote className="story-quote">
              "We wanted to bottle the feeling of coming home."
            </blockquote>
            <p className="story-body">
              From our tiny kitchen experiments to becoming a staple in homes across the country, our journey has been fueled by a passion for bold aesthetics and artisanal craftsmanship.
            </p>
          </div>
          <div className="story-img-wrap">
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" alt="Artisan hands" className="story-img" />
          </div>
        </div>
      </section>

      {/* 2. OUR STORY - Section B */}
      <section className="story-section story-section-b">
        <div className="story-container" style={{ gridTemplateColumns: '1fr 1fr' }}>
          <div className="story-img-wrap">
            <img src="https://images.unsplash.com/photo-1596431969695-1f9db8d26c5f?auto=format&fit=crop&q=80&w=800" alt="Botanicals" className="story-img" />
          </div>
          <div className="story-text">
            <h2 className="story-heading heading-display">Crafted with Nature,<br/>Made with Love</h2>
            <p className="story-body">
              Our philosophy is simple: what goes into the air you breathe should be as pure as the intentions behind it. We meticulously select every element that makes up a CHIMINI candle.
            </p>
            <ul className="bullet-list">
              <li className="bullet-item">
                <span className="bullet-dot">●</span>
                <span><strong>100% Natural Soy Wax:</strong> Clean-burning, non-toxic, and derived from renewable resources.</span>
              </li>
              <li className="bullet-item">
                <span className="bullet-dot">●</span>
                <span><strong>Premium Botanical Oils:</strong> Phthalate-free, richly layered scents inspired by nature.</span>
              </li>
              <li className="bullet-item">
                <span className="bullet-dot">●</span>
                <span><strong>Cotton Core Wicks:</strong> Lead-free wicks for a steady, beautiful, soot-free flame.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. OUR VALUES */}
      <section className="values-section">
        <div className="section-header">
          <h2 className="section-title heading-display">What We Stand For</h2>
        </div>
        <div className="values-grid">
          <div className="value-card bg-marigold">
            <span className="value-icon">🌿</span>
            <h3 className="value-title heading-display">Rooted in Nature</h3>
            <p className="value-desc">We tread lightly. All our ingredients are ethically sourced, cruelty-free, and designed to respect the earth.</p>
          </div>
          <div className="value-card bg-coral">
            <span className="value-icon">👐</span>
            <h3 className="value-title heading-display">Handcrafted Joy</h3>
            <p className="value-desc">No machines, just artisan hands. Every pour, every wick, and every label is done with meticulous care and a whole lot of love.</p>
          </div>
          <div className="value-card bg-teal">
            <span className="value-icon">💖</span>
            <h3 className="value-title heading-display">Vibrant Living</h3>
            <p className="value-desc">We reject the dull and embrace the bold. Our designs and scents are made to bring festive energy into your everyday spaces.</p>
          </div>
        </div>
      </section>

      {/* 4. FULL-BLEED QUOTE BANNER */}
      <section className="quote-banner">
        <span className="quote-star">✦</span>
        <h2 className="quote-banner-text heading-display">
          <span style={{ fontStyle: 'italic' }}>"Every flame we light is an act of intention."</span>
        </h2>
        <span className="quote-star">✦</span>
      </section>

      {/* 5. FOUNDER SECTION */}
      <section className="founder-section">
        <div className="founder-img-wrap">
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600" alt="Founder Portrait" className="founder-img" />
        </div>
        <div className="founder-text">
          <h2 className="founder-heading heading-display">A Note from Our Founder</h2>
          <p className="founder-note">
            "I started CHIMINI because I couldn't find a brand that married the rich, vibrant heritage of India with modern, clean-burning home fragrance. I wanted colours that popped, scents that evoked nostalgia, and products that felt like a celebration the moment you opened the box. Thank you for inviting our joy into your homes."
          </p>
          <h3 className="founder-sign">Priya Sharma</h3>
        </div>
      </section>

      {/* 6. CRAFT PROCESS */}
      <section className="process-section">
        <div className="process-container">
          <div className="section-header">
            <h2 className="section-title heading-display">How It's Made</h2>
          </div>
          <div className="process-row">
            <div className="process-step">
              <div className="process-num">01</div>
              <div className="process-icon">🌱</div>
              <h4 className="process-title">Sourcing</h4>
              <p className="process-desc">Ethically gathering the finest natural soy and botanical extracts.</p>
            </div>
            <div className="process-step">
              <div className="process-num">02</div>
              <div className="process-icon">🧪</div>
              <h4 className="process-title">Blending</h4>
              <p className="process-desc">Expertly mixing fragrance notes to create our signature joyful scents.</p>
            </div>
            <div className="process-step">
              <div className="process-num">03</div>
              <div className="process-icon">👐</div>
              <h4 className="process-title">Hand-Pouring</h4>
              <p className="process-desc">Pouring every batch by hand in our local artisanal studio.</p>
            </div>
            <div className="process-step">
              <div className="process-num">04</div>
              <div className="process-icon">🎁</div>
              <h4 className="process-title">Packaging</h4>
              <p className="process-desc">Wrapping it up in our bold, vibrant, eco-friendly boxes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRUST BADGES ROW */}
      <section className="trust-section">
        <div className="trust-row">
          <span className="trust-badge">✨ 100% Natural</span>
          <span className="trust-badge">🇮🇳 Handmade in India</span>
          <span className="trust-badge">🐰 Cruelty-Free</span>
          <span className="trust-badge">♻️ Eco Packaging</span>
        </div>
      </section>
    </div>
  );
}
