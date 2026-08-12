const fs = require('fs');
const path = require('path');

const jsFiles = [
  path.join(__dirname, 'app.js'),
  path.join(__dirname, 'public', 'app.js'),
  path.join(__dirname, 'legacy', 'app.js')
];

// ─────────────────────────────────────────────────────────────────────────────
// NEW getPageBanner — maps the new slot IDs (home_hero, shop_top, etc.)
// ─────────────────────────────────────────────────────────────────────────────
const newGetPageBanner = `function getPageBanner(slotId) {
  // Look in storeState.banners array (from Supabase)
  if (storeState.banners && Array.isArray(storeState.banners)) {
    const found = storeState.banners.find(b =>
      b.section_id === slotId &&
      (b.is_published === undefined || b.is_published === true) &&
      b.image_url && b.image_url.trim() !== ''
    );
    if (found) return { image: found.image_url, link: found.link_url || '#' };
  }

  // Legacy fallback: old section_id style without page prefix
  const legacyKey = slotId.split('_').slice(1).join('_');
  if (storeState.banners && Array.isArray(storeState.banners)) {
    const found = storeState.banners.find(b =>
      (b.section_id === legacyKey || b.section_id === slotId.split('_').pop()) &&
      (b.is_published === undefined || b.is_published === true) &&
      b.image_url && b.image_url.trim() !== ''
    );
    if (found) return { image: found.image_url, link: found.link_url || '#' };
  }

  // Legacy adminSettings fallbacks
  const legacyMap = {
    home_hero:        storeState.adminSettings?.heroBanner,
    home_ads_1:       storeState.adminSettings?.adsBanner1,
    home_ads_2:       storeState.adminSettings?.adsBanner2,
    home_brand_story: storeState.adminSettings?.storyBanner,
    shop_top:         storeState.adminSettings?.pageBanners?.shop,
    collections_top:  storeState.adminSettings?.pageBanners?.collections,
    gifts_top:        storeState.adminSettings?.pageBanners?.gifts,
    about_top:        storeState.adminSettings?.pageBanners?.about,
    contact_top:      storeState.adminSettings?.pageBanners?.contact,
  };
  const legacy = legacyMap[slotId];
  if (legacy && legacy.image && legacy.image.trim() !== '') return legacy;

  return null;
}`;

// ─────────────────────────────────────────────────────────────────────────────
// NEW renderBannerSlot — pure image+link, no text overlay, no buttons
// ─────────────────────────────────────────────────────────────────────────────
const newRenderPageHeroHtml = `function renderBannerSlot(slotId, extraStyle = '') {
  const banner = getPageBanner(slotId);
  if (!banner || !banner.image || banner.image.trim() === '') return '';
  return \`<a href="\${banner.link || '#'}" class="banner-slot-link" style="\${extraStyle}">
    <img src="\${banner.image}" alt="banner" class="banner-slot-img" onerror="this.parentElement.style.display='none'">
  </a>\`;
}

// Keep old name for compatibility
function renderPageHeroHtml(pageKey) {
  // Map old page keys to new slot IDs
  const slotMap = { shop: 'shop_top', collections: 'collections_top', gifts: 'gifts_top', about: 'about_top', contact: 'contact_top' };
  const slotId = slotMap[pageKey] || pageKey;
  const html = renderBannerSlot(slotId);
  if (!html) return '';
  return \`<div class="page-top-banner-wrap">\${html}</div>\`;
}`;

// ─────────────────────────────────────────────────────────────────────────────
// New renderMarketingBanners — pure image+link for home banners
// ─────────────────────────────────────────────────────────────────────────────
const newRenderMarketingBanners = `function renderMarketingBanners() {
  // 1. Hero Banner
  if (DOM.heroBanner) {
    const html = renderBannerSlot('home_hero');
    if (html) {
      DOM.heroBanner.innerHTML = html;
    } else {
      // Default fallback
      const hero = storeState.adminSettings.heroBanner || {};
      if (hero.image) {
        DOM.heroBanner.innerHTML = \`<a href="\${hero.link || '#'}" class="banner-slot-link">
          <img src="\${hero.image}" alt="Hero Banner" class="banner-slot-img" onerror="this.parentElement.style.display='none'">
        </a>\`;
      }
    }
  }

  // 2. Ads Banner 1
  if (DOM.productsAdsBanner1) {
    const html = renderBannerSlot('home_ads_1');
    DOM.productsAdsBanner1.innerHTML = html || (() => {
      const ad = storeState.adminSettings.adsBanner1 || {};
      return ad.image ? \`<a href="\${ad.link || '#'}" class="banner-slot-link"><img src="\${ad.image}" class="banner-slot-img" onerror="this.parentElement.style.display='none'"></a>\` : '';
    })();
  }

  // 3. Ads Banner 2
  if (DOM.productsAdsBanner2) {
    const html = renderBannerSlot('home_ads_2');
    DOM.productsAdsBanner2.innerHTML = html || (() => {
      const ad = storeState.adminSettings.adsBanner2 || {};
      return ad.image ? \`<a href="\${ad.link || '#'}" class="banner-slot-link"><img src="\${ad.image}" class="banner-slot-img" onerror="this.parentElement.style.display='none'"></a>\` : '';
    })();
  }

  // 4. Brand Story Banner
  if (DOM.brandStoryBanner) {
    const html = renderBannerSlot('home_brand_story');
    DOM.brandStoryBanner.innerHTML = html || (() => {
      const story = storeState.adminSettings.storyBanner || {};
      return story.image ? \`<a href="\${story.link || '#'}" class="banner-slot-link"><img src="\${story.image}" class="banner-slot-img" onerror="this.parentElement.style.display='none'"></a>\` : '';
    })();
  }
}`;

