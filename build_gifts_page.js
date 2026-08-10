const fs = require('fs');
const path = require('path');

const giftsCss = `

/* ==========================================================================
   GIFTS PAGE REDESIGN STYLING (CHIMINI LUXURY DESIGN)
   ========================================================================== */

/* 1. Gifts Hero Section */
.gifts-hero-section {
  background: linear-gradient(135deg, #FAF7F2 0%, #F5EFE6 100%);
  padding: 80px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(197, 168, 128, 0.2);
  margin-bottom: 50px;
}

.gifts-hero-badge {
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-gold, #C5A880);
  font-weight: 600;
  margin-bottom: 15px;
}

.gifts-hero-title {
  font-family: var(--font-serif);
  font-size: 3.2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 18px;
  letter-spacing: 0.02em;
}

.gifts-hero-subtitle {
  font-size: 1.05rem;
  color: var(--text-secondary);
  max-width: 680px;
  margin: 0 auto 30px auto;
  line-height: 1.6;
}

.gifts-hero-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

/* 2. Interactive Gift Customizer */
.gift-customizer-section {
  background: #FFFFFF;
  border: 1px solid rgba(197, 168, 128, 0.25);
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 70px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
}

.customizer-header {
  text-align: center;
  margin-bottom: 40px;
}

.customizer-header h2 {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.customizer-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.customizer-controls {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.custom-step-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.custom-step-label {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-primary);
}

.custom-option-btns {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.custom-opt-btn {
  padding: 10px 14px;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  background: #FAF8F5;
  font-size: 0.85rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: center;
}

.custom-opt-btn.active, .custom-opt-btn:hover {
  border-color: var(--color-gold, #C5A880);
  background: #2A2A2A;
  color: #FFFFFF;
}

.swatch-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.swatch-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid #E2E8F0;
  cursor: pointer;
  transition: transform 0.2s ease, border-color 0.2s ease;
  position: relative;
}

.swatch-btn.active {
  border-color: var(--color-text-dark, #2A2A2A);
  transform: scale(1.15);
  box-shadow: 0 0 0 2px rgba(197, 168, 128, 0.4);
}

.custom-text-input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #E2E8F0;
  border-radius: 6px;
  font-family: inherit;
  font-size: 0.9rem;
  resize: vertical;
  min-height: 80px;
}

.customizer-preview-card {
  background: #FAF7F2;
  border: 1px solid rgba(197, 168, 128, 0.3);
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: sticky;
  top: 110px;
}

.preview-image-container {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 20px;
  border: 4px solid #FFFFFF;
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
  position: relative;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.preview-details {
  width: 100%;
}

.preview-note-box {
  background: #FFFFFF;
  border: 1px dashed var(--color-gold, #C5A880);
  border-radius: 6px;
  padding: 15px;
  margin: 15px 0;
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--text-primary);
  font-size: 0.95rem;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-price {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 15px;
}

/* 3. Promo Banner Section */
.gifts-promo-banner {
  background: #2A2A2A;
  color: #FFFFFF;
  padding: 60px 40px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 70px;
  position: relative;
  overflow: hidden;
}

.gifts-promo-banner h2 {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  font-weight: 400;
  margin-bottom: 10px;
  color: #F3E5AB;
}

.gifts-promo-banner p {
  font-size: 1rem;
  color: #E2E8F0;
  max-width: 600px;
  margin: 0 auto 25px auto;
}

/* 4. Shop by Price Rows */
.price-section-block {
  margin-bottom: 60px;
}

.price-section-title {
  font-family: var(--font-serif);
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.price-section-title::after {
  content: "";
  flex-grow: 1;
  height: 1px;
  background: rgba(197, 168, 128, 0.25);
}

.price-scroll-row {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 15px;
  scrollbar-width: thin;
  scrollbar-color: var(--color-gold, #C5A880) #FAF8F5;
}

.price-scroll-row::-webkit-scrollbar {
  height: 5px;
}

.price-scroll-row::-webkit-scrollbar-thumb {
  background: var(--color-gold, #C5A880);
  border-radius: 4px;
}

.price-card-item {
  flex: 0 0 240px;
  background: #FAF8F5;
  border: 1px solid rgba(197, 168, 128, 0.18);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.price-card-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.06);
}

.price-card-img-wrap {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 12px;
  background: #FFF;
}

.price-card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.price-card-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.price-card-cost {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-gold, #C5A880);
  margin-bottom: 12px;
}

.price-card-btn {
  margin-top: auto;
  width: 100%;
  padding: 8px;
  font-size: 0.75rem;
}

/* 5. Tile Grids (Recipient & Occasion) */
.tile-grid-section {
  margin-bottom: 70px;
}

.tile-grid-header {
  text-align: center;
  margin-bottom: 35px;
}

.tile-grid-header h2 {
  font-family: var(--font-serif);
  font-size: 2.2rem;
  font-weight: 400;
  color: var(--text-primary);
}

.tiles-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
}

.tile-card {
  background: var(--bg-secondary, #FAF8F5);
  border: 1px solid rgba(197, 168, 128, 0.2);
  border-radius: 8px;
  padding: 25px 15px;
  text-align: center;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tile-card:hover {
  background: #2A2A2A;
  color: #FFFFFF;
  border-color: #2A2A2A;
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.tile-card-icon {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.tile-card-title {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .customizer-grid {
    grid-template-columns: 1fr;
  }
  .gifts-hero-title {
    font-size: 2.4rem;
  }
  .gift-customizer-section {
    padding: 20px;
  }
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
  if (!content.includes('.gifts-hero-section')) {
    content += giftsCss;
    fs.writeFileSync(f, content, 'utf8');
    console.log('Appended Gifts CSS to', f);
  }
}

// Write the complete new renderGiftsPage function
const newRenderGiftsPage = `function renderGiftsPage() {
  const container = document.getElementById("gifts-page-container");
  if (!container) return;
  
  const allProducts = (storeState.adminSettings && storeState.adminSettings.products) || [];
  
  // Custom builder state
  const builderState = {
    shape: 'Classic Jar',
    scent: 'Amber Gold (Sandalwood)',
    scentImg: 'assets/product_sandalwood.png',
    note: 'With all my love, always',
    packaging: 'Signature Textured Box',
    price: 299
  };

  // Mock data for price rows to guarantee 4 full rows
  const priceRowData = {
    under100: [
      { id: "g-101", name: "Mini Soy Votive Tin", price: 89, image: "assets/product_jasmine.png" },
      { id: "g-102", name: "Scented Botanical Wax Melt", price: 95, image: "assets/product_fig.png" },
      { id: "g-103", name: "Aroma Scent Sticks Pack", price: 79, image: "assets/product_rose.png" },
      { id: "g-104", name: "Artisan Matchbox Cylinder", price: 49, image: "assets/product_sandalwood.png" }
    ],
    under200: [
      { id: "g-201", name: "Single Wick Glass Candle", price: 189, image: "assets/product_sandalwood.png" },
      { id: "g-202", name: "Brass Candle Snuffer Tool", price: 169, image: "assets/product_jasmine.png" },
      { id: "g-203", name: "Lavender Bath Salt Vial", price: 149, image: "assets/product_rose.png" },
      { id: "g-204", name: "Rose Petal Wax Tablet", price: 179, image: "assets/product_fig.png" }
    ],
    under300: [
      { id: "g-301", name: "Amber Jar Soy Candle", price: 289, image: "assets/product_rose.png" },
      { id: "g-302", name: "Ceramic Tea Light Trio", price: 259, image: "assets/product_sandalwood.png" },
      { id: "g-303", name: "Aromatherapy Roll-On Oil", price: 239, image: "assets/product_jasmine.png" },
      { id: "g-304", name: "Handpoured Soy Travel Set", price: 299, image: "assets/product_fig.png" }
    ],
    under400: [
      { id: "g-401", name: "Deluxe Gift Hamper Box", price: 389, image: "assets/campaign_banner.png" },
      { id: "g-402", name: "Double Wick Luxury Vessel", price: 359, image: "assets/product_jasmine.png" },
      { id: "g-403", name: "Marble Coaster & Candle Gift", price: 379, image: "assets/product_sandalwood.png" },
      { id: "g-404", name: "Velvet Rose & Oud Spa Bundle", price: 399, image: "assets/product_rose.png" }
    ]
  };

  const recipients = [
    { title: "Girls / Women", icon: "✨", cat: "gifts" },
    { title: "Boyfriend / Men", icon: "🎩", cat: "gifts" },
    { title: "Sister", icon: "🌸", cat: "gifts" },
    { title: "Mother", icon: "🌿", cat: "gifts" },
    { title: "Father", icon: "📜", cat: "gifts" },
    { title: "Best Friend", icon: "💖", cat: "gifts" },
    { title: "Colleague", icon: "💼", cat: "gifts" },
    { title: "Partner", icon: "💍", cat: "gifts" }
  ];

  const occasions = [
    { title: "Birthday", icon: "🎂" },
    { title: "Housewarming", icon: "🏡" },
    { title: "Anniversary", icon: "🕊️" },
    { title: "Festive & Diwali", icon: "🪔" },
    { title: "Corporate", icon: "🏢" },
    { title: "Thank You", icon: "💌" }
  ];

  container.innerHTML = \`
    \${renderPageHeroHtml("gifts")}

    <!-- 1. Hero Section -->
    <section class="gifts-hero-section section-container">
      <span class="gifts-hero-badge">ART OF GIFTING</span>
      <h1 class="gifts-hero-title">Gifts That Feel Personal</h1>
      <p class="gifts-hero-subtitle">Thoughtfully curated candle hampers, bespoke personalized inscriptions, and hand-poured artisanal sets for every special moment.</p>
      <div class="gifts-hero-actions">
        <a href="#gift-customizer" class="btn btn-primary">Customise Your Gift &darr;</a>
        <a href="#gift-hampers" class="btn btn-secondary">Explore Hampers</a>
      </div>
    </section>

    <div class="section-container">

      <!-- 2. Interactive Customizer -->
      <section id="gift-customizer" class="gift-customizer-section animate-slide-up">
        <div class="customizer-header">
          <h2>Customise Your Gift</h2>
          <p style="color: var(--text-secondary);">Select your vessel, scent profile, and add a personalized calligraphy card note.</p>
        </div>
        
        <div class="customizer-grid">
          <div class="customizer-controls">
            
            <div class="custom-step-group">
              <span class="custom-step-label">1. Choose Vessel Shape</span>
              <div class="custom-option-btns">
                <button class="custom-opt-btn active" data-type="shape" data-val="Classic Jar">Classic Jar</button>
                <button class="custom-opt-btn" data-type="shape" data-val="Ribbed Pillar">Ribbed Pillar</button>
                <button class="custom-opt-btn" data-type="shape" data-val="Hexagon Glass">Hexagon Glass</button>
                <button class="custom-opt-btn" data-type="shape" data-val="Artisan Bowl">Artisan Bowl</button>
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
              <h3 id="preview-gift-title" style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 6px;">Classic Jar · Amber Gold</h3>
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

      <!-- 4. Shop by Price Rows -->
      <section class="price-section-block">
        <div style="text-align: center; margin-bottom: 40px;">
          <h2 style="font-family: var(--font-serif); font-size: 2.2rem;">Shop by Price</h2>
          <p style="color: var(--text-secondary);">Explore luxury scents fit for every budget</p>
        </div>

        <!-- Under 100 -->
        <div class="price-row-wrap">
          <h3 class="price-section-title">Gifts Under ₹100</h3>
          <div class="price-scroll-row">
            \${priceRowData.under100.map(item => \`
              <div class="price-card-item">
                <div class="price-card-img-wrap">
                  <img src="\${item.image}" alt="\${item.name}">
                </div>
                <div class="price-card-name">\${item.name}</div>
                <div class="price-card-cost">₹\${item.price}</div>
                <button class="btn btn-secondary price-card-btn add-custom-item-cart" data-id="\${item.id}" data-name="\${item.name}" data-price="\${item.price}">Add to Cart</button>
              </div>
            \`).join('')}
          </div>
        </div>

        <!-- Under 200 -->
        <div class="price-row-wrap" style="margin-top: 40px;">
          <h3 class="price-section-title">Gifts Under ₹200</h3>
          <div class="price-scroll-row">
            \${priceRowData.under200.map(item => \`
              <div class="price-card-item">
                <div class="price-card-img-wrap">
                  <img src="\${item.image}" alt="\${item.name}">
                </div>
                <div class="price-card-name">\${item.name}</div>
                <div class="price-card-cost">₹\${item.price}</div>
                <button class="btn btn-secondary price-card-btn add-custom-item-cart" data-id="\${item.id}" data-name="\${item.name}" data-price="\${item.price}">Add to Cart</button>
              </div>
            \`).join('')}
          </div>
        </div>

        <!-- Under 300 -->
        <div class="price-row-wrap" style="margin-top: 40px;">
          <h3 class="price-section-title">Gifts Under ₹300</h3>
          <div class="price-scroll-row">
            \${priceRowData.under300.map(item => \`
              <div class="price-card-item">
                <div class="price-card-img-wrap">
                  <img src="\${item.image}" alt="\${item.name}">
                </div>
                <div class="price-card-name">\${item.name}</div>
                <div class="price-card-cost">₹\${item.price}</div>
                <button class="btn btn-secondary price-card-btn add-custom-item-cart" data-id="\${item.id}" data-name="\${item.name}" data-price="\${item.price}">Add to Cart</button>
              </div>
            \`).join('')}
          </div>
        </div>

        <!-- Under 400 -->
        <div class="price-row-wrap" style="margin-top: 40px;">
          <h3 class="price-section-title">Gifts Under ₹400</h3>
          <div class="price-scroll-row">
            \${priceRowData.under400.map(item => \`
              <div class="price-card-item">
                <div class="price-card-img-wrap">
                  <img src="\${item.image}" alt="\${item.name}">
                </div>
                <div class="price-card-name">\${item.name}</div>
                <div class="price-card-cost">₹\${item.price}</div>
                <button class="btn btn-secondary price-card-btn add-custom-item-cart" data-id="\${item.id}" data-name="\${item.name}" data-price="\${item.price}">Add to Cart</button>
              </div>
            \`).join('')}
          </div>
        </div>
      </section>

      <!-- 5. Shop by Recipient -->
      <section class="tile-grid-section">
        <div class="tile-grid-header">
          <h2>Shop by Recipient</h2>
          <p style="color: var(--text-secondary);">Curated tokens for every special person in your life</p>
        </div>
        <div class="tiles-container">
          \${recipients.map(r => \`
            <a href="/shop?category=gifts" class="tile-card">
              <span class="tile-card-icon">\${r.icon}</span>
              <span class="tile-card-title">\${r.title}</span>
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

      <!-- 7. Shop by Occasion -->
      <section class="tile-grid-section">
        <div class="tile-grid-header">
          <h2>Shop by Occasion</h2>
          <p style="color: var(--text-secondary);">Fragrant tokens designed for milestones and celebrations</p>
        </div>
        <div class="tiles-container">
          \${occasions.map(o => \`
            <a href="/shop?category=gifts" class="tile-card">
              <span class="tile-card-icon">\${o.icon}</span>
              <span class="tile-card-title">\${o.title}</span>
            </a>
          \`).join('')}
        </div>
      </section>

      <!-- 8. Gift Hampers (Curated Products) -->
      <section id="gift-hampers" style="margin-bottom: 70px;">
        <div class="tile-grid-header">
          <h2>Curated Gift Hampers &amp; Sets</h2>
          <p style="color: var(--text-secondary);">Hand-poured candles paired with artisanal luxury accessories</p>
        </div>
        <div class="products-grid" id="gifts-products-grid"></div>
      </section>

      <!-- 9. Promo Banner 3 -->
      <section class="gifts-promo-banner animate-slide-up" style="background: linear-gradient(135deg, #4A3B32 0%, #2A1F18 100%);">
        <h2>Create Unforgettable Moments</h2>
        <p>Complimentary handwritten calligraphy gift notes and signature textured box wrapping on every gift order.</p>
        <a href="#gift-customizer" class="btn btn-secondary">Build Your Gift Now</a>
      </section>

    </div>
  \`;
  
  // Render Hampers Grid
  const grid = document.getElementById("gifts-products-grid");
  if (grid) {
    const products = allProducts.filter(p => p.category === 'gifts');
    const displayProds = products.length > 0 ? products : allProducts.slice(0, 4);

    displayProds.forEach(product => {
      const isWishlisted = storeState.wishlist.includes(product.id);
      const card = document.createElement("div");
      card.className = "product-card animate-slide-up";
      card.innerHTML = \`
        <div class="product-image-wrapper">
          <img src="\${product.image}" alt="\${product.name}" onerror="this.src='assets/product_jasmine.png'">
          <button class="wishlist-toggle-btn \${isWishlisted ? "active" : ""}" data-id="\${product.id}" aria-label="Add to Wishlist">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
        <div class="product-info">
          <h3 class="product-name">\${product.name}</h3>
          <p class="product-price">₹\${Number(product.price).toFixed(0)}</p>
          <button class="btn btn-primary product-card-btn add-to-cart-btn" data-id="\${product.id}">Add to Cart</button>
        </div>
      \`;
      card.querySelector(".wishlist-toggle-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        toggleWishlist(product.id);
      });
      card.querySelector(".add-to-cart-btn").addEventListener("click", (e) => {
        e.stopPropagation();
        addToCart(product.id);
      });
      grid.appendChild(card);
    });
  }

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

  // Option buttons
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

  // Price scroll row items Add to Cart buttons
  container.querySelectorAll(".add-custom-item-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-name");
      const price = parseFloat(btn.getAttribute("data-price"));
      const id = btn.getAttribute("data-id");

      const item = {
        id: id,
        name: name,
        price: price,
        image: "assets/product_jasmine.png",
        quantity: 1
      };

      let existingIndex = storeState.cart.findIndex(i => i.id === item.id);
      if (existingIndex > -1) {
        storeState.cart[existingIndex].quantity += 1;
      } else {
        storeState.cart.push(item);
      }

      saveCart();
      updateCartUI();
      openCartDrawer();
      showToast(\`\${name} Added to Cart!\`);
    });
  });
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
    content = content.replace(oldRenderMatch, newRenderGiftsPage);
    fs.writeFileSync(jsFile, content, 'utf8');
    console.log('Updated renderGiftsPage in', jsFile);
  }
}
