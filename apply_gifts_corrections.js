const fs = require('fs');
const path = require('path');

const giftsCssUpdate = `

/* ==========================================================================
   UPDATED GIFTS PAGE STYLING (CORRECTIONS)
   ========================================================================== */

/* 1. Round Price Tiles (Single Unified Row) */
.price-round-tiles-row {
  display: flex;
  gap: 25px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 0;
}

.price-round-tile {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(197, 168, 128, 0.3);
  text-decoration: none;
  display: block;
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
  transition: transform 0.35s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.35s ease, border-color 0.35s ease;
}

.price-round-tile:hover {
  transform: translateY(-6px) scale(1.04);
  box-shadow: 0 14px 30px rgba(0,0,0,0.12);
  border-color: var(--color-gold, #C5A880);
}

.price-round-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.price-round-tile:hover .price-round-img {
  transform: scale(1.08);
}

.price-round-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.65) 100%);
}

.price-round-label {
  position: absolute;
  bottom: 15px;
  left: 18px;
  font-weight: 700;
  color: #FFFFFF;
  font-size: 1.15rem;
  letter-spacing: 0.03em;
  text-shadow: 0 2px 4px rgba(0,0,0,0.6);
  z-index: 2;
}

/* 2. Shop by Recipient Grid (3 Tiles Per Row) */
.recipient-tiles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
}

.recipient-box-tile {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(197, 168, 128, 0.2);
  text-decoration: none;
  display: block;
  box-shadow: 0 6px 18px rgba(0,0,0,0.04);
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
}

.recipient-box-tile:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 32px rgba(0,0,0,0.09);
}

.recipient-box-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.recipient-box-tile:hover .recipient-box-img {
  transform: scale(1.06);
}

.recipient-box-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.7) 100%);
}

.recipient-box-label {
  position: absolute;
  bottom: 18px;
  left: 20px;
  font-family: var(--font-serif);
  font-size: 1.45rem;
  font-weight: 500;
  color: #FFFFFF;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  z-index: 2;
  transition: color 0.3s ease;
}

.recipient-box-tile:hover .recipient-box-label {
  color: #F3E5AB;
}

/* 3. Shop by Occasion Grid (4 Tiles Per Row) */
.occasion-tiles-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.occasion-box-tile {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(197, 168, 128, 0.2);
  text-decoration: none;
  display: block;
  box-shadow: 0 6px 18px rgba(0,0,0,0.04);
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
}

.occasion-box-tile:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 32px rgba(0,0,0,0.09);
}

.occasion-box-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.occasion-box-tile:hover .occasion-box-img {
  transform: scale(1.06);
}

.occasion-box-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.7) 100%);
}

.occasion-box-label {
  position: absolute;
  bottom: 16px;
  left: 18px;
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 500;
  color: #FFFFFF;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  z-index: 2;
  transition: color 0.3s ease;
}

.occasion-box-tile:hover .occasion-box-label {
  color: #F3E5AB;
}

/* 4. Gift Cards Grid (4 Per Row, Sized 500x625px Aspect Ratio 4:5) */
.gift-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

.gift-card-item {
  position: relative;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 500 / 625;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(197, 168, 128, 0.25);
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 24px;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s ease;
}

.gift-card-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.12);
}

.gift-card-bg-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.gift-card-item:hover .gift-card-bg-img {
  transform: scale(1.06);
}

.gift-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%);
  z-index: 1;
}

.gift-card-title {
  position: relative;
  z-index: 2;
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 500;
  color: #FFFFFF;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  transition: color 0.3s ease;
}

.gift-card-item:hover .gift-card-title {
  color: var(--color-gold, #C5A880);
}

.gift-card-badge {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-gold, #C5A880);
}

@media (max-width: 992px) {
  .recipient-tiles-grid { grid-template-columns: repeat(2, 1fr); }
  .occasion-tiles-grid { grid-template-columns: repeat(2, 1fr); }
  .gift-cards-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 576px) {
  .recipient-tiles-grid { grid-template-columns: 1fr; }
  .occasion-tiles-grid { grid-template-columns: repeat(2, 1fr); }
  .gift-cards-grid { grid-template-columns: 1fr; }
}
`;

