const fs = require('fs');
const path = require('path');

// 1. Pre-populate default hero banner HTML in index.html files so it renders in 0ms on initial HTML parse
const defaultHeroHtml = `<section id="hero-banner" class="hero-banner full-width-banner-section">
      <a href="#best-sellers" class="banner-slot-link">
        <img src="assets/hero_banner_1.png" alt="CHIMINI Luxury Candles Banner" class="banner-slot-img">
      </a>
    </section>`;

const htmlFiles = [
  path.join(__dirname, 'public', 'index.html'),
  path.join(__dirname, 'legacy', 'index.html')
];

for (const htmlFile of htmlFiles) {
  if (!fs.existsSync(htmlFile)) continue;
  let content = fs.readFileSync(htmlFile, 'utf8');
  
  // Replace empty hero-banner section with pre-populated hero banner HTML
  content = content.replace(/<section id="hero-banner" class="hero-banner full-width-banner-section">\s*<!--[\s\S]*?-->\s*<\/section>/, defaultHeroHtml);
  content = content.replace(/<section id="hero-banner" class="hero-banner full-width-banner-section">\s*<\/section>/, defaultHeroHtml);

  fs.writeFileSync(htmlFile, content, 'utf8');
  console.log('Updated hero banner HTML in', htmlFile);
}

// 2. Update DOMContentLoaded in app.js files so initStore() fires synchronously in 0ms
const jsFiles = [
  path.join(__dirname, 'app.js'),
  path.join(__dirname, 'public', 'app.js'),
  path.join(__dirname, 'legacy', 'app.js')
];

const newDomLoaded = `document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  initStore();
  initAdminFields();

  // Fetch latest live data from Supabase in background without blocking initial DOM paint
  fetchSupabaseData().then(() => {
    initStore();
  });
});`;

for (const jsFile of jsFiles) {
  if (!fs.existsSync(jsFile)) continue;
  let content = fs.readFileSync(jsFile, 'utf8');

  // Replace DOMContentLoaded block
  content = content.replace(/document\.addEventListener\("DOMContentLoaded", async \(\) => \{[\s\S]*?\n\}\);/m, newDomLoaded);

  fs.writeFileSync(jsFile, content, 'utf8');
  console.log('Updated DOMContentLoaded in', jsFile);
}

// 3. Add min-height CSS for .hero-banner to prevent layout shift during image load
const heroCssFix = `

/* --- Hero Banner Layout Jump Fix --- */
.hero-banner {
  width: 100%;
  min-height: 250px;
  background-color: #FAF8F5;
  overflow: hidden;
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
  if (!cssContent.includes('.hero-banner {')) {
    cssContent += heroCssFix;
    fs.writeFileSync(cssFile, cssContent, 'utf8');
    console.log('Appended Hero CSS fix to', cssFile);
  }
}
