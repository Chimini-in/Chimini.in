const fs = require('fs');
const path = require('path');

const newFetchSupabaseData = `async function fetchSupabaseData() {
  try {
    const headers = {
      'apikey': SUPABASE_KEY,
      'Authorization': \`Bearer \${SUPABASE_KEY}\`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache'
    };

    // Parallel fetch for speed with no-store cache directive (clean PostgREST URLs)
    const [settingsRes, bannersRes, productsRes, categoriesRes, testimonialsRes, pagesRes] = await Promise.all([
      fetch(\`\${SUPABASE_URL}/rest/v1/settings?select=*\`, { headers, cache: 'no-store' }),
      fetch(\`\${SUPABASE_URL}/rest/v1/banners?select=*&is_published=eq.true&order=sort_order.asc\`, { headers, cache: 'no-store' }),
      fetch(\`\${SUPABASE_URL}/rest/v1/products?select=*,categories(title)&is_published=eq.true&order=sort_order.asc\`, { headers, cache: 'no-store' }),
      fetch(\`\${SUPABASE_URL}/rest/v1/categories?select=*&order=sort_order.asc\`, { headers, cache: 'no-store' }),
      fetch(\`\${SUPABASE_URL}/rest/v1/testimonials?select=*&is_published=eq.true&order=sort_order.asc\`, { headers, cache: 'no-store' }),
      fetch(\`\${SUPABASE_URL}/rest/v1/page_content?select=*\`, { headers, cache: 'no-store' })
    ]);

    const [settings, banners, products, categories, testimonials, pages] = await Promise.all([
      settingsRes.json(), bannersRes.json(), productsRes.json(), categoriesRes.json(), testimonialsRes.json(), pagesRes.json()
    ]);

    // Store raw banners array directly on storeState
    if (Array.isArray(banners)) {
      storeState.banners = banners;
    }

    // Map to legacy DEFAULT_SETTINGS format for compatibility
    const newSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

    // Map Announcements
    if (Array.isArray(settings)) {
      const announcementSetting = settings.find(s => s.setting_key === 'announcements');
      if (announcementSetting && announcementSetting.setting_value) {
        const arr = Array.isArray(announcementSetting.setting_value) 
          ? announcementSetting.setting_value 
          : (typeof announcementSetting.setting_value === 'string' ? JSON.parse(announcementSetting.setting_value) : [announcementSetting.setting_value]);
        if (arr.length > 0) newSettings.announcementText = arr.join(' • ');
      }

      // Map Gifts Page Config live from Supabase
      const giftsSetting = settings.find(s => s.setting_key === 'gifts_page_config');
      if (giftsSetting && giftsSetting.setting_value) {
        newSettings.giftsConfig = typeof giftsSetting.setting_value === 'string'
          ? JSON.parse(giftsSetting.setting_value)
          : giftsSetting.setting_value;
      }
    }

    // Map Hero Banner
    if (Array.isArray(banners)) {
      const heroBanner = banners.find(b => b.section_id === 'home_hero' || b.section_id === 'hero');
      if (heroBanner) {
        newSettings.heroBanner = {
          title: heroBanner.title_overlay || '',
          subtitle: heroBanner.subtitle_overlay || '',
          image: heroBanner.image_url,
          link: heroBanner.link_url || '#',
          buttonText: heroBanner.button_text || 'Shop Now'
        };
      }
    }

    // Map Products
    if (products && Array.isArray(products) && products.length > 0) {
      newSettings.products = products.map(p => ({
        id: p.id,
        name: p.title,
        price: p.price,
        originalPrice: null,
        badge: p.badges,
        image: p.image_url,
        secondaryImage: p.image_url,
        category: p.categories?.title?.toLowerCase() || p.category || 'all',
        fragrance: p.fragrance
      }));
    }

    // Map Categories
    if (categories && Array.isArray(categories) && categories.length > 0) {
      newSettings.categories = categories.map(c => ({
        id: c.id,
        name: c.title,
        image: c.image_url || 'assets/product_jasmine.png'
      }));
    }

    // Map Testimonials
    if (testimonials && Array.isArray(testimonials) && testimonials.length > 0) {
      newSettings.testimonials = testimonials.map(t => ({
        id: t.id,
        rating: t.rating || 5,
        text: t.content,
        author: t.author,
        designation: t.city,
        caption: t.caption,
        theme: t.theme || 'gold'
      }));
    }

    // Map Pages
    newSettings.pages = {};
    if (pages && Array.isArray(pages) && pages.length > 0) {
      pages.forEach(p => {
        if (p.content && p.content.html) {
          newSettings.pages[p.page_name] = p.content.html;
        }
      });
    }

    // Overwrite global store
    storeState.adminSettings = newSettings;
    
  } catch (err) {
    console.error("Failed to load live Supabase data. Falling back to local data.", err);
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

  // Replace fetchSupabaseData function
  content = content.replace(/async function fetchSupabaseData\(\) \{[\s\S]*?\n\}/m, newFetchSupabaseData);

  fs.writeFileSync(jsFile, content, 'utf8');
  console.log('Updated fetchSupabaseData in', jsFile);
}