const cssFiles = [
  path.join(__dirname, 'styles.css'),
  path.join(__dirname, 'public', 'styles.css'),
  path.join(__dirname, 'legacy', 'styles.css')
];

for (const f of cssFiles) {
  if (!fs.existsSync(f)) continue;
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('.price-round-tile')) {
    content += giftsCssUpdate;
    fs.writeFileSync(f, content, 'utf8');
    console.log('Appended updated Gifts CSS to', f);
  }
}

// Updated renderGiftsPage function in JS files
const updatedRenderGiftsPage = `function renderGiftsPage() {
  const container = document.getElementById("gifts-page-container");
  if (!container) return;

  // Load config from Supabase / admin settings or fallback to localStorage / defaults
  const defaultConfig = {
    shapes: [
      { name: 'Classic Jar' }, { name: 'Ribbed Pillar' }, { name: 'Hexagon Glass' }, 
      { name: 'Artisan Bowl' }, { name: 'Rectangle' }, { name: 'Square' }, 
      { name: 'Triangle' }, { name: 'Star' }, { name: 'Round' }
    ],
    priceTiles: [
      { label: '₹100', image: 'assets/product_jasmine.png', link: '/shop?category=gifts' },
      { label: '₹200', image: 'assets/product_sandalwood.png', link: '/shop?category=gifts' },
      { label: '₹300', image: 'assets/product_rose.png', link: '/shop?category=gifts' },
      { label: '₹400', image: 'assets/product_fig.png', link: '/shop?category=gifts' }
    ],
    recipientTiles: [
      { label: 'Girls', image: 'assets/product_rose.png', link: '/shop?category=gifts' },
      { label: 'Boyfriend', image: 'assets/product_sandalwood.png', link: '/shop?category=gifts' },
      { label: 'Sister', image: 'assets/product_jasmine.png', link: '/shop?category=gifts' },
      { label: 'Mother', image: 'assets/product_fig.png', link: '/shop?category=gifts' },
      { label: 'Father', image: 'assets/product_sandalwood.png', link: '/shop?category=gifts' },
      { label: 'Friend', image: 'assets/product_rose.png', link: '/shop?category=gifts' }
    ],
    occasionTiles: [
      { label: 'Birthday', image: 'assets/campaign_banner.png', link: '/shop?category=gifts' },
      { label: 'Housewarming', image: 'assets/promo_banner.png', link: '/shop?category=gifts' },
      { label: 'Anniversary', image: 'assets/hero_banner_1.png', link: '/shop?category=gifts' },
      { label: 'Festive', image: 'assets/story_banner.png', link: '/shop?category=gifts' }
    ],
    giftCards: [
      { title: 'Celebration Gift Card', image: 'assets/campaign_banner.png', link: '/shop?category=gifts' },
      { title: 'Luxury Scent E-Card', image: 'assets/promo_banner.png', link: '/shop?category=gifts' },
      { title: 'Festive Joy Gift Card', image: 'assets/hero_banner_1.png', link: '/shop?category=gifts' },
      { title: 'Bespoke Atelier Pass', image: 'assets/story_banner.png', link: '/shop?category=gifts' }
    ]
  };

  let giftsConfig = defaultConfig;
  if (storeState && storeState.adminSettings && storeState.adminSettings.giftsConfig) {
    giftsConfig = { ...defaultConfig, ...storeState.adminSettings.giftsConfig };
  } else {
    try {
      const local = localStorage.getItem('chimini_gifts_config');
      if (local) giftsConfig = { ...defaultConfig, ...JSON.parse(local) };
    } catch (e) {}
  }

  const shapes = giftsConfig.shapes && giftsConfig.shapes.length > 0 ? giftsConfig.shapes : defaultConfig.shapes;
  const priceTiles = giftsConfig.priceTiles && giftsConfig.priceTiles.length > 0 ? giftsConfig.priceTiles : defaultConfig.priceTiles;
  const recipientTiles = giftsConfig.recipientTiles && giftsConfig.recipientTiles.length > 0 ? giftsConfig.recipientTiles : defaultConfig.recipientTiles;
  const occasionTiles = giftsConfig.occasionTiles && giftsConfig.occasionTiles.length > 0 ? giftsConfig.occasionTiles : defaultConfig.occasionTiles;
  const giftCards = giftsConfig.giftCards && giftsConfig.giftCards.length > 0 ? giftsConfig.giftCards : defaultConfig.giftCards;

  // Custom builder state
  const builderState = {
    shape: shapes[0] ? shapes[0].name : 'Classic Jar',
    scent: 'Amber Gold (Sandalwood)',
    scentImg: 'assets/product_sandalwood.png',
    note: 'With all my love, always',
    packaging: 'Signature Textured Box',
    price: 299
  };

  container.innerHTML = \`
    \${renderPageHeroHtml("gifts")}

    <!-- 1. Hero Section -->
    <section class="gifts-hero-section section-container">
      <span class="gifts-hero-badge">ART OF GIFTING</span>
      <h1 class="gifts-hero-title">Gifts That Feel Personal</h1>
      <p class="gifts-hero-subtitle">Thoughtfully curated candle hampers, bespoke personalized inscriptions, and hand-poured artisanal sets for every special moment.</p>
      <div class="gifts-hero-actions">
        <a href="#gift-customizer" class="btn btn-primary">Customise Your Gift &darr;</a>
        <a href="#gift-cards-section" class="btn btn-secondary">Explore Gift Cards</a>
      </div>
    </section>

    <div class="section-container">

      <!-- 2. Interactive Customizer -->
      <section id="gift-customizer" class="gift-customizer-section animate-slide-up">
        <div class="customizer-header">
          <h2>Customise Your Gift</h2>
          <p style="color: var(--text-secondary);">Select your vessel shape, scent profile, and add a personalized calligraphy card note.</p>
        </div>
        
        <div class="customizer-grid">
          <div class="customizer-controls">
            
            <div class="custom-step-group">
              <span class="custom-step-label">1. Choose Vessel Shape</span>
              <div class="custom-option-btns">
                \${shapes.map((s, idx) => \`
                  <button class="custom-opt-btn \${idx === 0 ? 'active' : ''}" data-type="shape" data-val="\${s.name}">\${s.name}</button>
                \`).join('')}
              </div>
            </div>

            <div class="custom-step-group">
              <span class="custom-step-label">2. Select Scent &amp; Vessel Shade</span>
              <div class="swatch-group">
                <button class="swatch-btn active" data-type="scent" data-val="Amber Gold (Sandalwood)" data-img="assets/product_sandalwood.png" style="background:#D4AF37;" title="Amber Gold"></button>
                <button class="swatch-btn" data-type="scent" data-val="Rose Quartz (Velvet Rose)" data-img="assets/product_rose.png" style="background:#E8C5C8;" title="Rose Quartz"></button>
                <button class="swatch-btn" data-type="scent" data-val="Emerald Onyx (Wild Oak)" data-img="assets/product_jasmine.png" style="background:#2E5B4B;" title="Emerald Onyx"></button>
                <button class="swatch-btn" data-type="scent" data-val="Ivory Soy (Pure Jasmine)" data-img="assets/product_fig.png" style="background:#FDFBF7;" title="Ivory Soy"></button>
              </div>
            </div>

            <div class="custom-step-group">
              <span class="custom-step-label">3. Personal Calligraphy Note</span>
              <textarea id="custom-gift-note" class="custom-text-input" placeholder="Type your custom gift message here...">With all my love, always</textarea>
            </div>

            <div class="custom-step-group">
              <span class="custom-step-label">4. Packaging Style</span>
              <div class="custom-option-btns">
                <button class="custom-opt-btn active" data-type="pkg" data-val="Signature Textured Box">Linen Box</button>
                <button class="custom-opt-btn" data-type="pkg" data-val="Wooden Treasure Crate">Wooden Crate</button>
              </div>
            </div>

          </div>

          <!-- Live Preview Card -->
          <div class="customizer-preview-card">
            <span style="font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--color-gold, #C5A880); font-weight: 600; margin-bottom: 10px;">LIVE PREVIEW</span>
            <div class="preview-image-container">
              <img id="preview-gift-img" src="assets/product_sandalwood.png" alt="Custom Gift Preview" class="preview-img">
            </div>
            <div class="preview-details">
              <h3 id="preview-gift-title" style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 6px;">\${builderState.shape} · Amber Gold</h3>
              <p id="preview-gift-pkg" style="font-size: 0.85rem; color: var(--text-secondary);">Packaged in Signature Textured Box</p>
              
              <div class="preview-note-box" id="preview-gift-note-display">
                "With all my love, always"
              </div>
              
              <div class="preview-price">₹299</div>
              <button id="add-custom-gift-btn" class="btn btn-primary btn-block">Add Custom Gift to Cart</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Promo Banner 1 -->
      <section class="gifts-promo-banner animate-slide-up">
        <h2>Artisan Gift Hampers Under ₹500</h2>
        <p>Hand-poured organic soy wax candles paired with botanical bath salts &amp; brass wick trimmers in a luxury keepsake box.</p>
        <a href="/shop?category=gifts" class="btn btn-secondary">Explore Hampers Under ₹500</a>
      </section>

      <!-- 4. Shop by Price (Single Unified Row of Round Tiles) -->
      <section class="price-section-block">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="font-family: var(--font-serif); font-size: 2.2rem;">Shop by Price</h2>
          <p style="color: var(--text-secondary);">Explore luxury scents fit for every budget</p>
        </div>

        <div class="price-round-tiles-row">
          \${priceTiles.map(pt => \`
            <a href="\${pt.link || '/shop?category=gifts'}" class="price-round-tile">
              <img src="\${pt.image || 'assets/product_jasmine.png'}" alt="\${pt.label}" class="price-round-img" onerror="this.src='assets/product_jasmine.png'">
              <div class="price-round-overlay"></div>
              <span class="price-round-label">\${pt.label}</span>
            </a>
          \`).join('')}
        </div>
      </section>

      <!-- 5. Shop by Recipient (3 Tiles Per Row, Box-Shaped) -->
      <section class="tile-grid-section">
        <div class="tile-grid-header">
          <h2>Shop by Recipient</h2>
          <p style="color: var(--text-secondary);">Curated tokens for every special person in your life</p>
        </div>
        <div class="recipient-tiles-grid">
          \${recipientTiles.map(r => \`
            <a href="\${r.link || '/shop?category=gifts'}" class="recipient-box-tile">
              <img src="\${r.image || 'assets/product_rose.png'}" alt="\${r.label}" class="recipient-box-img" onerror="this.src='assets/product_rose.png'">
              <div class="recipient-box-overlay"></div>
              <span class="recipient-box-label">\${r.label}</span>
            </a>
          \`).join('')}
        </div>
      </section>

      <!-- 6. Promo Banner 2 -->
      <section class="gifts-promo-banner animate-slide-up" style="background: linear-gradient(135deg, #1C2D27 0%, #2A473D 100%);">
        <h2>Bespoke Corporate &amp; Wedding Favors</h2>
        <p>Custom wax stamps, personalized scent branding, and white-glove bulk delivery for your grand celebrations.</p>
        <a href="/contact" class="btn btn-primary" style="background:#FAF8F5; color:#1C2D27;">Request Bulk Quote</a>
      </section>

      <!-- 7. Shop by Occasion (4 Tiles Per Row, Box-Shaped) -->
      <section class="tile-grid-section">
        <div class="tile-grid-header">
          <h2>Shop by Occasion</h2>
          <p style="color: var(--text-secondary);">Fragrant tokens designed for milestones and celebrations</p>
        </div>
        <div class="occasion-tiles-grid">
          \${occasionTiles.map(o => \`
            <a href="\${o.link || '/shop?category=gifts'}" class="occasion-box-tile">
              <img src="\${o.image || 'assets/campaign_banner.png'}" alt="\${o.label}" class="occasion-box-img" onerror="this.src='assets/campaign_banner.png'">
              <div class="occasion-box-overlay"></div>
              <span class="occasion-box-label">\${o.label}</span>
            </a>
          \`).join('')}
        </div>
      </section>

      <!-- 8. Gift Cards (Replaces Curated Gift Hampers & Sets) -->
      <section id="gift-cards-section" style="margin-bottom: 70px;">
        <div class="tile-grid-header">
          <h2>Gift Cards</h2>
          <p style="color: var(--text-secondary);">Give the gift of choice with our bespoke CHIMINI luxury digital &amp; physical gift passes</p>
        </div>
        <div class="gift-cards-grid">
          \${giftCards.map(gc => \`
            <a href="\${gc.link || '/shop?category=gifts'}" class="gift-card-item">
              <img src="\${gc.image || 'assets/campaign_banner.png'}" alt="\${gc.title}" class="gift-card-bg-img" onerror="this.src='assets/campaign_banner.png'">
              <div class="gift-card-overlay"></div>
              <h3 class="gift-card-title">\${gc.title}</h3>
              <span class="gift-card-badge">EXPLORE CARD &rarr;</span>
            </a>
          \`).join('')}
        </div>
      </section>

      <!-- 9. Promo Banner 3 -->
      <section class="gifts-promo-banner animate-slide-up" style="background: linear-gradient(135deg, #4A3B32 0%, #2A1F18 100%);">
        <h2>Create Unforgettable Moments</h2>
        <p>Complimentary handwritten calligraphy gift notes and signature textured box wrapping on every gift order.</p>
        <a href="#gift-customizer" class="btn btn-secondary">Build Your Gift Now</a>
      </section>

    </div>
  \`;

  // Interactive Builder Event Bindings
  const updateBuilderPreview = () => {
    const titleEl = document.getElementById("preview-gift-title");
    const pkgEl = document.getElementById("preview-gift-pkg");
    const noteEl = document.getElementById("preview-gift-note-display");
    const imgEl = document.getElementById("preview-gift-img");

    if (titleEl) titleEl.textContent = \`\${builderState.shape} · \${builderState.scent}\`;
    if (pkgEl) pkgEl.textContent = \`Packaged in \${builderState.packaging}\`;
    if (noteEl) noteEl.textContent = builderState.note ? \`"\${builderState.note}"\` : '"With all my love"';
    if (imgEl) imgEl.src = builderState.scentImg;
  };

  // Shape / Option buttons
  container.querySelectorAll(".custom-opt-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-type");
      const val = btn.getAttribute("data-val");
      btn.parentElement.querySelectorAll(".custom-opt-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      if (type === "shape") builderState.shape = val;
      if (type === "pkg") builderState.packaging = val;
      updateBuilderPreview();
    });
  });

  // Swatches
  container.querySelectorAll(".swatch-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-val");
      const img = btn.getAttribute("data-img");
      container.querySelectorAll(".swatch-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      builderState.scent = val;
      builderState.scentImg = img;
      updateBuilderPreview();
    });
  });

  // Note input
  const noteInput = document.getElementById("custom-gift-note");
  if (noteInput) {
    noteInput.addEventListener("input", (e) => {
      builderState.note = e.target.value;
      updateBuilderPreview();
    });
  }

  // Add Custom Gift to Cart
  const addCustomBtn = document.getElementById("add-custom-gift-btn");
  if (addCustomBtn) {
    addCustomBtn.addEventListener("click", () => {
      const customItem = {
        id: \`custom-gift-\${Date.now()}\`,
        name: \`Bespoke Gift: \${builderState.shape} (\${builderState.scent})\`,
        price: builderState.price,
        image: builderState.scentImg,
        note: builderState.note,
        packaging: builderState.packaging,
        quantity: 1
      };
      
      let existingIndex = storeState.cart.findIndex(item => item.id === customItem.id);
      if (existingIndex > -1) {
        storeState.cart[existingIndex].quantity += 1;
      } else {
        storeState.cart.push(customItem);
      }
      
      saveCart();
      updateCartUI();
      openCartDrawer();
      showToast("Custom Gift Added to Cart!");
    });
  }
}`;

const jsFiles = [
  path.join(__dirname, 'app.js'),
  path.join(__dirname, 'public', 'app.js'),
  path.join(__dirname, 'legacy', 'app.js')
];

for (const jsFile of jsFiles) {
  if (!fs.existsSync(jsFile)) continue;
  let content = fs.readFileSync(jsFile, 'utf8');
  const oldRenderMatch = /function renderGiftsPage\(\) \{[\s\S]*?\n\}/;
  if (oldRenderMatch.test(content)) {
    content = content.replace(oldRenderMatch, updatedRenderGiftsPage);
    fs.writeFileSync(jsFile, content, 'utf8');
    console.log('Updated renderGiftsPage in', jsFile);
  }
}
