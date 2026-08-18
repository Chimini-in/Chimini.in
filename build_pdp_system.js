const fs = require('fs');
const path = require('path');

console.log('=== Building CHIMINI Product Detail Page (PDP) System ===');

// ─────────────────────────────────────────────────────────────────────────────
// 1. PDP CSS DESIGN
// ─────────────────────────────────────────────────────────────────────────────
const pdpCss = `

/* ==========================================================================
   CHIMINI LUXURY PRODUCT DETAIL PAGE (PDP) STYLES
   ========================================================================== */

.pdp-page-wrapper {
  padding: 20px 0 80px 0;
  background-color: var(--color-bg, #FAF8F5);
  min-height: 80vh;
}

.pdp-breadcrumb-container {
  margin-bottom: 24px;
}

.pdp-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #8C827A;
  font-family: var(--font-sans, 'Inter', sans-serif);
  flex-wrap: wrap;
}

.pdp-breadcrumb a {
  color: #8C827A;
  text-decoration: none;
  transition: color 0.2s ease;
}

.pdp-breadcrumb a:hover {
  color: var(--color-gold, #C5A880);
}

.pdp-breadcrumb-sep {
  color: #CFC5BC;
  font-size: 0.75rem;
}

.pdp-breadcrumb-current {
  color: var(--color-text-dark, #2C221E);
  font-weight: 500;
}

/* Two-Column Main Layout */
.pdp-main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: start;
  margin-bottom: 70px;
}

@media (max-width: 968px) {
  .pdp-main-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}

/* Left Column: Media Gallery */
.pdp-gallery-column {
  position: sticky;
  top: 100px;
}

@media (max-width: 968px) {
  .pdp-gallery-column {
    position: static;
  }
}

.pdp-main-image-card {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #F3EFEA;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #EBE4DC;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 30px rgba(44, 34, 30, 0.04);
}

.pdp-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.3s ease;
}

.pdp-main-image-card:hover .pdp-main-image {
  transform: scale(1.04);
}

.pdp-badge-floating {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(44, 34, 30, 0.88);
  backdrop-filter: blur(8px);
  color: #FFF;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 6px 14px;
  border-radius: 20px;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.pdp-badge-gold {
  background: linear-gradient(135deg, #C5A880 0%, #A3845B 100%);
  color: #FFF;
}

.pdp-thumbnails-strip {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  overflow-x: auto;
  padding-bottom: 6px;
  scrollbar-width: thin;
  scrollbar-color: #D4C9BF transparent;
}

.pdp-thumbnails-strip::-webkit-scrollbar {
  height: 4px;
}

.pdp-thumbnails-strip::-webkit-scrollbar-thumb {
  background-color: #D4C9BF;
  border-radius: 4px;
}

.pdp-thumb-item {
  width: 76px;
  height: 76px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  background-color: #F3EFEA;
  transition: all 0.25s ease;
  position: relative;
}

.pdp-thumb-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.pdp-thumb-item:hover {
  transform: translateY(-2px);
  border-color: #C5A880;
}

.pdp-thumb-item.active {
  border-color: #C5A880;
  box-shadow: 0 0 0 2px rgba(197, 168, 128, 0.3);
}

/* Right Column: Product Information & Actions */
.pdp-info-column {
  display: flex;
  flex-direction: column;
}

.pdp-header-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.pdp-category-tag {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-gold, #C5A880);
}

.pdp-share-btn-top {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 1px solid #E2D9CF;
  color: #6E6259;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.pdp-share-btn-top:hover {
  background-color: #F3EFEA;
  border-color: #C5A880;
  color: #2C221E;
}

.pdp-product-title {
  font-family: var(--font-serif, 'Playfair Display', serif);
  font-size: 2.3rem;
  font-weight: 600;
  color: var(--color-text-dark, #2C221E);
  line-height: 1.25;
  margin: 0 0 12px 0;
  letter-spacing: -0.01em;
}

@media (max-width: 768px) {
  .pdp-product-title {
    font-size: 1.85rem;
  }
}

.pdp-rating-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  font-size: 0.88rem;
}

.pdp-stars {
  color: #D4AF37;
  letter-spacing: 2px;
}

.pdp-rating-val {
  font-weight: 600;
  color: #2C221E;
}

.pdp-rating-count {
  color: #8C827A;
}

.pdp-stock-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #2E7D32;
  font-size: 0.8rem;
  font-weight: 500;
  background-color: #E8F5E9;
  padding: 3px 10px;
  border-radius: 12px;
}

.pdp-stock-badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #2E7D32;
}

/* Price block */
.pdp-price-container {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid #EBE4DC;
  border-bottom: 1px solid #EBE4DC;
  margin-bottom: 24px;
}

.pdp-price-current {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text-dark, #2C221E);
  font-family: var(--font-sans, 'Inter', sans-serif);
}

.pdp-price-original {
  font-size: 1.15rem;
  color: #A3978E;
  text-decoration: line-through;
}

.pdp-discount-badge {
  background-color: #E8F5E9;
  color: #2E7D32;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 4px;
}

.pdp-tax-note {
  font-size: 0.78rem;
  color: #8C827A;
  margin-left: auto;
}

/* Scent / Variant Selector */
.pdp-variant-section {
  margin-bottom: 24px;
}

.pdp-variant-title {
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #4A3E39;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.pdp-variant-title span {
  color: var(--color-gold, #C5A880);
  text-transform: none;
  font-weight: 500;
}

.pdp-swatches-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.pdp-swatch-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 24px;
  border: 1px solid #DED5CB;
  background-color: #FFF;
  cursor: pointer;
  font-size: 0.85rem;
  color: #2C221E;
  transition: all 0.2s ease;
}

.pdp-swatch-chip .swatch-color-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.1);
}

.pdp-swatch-chip:hover {
  border-color: #C5A880;
  background-color: #FAF8F5;
}

.pdp-swatch-chip.active {
  border-color: #2C221E;
  background-color: #2C221E;
  color: #FFF;
}

.pdp-swatch-chip.active .swatch-color-dot {
  border-color: #FFF;
}

/* Quantity and Action Buttons */
.pdp-actions-wrapper {
  display: flex;
  gap: 14px;
  margin-bottom: 24px;
}

@media (max-width: 600px) {
  .pdp-actions-wrapper {
    flex-direction: column;
  }
}

.pdp-qty-picker {
  display: inline-flex;
  align-items: center;
  border: 1px solid #DED5CB;
  border-radius: 8px;
  background-color: #FFF;
  overflow: hidden;
  height: 52px;
}

.pdp-qty-btn {
  width: 44px;
  height: 100%;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  color: #2C221E;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.15s ease;
}

.pdp-qty-btn:hover {
  background-color: #F3EFEA;
}

.pdp-qty-input {
  width: 44px;
  height: 100%;
  border: none;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  color: #2C221E;
  background: transparent;
}

.pdp-qty-input::-webkit-outer-spin-button,
.pdp-qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.pdp-add-cart-btn {
  flex: 1;
  height: 52px;
  background: #2C221E;
  color: #FFF;
  border: none;
  border-radius: 8px;
  font-size: 0.92rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 4px 14px rgba(44, 34, 30, 0.12);
}

.pdp-add-cart-btn:hover {
  background: #17110E;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(44, 34, 30, 0.2);
}

.pdp-wishlist-btn-main {
  height: 52px;
  padding: 0 20px;
  background: #FFF;
  border: 1px solid #DED5CB;
  border-radius: 8px;
  color: #4A3E39;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.pdp-wishlist-btn-main:hover {
  border-color: #C5A880;
  background-color: #FAF8F5;
  color: #2C221E;
}

.pdp-wishlist-btn-main.active {
  background-color: #FBF4E8;
  border-color: #C5A880;
  color: #8C6A3D;
}

.pdp-wishlist-btn-main.active svg {
  fill: #8C6A3D;
  stroke: #8C6A3D;
}

/* Value Props Strip */
.pdp-value-pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px;
  background-color: #F5F1EB;
  border-radius: 8px;
  margin-bottom: 28px;
}

@media (max-width: 600px) {
  .pdp-value-pillars {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}

.pdp-pillar-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 500;
  color: #4A3E39;
}

.pdp-pillar-icon {
  font-size: 1.1rem;
}

/* Accordion Section */
.pdp-accordion-group {
  border-top: 1px solid #EBE4DC;
}

.pdp-accordion-item {
  border-bottom: 1px solid #EBE4DC;
}

.pdp-accordion-trigger {
  width: 100%;
  padding: 18px 0;
  background: transparent;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text-dark, #2C221E);
  text-align: left;
  cursor: pointer;
  font-family: var(--font-serif, 'Playfair Display', serif);
  letter-spacing: 0.02em;
}

.pdp-accordion-icon {
  font-size: 1.2rem;
  color: #8C827A;
  transition: transform 0.3s ease;
}

.pdp-accordion-item.open .pdp-accordion-icon {
  transform: rotate(45deg);
}

.pdp-accordion-content {
  display: none;
  padding-bottom: 20px;
  font-size: 0.88rem;
  line-height: 1.7;
  color: #6E6259;
}

.pdp-accordion-item.open .pdp-accordion-content {
  display: block;
  animation: fadeInDown 0.25s ease forwards;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Below the Fold: You Might Also Like Section */
.pdp-related-section {
  padding-top: 50px;
  border-top: 1px solid #EBE4DC;
}

.pdp-related-header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;
}

.pdp-related-title {
  font-family: var(--font-serif, 'Playfair Display', serif);
  font-size: 1.9rem;
  color: var(--color-text-dark, #2C221E);
  margin: 0 0 6px 0;
  font-weight: 500;
}

.pdp-related-subtitle {
  font-size: 0.9rem;
  color: #8C827A;
  margin: 0;
}

.pdp-related-nav-btns {
  display: flex;
  gap: 10px;
}

.pdp-nav-arrow-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid #DED5CB;
  background-color: #FFF;
  color: #2C221E;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.2s ease;
}

.pdp-nav-arrow-btn:hover {
  background-color: #2C221E;
  color: #FFF;
  border-color: #2C221E;
}

.pdp-related-carousel {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding-bottom: 20px;
  scrollbar-width: none;
}

.pdp-related-carousel::-webkit-scrollbar {
  display: none;
}

.pdp-related-card-item {
  flex: 0 0 calc(25% - 18px);
  min-width: 240px;
  scroll-snap-align: start;
}

@media (max-width: 1024px) {
  .pdp-related-card-item {
    flex: 0 0 calc(33.333% - 16px);
  }
}

@media (max-width: 768px) {
  .pdp-related-card-item {
    flex: 0 0 calc(50% - 12px);
    min-width: 200px;
  }
}

@media (max-width: 480px) {
  .pdp-related-card-item {
    flex: 0 0 80%;
  }
}

/* Share Modal Popup */
.pdp-share-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(44, 34, 30, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.pdp-share-modal {
  background: #FFF;
  border-radius: 14px;
  max-width: 460px;
  width: 100%;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.15);
  animation: modalPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes modalPop {
  from { transform: scale(0.92); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.pdp-share-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.pdp-share-header h3 {
  margin: 0;
  font-family: var(--font-serif, 'Playfair Display', serif);
  font-size: 1.25rem;
  color: #2C221E;
}

.pdp-share-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: #8C827A;
  cursor: pointer;
}

.pdp-share-product-preview {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  background-color: #F8F5F1;
  border-radius: 8px;
  margin-bottom: 18px;
}

.pdp-share-product-preview img {
  width: 50px;
  height: 50px;
  border-radius: 6px;
  object-fit: cover;
}

.pdp-share-link-box {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}

.pdp-share-link-box input {
  flex: 1;
  padding: 10px 12px;
  font-size: 0.85rem;
  border: 1px solid #DED5CB;
  border-radius: 6px;
  background-color: #F8F5F1;
}

.pdp-share-social-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.pdp-share-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.pdp-share-btn:hover {
  opacity: 0.9;
}

.pdp-share-btn.share-wa { background-color: #25D366; color: #FFF; }
.pdp-share-btn.share-fb { background-color: #1877F2; color: #FFF; }
.pdp-share-btn.share-tw { background-color: #1DA1F2; color: #FFF; }
.pdp-share-btn.share-em { background-color: #2C221E; color: #FFF; }
`;

// Apply CSS to stylesheets
const cssFiles = [
  path.join(__dirname, 'styles.css'),
  path.join(__dirname, 'public', 'styles.css'),
  path.join(__dirname, 'legacy', 'styles.css')
];

for (const f of cssFiles) {
  if (!fs.existsSync(f)) continue;
  let content = fs.readFileSync(f, 'utf8');
  if (!content.includes('.pdp-page-wrapper')) {
    content += pdpCss;
    fs.writeFileSync(f, content, 'utf8');
    console.log('Appended PDP CSS to', f);
  }
}

console.log('PDP CSS updated successfully.');
