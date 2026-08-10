const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'app.js');
let content = fs.readFileSync(appJsPath, 'utf8');

const helperFunctions = `
function getPageBanner(pageKey) {
  if (typeof storeState !== 'undefined' && storeState) {
    if (storeState.adminSettings && storeState.adminSettings.pageBanners && storeState.adminSettings.pageBanners[pageKey]) {
      const b = storeState.adminSettings.pageBanners[pageKey];
      if (b && b.image && b.image.trim() !== '') return b;
    }
    if (storeState.adminSettings && storeState.adminSettings[pageKey + 'Banner']) {
      const b = storeState.adminSettings[pageKey + 'Banner'];
      if (b && b.image && b.image.trim() !== '') return b;
    }
    if (storeState.banners && Array.isArray(storeState.banners)) {
      const found = storeState.banners.find(b => 
        (b.section_id === pageKey || b.section_id === pageKey + '_banner') && 
        (b.is_published === undefined || b.is_published === true) &&
        (b.image_url && b.image_url.trim() !== '')
      );
      if (found) {
        return {
          image: found.image_url,
          link: found.link_url || '#'
        };
      }
    }
  }
  return null;
}

function renderPageHeroHtml(pageKey) {
  const banner = getPageBanner(pageKey);
  if (!banner || !banner.image || banner.image.trim() === '') {
    return '';
  }
  return \`
    <section class="subpage-hero banner-image-hero full-width-banner-section" style="margin-bottom: 2rem;">
      <a href="\${banner.link || '#'}">
        <img src="\${banner.image}" alt="\${pageKey} banner" style="width: 100%; max-height: 400px; object-fit: cover; display: block;">
      </a>
    </section>
  \`;
}
`;

content = content.replace('// --- 9. SUBPAGE DYNAMIC RENDERERS ---', helperFunctions + '\n// --- 9. SUBPAGE DYNAMIC RENDERERS ---');

// Shop
const shopOld = `      <section class="subpage-hero">
        <h1 class="subpage-title">The Atelier Shop</h1>
        <p class="subpage-subtitle">Immersive botanical fragrances hand-poured in luxury vessels</p>
      </section>`;
content = content.replace(shopOld, '${renderPageHeroHtml("shop")}');

// Collections
const collOld = `    <section class="subpage-hero">
      <h1 class="subpage-title">Curated Collections</h1>
      <p class="subpage-subtitle">Aesthetic scents and vessels designed for every mood and season</p>
    </section>`;
content = content.replace(collOld, '${renderPageHeroHtml("collections")}');

// Gifts
const giftsOld = `    <section class="subpage-hero">
      <h1 class="subpage-title">The Art of Gifting</h1>
      <p class="subpage-subtitle">Meticulously curated gift sets and custom aromatic assortments for your loved ones</p>
    </section>`;
content = content.replace(giftsOld, '${renderPageHeroHtml("gifts")}');

// About
const aboutOld = `    <section class="subpage-hero">
      <h1 class="subpage-title">\${about.title || 'A Quest for Olfactory Purity'}</h1>
      <p class="subpage-subtitle">The story of CHIMINI's clean-burning luxury scents</p>
    </section>`;
content = content.replace(aboutOld, '${renderPageHeroHtml("about")}');

// Contact
const contactOld = `    <section class="subpage-hero">
      <h1 class="subpage-title">Client Concierge</h1>
      <p class="subpage-subtitle">We are here to assist with custom orders, corporate gifts, or scent inquiries</p>
    </section>`;
content = content.replace(contactOld, '${renderPageHeroHtml("contact")}');

fs.writeFileSync(appJsPath, content, 'utf8');
console.log('Updated app.js');

// Copy app.js to public/app.js and legacy/app.js
fs.copyFileSync(appJsPath, path.join(__dirname, 'public', 'app.js'));
fs.copyFileSync(appJsPath, path.join(__dirname, 'legacy', 'app.js'));
console.log('Copied app.js to public/app.js and legacy/app.js');

// Update app/admin/banners/page.js
const adminBannersPage = path.join(__dirname, 'app', 'admin', 'banners', 'page.js');
if (fs.existsSync(adminBannersPage)) {
  let adminContent = fs.readFileSync(adminBannersPage, 'utf8');
  adminContent = adminContent.replace(
    '<option value="hero">Hero Slider</option>\n                    <option value="ads_1">Promo Ads Grid</option>\n                    <option value="brand_story">Brand Story Banner</option>',
    `<option value="hero">Hero Slider (Home)</option>
                    <option value="ads_1">Promo Ads Grid (Home)</option>
                    <option value="brand_story">Brand Story Banner (Home)</option>
                    <option value="shop">Shop Page Banner</option>
                    <option value="collections">Collections Page Banner</option>
                    <option value="gifts">Gifts Page Banner</option>
                    <option value="about">About Us Page Banner</option>
                    <option value="contact">Contact Us Page Banner</option>`
  );
  fs.writeFileSync(adminBannersPage, adminContent, 'utf8');
  console.log('Updated', adminBannersPage);
}
