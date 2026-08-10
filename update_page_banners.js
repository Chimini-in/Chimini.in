const fs = require('fs');
const path = require('path');

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

const jsFiles = [
  path.join(__dirname, 'app.js'),
  path.join(__dirname, 'public', 'app.js'),
  path.join(__dirname, 'legacy', 'app.js')
];

for (const jsFile of jsFiles) {
  if (!fs.existsSync(jsFile)) continue;
  let content = fs.readFileSync(jsFile, 'utf8');

  // Insert helper functions if not present
  if (!content.includes('function renderPageHeroHtml(')) {
    content = content.replace('// --- 9. SUBPAGE DYNAMIC RENDERERS ---', helperFunctions + '\n// --- 9. SUBPAGE DYNAMIC RENDERERS ---');
  }

  // Replace subpage hero in renderShopPage
  content = content.replace(
    /<section class="subpage-hero">[\s\S]*?<\/section>/g,
    (match, offset) => {
      // Find which function this match belongs to by checking preceding code
      const prefix = content.substring(Math.max(0, offset - 500), offset);
      if (prefix.includes('renderShopPage')) {
        return '${renderPageHeroHtml("shop")}';
      } else if (prefix.includes('renderCollectionsPage')) {
        return '${renderPageHeroHtml("collections")}';
      } else if (prefix.includes('renderGiftsPage')) {
        return '${renderPageHeroHtml("gifts")}';
      } else if (prefix.includes('renderAboutPage')) {
        return '${renderPageHeroHtml("about")}';
      } else if (prefix.includes('renderContactPage')) {
        return '${renderPageHeroHtml("contact")}';
      }
      return match;
    }
  );

  fs.writeFileSync(jsFile, content, 'utf8');
  console.log('Updated', jsFile);
}

// Update app/admin/banners/page.js
const adminBannersPage = path.join(__dirname, 'app', 'admin', 'banners', 'page.js');
if (fs.existsSync(adminBannersPage)) {
  let content = fs.readFileSync(adminBannersPage, 'utf8');
  content = content.replace(
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
  fs.writeFileSync(adminBannersPage, content, 'utf8');
  console.log('Updated', adminBannersPage);
}
