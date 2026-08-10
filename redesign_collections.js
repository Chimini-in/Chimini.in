const fs = require('fs');
const path = require('path');

const cssToAdd = `

/* ==========================================================================
   COLLECTIONS INDEX PAGE STYLING (CHIMINI LUXURY DESIGN)
   ========================================================================== */
.collections-index-section {
  padding: 40px 20px 80px;
}

.collections-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px auto;
}

.collections-badge {
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-gold, #C5A880);
  margin-bottom: 12px;
  font-weight: 600;
}

.collections-main-title {
  font-family: var(--font-serif);
  font-size: 2.8rem;
  font-weight: 400;
  color: var(--text-primary);
  letter-spacing: 0.02em;
  margin-bottom: 15px;
}

.collections-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.collections-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 35px;
}

.collection-index-card {
  background-color: var(--bg-secondary, #FAF8F5);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(197, 168, 128, 0.18);
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1), box-shadow 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.collection-index-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.07);
}

.collection-card-inner {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.collection-card-media {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: #f0ebe4;
}

.collection-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.collection-index-card:hover .collection-card-img {
  transform: scale(1.06);
}

.collection-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.2) 100%);
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.collection-card-badge {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  color: var(--text-primary);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 20px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.collection-index-card:hover .collection-card-badge {
  background-color: var(--color-text-dark, #2A2A2A);
  color: #FFFFFF;
}

.collection-card-info {
  padding: 24px 22px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.collection-card-title {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 8px;
  transition: color 0.3s ease;
}

.collection-index-card:hover .collection-card-title {
  color: var(--color-gold, #C5A880);
}

.collection-card-sub {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 18px;
  flex-grow: 1;
}

.collection-card-action {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-primary);
  margin-top: auto;
  transition: color 0.3s ease;
}

.arrow-icon {
  width: 14px;
  height: 14px;
  transition: transform 0.3s ease;
}

.collection-index-card:hover .arrow-icon {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .collections-grid-container {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 22px;
  }
  .collections-main-title {
    font-size: 2.2rem;
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
  if (!content.includes('.collections-index-section')) {
    content += cssToAdd;
    fs.writeFileSync(f, content, 'utf8');
    console.log('Appended CSS to', f);
  }
}

// Update renderCollectionsPage function in app.js
const newRenderCollectionsPage = `function renderCollectionsPage() {
  const container = document.getElementById("collections-page-container");
  if (!container) return;
  
  const collections = (storeState.adminSettings && storeState.adminSettings.collections) || [];
  
  container.innerHTML = \`
    \${renderPageHeroHtml("collections")}

    <section class="collections-index-section section-container">
      <div class="collections-header animate-slide-up">
        <span class="collections-badge">CHIMINI EDITIONS</span>
        <h1 class="collections-main-title">Curated Collections</h1>
        <p class="collections-subtitle">Explore handcrafted luxury fragrance collections curated for every mood, space, and season.</p>
      </div>

      <div class="collections-grid-container" id="collections-grid-container"></div>
    </section>
  \`;
  
  const grid = document.getElementById("collections-grid-container");
  if (!grid) return;

  if (collections.length === 0) {
    grid.innerHTML = \`
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--text-secondary); font-family: var(--font-serif); font-size: 1.2rem;">
        No collections currently available.
      </div>
    \`;
    return;
  }
  
  collections.forEach(coll => {
    const card = document.createElement("div");
    card.className = "collection-index-card animate-slide-up";

    let targetLink = "/shop?category=all";
    if (coll.link && !coll.link.startsWith('#')) {
      targetLink = coll.link;
    } else if (coll.name) {
      targetLink = \`/shop?category=\${encodeURIComponent(coll.name.toLowerCase())}\`;
    }

    card.innerHTML = \`
      <a href="\${targetLink}" class="collection-card-inner">
        <div class="collection-card-media">
          <img src="\${coll.image || 'assets/campaign_banner.png'}" alt="\${coll.name}" class="collection-card-img" onerror="this.src='assets/campaign_banner.png'">
          <div class="collection-card-overlay"></div>
          <div class="collection-card-badge">EXPLORE</div>
        </div>
        <div class="collection-card-info">
          <h2 class="collection-card-title">\${coll.name}</h2>
          <p class="collection-card-sub">\${coll.description || 'Meticulously crafted luxury scented elements and artisan vessels'}</p>
          <span class="collection-card-action">View Products <svg class="icon arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></span>
        </div>
      </a>
    \`;

    grid.appendChild(card);
  });
}`;

const appJsPath = path.join(__dirname, 'app.js');
let appContent = fs.readFileSync(appJsPath, 'utf8');

// Replace renderCollectionsPage
const oldRenderMatch = /function renderCollectionsPage\(\) \{[\s\S]*?\n\}/;
if (oldRenderMatch.test(appContent)) {
  appContent = appContent.replace(oldRenderMatch, newRenderCollectionsPage);
  fs.writeFileSync(appJsPath, appContent, 'utf8');
  console.log('Updated renderCollectionsPage in app.js');
}

// Copy app.js to public/app.js and legacy/app.js
fs.copyFileSync(appJsPath, path.join(__dirname, 'public', 'app.js'));
fs.copyFileSync(appJsPath, path.join(__dirname, 'legacy', 'app.js'));
console.log('Copied app.js to public/app.js and legacy/app.js');