// CSS to add to all stylesheet files
const bannerCss = `

/* ==========================================================================
   BANNER SLOTS — Pure image+link, no text overlay
   ========================================================================== */
.banner-slot-link {
  display: block;
  width: 100%;
  line-height: 0;
  cursor: pointer;
  overflow: hidden;
}

.banner-slot-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.banner-slot-link:hover .banner-slot-img {
  transform: scale(1.02);
}

.page-top-banner-wrap {
  width: 100%;
  margin-bottom: 2rem;
  overflow: hidden;
}

/* Hero banner: full width, no fixed height, auto aspect */
#hero-banner .banner-slot-link,
#hero-banner .banner-slot-img {
  max-height: 600px;
  object-fit: cover;
}

/* Ads banners: constrained height */
#products-ads-banner-1 .banner-slot-img,
#products-ads-banner-2 .banner-slot-img {
  max-height: 500px;
  object-fit: cover;
}

/* Brand story banner */
#brand-story-banner .banner-slot-img {
  max-height: 450px;
  object-fit: cover;
}

/* In-page slot wrappers (gifts promo etc.) */
.gifts-img-banner {
  width: 100%;
  margin-bottom: 50px;
  border-radius: 8px;
  overflow: hidden;
}

.gifts-img-banner .banner-slot-img {
  max-height: 380px;
  object-fit: cover;
  border-radius: 8px;
}
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
  if (!content.includes('.banner-slot-link')) {
    content += bannerCss;
    fs.writeFileSync(f, content, 'utf8');
    console.log('Appended banner CSS to', f);
  }
}

// Apply JS changes to all app.js files
for (const jsFile of jsFiles) {
  if (!fs.existsSync(jsFile)) continue;
  let content = fs.readFileSync(jsFile, 'utf8');

  // 1. Replace getPageBanner
  content = content.replace(/function getPageBanner\([\s\S]*?\n\}/m, newGetPageBanner);

  // 2. Replace renderPageHeroHtml (and insert renderBannerSlot before it)
  content = content.replace(/function renderPageHeroHtml\([\s\S]*?\n\}/m, newRenderPageHeroHtml);

  // 3. Replace renderMarketingBanners
  content = content.replace(/\/\/ F\. Marketing Banners[\s\S]*?function renderMarketingBanners\(\) \{[\s\S]*?\n\}/m, newRenderMarketingBanners);
  // Alternate if no comment header
  if (!content.includes('renderBannerSlot(\'home_hero\')')) {
    content = content.replace(/function renderMarketingBanners\(\) \{[\s\S]*?\n\}/m, newRenderMarketingBanners);
  }

  // 4. Replace gifts promo banners (the three hardcoded dark .gifts-promo-banner sections)
  // Pattern 1: first promo (Artisan Gift Hampers)
  content = content.replace(
    /<!-- 3\. Promo Banner 1 -->\s*<section class="gifts-promo-banner[\s\S]*?<\/section>/,
    `<!-- 3. Promo Banner 1 -->\${renderBannerSlot('gifts_promo_1') ? '<div class="gifts-img-banner">' + renderBannerSlot('gifts_promo_1') + '</div>' : ''}`
  );

  // Pattern 2: second promo (Corporate & Wedding)
  content = content.replace(
    /<!-- 6\. Promo Banner 2 -->\s*<section class="gifts-promo-banner[\s\S]*?<\/section>/,
    `<!-- 6. Promo Banner 2 -->\${renderBannerSlot('gifts_promo_2') ? '<div class="gifts-img-banner">' + renderBannerSlot('gifts_promo_2') + '</div>' : ''}`
  );

  // Pattern 3: third promo (Create Unforgettable)
  content = content.replace(
    /<!-- 9\. Promo Banner 3 -->\s*<section class="gifts-promo-banner[\s\S]*?<\/section>/,
    `<!-- 9. Promo Banner 3 -->\${renderBannerSlot('gifts_promo_3') ? '<div class="gifts-img-banner">' + renderBannerSlot('gifts_promo_3') + '</div>' : ''}`
  );

  fs.writeFileSync(jsFile, content, 'utf8');
  console.log('Updated', jsFile);
}

console.log('All banner updates applied!');
