const fs = require('fs');
const path = require('path');

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
          <div class="collection-card-text-overlay">
            <h2 class="collection-card-title">\${coll.name}</h2>
          </div>
          <div class="collection-card-badge">EXPLORE &rarr;</div>
        </div>
      </a>
    \`;

    grid.appendChild(card);
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
  const oldRenderMatch = /function renderCollectionsPage\(\) \{[\s\S]*?\n\}/;
  if (oldRenderMatch.test(content)) {
    content = content.replace(oldRenderMatch, newRenderCollectionsPage);
    fs.writeFileSync(jsFile, content, 'utf8');
    console.log('Updated', jsFile);
  }
}

// Update CSS rules
const newCssRules = `

/* --- Updated Collection Card Styling (Text inside image) --- */
.collection-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.7) 100%);
  opacity: 0.8;
  transition: opacity 0.4s ease;
}

.collection-index-card:hover .collection-card-overlay {
  opacity: 0.9;
}

.collection-card-text-overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 110px;
  z-index: 2;
}

.collection-card-title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  font-weight: 500;
  color: #FFFFFF;
  letter-spacing: 0.02em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transition: color 0.3s ease;
}

.collection-index-card:hover .collection-card-title {
  color: #F3E5AB;
}

.collection-card-badge {
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 2;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  color: var(--text-primary);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 20px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.collection-index-card:hover .collection-card-badge {
  background-color: var(--color-gold, #C5A880);
  color: #FFFFFF;
  transform: translateX(2px);
}
`;

const cssFiles = [
  path.join(__dirname, 'styles.css'),
  path.join(__dirname, 'public', 'styles.css'),
  path.join(__dirname, 'legacy', 'styles.css')
];

for (const cssFile of cssFiles) {
  if (!fs.existsSync(cssFile)) continue;
  let cssContent = fs.readFileSync(cssFile, 'utf8');
  cssContent += newCssRules;
  fs.writeFileSync(cssFile, cssContent, 'utf8');
  console.log('Appended CSS to', cssFile);
}
