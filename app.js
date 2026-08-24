/* ==========================================================================
   CHIMINI LUXURY ECOMMERCE JAVASCRIPT
   ========================================================================== */

// --- 1. DEFAULT LUXURY CONTENT (MOCK DATA) ---
const DEFAULT_SETTINGS = {
  announcementText: "Complimentary shipping on orders over ₹100 • Use code LUXE15 for 15% off",
  heroBanner: {
    image: "assets/hero_banner_1.png",
    link: "#best-sellers"
  },
  products: [
    {
      id: "prod-1",
      name: "Jasmine & Oakwood",
      price: 28.00,
      originalPrice: 38.00,
      badge: null,
      image: "assets/product_jasmine.png",
      secondaryImage: "assets/product_sandalwood.png",
      images: [
        "assets/product_jasmine.png",
        "assets/product_sandalwood.png",
        "assets/product_rose.png",
        "assets/product_fig.png"
      ],
      category: "candles",
      categoryTitle: "Artisanal Candles",
      fragrance: "Night-blooming Jasmine, Smoked Oakwood, Amber Resin",
      description: "An intoxicating blend of night-blooming white jasmine layered over smoky aged oakwood and warm amber crystals. Hand-poured with pure botanical soy wax and braided cotton wicks for a clean, soot-free burn that gently permeates your sanctuary with tranquility.",
      careInfo: "• Trim wick to 1/4 inch (6mm) before every burn.\n• On first light, allow the melt pool to reach the full diameter of the vessel (2-3 hours) to prevent tunneling.\n• Do not burn for more than 4 consecutive hours.\n• Keep away from drafts, flammable items, children, and pets.",
      shippingInfo: "• Complimentary Luxury Shipping on orders over ₹100.\n• Dispatched within 24-48 business hours with live SMS & email tracking.\n• Securely encased in our signature gold-embossed ivory gift box.",
      returnsInfo: "• 7-Day Complimentary Returns on unburned, sealed items in original luxury packaging.\n• Contact concierge@chimini.com or WhatsApp +91 97418 55293 for instant concierge support.",
      rating: 4.9,
      reviewCount: 142
    },
    {
      id: "prod-2",
      name: "Sandalwood & Amber",
      price: 32.00,
      originalPrice: null,
      badge: null,
      image: "assets/product_sandalwood.png",
      secondaryImage: "assets/product_jasmine.png",
      images: [
        "assets/product_sandalwood.png",
        "assets/product_jasmine.png",
        "assets/product_rose.png",
        "assets/product_fig.png"
      ],
      category: "candles",
      categoryTitle: "Artisanal Candles",
      fragrance: "Mysore Sandalwood, Golden Amber, Cardamom Pods",
      description: "Warm, sacred Mysore sandalwood balanced with rich golden amber and crushed cardamom spice. Designed to create a grounding meditative atmosphere in living rooms, studies, and sacred corners.",
      careInfo: "• Trim wick to 1/4 inch before each light.\n• Allow wax to melt to edges on initial burn (2-3 hours).\n• Keep burning surface level and heat-resistant.",
      shippingInfo: "• Free shipping on orders above ₹100.\n• Dispatched within 24-48 hours with full tracking.\n• Luxury packaging suitable for immediate gifting.",
      returnsInfo: "• 7-day hassle-free returns for unused candles in original condition.",
      rating: 4.8,
      reviewCount: 96
    },
    {
      id: "prod-3",
      name: "Velvet Rose & Oud",
      price: 34.00,
      originalPrice: 48.00,
      badge: null,
      image: "assets/product_rose.png",
      secondaryImage: "assets/product_fig.png",
      images: [
        "assets/product_rose.png",
        "assets/product_fig.png",
        "assets/product_jasmine.png",
        "assets/product_sandalwood.png"
      ],
      category: "candles",
      categoryTitle: "Signature Editions",
      fragrance: "Damask Rose Petals, Smoky Dark Oud, Clove",
      description: "A decadent, velvety floral aroma infused with deep, smoky agarwood (oud) and a hint of warm clove. An opulent signature statement piece handcrafted for luxurious evenings and intimate dinner settings.",
      careInfo: "• Trim cotton wick to 1/4 inch prior to every use.\n• Keep wax pool free of debris.\n• Discontinue use when 1/2 inch of wax remains.",
      shippingInfo: "• Complimentary shipping on orders above ₹100.\n• Dispatched in 24-48 hours in luxury embossed packaging.",
      returnsInfo: "• 7-day return policy for unused, unopened candles.",
      rating: 5.0,
      reviewCount: 168
    },
    {
      id: "prod-4",
      name: "Wild Fig & Honey",
      price: 29.00,
      originalPrice: null,
      badge: null,
      image: "assets/product_fig.png",
      secondaryImage: "assets/product_rose.png",
      images: [
        "assets/product_fig.png",
        "assets/product_rose.png",
        "assets/product_sandalwood.png",
        "assets/product_jasmine.png"
      ],
      category: "candles",
      categoryTitle: "Botanical Soy",
      fragrance: "Sun-ripened Fig, Wild Acacia Honey, Green Cedar",
      description: "Lush green fig leaves, sun-drenched Mediterranean fig flesh, and golden acacia honey layered over crushed cedarwood. Fresh, sweet, and uplifting — the perfect daytime companion for living spaces.",
      careInfo: "• Trim wick to 1/4 inch before lighting.\n• Ensure even melt pool on first burn.\n• Never leave unattended while lit.",
      shippingInfo: "• Complimentary luxury shipping over ₹100 threshold.\n• Handcrafted and dispatched within 24-48 business hours.",
      returnsInfo: "• 7-day complimentary return policy on all eligible items.",
      rating: 4.9,
      reviewCount: 114
    }
  ],
  categories: [
    { id: "cat-rose", name: "Rose", image: "assets/product_rose.png" },
    { id: "cat-jasmine", name: "Jasmine", image: "assets/product_jasmine.png" },
    { id: "cat-sandalwood", name: "Sandalwood", image: "assets/product_sandalwood.png" },
    { id: "cat-citrus", name: "Citrus", image: "assets/product_fig.png" },
    { id: "cat-honey", name: "Honey", image: "assets/product_jasmine.png" }
  ],
  collections: [
    { id: "coll-festive", name: "Festive Collection", image: "assets/campaign_banner.png", link: "#best-sellers" },
    { id: "coll-hampers", name: "Gift Hampers", image: "assets/promo_banner.png", link: "#best-sellers" },
    { id: "coll-artisan", name: "Artisan Collection", image: "assets/hero_banner_1.png", link: "#best-sellers" },
    { id: "coll-eco", name: "Eco Collection", image: "assets/campaign_banner.png", link: "#best-sellers" }
  ],
  adsBanner1: {
    image: "assets/promo_banner.png",
    link: "#best-sellers"
  },
  adsBanner2: {
    image: "assets/campaign_banner.png",
    link: "#best-sellers"
  },
  storyBanner: {
    image: "assets/story_banner.png",
    link: "#brand-story-banner"
  },
  about: {
    title: "A Quest for Olfactory Purity",
    desc1: "CHIMINI was born out of a desire to create clean-burning home scent products that elevate daily spaces without compromising on health or ecological sustainability. Frustrated by chemical soot and synthetic fragrances, we spent years testing natural botanical waxes and organic essential oil profiles.",
    desc2: "We choose to focus strictly on pure soy, botanical oils, and natural cotton wicks. The result is a slow, soot-free burn that gently releases complex scent notes throughout your room.",
    image1: "assets/story_banner.png",
    image2: "assets/hero_banner_1.png"
  },
  contact: {
    email: "chiminiofficial@gmail.com",
    phone: "+91 97418 55293, +91 96320 90645",
    address: "Mangalore, Karnataka"
  },
  testimonials: [
    {
      id: "test-1",
      rating: 5,
      text: "Gifted the Jasmine & Sandalwood hamper to my mother on Diwali — she adored it. The packaging felt like unwrapping art. CHIMINI is my go-to for every festive occasion.",
      author: "Priya Sharma",
      designation: "Mumbai, Maharashtra",
      caption: "Client photo · Diwali gift unboxing",
      theme: "gold"
    },
    {
      id: "test-2",
      rating: 5,
      text: "The Rose & Oud candle transformed my living space entirely. I light it every evening and it instantly feels like a luxury retreat. A brand that truly gets Indian homes.",
      author: "Arjun Mehta",
      designation: "Bengaluru, Karnataka",
      caption: "Client photo · Rose & Oud shelfie",
      theme: "teal"
    },
    {
      id: "test-3",
      rating: 5,
      text: "Ordered the corporate gift set for my team of 20 — every single person loved it. The eco-friendly packaging and the scents made me look like the best manager ever!",
      author: "Neha Kapoor",
      designation: "Delhi, NCR",
      caption: "Client photo · Corporate gifting moment",
      theme: "coral"
    }
  ]
};

// --- 2. APPLICATION STATE ---
let cachedAdminSettings = null;
let cachedBanners = null;
let cachedCollections = null;
try {
  const s = localStorage.getItem("chimini_admin_settings");
  if (s) cachedAdminSettings = JSON.parse(s);
  const b = localStorage.getItem("chimini_banners");
  if (b) cachedBanners = JSON.parse(b);
  const c = localStorage.getItem("chimini_collections");
  if (c) cachedCollections = JSON.parse(c);
} catch (e) { }

let storeState = {
  cart: JSON.parse(localStorage.getItem("chimini_cart")) || [],
  wishlist: JSON.parse(localStorage.getItem("chimini_wishlist")) || [],
  searchQuery: "",
  activeCategory: "all",
  activeFragrance: null,
  currentUser: null,
  pendingCheckout: false,
  otpEmail: "",
  currentTestimonialIndex: 0,
  adminSettings: cachedAdminSettings || JSON.parse(JSON.stringify(DEFAULT_SETTINGS)),
  banners: cachedBanners || [],
  collections: cachedCollections || [],
  shopLayout: "grid-3",
  shopSort: "default",
  priceMin: null,
  priceMax: null
};

// Autoplay intervals
let testimonialInterval;

// --- 3. DOM ELEMENT REFERENCES ---
const DOM = {
  announcementBar: document.getElementById("announcement-bar"),
  announcementText: document.getElementById("announcement-text"),
  mainHeader: document.getElementById("main-header"),
  searchInput: document.getElementById("search-input"),
  cartBtn: document.getElementById("cart-btn"),
  cartCount: document.getElementById("cart-count"),
  wishlistBtn: document.getElementById("wishlist-btn"),
  wishlistCount: document.getElementById("wishlist-count"),
  navLinks: document.querySelectorAll(".nav-links a"),

  heroBanner: document.getElementById("hero-banner"),

  bestSellersGrid: document.getElementById("best-sellers-grid"),
  viewAllProductsBtn: document.getElementById("view-all-products"),

  categoriesList: document.getElementById("categories-list"),
  collectionsGrid: document.getElementById("collections-grid"),

  productsAdsBanner1: document.getElementById("products-ads-banner-1"),
  productsAdsBanner2: document.getElementById("products-ads-banner-2"),
  brandStoryBanner: document.getElementById("brand-story-banner"),

  testimonialsTrack: document.getElementById("testimonials-track"),
  testimonialsDots: document.getElementById("testimonials-dots"),

  drawerOverlay: document.getElementById("drawer-overlay"),
  cartDrawer: document.getElementById("cart-drawer"),
  cartItemsContainer: document.getElementById("cart-items-container"),
  cartSubtotal: document.getElementById("cart-subtotal"),
  closeCartBtn: document.getElementById("close-cart-btn"),
  checkoutBtn: document.getElementById("checkout-btn"),

  wishlistDrawer: document.getElementById("wishlist-drawer"),
  wishlistItemsContainer: document.getElementById("wishlist-items-container"),
  closeWishlistBtn: document.getElementById("close-wishlist-btn"),

  adminDrawer: document.getElementById("admin-drawer"),
  adminToggleBtn: document.getElementById("admin-toggle-btn"),
  closeAdminBtn: document.getElementById("close-admin-btn"),
  adminSaveBtn: document.getElementById("admin-save-btn"),
  adminResetBtn: document.getElementById("admin-reset-btn"),

  toast: document.getElementById("toast")
};

// --- 4. RENDERERS & LAYOUT BUILDERS ---

// A. Announcement Bar (Auto-rotating 2-second slider, single line)
let announcementInterval = null;
let currentAnnouncementIndex = 0;

function getAnnouncementList() {
  const settings = storeState.adminSettings || {};
  if (Array.isArray(settings.announcements) && settings.announcements.length > 0) {
    return settings.announcements.map(s => String(s).trim()).filter(Boolean);
  }
  const text = settings.announcementText || "";
  if (text.includes("•")) {
    return text.split("•").map(s => s.trim()).filter(Boolean);
  }
  if (text.includes("\n")) {
    return text.split("\n").map(s => s.trim()).filter(Boolean);
  }
  if (text.trim()) {
    return [text.trim()];
  }
  return ["Complimentary shipping on orders over ₹100 • Use code LUXE15 for 15% off"];
}

function renderAnnouncement() {
  const el = DOM.announcementText || document.getElementById("announcement-text");
  if (!el) return;

  const list = getAnnouncementList();
  if (list.length === 0) return;

  if (announcementInterval) {
    clearInterval(announcementInterval);
    announcementInterval = null;
  }

  currentAnnouncementIndex = 0;
  el.textContent = list[0];
  el.style.opacity = "1";
  el.style.transform = "translateY(0)";
  el.style.transition = "transform 0.4s ease, opacity 0.4s ease";

  // Cycle continuously through all announcements every 2 seconds
  if (list.length > 1) {
    announcementInterval = setInterval(() => {
      el.style.transition = "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease";
      el.style.transform = "translateY(-100%)";
      el.style.opacity = "0";

      setTimeout(() => {
        currentAnnouncementIndex = (currentAnnouncementIndex + 1) % list.length;
        el.textContent = list[currentAnnouncementIndex];
        el.style.transition = "none";
        el.style.transform = "translateY(100%)";

        void el.offsetWidth; // Force layout reflow
        el.style.transition = "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.35s ease";
        el.style.transform = "translateY(0)";
        el.style.opacity = "1";
      }, 350);
    }, 2000);
  }
}

// B. Hero Slides Carousel
// B. Hero Banner (Single)
function renderHeroBanner() {
  if (!DOM.heroBanner) return;
  const hero = storeState.adminSettings.heroBanner;
  DOM.heroBanner.innerHTML = `
    <a href="${hero.link || '#'}">
      <img src="${hero.image}" alt="CHIMINI Luxury Candles Banner" onerror="this.src='assets/hero_banner_1.png'">
    </a>
  `;
}

function startHeroAutoplay() { }
function stopHeroAutoplay() { }

// C. Best Sellers Grid
let showAllProducts = false;
function renderBestSellers() {
  if (!DOM.bestSellersGrid) return;
  DOM.bestSellersGrid.innerHTML = "";

  let products = storeState.adminSettings.products;

  // Apply Search Filter
  if (storeState.searchQuery.trim() !== "") {
    const q = storeState.searchQuery.toLowerCase();
    products = products.filter(p => p.name.toLowerCase().includes(q) || (p.category && p.category.toLowerCase().includes(q)));
  }

  // Apply Category Filter
  if (storeState.activeCategory !== "all") {
    products = products.filter(p => p.category === storeState.activeCategory);
  }

  if (products.length === 0) {
    DOM.bestSellersGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--text-secondary); font-family: var(--font-serif); font-size: 1.2rem;">No products found.</div>`;
    return;
  }

  // Limit count unless "View All" is toggled
  const displayedProducts = showAllProducts ? products : products.slice(0, 4);

  displayedProducts.forEach(product => {
    const isWishlisted = storeState.wishlist.includes(product.id);

    const card = document.createElement("div");
    card.className = "product-card animate-slide-up";
    card.innerHTML = `
      <a href="/product?id=${product.id}" class="product-image-wrapper" style="display:block; text-decoration:none;">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/product_jasmine.png'">
        <button class="wishlist-toggle-btn ${isWishlisted ? "active" : ""}" data-id="${product.id}" aria-label="Add to Wishlist">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
      </a>
      <div class="product-info">
        <a href="/product?id=${product.id}" style="text-decoration:none; color:inherit;"><h3 class="product-name">${product.name}</h3></a>
        <p class="product-price">₹${Number(product.price).toFixed(2)}</p>
        <button class="btn btn-primary product-card-btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    `;

    // Bind button events
    card.querySelector(".wishlist-toggle-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      toggleWishlist(product.id);
    });
    card.querySelector(".add-to-cart-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(product.id);
    });

    DOM.bestSellersGrid.appendChild(card);
  });

  // Hide/Show View All Button
  if (products.length <= 4) {
    DOM.viewAllProductsBtn.style.display = "none";
  } else {
    DOM.viewAllProductsBtn.style.display = "inline-flex";
    DOM.viewAllProductsBtn.textContent = showAllProducts ? "Show Less" : "View All Products";
  }
}

// D. Shop by Fragrance / Category
function renderFragranceCategories() {
  if (!DOM.categoriesList) return;
  DOM.categoriesList.innerHTML = "";

  const cats = (storeState.adminSettings.categories || []).filter(c => c.is_published !== false || c.published !== false);
  if (cats.length === 0) return;

  cats.forEach(cat => {
    const item = document.createElement("div");
    item.className = "category-item";
    const slug = cat.slug || (cat.name || cat.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const name = cat.name || cat.title || 'Fragrance';
    const image = cat.image || cat.image_url || 'assets/product_jasmine.png';

    item.innerHTML = `
      <div class="category-circle-wrapper">
        <img src="${image}" alt="${name}" onerror="this.src='assets/product_jasmine.png'">
      </div>
      <span class="category-title">${name}</span>
    `;
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const cleanSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const isHtmlExt = window.location.pathname.endsWith('.html');
      const shopUrl = (isHtmlExt ? 'shop.html' : '/shop') + '?fragrance=' + encodeURIComponent(cleanSlug);

      const shopContainer = document.getElementById("shop-page-container");
      if (shopContainer && shopContainer.offsetParent !== null) {
        storeState.activeFragrance = cleanSlug;
        storeState.activeCategory = "all";
        storeState.searchQuery = "";
        if (DOM.searchInput) DOM.searchInput.value = "";
        renderShopProducts();
        shopContainer.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = shopUrl;
      }
    });
    DOM.categoriesList.appendChild(item);
  });
}

// E. Featured Collections Grid
function renderFeaturedCollections() {
  if (!DOM.collectionsGrid) return;
  DOM.collectionsGrid.innerHTML = "";

  const rawList = (storeState.collections && storeState.collections.length > 0)
    ? storeState.collections
    : ((storeState.adminSettings && storeState.adminSettings.collections) || []);

  // Filter for collections explicitly marked as featured for the homepage
  let featuredColls = rawList.filter(c => c.is_published !== false && (c.is_featured === true || c.is_featured === 'true'));

  // Fallback: If no collections are explicitly marked as featured, show the first 4 published collections
  if (featuredColls.length === 0) {
    featuredColls = rawList.filter(c => c.is_published !== false).slice(0, 4);
  } else {
    featuredColls = featuredColls.slice(0, 4);
  }

  featuredColls.forEach(coll => {
    const card = document.createElement("div");
    card.className = "collection-card";
    const name = coll.title || coll.name || "Collection";
    const image = coll.image_url || coll.image || "assets/campaign_banner.png";
    const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const isHtmlExt = window.location.pathname.endsWith('.html');
    const defaultCategoryLink = (isHtmlExt ? 'shop.html' : '/shop') + '?category=' + encodeURIComponent(slug);

    let targetLink = defaultCategoryLink;
    if (coll.link_url && !coll.link_url.startsWith('#') && coll.link_url !== '/shop' && coll.link_url !== '/shop?category=all' && coll.link_url !== 'shop.html' && coll.link_url !== 'shop.html?category=all') {
      targetLink = coll.link_url;
    } else if (coll.link && !coll.link.startsWith('#') && coll.link !== '/shop' && coll.link !== '/shop?category=all' && coll.link !== 'shop.html' && coll.link !== 'shop.html?category=all') {
      targetLink = coll.link;
    }

    card.innerHTML = `
      <img src="${image}" alt="${name}" onerror="this.src='assets/campaign_banner.png'">
      <div class="collection-overlay">
        <span class="collection-title-overlay">${name}</span>
      </div>
    `;
    card.addEventListener("click", () => {
      if (targetLink && targetLink.startsWith('#')) {
        storeState.activeCategory = "all";
        storeState.searchQuery = name;
        if (DOM.searchInput) DOM.searchInput.value = name;
        renderBestSellers();
        document.getElementById("best-sellers").scrollIntoView({ behavior: "smooth" });
      } else if (targetLink) {
        window.location.href = targetLink;
      }
    });
    DOM.collectionsGrid.appendChild(card);
  });
}

function renderMarketingBanners() {
  // 1. Hero Banner
  if (DOM.heroBanner) {
    const html = renderBannerSlot('home_hero');
    if (html) {
      DOM.heroBanner.innerHTML = html;
    } else {
      // Default fallback
      const hero = storeState.adminSettings.heroBanner || {};
      if (hero.image) {
        DOM.heroBanner.innerHTML = `<a href="${hero.link || '#'}" class="banner-slot-link">
          <img src="${hero.image}" alt="Hero Banner" class="banner-slot-img" onerror="this.parentElement.style.display='none'">
        </a>`;
      }
    }
  }

  // 2. Ads Banner 1
  if (DOM.productsAdsBanner1) {
    const html = renderBannerSlot('home_ads_1');
    DOM.productsAdsBanner1.innerHTML = html || (() => {
      const ad = storeState.adminSettings.adsBanner1 || {};
      return ad.image ? `<a href="${ad.link || '#'}" class="banner-slot-link"><img src="${ad.image}" class="banner-slot-img" onerror="this.parentElement.style.display='none'"></a>` : '';
    })();
  }

  // 3. Ads Banner 2
  if (DOM.productsAdsBanner2) {
    const html = renderBannerSlot('home_ads_2');
    DOM.productsAdsBanner2.innerHTML = html || (() => {
      const ad = storeState.adminSettings.adsBanner2 || {};
      return ad.image ? `<a href="${ad.link || '#'}" class="banner-slot-link"><img src="${ad.image}" class="banner-slot-img" onerror="this.parentElement.style.display='none'"></a>` : '';
    })();
  }

  // 4. Brand Story Banner
  if (DOM.brandStoryBanner) {
    const html = renderBannerSlot('home_brand_story');
    DOM.brandStoryBanner.innerHTML = html || (() => {
      const story = storeState.adminSettings.storyBanner || {};
      return story.image ? `<a href="${story.link || '#'}" class="banner-slot-link"><img src="${story.image}" class="banner-slot-img" onerror="this.parentElement.style.display='none'"></a>` : '';
    })();
  }
}

// G. Customer Testimonials — 3-Card Grid Layout
function renderTestimonials() {
  const section = document.getElementById('testimonials');
  if (!section) return;

  const tests = storeState.adminSettings.testimonials || [];
  const displayTests = tests.slice(0, 4); // Get first 4
  if (displayTests.length === 0) return;

  // Build the structure
  section.innerHTML = `
    <div class="testimonials-grid-section">
      <!-- Section Header -->
      <div class="tg-header">
        <div class="tg-eyebrow">✦ REAL STORIES ✦</div>
        <h2 class="tg-heading">Loved by <span class="tg-heading-italic">every home</span></h2>
        <p class="tg-subheading">From gifting moments to everyday rituals — here's what our community says.</p>
      </div>

      <!-- Grid Container -->
      <div class="tg-grid">
        ${displayTests.map((t) => {
    const theme = t.theme || 'gold';
    const initial = t.author ? t.author.charAt(0) : '';

    return `
            <div class="tg-card card-${theme}">
              <!-- Top Accent Bar -->
              <div class="tg-card-accent-bar"></div>
              
              <!-- Client Photo Zone -->
              <div class="tg-photo-zone">
                <div class="tg-camera-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </div>
                <div class="tg-photo-name">${t.author}</div>
                <div class="tg-photo-caption">${t.caption || ''}</div>
                <button class="tg-upload-btn">+ Upload photo</button>
              </div>

              <!-- Review Zone -->
              <div class="tg-review-zone">
                <div class="tg-avatar-row">
                  <div class="tg-avatar">${initial}</div>
                  <div class="tg-avatar-text">
                    <div class="tg-avatar-name">${t.author}</div>
                    <div class="tg-avatar-city">${t.designation || ''}</div>
                  </div>
                </div>

                <div class="tg-stars">
                  ${buildStars(t.rating)}
                </div>
                
                <div class="tg-divider-line"></div>
                
                <div class="tg-quote-mark">"</div>
                
                <blockquote class="tg-review-text">
                  ${t.text}
                </blockquote>
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `;
}

function buildStars(rating) {
  let html = '';
  for (let i = 0; i < 5; i++) {
    html += `<svg class="et-star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="${i < rating ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
  }
  return html;
}

function setTestimonialSlide(index) {
  // No-op kept for compatibility — logic is now self-contained in renderTestimonials
}

function startTestimonialsAutoplay() {
  // No-op — autoplay started inside renderTestimonials
}

function stopTestimonialsAutoplay() {
  if (testimonialInterval) clearInterval(testimonialInterval);
}

// --- 5. SHOPPING CART & WISHLIST DRAWERS ---

function renderCart() {
  if (!DOM.cartItemsContainer) return;
  DOM.cartItemsContainer.innerHTML = "";

  const cart = storeState.cart;
  let subtotal = 0;

  if (cart.length === 0) {
    DOM.cartItemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <p>Your shopping cart is empty.</p>
        <button class="btn btn-secondary btn-sm" style="margin-top: 15px;" id="cart-start-shopping">Start Shopping</button>
      </div>
    `;
    const startShoppingBtn = document.getElementById("cart-start-shopping");
    if (startShoppingBtn) {
      startShoppingBtn.addEventListener("click", () => {
        closeAllDrawers();
        document.getElementById("best-sellers").scrollIntoView({ behavior: "smooth" });
      });
    }
    DOM.cartSubtotal.textContent = "?0.00";
    DOM.cartCount.textContent = "0";
    return;
  }

  let totalItemsCount = 0;

  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    totalItemsCount += item.quantity;

    const itemEl = document.createElement("div");
    itemEl.className = "cart-item";
    itemEl.innerHTML = `
      <div class="cart-item-img">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/product_jasmine.png'">
      </div>
      <div class="cart-item-details">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">₹${Number(item.price).toFixed(2)}</span>
        <div class="cart-item-quantity">
          <button class="qty-btn dec-qty" data-id="${item.id}">-</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn inc-qty" data-id="${item.id}">+</button>
        </div>
      </div>
      <span class="cart-item-remove" data-id="${item.id}">Remove</span>
    `;

    // Bind events
    itemEl.querySelector(".dec-qty").addEventListener("click", () => changeCartQty(item.id, -1));
    itemEl.querySelector(".inc-qty").addEventListener("click", () => changeCartQty(item.id, 1));
    itemEl.querySelector(".cart-item-remove").addEventListener("click", () => removeCartItem(item.id));

    DOM.cartItemsContainer.appendChild(itemEl);
  });

  DOM.cartSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
  DOM.cartCount.textContent = totalItemsCount.toString();
}

function addToCart(productId) {
  const products = storeState.adminSettings.products;
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = storeState.cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    storeState.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  // Save & update
  localStorage.setItem("chimini_cart", JSON.stringify(storeState.cart));
  renderCart();
  showToast(`Added ${product.name} to Cart`);
  openDrawer(DOM.cartDrawer);
}

function changeCartQty(productId, delta) {
  const item = storeState.cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += delta;

  if (item.quantity <= 0) {
    removeCartItem(productId);
  } else {
    localStorage.setItem("chimini_cart", JSON.stringify(storeState.cart));
    renderCart();
  }
}

function removeCartItem(productId) {
  storeState.cart = storeState.cart.filter(item => item.id !== productId);
  localStorage.setItem("chimini_cart", JSON.stringify(storeState.cart));
  renderCart();
}

// Wishlist Drawer Rendering
function renderWishlist() {
  if (!DOM.wishlistItemsContainer) return;
  DOM.wishlistItemsContainer.innerHTML = "";

  const wishlist = storeState.wishlist;
  const products = storeState.adminSettings.products;

  DOM.wishlistCount.textContent = wishlist.length.toString();

  if (wishlist.length === 0) {
    DOM.wishlistItemsContainer.innerHTML = `<p class="cart-empty-message">Your wishlist is empty.</p>`;
    return;
  }

  wishlist.forEach(id => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const itemEl = document.createElement("div");
    itemEl.className = "wishlist-item";
    itemEl.innerHTML = `
      <div class="wishlist-item-img">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/product_jasmine.png'">
      </div>
      <div class="wishlist-item-details">
        <h3 class="wishlist-item-name">${product.name}</h3>
        <span class="wishlist-item-price">₹${Number(product.price).toFixed(2)}</span>
        <div class="wishlist-item-actions">
          <span class="wishlist-add-to-cart" data-id="${product.id}">Add to Cart</span>
          <span class="wishlist-remove" data-id="${product.id}">Remove</span>
        </div>
      </div>
    `;

    // Bind actions
    itemEl.querySelector(".wishlist-add-to-cart").addEventListener("click", () => {
      addToCart(product.id);
      toggleWishlist(product.id); // Remove from wishlist on adding to cart
    });
    itemEl.querySelector(".wishlist-remove").addEventListener("click", () => {
      toggleWishlist(product.id);
    });

    DOM.wishlistItemsContainer.appendChild(itemEl);
  });
}

function toggleWishlist(productId) {
  const index = storeState.wishlist.indexOf(productId);
  const products = storeState.adminSettings.products;
  const product = products.find(p => p.id === productId);
  if (!product) return;

  if (index > -1) {
    storeState.wishlist.splice(index, 1);
    showToast(`Removed from Wishlist`);
  } else {
    storeState.wishlist.push(productId);
    showToast(`Saved to Wishlist`);
  }

  localStorage.setItem("chimini_wishlist", JSON.stringify(storeState.wishlist));
  renderWishlist();
  renderBestSellers(); // Re-render to update card heart state
}

// Drawer Open/Close utilities
function openDrawer(drawerElement) {
  if (!drawerElement) return;
  closeAllDrawers();
  drawerElement.classList.add("active");
  drawerElement.setAttribute("aria-hidden", "false");
  const overlay = DOM.drawerOverlay || document.getElementById("drawer-overlay");
  if (overlay) overlay.classList.add("active");
  document.body.style.overflow = "hidden"; // disable body scrolling
}

function closeAllDrawers() {
  const cart = DOM.cartDrawer || document.getElementById("cart-drawer");
  if (cart) {
    cart.classList.remove("active");
    cart.setAttribute("aria-hidden", "true");
  }
  const wish = DOM.wishlistDrawer || document.getElementById("wishlist-drawer");
  if (wish) {
    wish.classList.remove("active");
    wish.setAttribute("aria-hidden", "true");
  }
  const admin = DOM.adminDrawer || document.getElementById("admin-drawer");
  if (admin) {
    admin.classList.remove("active");
    admin.setAttribute("aria-hidden", "true");
  }
  const filterDrawer = document.getElementById("filter-drawer");
  if (filterDrawer) {
    filterDrawer.classList.remove("active");
    filterDrawer.setAttribute("aria-hidden", "true");
  }
  const authModal = document.getElementById("auth-modal");
  if (authModal) {
    authModal.classList.remove("active");
    authModal.setAttribute("aria-hidden", "true");
  }
  const overlay = DOM.drawerOverlay || document.getElementById("drawer-overlay");
  if (overlay) {
    overlay.classList.remove("active");
  }
  document.body.style.overflow = "";
}

// Toast notification helper
function showToast(message) {
  if (!DOM.toast) return;
  DOM.toast.textContent = message;
  DOM.toast.classList.add("show");
  setTimeout(() => {
    DOM.toast.classList.remove("show");
  }, 2500);
}

// --- 6. ADMIN CUSTOMIZER PANEL (LIVE EDITING PANEL) ---

function initAdminFields() {
  const settings = storeState.adminSettings;

  // Set direct fields
  const annInput = document.getElementById("admin-announcement");
  if (annInput) annInput.value = settings.announcementText;

  const heroUrl = document.getElementById("admin-hero-banner-url");
  const heroLink = document.getElementById("admin-hero-banner-link");
  if (heroUrl) heroUrl.value = settings.heroBanner.image;
  if (heroLink) heroLink.value = settings.heroBanner.link;

  const ad1Url = document.getElementById("admin-ads-banner-1-url");
  const ad1Link = document.getElementById("admin-ads-banner-1-link");
  if (ad1Url) ad1Url.value = settings.adsBanner1.image;
  if (ad1Link) ad1Link.value = settings.adsBanner1.link;

  const ad2Url = document.getElementById("admin-ads-banner-2-url");
  const ad2Link = document.getElementById("admin-ads-banner-2-link");
  if (ad2Url) ad2Url.value = settings.adsBanner2.image;
  if (ad2Link) ad2Link.value = settings.adsBanner2.link;

  const storyUrl = document.getElementById("admin-brand-story-banner-url");
  const storyLink = document.getElementById("admin-brand-story-banner-link");
  if (storyUrl) storyUrl.value = settings.storyBanner.image;
  if (storyLink) storyLink.value = settings.storyBanner.link;

  // Set About Us fields
  const aboutTitle = document.getElementById("admin-about-title");
  const aboutDesc1 = document.getElementById("admin-about-desc1");
  const aboutDesc2 = document.getElementById("admin-about-desc2");
  const aboutImg1 = document.getElementById("admin-about-img1");
  const aboutImg2 = document.getElementById("admin-about-img2");
  if (settings.about) {
    if (aboutTitle) aboutTitle.value = settings.about.title || "";
    if (aboutDesc1) aboutDesc1.value = settings.about.desc1 || "";
    if (aboutDesc2) aboutDesc2.value = settings.about.desc2 || "";
    if (aboutImg1) aboutImg1.value = settings.about.image1 || "";
    if (aboutImg2) aboutImg2.value = settings.about.image2 || "";
  }

  // Set Contact Us fields
  const contactEmail = document.getElementById("admin-contact-email");
  const contactPhone = document.getElementById("admin-contact-phone");
  const contactAddress = document.getElementById("admin-contact-address");
  if (settings.contact) {
    if (contactEmail) contactEmail.value = settings.contact.email || "";
    if (contactPhone) contactPhone.value = settings.contact.phone || "";
    if (contactAddress) contactAddress.value = settings.contact.address || "";
  }

  // Render sub-lists
  renderAdminProductsList();
  renderAdminCategoriesList();
  renderAdminCollectionsList();
  renderAdminTestimonialsList();

  // Hook file upload conversion elements
  setupAdminImageUploads();
}

// File Reader -> Base64 helper
function setupAdminImageUploads() {
  const fileHooks = [
    { fileId: "admin-hero-banner-file", textId: "admin-hero-banner-url" },
    { fileId: "admin-ads-banner-1-file", textId: "admin-ads-banner-1-url" },
    { fileId: "admin-ads-banner-2-file", textId: "admin-ads-banner-2-url" },
    { fileId: "admin-brand-story-banner-file", textId: "admin-brand-story-banner-url" },
    { fileId: "admin-about-img1-file", textId: "admin-about-img1" },
    { fileId: "admin-about-img2-file", textId: "admin-about-img2" }
  ];

  fileHooks.forEach(hook => {
    const fileEl = document.getElementById(hook.fileId);
    const textEl = document.getElementById(hook.textId);

    if (fileEl && textEl) {
      // Re-bind to avoid duplicate listeners
      const newFileEl = fileEl.cloneNode(true);
      fileEl.parentNode.replaceChild(newFileEl, fileEl);

      newFileEl.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (evt) {
          textEl.value = evt.target.result; // Fill field with base64 Data URL
          showToast("Image loaded successfully!");
        };
        reader.readAsDataURL(file);
      });
    }
  });
}

// Dynamic item lists renderers for Admin Drawer

// 1. Products List
function renderAdminProductsList() {
  const container = document.getElementById("admin-products-list");
  if (!container) return;
  container.innerHTML = "";

  const products = storeState.adminSettings.products;

  products.forEach((prod, index) => {
    const card = document.createElement("div");
    card.className = "admin-card";
    card.innerHTML = `
      <div class="admin-card-header">
        <span class="admin-card-title">Product #${index + 1}</span>
        <span class="admin-card-delete delete-product" data-id="${prod.id}">Delete</span>
      </div>
      <div class="admin-form-group">
        <label>Product Name</label>
        <input type="text" class="prod-name-val" value="${prod.name}" data-index="${index}">
      </div>
      <div class="admin-form-group">
        <label>Price (₹)</label>
        <input type="number" step="0.01" class="prod-price-val" value="${prod.price}" data-index="${index}">
      </div>
      <div class="admin-form-group">
        <label>Original Price / MRP (₹) (Optional)</label>
        <input type="number" step="0.01" class="prod-orig-price-val" value="${prod.originalPrice !== null && prod.originalPrice !== undefined ? prod.originalPrice : ''}" data-index="${index}" placeholder="Leave blank if no discount">
      </div>
      <div class="admin-form-group">
        <label>Product Badge (e.g. BEST SELLER)</label>
        <input type="text" class="prod-badge-val" value="${prod.badge || ''}" data-index="${index}" placeholder="e.g. BEST SELLER">
      </div>
      <div class="admin-form-group">
        <label>Primary Image URL / Base64</label>
        <input type="text" class="prod-image-val" value="${prod.image}" data-index="${index}">
        <input type="file" class="prod-file-val admin-file-input" accept="image/*" data-index="${index}">
      </div>
      <div class="admin-form-group">
        <label>Hover Secondary Image URL / Base64</label>
        <input type="text" class="prod-secondary-image-val" value="${prod.secondaryImage || ''}" data-index="${index}">
        <input type="file" class="prod-secondary-file-val admin-file-input" accept="image/*" data-index="${index}">
      </div>
      <div class="admin-form-group">
        <label>Category Tag</label>
        <select class="prod-cat-val" data-index="${index}">
          <option value="candles" ${prod.category === 'candles' ? 'selected' : ''}>Candles</option>
          <option value="gifts" ${prod.category === 'gifts' ? 'selected' : ''}>Gifts</option>
          <option value="signature" ${prod.category === 'signature' ? 'selected' : ''}>Signature</option>
          <option value="eco" ${prod.category === 'eco' ? 'selected' : ''}>Eco</option>
        </select>
      </div>
    `;

    card.querySelector(".prod-file-val").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (evt) {
        card.querySelector(".prod-image-val").value = evt.target.result;
        showToast("Product image ready!");
      };
      reader.readAsDataURL(file);
    });

    const secFileInput = card.querySelector(".prod-secondary-file-val");
    if (secFileInput) {
      secFileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (evt) {
          card.querySelector(".prod-secondary-image-val").value = evt.target.result;
          showToast("Hover image ready!");
        };
        reader.readAsDataURL(file);
      });
    }

    card.querySelector(".delete-product").addEventListener("click", () => {
      storeState.adminSettings.products = storeState.adminSettings.products.filter(p => p.id !== prod.id);
      renderAdminProductsList();
    });

    container.appendChild(card);
  });
}

// 2. Categories List
function renderAdminCategoriesList() {
  const container = document.getElementById("admin-categories-list");
  if (!container) return;
  container.innerHTML = "";

  const categories = storeState.adminSettings.categories;

  categories.forEach((cat, index) => {
    const card = document.createElement("div");
    card.className = "admin-card";
    card.innerHTML = `
      <div class="admin-card-header">
        <span class="admin-card-title">Category #${index + 1}</span>
        <span class="admin-card-delete delete-category" data-index="${index}">Delete</span>
      </div>
      <div class="admin-form-group">
        <label>Category Name</label>
        <input type="text" class="cat-name-val" value="${cat.name}" data-index="${index}">
      </div>
      <div class="admin-form-group">
        <label>Image URL / Base64</label>
        <input type="text" class="cat-image-val" value="${cat.image}" data-index="${index}">
        <input type="file" class="cat-file-val admin-file-input" accept="image/*" data-index="${index}">
      </div>
    `;

    card.querySelector(".cat-file-val").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (evt) {
        card.querySelector(".cat-image-val").value = evt.target.result;
        showToast("Category image ready!");
      };
      reader.readAsDataURL(file);
    });

    card.querySelector(".delete-category").addEventListener("click", () => {
      storeState.adminSettings.categories.splice(index, 1);
      renderAdminCategoriesList();
    });

    container.appendChild(card);
  });
}

// 3. Featured Collections List
function renderAdminCollectionsList() {
  const container = document.getElementById("admin-collections-list");
  if (!container) return;
  container.innerHTML = "";

  const collections = storeState.adminSettings.collections;

  collections.forEach((coll, index) => {
    const card = document.createElement("div");
    card.className = "admin-card";
    card.innerHTML = `
      <div class="admin-card-header">
        <span class="admin-card-title">Collection #${index + 1}</span>
        <span class="admin-card-delete delete-collection" data-index="${index}">Delete</span>
      </div>
      <div class="admin-form-group">
        <label>Collection Name</label>
        <input type="text" class="coll-name-val" value="${coll.name}" data-index="${index}">
      </div>
      <div class="admin-form-group">
        <label>Image URL / Base64 (Recommended: 1000x1000 px)</label>
        <input type="text" class="coll-image-val" value="${coll.image}" data-index="${index}">
        <input type="file" class="coll-file-val admin-file-input" accept="image/*" data-index="${index}">
      </div>
      <div class="admin-form-group">
        <label>Redirect Link</label>
        <input type="text" class="coll-link-val" value="${coll.link || ''}" data-index="${index}">
      </div>
    `;

    card.querySelector(".coll-file-val").addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (evt) {
        card.querySelector(".coll-image-val").value = evt.target.result;
        showToast("Collection image ready!");
      };
      reader.readAsDataURL(file);
    });

    card.querySelector(".delete-collection").addEventListener("click", () => {
      storeState.adminSettings.collections.splice(index, 1);
      renderAdminCollectionsList();
    });

    container.appendChild(card);
  });
}

// 4. Testimonials List
function renderAdminTestimonialsList() {
  const container = document.getElementById("admin-testimonials-list");
  if (!container) return;
  container.innerHTML = "";

  const testimonials = storeState.adminSettings.testimonials;

  testimonials.forEach((test, index) => {
    const card = document.createElement("div");
    card.className = "admin-card";
    card.innerHTML = `
      <div class="admin-card-header">
        <span class="admin-card-title">Review #${index + 1}</span>
        <span class="admin-card-delete delete-testimonial" data-index="${index}">Delete</span>
      </div>
      <div class="admin-form-group">
        <label>Review Text</label>
        <textarea rows="3" class="test-text-val" data-index="${index}">${test.text}</textarea>
      </div>
      <div class="admin-form-group">
        <label>Customer Name</label>
        <input type="text" class="test-author-val" value="${test.author}" data-index="${index}">
      </div>
      <div class="admin-form-group">
        <label>Rating (Stars)</label>
        <select class="test-rating-val" data-index="${index}">
          <option value="5" ${test.rating === 5 ? 'selected' : ''}>5 Stars</option>
          <option value="4" ${test.rating === 4 ? 'selected' : ''}>4 Stars</option>
          <option value="3" ${test.rating === 3 ? 'selected' : ''}>3 Stars</option>
        </select>
      </div>
    `;

    card.querySelector(".delete-testimonial").addEventListener("click", () => {
      storeState.adminSettings.testimonials.splice(index, 1);
      renderAdminTestimonialsList();
    });

    container.appendChild(card);
  });
}

// Save Admin Panel Settings
function saveAdminSettings() {
  const settings = storeState.adminSettings;

  // Save Announcement
  settings.announcementText = document.getElementById("admin-announcement").value;

  // Save Hero Banner
  settings.heroBanner = {
    image: document.getElementById("admin-hero-banner-url").value,
    link: document.getElementById("admin-hero-banner-link").value
  };

  // Save Ads Banner 1
  settings.adsBanner1 = {
    image: document.getElementById("admin-ads-banner-1-url").value,
    link: document.getElementById("admin-ads-banner-1-link").value
  };

  // Save Ads Banner 2
  settings.adsBanner2 = {
    image: document.getElementById("admin-ads-banner-2-url").value,
    link: document.getElementById("admin-ads-banner-2-link").value
  };

  // Save Brand Story Banner
  settings.storyBanner = {
    image: document.getElementById("admin-brand-story-banner-url").value,
    link: document.getElementById("admin-brand-story-banner-link").value
  };

  // Save About Us Page settings
  const aboutTitleInput = document.getElementById("admin-about-title");
  const aboutDesc1Input = document.getElementById("admin-about-desc1");
  const aboutDesc2Input = document.getElementById("admin-about-desc2");
  const aboutImg1Input = document.getElementById("admin-about-img1");
  const aboutImg2Input = document.getElementById("admin-about-img2");

  if (!settings.about) settings.about = {};
  if (aboutTitleInput) settings.about.title = aboutTitleInput.value;
  if (aboutDesc1Input) settings.about.desc1 = aboutDesc1Input.value;
  if (aboutDesc2Input) settings.about.desc2 = aboutDesc2Input.value;
  if (aboutImg1Input) settings.about.image1 = aboutImg1Input.value;
  if (aboutImg2Input) settings.about.image2 = aboutImg2Input.value;

  // Save Contact Us Page settings
  const contactEmailInput = document.getElementById("admin-contact-email");
  const contactPhoneInput = document.getElementById("admin-contact-phone");
  const contactAddressInput = document.getElementById("admin-contact-address");

  if (!settings.contact) settings.contact = {};
  if (contactEmailInput) settings.contact.email = contactEmailInput.value;
  if (contactPhoneInput) settings.contact.phone = contactPhoneInput.value;
  if (contactAddressInput) settings.contact.address = contactAddressInput.value;

  // Save Products List
  const prodCards = document.querySelectorAll("#admin-products-list .admin-card");
  const updatedProducts = [];
  prodCards.forEach(card => {
    const name = card.querySelector(".prod-name-val").value;
    const price = parseFloat(card.querySelector(".prod-price-val").value) || 0.00;
    const origPriceVal = card.querySelector(".prod-orig-price-val").value.trim();
    const originalPrice = origPriceVal !== "" ? parseFloat(origPriceVal) : null;
    const badge = card.querySelector(".prod-badge-val").value.trim();
    const image = card.querySelector(".prod-image-val").value;
    const secondaryImage = card.querySelector(".prod-secondary-image-val").value;
    const category = card.querySelector(".prod-cat-val").value;
    const id = card.querySelector(".delete-product").getAttribute("data-id");

    if (name.trim() !== "") {
      updatedProducts.push({
        id: id || `prod-${Math.random()}`,
        name,
        price,
        originalPrice,
        badge,
        image,
        secondaryImage,
        category
      });
    }
  });
  settings.products = updatedProducts;

  // Save Categories List
  const catCards = document.querySelectorAll("#admin-categories-list .admin-card");
  const updatedCategories = [];
  catCards.forEach(card => {
    const name = card.querySelector(".cat-name-val").value;
    const image = card.querySelector(".cat-image-val").value;

    if (name.trim() !== "") {
      updatedCategories.push({ id: `cat-${Math.random()}`, name, image });
    }
  });
  settings.categories = updatedCategories;

  // Save Featured Collections List
  const collCards = document.querySelectorAll("#admin-collections-list .admin-card");
  const updatedCollections = [];
  collCards.forEach(card => {
    const name = card.querySelector(".coll-name-val").value;
    const image = card.querySelector(".coll-image-val").value;
    const link = card.querySelector(".coll-link-val").value;

    if (name.trim() !== "") {
      updatedCollections.push({ id: `coll-${Math.random()}`, name, image, link });
    }
  });
  settings.collections = updatedCollections;

  // Save Testimonials List
  const testCards = document.querySelectorAll("#admin-testimonials-list .admin-card");
  const updatedTestimonials = [];
  testCards.forEach(card => {
    const text = card.querySelector(".test-text-val").value;
    const author = card.querySelector(".test-author-val").value;
    const rating = parseInt(card.querySelector(".test-rating-val").value) || 5;

    if (text.trim() !== "") {
      updatedTestimonials.push({ id: `test-${Math.random()}`, rating, text, author });
    }
  });
  settings.testimonials = updatedTestimonials;

  // Write to store state & local storage
  storeState.adminSettings = settings;
  localStorage.setItem("chimini_admin_settings", JSON.stringify(settings));

  // Close drawers & refresh page renderers
  closeAllDrawers();
  initStore();
  initAuth();
  showToast("Customizer changes applied successfully!");
}

// Reset customizer defaults
function resetAdminSettings() {
  if (confirm("Are you sure you want to restore the default luxury layout? All customized images and text will be cleared.")) {
    localStorage.removeItem("chimini_admin_settings");
    storeState.adminSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

    // Clear cart and wishlist
    storeState.cart = [];
    storeState.wishlist = [];
    localStorage.removeItem("chimini_cart");
    localStorage.removeItem("chimini_wishlist");

    closeAllDrawers();
    initStore();
    initAdminFields();
    initAuth();
    showToast("Defaults restored successfully!");
  }
}

// --- 7. EVENT BINDING & HANDLERS ---
function bindEvents() {
// Drawer Toggles (Cart, Wishlist, Account, Overlay)
  const cartBtns = document.querySelectorAll("#cart-btn, .cart-toggle-btn");
  cartBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const drawer = document.getElementById("cart-drawer");
      if (drawer) openDrawer(drawer);
    });
  });

  const wishlistBtns = document.querySelectorAll("#wishlist-btn, .wishlist-header-btn");
  wishlistBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const drawer = document.getElementById("wishlist-drawer");
      if (drawer) openDrawer(drawer);
    });
  });

  const accountBtns = document.querySelectorAll("#account-btn, .account-toggle-btn");
  accountBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (storeState.currentUser) {
        openAuthModal('profile', false);
      } else {
        openAuthModal('login', false);
      }
    });
  });

  const closeCartBtn = document.getElementById("close-cart-btn");
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeAllDrawers);

  const closeWishlistBtn = document.getElementById("close-wishlist-btn");
  if (closeWishlistBtn) closeWishlistBtn.addEventListener("click", closeAllDrawers);

  const overlay = document.getElementById("drawer-overlay");
  if (overlay) overlay.addEventListener("click", closeAllDrawers);

  if (DOM.adminToggleBtn) DOM.adminToggleBtn.addEventListener("click", () => {
    initAdminFields();
    if (DOM.adminDrawer) openDrawer(DOM.adminDrawer);
  });
  if (DOM.closeAdminBtn) DOM.closeAdminBtn.addEventListener("click", closeAllDrawers);

    // Checkout Action
  if (DOM.checkoutBtn) {
    DOM.checkoutBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!storeState.cart || storeState.cart.length === 0) {
        showToast("Your cart is empty.");
        return;
      }
      if (!storeState.currentUser) {
        storeState.pendingCheckout = true;
        closeAllDrawers();
        openAuthModal('login', true);
        return;
      }
      openCheckoutModal();
    };
  }

  // ── Live Search: dropdown + navigate to /shop on Enter ──
  if (DOM.searchInput) {
    const dropdown = document.getElementById('search-dropdown');
    let searchDebounceTimer = null;

    // Helper: get shop URL respecting .html extension
    function getShopUrl(q) {
      const isHtml = window.location.pathname.endsWith('.html');
      return (isHtml ? 'shop.html' : '/shop') + (q ? '?q=' + encodeURIComponent(q) : '');
    }

    // Helper: is shop page currently visible?
    function isOnShopPage() {
      const shopContainer = document.getElementById('shop-page-container');
      return shopContainer && shopContainer.offsetParent !== null;
    }

    // Render live dropdown results
    function renderSearchDropdown(query) {
      if (!dropdown) return;
      const q = (query || '').trim().toLowerCase();
      if (!q) {
        dropdown.classList.remove('active');
        dropdown.innerHTML = '';
        return;
      }

      const products = (storeState.adminSettings && storeState.adminSettings.products) || [];
      const matches = products.filter(p => {
        const name = (p.name || '').toLowerCase();
        const frag = (p.fragrance || '').toLowerCase();
        const cat = (p.category || '').toLowerCase();
        const catTitle = (p.categoryTitle || '').toLowerCase();
        const desc = (p.description || '').toLowerCase();
        return name.includes(q) || frag.includes(q) || cat.includes(q) || catTitle.includes(q) || desc.includes(q);
      }).slice(0, 6);

      const isHtml = window.location.pathname.endsWith('.html');
      const pdpBase = isHtml ? 'product.html' : '/product';

      if (matches.length === 0) {
        dropdown.innerHTML = '<div class="search-dropdown-empty">No products found for "' + query + '"</div>';
        dropdown.classList.add('active');
        return;
      }

      let html = matches.map(p => {
        const price = '₹' + Number(p.price).toLocaleString('en-IN', { maximumFractionDigits: 0 });
        return '<a class="search-dropdown-item" href="' + pdpBase + '?id=' + p.id + '">' +
          '<img src="' + (p.image || 'assets/product_jasmine.png') + '" alt="' + p.name + '" onerror="this.src=\'assets/product_jasmine.png\'">' +
          '<div class="search-dropdown-item-info">' +
          '<div class="search-dropdown-item-name">' + p.name + '</div>' +
          '<div class="search-dropdown-item-price">' + price + '</div>' +
          '</div>' +
          '</a>';
      }).join('');

      const totalMatches = products.filter(p =>
        (p.name || '').toLowerCase().includes(q) ||
        (p.fragrance || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
      ).length;

      if (totalMatches > 6) {
        html += '<div class="search-dropdown-footer" id="search-see-all">See all results for &ldquo;' + query + '&rdquo; &rarr;</div>';
      }

      dropdown.innerHTML = html;
      dropdown.classList.add('active');

      const seeAll = document.getElementById('search-see-all');
      if (seeAll) {
        seeAll.addEventListener('click', () => {
          dropdown.classList.remove('active');
          window.location.href = getShopUrl(query);
        });
      }
    }

    // Input: live dropdown + filter current page
    DOM.searchInput.addEventListener('input', (e) => {
      const q = e.target.value;
      storeState.searchQuery = q;
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        renderSearchDropdown(q);
        if (isOnShopPage()) {
          renderShopProducts();
        } else {
          renderBestSellers();
        }
      }, 120);
    });

    // Enter key: navigate to /shop?q=... (or filter in-place if on shop)
    DOM.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = DOM.searchInput.value.trim();
        if (!q) return;
        if (dropdown) dropdown.classList.remove('active');
        if (isOnShopPage()) {
          storeState.searchQuery = q;
          renderShopProducts();
        } else {
          window.location.href = getShopUrl(q);
        }
      }
      if (e.key === 'Escape') {
        if (dropdown) dropdown.classList.remove('active');
        DOM.searchInput.blur();
      }
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (dropdown) {
        const wrapper = DOM.searchInput.closest('.header-search') || DOM.searchInput.parentElement;
        if (!wrapper.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      }
    });
  }

  // Navigation Menu category mapping
  DOM.navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      // Check if navigating internally or externally
      const targetHref = link.getAttribute("href");
      if (targetHref.startsWith("#")) {
        e.preventDefault();

        // Mark active
        DOM.navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        // Handle filter categories on click
        const categoryFilter = link.getAttribute("data-category");
        if (categoryFilter) {
          storeState.activeCategory = categoryFilter;
          storeState.searchQuery = "";
          if (DOM.searchInput) DOM.searchInput.value = "";
          renderBestSellers();
        }

        // Scroll to target element
        const targetId = targetHref.slice(1);
        if (targetId) {
          const el = document.getElementById(targetId);
          if (el) {
            const yOffset = -15; // Clean spacer padding at top of viewport for static header
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }
      }
    });
  });

  // View All best sellers toggle button
  if (DOM.viewAllProductsBtn) {
    DOM.viewAllProductsBtn.addEventListener("click", () => {
      showAllProducts = !showAllProducts;
      renderBestSellers();
    });
  }

  // Admin dynamic control button bindings
  const addProductBtn = document.getElementById("admin-add-product");
  if (addProductBtn) {
    addProductBtn.addEventListener("click", () => {
      storeState.adminSettings.products.push({
        id: `prod-${Math.random()}`,
        name: "New Luxury Candle",
        price: 30.00,
        originalPrice: null,
        badge: "",
        image: "assets/product_jasmine.png",
        secondaryImage: "assets/product_jasmine.png",
        category: "candles"
      });
      renderAdminProductsList();
    });
  }

  const addCategoryBtn = document.getElementById("admin-add-category");
  if (addCategoryBtn) {
    addCategoryBtn.addEventListener("click", () => {
      storeState.adminSettings.categories.push({
        id: `cat-${Math.random()}`,
        name: "New Fragrance",
        image: "assets/product_rose.png"
      });
      renderAdminCategoriesList();
    });
  }

  const addCollectionBtn = document.getElementById("admin-add-collection");
  if (addCollectionBtn) {
    addCollectionBtn.addEventListener("click", () => {
      storeState.adminSettings.collections.push({
        id: `coll-${Math.random()}`,
        name: "New Collection",
        image: "assets/hero_banner_1.png",
        link: "#best-sellers"
      });
      renderAdminCollectionsList();
    });
  }

  const addTestimonialBtn = document.getElementById("admin-add-testimonial");
  if (addTestimonialBtn) {
    addTestimonialBtn.addEventListener("click", () => {
      storeState.adminSettings.testimonials.push({
        id: `test-${Math.random()}`,
        rating: 5,
        text: "The ambiance of my home is completely transformed.",
        author: "Valued Customer"
      });
      renderAdminTestimonialsList();
    });
  }

  if (DOM.adminSaveBtn) DOM.adminSaveBtn.addEventListener("click", saveAdminSettings);
  if (DOM.adminResetBtn) DOM.adminResetBtn.addEventListener("click", resetAdminSettings);

  // Sticky header trigger removed (header is static)

  // Footer Category clicks - redirect to Shop page with category filter
  const footerLinks = document.querySelectorAll(".footer-cat-link");
  footerLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const cat = link.getAttribute("data-category");
      window.location.href = `/shop?category=${cat || 'all'}`;
    });
  });

  // Filter Drawer events
  const closeFilterBtn = document.getElementById("close-filter-btn");
  if (closeFilterBtn) {
    closeFilterBtn.addEventListener("click", closeAllDrawers);
  }

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      storeState.activeCategory = btn.getAttribute("data-cat");
    });
  });

  const filterApplyBtn = document.getElementById("filter-apply-btn");
  if (filterApplyBtn) {
    filterApplyBtn.addEventListener("click", () => {
      const minVal = document.getElementById("price-min").value;
      const maxVal = document.getElementById("price-max").value;
      storeState.priceMin = minVal ? parseFloat(minVal) : null;
      storeState.priceMax = maxVal ? parseFloat(maxVal) : null;
      closeAllDrawers();
      renderShopProducts();
    });
  }

  const filterResetBtn = document.getElementById("filter-reset-btn");
  if (filterResetBtn) {
    filterResetBtn.addEventListener("click", () => {
      const minInput = document.getElementById("price-min");
      const maxInput = document.getElementById("price-max");
      if (minInput) minInput.value = "";
      if (maxInput) maxInput.value = "";
      storeState.priceMin = null;
      storeState.priceMax = null;
      storeState.activeCategory = "all";
      filterBtns.forEach(b => {
        if (b.getAttribute("data-cat") === "all") b.classList.add("active");
        else b.classList.remove("active");
      });
      closeAllDrawers();
      renderShopProducts();
    });
  }
  initAuth();
}


// --- 8. INITIALIZE STOREFRONT ---
function initStore() {
  renderAnnouncement();
  renderHeroBanner();
  renderFragranceCategories();
  renderFeaturedCollections();
  renderBestSellers();
  renderMarketingBanners();
  renderTestimonials();

  renderCart();
  renderWishlist();

  // Render subpage contents if containers exist
  renderPageContent();

  // Highlight active link in header
  highlightActiveNav();

  // Start carousel auto-scrolls
  startTestimonialsAutoplay();
}


function getPageBanner(slotId) {
  // Look in storeState.banners array (from Supabase)
  if (storeState.banners && Array.isArray(storeState.banners)) {
    const found = storeState.banners.find(b =>
      b.section_id === slotId && (b.is_published !== false) &&
      b.image_url && b.image_url.trim() !== ''
    );
    if (found) return { image: found.image_url, link: found.link_url || '#' };
  }

  // Legacy fallback: old section_id style without page prefix
  const legacyKey = slotId.split('_').slice(1).join('_');
  if (storeState.banners && Array.isArray(storeState.banners)) {
    const found = storeState.banners.find(b =>
      (b.section_id === legacyKey || b.section_id === slotId.split('_').pop()) && (b.is_published !== false) &&
      b.image_url && b.image_url.trim() !== ''
    );
    if (found) return { image: found.image_url, link: found.link_url || '#' };
  }

  // Legacy adminSettings fallbacks
  const legacyMap = {
    home_hero: storeState.adminSettings?.heroBanner,
    home_ads_1: storeState.adminSettings?.adsBanner1,
    home_ads_2: storeState.adminSettings?.adsBanner2,
    home_brand_story: storeState.adminSettings?.storyBanner,
    shop_top: storeState.adminSettings?.pageBanners?.shop,
    collections_top: storeState.adminSettings?.pageBanners?.collections,
    gifts_top: storeState.adminSettings?.pageBanners?.gifts,
    about_top: storeState.adminSettings?.pageBanners?.about,
    contact_top: storeState.adminSettings?.pageBanners?.contact,
  };
  const legacy = legacyMap[slotId];
  if (legacy && legacy.image && legacy.image.trim() !== '') return legacy;

  return null;
}

function renderBannerSlot(slotId, extraStyle = '') {
  const banner = getPageBanner(slotId);
  if (!banner || !banner.image || banner.image.trim() === '') return '';
  return `<a href="${banner.link || '#'}" class="banner-slot-link" style="${extraStyle}">
    <img src="${banner.image}" alt="banner" class="banner-slot-img" onerror="this.parentElement.style.display='none'">
  </a>`;
}

// Keep old name for compatibility
function renderPageHeroHtml(pageKey) {
  // Map old page keys to new slot IDs
  const slotMap = { shop: 'shop_top', collections: 'collections_top', gifts: 'gifts_top', about: 'about_top', contact: 'contact_top' };
  const slotId = slotMap[pageKey] || pageKey;
  const html = renderBannerSlot(slotId);
  if (!html) return '';
  return `<div class="page-top-banner-wrap">${html}</div>`;
}

// --- 9. SUBPAGE DYNAMIC RENDERERS ---

function highlightActiveNav() {
  const path = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach(link => {
    const href = link.getAttribute("href").toLowerCase();

    // Normalize paths to ignore directories and extensions
    const hrefBase = href.replace(".html", "").split("/").pop();
    const pathBase = path.replace(".html", "").split("/").pop();

    if (pathBase === hrefBase || (pathBase === "" && hrefBase === "index") || (!pathBase && hrefBase === "index")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function renderPageContent() {
  renderShopPage();
  renderCollectionsPage();
  renderGiftsPage();
  renderAboutPage();
  renderContactPage();
  renderProductDetailPage();
  renderSustainabilityPage();
  renderShippingReturnsPage();
  renderFaqPage();
  renderStoreLocatorPage();
}

function renderShopPage() {
  const container = document.getElementById("shop-page-container");
  if (!container) return;
  // Parse URL parameters for initial category/fragrance filter
  const params = new URLSearchParams(window.location.search);
  const catQuery = params.get("category");
  const fragranceQuery = params.get("fragrance");
  if (fragranceQuery) {
    storeState.activeFragrance = decodeURIComponent(fragranceQuery).toLowerCase();
    storeState.activeCategory = "all";
    storeState.shopInitialized = true;
  } else if (catQuery) {
    storeState.activeCategory = decodeURIComponent(catQuery).toLowerCase();
    storeState.activeFragrance = null;
    storeState.shopInitialized = true;
  }


  const bannerHtml = renderPageHeroHtml("shop");

  // Always refresh the top banner slot after async Supabase data loads
  const _existingBannerSlot = container.querySelector('.page-top-banner-wrap');
  if (bannerHtml) {
    if (_existingBannerSlot) _existingBannerSlot.outerHTML = bannerHtml;
    else if (container.querySelector('.catalog-toolbar')) container.insertAdjacentHTML('afterbegin', bannerHtml);
  }

  if (!container.innerHTML.trim() || !container.querySelector(".catalog-toolbar")) {
    container.innerHTML = `
      ${bannerHtml || ''}
      
      <!-- Catalog Toolbar -->
      <div class="catalog-toolbar section-container">
        <div class="layout-switchers">
          <button class="layout-btn ${storeState.shopLayout === 'grid-2' ? 'active' : ''}" id="layout-grid-2" aria-label="2 Column Grid">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="18" rx="1"></rect><rect x="14" y="3" width="7" height="18" rx="1"></rect></svg>
          </button>
          <button class="layout-btn ${storeState.shopLayout === 'grid-3' ? 'active' : ''}" id="layout-grid-3" aria-label="3 Column Grid">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="5" height="18" rx="0.5"></rect><rect x="9.5" y="3" width="5" height="18" rx="0.5"></rect><rect x="17" y="3" width="5" height="18" rx="0.5"></rect></svg>
          </button>
          <button class="layout-btn ${storeState.shopLayout === 'grid-4' ? 'active' : ''}" id="layout-grid-4" aria-label="4 Column Grid">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="3.5" height="18" rx="0.5"></rect><rect x="7.5" y="3" width="3.5" height="18" rx="0.5"></rect><rect x="13" y="3" width="3.5" height="18" rx="0.5"></rect><rect x="18.5" y="3" width="3.5" height="18" rx="0.5"></rect></svg>
          </button>
          <button class="layout-btn ${storeState.shopLayout === 'list' ? 'active' : ''}" id="layout-list" aria-label="List View">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
        
        <div class="product-count" id="catalog-product-count">0 products found</div>
        
        <div class="catalog-controls">
          <select id="shop-sort" class="shop-sort-select" aria-label="Sort products">
            <option value="default">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name-az">Name: A&#8211;Z</option>
            <option value="name-za">Name: Z&#8211;A</option>
          </select>
          
          <button class="btn btn-secondary filter-toggle-btn" id="filter-drawer-toggle">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div class="catalog-layout section-container">
        <main class="catalog-main">
          <div class="shop-products-grid ${storeState.shopLayout}" id="shop-products-grid"></div>
        </main>
      </div>
    `;

    // Bind layout buttons
    const bindLayout = (btnId, layoutName) => {
      const btn = document.getElementById(btnId);
      if (btn) {
        btn.addEventListener("click", () => {
          storeState.shopLayout = layoutName;
          container.querySelectorAll(".layout-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          const grid = document.getElementById("shop-products-grid");
          if (grid) {
            grid.className = `shop-products-grid ${layoutName}`;
          }
          renderShopProducts();
        });
      }
    };
    bindLayout("layout-grid-2", "grid-2");
    bindLayout("layout-grid-3", "grid-3");
    bindLayout("layout-grid-4", "grid-4");
    bindLayout("layout-list", "list");

    // Bind filter toggle
    const filterToggle = document.getElementById("filter-drawer-toggle");
    const filterDrawer = document.getElementById("filter-drawer");
    if (filterToggle && filterDrawer) {
      filterToggle.addEventListener("click", () => openDrawer(filterDrawer));
    }

    // Bind sort dropdown — saves selection to storeState.shopSort for persistence across filters
    const sortSelect = document.getElementById("shop-sort");
    if (sortSelect) {
      // Restore previously selected sort option
      sortSelect.value = storeState.shopSort || "default";
      sortSelect.addEventListener("change", () => {
        storeState.shopSort = sortSelect.value;
        renderShopProducts();
      });
    }
  }

  renderShopProducts();
}

function getScentSwatches(productName) {
  const name = productName.toLowerCase();
  if (name.includes("jasmine")) {
    return [
      { color: "#FDFDFD", name: "Jasmine Blossom" },
      { color: "#8B5A2B", name: "Oakwood Base" }
    ];
  } else if (name.includes("sandalwood")) {
    return [
      { color: "#C19A6B", name: "Sandalwood Essence" },
      { color: "#FFBF00", name: "Warm Amber" }
    ];
  } else if (name.includes("rose") || name.includes("oud")) {
    return [
      { color: "#B80F0A", name: "Velvet Rose" },
      { color: "#2E1A0C", name: "Rich Oud" }
    ];
  } else if (name.includes("fig") || name.includes("honey")) {
    return [
      { color: "#6F2DA8", name: "Wild Fig" },
      { color: "#FFC000", name: "Organic Honey" }
    ];
  } else {
    return [
      { color: "#C5A880", name: "Signature Gold" },
      { color: "#F5F2EB", name: "Ivory Wax" }
    ];
  }
}

function renderShopProducts() {
  const grid = document.getElementById("shop-products-grid");
  if (!grid) return;
  grid.innerHTML = "";

  let products = storeState.adminSettings.products;

  // Apply search query filter
  if (storeState.searchQuery && storeState.searchQuery.trim() !== "") {
    const q = storeState.searchQuery.toLowerCase();
    products = products.filter(p => p.name.toLowerCase().includes(q));
  }

  // Apply fragrance filter (from homepage circle click or ?fragrance= query param)
  if (storeState.activeFragrance && storeState.activeFragrance !== "all") {
    const fTarget = storeState.activeFragrance.toLowerCase().trim();
    const fTargetNormalized = fTarget.replace(/-/g, " ");
    products = products.filter(p => {
      const pFragTag = (p.fragrance_tag || "").toLowerCase().trim();
      const pFragNotes = (p.fragrance || "").toLowerCase().trim();
      const pName = (p.name || p.title || "").toLowerCase().trim();
      const pCat = (p.category || "").toLowerCase().trim();
      const pCatTitle = (p.categoryTitle || "").toLowerCase().trim();
      const pCollTag = (p.collection_tag || "").toLowerCase().trim();

      return (
        pFragTag === fTarget ||
        pFragTag.replace(/-/g, " ") === fTargetNormalized ||
        (pFragTag && (pFragTag.includes(fTarget) || fTarget.includes(pFragTag))) ||
        pFragNotes.includes(fTarget) ||
        pFragNotes.includes(fTargetNormalized) ||
        pName.includes(fTarget) ||
        pName.includes(fTargetNormalized) ||
        pCat.includes(fTarget) ||
        pCatTitle.includes(fTarget)
      );
    });
  } else if (storeState.activeCategory && storeState.activeCategory !== "all") {
    // Apply category / collection filter (supports multiple comma-separated collection tags)
    const cTarget = storeState.activeCategory.toLowerCase().trim();
    const cTargetNormalized = cTarget.replace(/-/g, " ");
    products = products.filter(p => {
      const pCat = (p.category || "").toLowerCase().trim();
      const pCatTitle = (p.categoryTitle || "").toLowerCase().trim();
      const pCollTags = (p.collection_tag || "").toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
      const pBadge = (p.badge || p.badges || "").toLowerCase().trim();
      const pName = (p.name || p.title || "").toLowerCase().trim();
      const pDesc = (p.description || "").toLowerCase().trim();
      const pFragTag = (p.fragrance_tag || "").toLowerCase().trim();
      const pFragNotes = (p.fragrance || "").toLowerCase().trim();

      const matchColl = pCollTags.some(tag =>
        tag === cTarget ||
        tag.replace(/-/g, " ") === cTargetNormalized ||
        tag.includes(cTarget) ||
        cTarget.includes(tag)
      );

      if (matchColl) return true;

      if ((cTarget.includes("gift") || cTargetNormalized.includes("gift")) && (p.is_gift || pCollTags.includes("gift") || pCollTags.includes("gifts"))) {
        return true;
      }

      return (
        pCat === cTarget ||
        pCat.replace(/-/g, " ") === cTargetNormalized ||
        (pCat && (pCat.includes(cTarget) || cTarget.includes(pCat))) ||
        pCatTitle.includes(cTargetNormalized) ||
        pBadge.includes(cTargetNormalized) ||
        pName.includes(cTargetNormalized) ||
        pName.includes(cTarget) ||
        pDesc.includes(cTargetNormalized) ||
        pFragTag.includes(cTargetNormalized) ||
        pFragNotes.includes(cTargetNormalized)
      );
    });
  }

  // Apply price filter
  if (storeState.priceMin !== null) {
    products = products.filter(p => p.price >= storeState.priceMin);
  }
  if (storeState.priceMax !== null) {
    products = products.filter(p => p.price <= storeState.priceMax);
  }

  // Update count in middle toolbar
  const countEl = document.getElementById("catalog-product-count");
  if (countEl) {
    let countText = `${products.length} product${products.length !== 1 ? 's' : ''} found`;
    if (storeState.activeFragrance && storeState.activeFragrance !== "all") {
      const displayFrag = storeState.activeFragrance.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      countEl.innerHTML = `${countText} <span style="display:inline-flex;align-items:center;gap:6px;margin-left:10px;padding:3px 10px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:12px;font-size:0.78rem;color:#334155;">Fragrance: <strong>${displayFrag}</strong> <button id="clear-fragrance-filter" style="border:none;background:none;cursor:pointer;color:#64748b;font-weight:bold;padding:0 2px;line-height:1;" title="Clear filter">&times;</button></span>`;
      const clearBtn = document.getElementById("clear-fragrance-filter");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          storeState.activeFragrance = null;
          if (window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname);
          }
          renderShopProducts();
        });
      }
    } else if (storeState.activeCategory && storeState.activeCategory !== "all") {
      const displayCat = storeState.activeCategory.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      countEl.innerHTML = `${countText} <span style="display:inline-flex;align-items:center;gap:6px;margin-left:10px;padding:3px 10px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:12px;font-size:0.78rem;color:#334155;">Collection: <strong>${displayCat}</strong> <button id="clear-category-filter" style="border:none;background:none;cursor:pointer;color:#64748b;font-weight:bold;padding:0 2px;line-height:1;" title="Clear filter">&times;</button></span>`;
      const clearBtn = document.getElementById("clear-category-filter");
      if (clearBtn) {
        clearBtn.addEventListener("click", () => {
          storeState.activeCategory = "all";
          if (window.history.replaceState) {
            window.history.replaceState(null, '', window.location.pathname);
          }
          renderShopProducts();
        });
      }
    } else {
      countEl.textContent = countText;
    }
  }

  // Sync the sort dropdown UI to match persisted state
  const sortSelectEl = document.getElementById("shop-sort");
  if (sortSelectEl) {
    sortSelectEl.value = storeState.shopSort || "default";
  }

  // Sort products using storeState.shopSort (persists across filter apply/reset)
  const sortBy = storeState.shopSort || "default";
  const originalOrder = storeState.adminSettings.products.map(p => p.id);
  if (sortBy === "newest") {
    products.sort((a, b) => originalOrder.indexOf(b.id) - originalOrder.indexOf(a.id));
  } else if (sortBy === "price-low") {
    products.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    products.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-az") {
    products.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name-za") {
    products.sort((a, b) => b.name.localeCompare(a.name));
  }
  // "default" (Featured) keeps the original admin-defined product order

  if (products.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--text-secondary); font-family: var(--font-serif); font-size: 1.2rem;">No products match your filter selections.</div>`;
    return;
  }

  products.forEach((product, index) => {
    const isWishlisted = storeState.wishlist.includes(product.id);

    // Dynamic premium badge text
    const badgeText = (product.badge && product.badge.trim() !== '') ? product.badge.trim() : null;

    // Dynamic discount calculations
    const priceNum = parseFloat(product.price);
    const origPriceNum = product.originalPrice ? parseFloat(product.originalPrice) : null;
    const isDiscounted = (origPriceNum && origPriceNum > priceNum);
    const originalPrice = isDiscounted ? origPriceNum.toFixed(2) : null;
    const discountPercent = isDiscounted ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) : null;
    const discountText = isDiscounted ? `${discountPercent}% OFF` : null;

    // Scent notes color swatches
    const swatches = getScentSwatches(product.name);
    let swatchesHtml = `<div class="scent-swatches">`;
    swatches.forEach(s => {
      swatchesHtml += `<span class="swatch-dot" style="background-color: ${s.color};" title="${s.name}"></span>`;
    });
    swatchesHtml += `</div>`;

    const card = document.createElement("div");
    card.className = "product-card animate-slide-up";

    if (storeState.shopLayout === "list") {
      // List view premium horizontal layout
      card.innerHTML = `
        <div class="product-image-wrapper">
          ${badgeText ? `<span class="product-badge">${badgeText}</span>` : ''}
          <a href="/product?id=${product.id}" style="display:block;"><img src="${product.image}" class="product-image-main" alt="${product.name}" onerror="this.src='assets/product_jasmine.png'">
          ${product.secondaryImage ? `<img src="${product.secondaryImage}" class="product-image-hover" alt="${product.name}" onerror="this.style.display='none'">` : ''}
          <button class="wishlist-toggle-btn ${isWishlisted ? "active" : ""}" data-id="${product.id}" aria-label="Add to Wishlist">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
        <div class="product-info">
          <div class="product-details-text">
            <h3 class="product-name" style="margin-bottom: 5px;">${product.name}</h3>
            ${swatchesHtml}
          </div>
          <div class="product-price-action">
            <div class="product-price-wrapper">
              <span class="mrp-label">MRP: </span><span class="current-price">₹${Number(product.price).toFixed(0)}</span>
              ${isDiscounted ? `<span class="original-price" style="text-decoration: line-through;">₹${Number(originalPrice).toFixed(0)}</span> <span class="discount-badge-green">${discountText}</span>` : ''}
            </div>
            <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}" style="padding: 10px 24px;">Add to Cart</button>
          </div>
        </div>
      `;
    } else {
      // Grid view layouts
      card.innerHTML = `
        <div class="product-image-wrapper">
          ${badgeText ? `<span class="product-badge">${badgeText}</span>` : ''}
          <a href="/product?id=${product.id}" style="display:block;"><img src="${product.image}" class="product-image-main" alt="${product.name}" onerror="this.src='assets/product_jasmine.png'">
          ${product.secondaryImage ? `<img src="${product.secondaryImage}" class="product-image-hover" alt="${product.name}" onerror="this.style.display='none'">` : ''}
          <button class="wishlist-toggle-btn ${isWishlisted ? "active" : ""}" data-id="${product.id}" aria-label="Add to Wishlist">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <button class="product-cart-overlay-btn add-to-cart-btn" data-id="${product.id}" aria-label="Add to Cart">+</button>
        </div>
        <div class="product-info">
          <a href="/product?id=${product.id}" style="text-decoration:none; color:inherit;"><h3 class="product-name">${product.name}</h3></a>
          <div class="product-price-wrapper">
            <span class="mrp-label">MRP: </span><span class="current-price">₹${Number(product.price).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            ${isDiscounted ? `<span class="original-price" style="text-decoration: line-through;">₹${Number(originalPrice).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span> <span class="discount-badge-green">${discountText}</span>` : ''}
          </div>
          ${swatchesHtml}
        </div>
      `;
    }

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

function renderCollectionsPage() {
  const container = document.getElementById("collections-page-container");
  if (!container) return;

  const rawList = (storeState.collections && storeState.collections.length > 0)
    ? storeState.collections
    : ((storeState.adminSettings && storeState.adminSettings.collections) || []);

  const collections = rawList.filter(c => c.is_published !== false);

  container.innerHTML = `
    ${renderPageHeroHtml("collections")}

    <section class="collections-index-section section-container">
      <div class="collections-header animate-slide-up">
        <span class="collections-badge">CHIMINI EDITIONS</span>
        <h1 class="collections-main-title">Curated Collections</h1>
        <p class="collections-subtitle">Explore handcrafted luxury fragrance collections curated for every mood, space, and season.</p>
      </div>

      <div class="collections-grid-container" id="collections-grid-container"></div>
    </section>
  `;

  const grid = document.getElementById("collections-grid-container");
  if (!grid) return;

  if (collections.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--text-secondary); font-family: var(--font-serif); font-size: 1.2rem;">
        No collections currently available.
      </div>
    `;
    return;
  }

  collections.forEach(coll => {
    const card = document.createElement("div");
    card.className = "collection-index-card animate-slide-up";

    const name = coll.title || coll.name || "Collection";
    const image = coll.image_url || coll.image || "assets/campaign_banner.png";
    const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const isHtmlExt = window.location.pathname.endsWith('.html');
    const defaultCategoryLink = (isHtmlExt ? 'shop.html' : '/shop') + '?category=' + encodeURIComponent(slug);

    let targetLink = defaultCategoryLink;
    if (coll.link_url && !coll.link_url.startsWith('#') && coll.link_url !== '/shop' && coll.link_url !== '/shop?category=all' && coll.link_url !== 'shop.html' && coll.link_url !== 'shop.html?category=all') {
      targetLink = coll.link_url;
    } else if (coll.link && !coll.link.startsWith('#') && coll.link !== '/shop' && coll.link !== '/shop?category=all' && coll.link !== 'shop.html' && coll.link !== 'shop.html?category=all') {
      targetLink = coll.link;
    }

    card.innerHTML = `
      <a href="${targetLink}" class="collection-card-inner">
        <div class="collection-card-media">
          <img src="${image}" alt="${name}" class="collection-card-img" onerror="this.src='assets/campaign_banner.png'">
          <div class="collection-card-overlay"></div>
          <div class="collection-card-text-overlay">
            <h2 class="collection-card-title">${name}</h2>
          </div>
        </div>
      </a>
    `;

    grid.appendChild(card);
  });
}

function renderGiftsPage() {
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
    } catch (e) { }
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

  container.innerHTML = `
    ${renderPageHeroHtml("gifts")}

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
                ${shapes.map((s, idx) => `
                  <button class="custom-opt-btn ${idx === 0 ? 'active' : ''}" data-type="shape" data-val="${s.name}">${s.name}</button>
                `).join('')}
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
              <h3 id="preview-gift-title" style="font-family: var(--font-serif); font-size: 1.3rem; margin-bottom: 6px;">${builderState.shape} · Amber Gold</h3>
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

      <!-- 3. Promo Banner 1 -->${renderBannerSlot('gifts_promo_1') ? '<div class="gifts-img-banner">' + renderBannerSlot('gifts_promo_1') + '</div>' : ''}

      <!-- 4. Shop by Price (Single Unified Row of Round Tiles) -->
      <section class="price-section-block">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="font-family: var(--font-serif); font-size: 2.2rem;">Shop by Price</h2>
          <p style="color: var(--text-secondary);">Explore luxury scents fit for every budget</p>
        </div>

        <div class="price-round-tiles-row">
          ${priceTiles.map(pt => `
            <a href="${pt.link || '/shop?category=gifts'}" class="price-round-tile">
              <img src="${pt.image || 'assets/product_jasmine.png'}" alt="${pt.label}" class="price-round-img" onerror="this.src='assets/product_jasmine.png'">
              <div class="price-round-overlay"></div>
              <span class="price-round-label">${pt.label}</span>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- 5. Shop by Recipient (3 Tiles Per Row, Box-Shaped) -->
      <section class="tile-grid-section">
        <div class="tile-grid-header">
          <h2>Shop by Recipient</h2>
          <p style="color: var(--text-secondary);">Curated tokens for every special person in your life</p>
        </div>
        <div class="recipient-tiles-grid">
          ${recipientTiles.map(r => `
            <a href="${r.link || '/shop?category=gifts'}" class="recipient-box-tile">
              <img src="${r.image || 'assets/product_rose.png'}" alt="${r.label}" class="recipient-box-img" onerror="this.src='assets/product_rose.png'">
              <div class="recipient-box-overlay"></div>
              <span class="recipient-box-label">${r.label}</span>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- 6. Promo Banner 2 -->${renderBannerSlot('gifts_promo_2') ? '<div class="gifts-img-banner">' + renderBannerSlot('gifts_promo_2') + '</div>' : ''}

      <!-- 7. Shop by Occasion (4 Tiles Per Row, Box-Shaped) -->
      <section class="tile-grid-section">
        <div class="tile-grid-header">
          <h2>Shop by Occasion</h2>
          <p style="color: var(--text-secondary);">Fragrant tokens designed for milestones and celebrations</p>
        </div>
        <div class="occasion-tiles-grid">
          ${occasionTiles.map(o => `
            <a href="${o.link || '/shop?category=gifts'}" class="occasion-box-tile">
              <img src="${o.image || 'assets/campaign_banner.png'}" alt="${o.label}" class="occasion-box-img" onerror="this.src='assets/campaign_banner.png'">
              <div class="occasion-box-overlay"></div>
              <span class="occasion-box-label">${o.label}</span>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- 8. Gift Cards (Replaces Curated Gift Hampers & Sets) -->
      <section id="gift-cards-section" style="margin-bottom: 70px;">
        <div class="tile-grid-header">
          <h2>Gift Cards</h2>
          <p style="color: var(--text-secondary);">Give the gift of choice with our bespoke CHIMINI luxury digital &amp; physical gift passes</p>
        </div>
        <div class="gift-cards-grid">
          ${giftCards.map(gc => `
            <a href="${gc.link || '/shop?category=gifts'}" class="gift-card-item">
              <img src="${gc.image || 'assets/campaign_banner.png'}" alt="${gc.title}" class="gift-card-bg-img" onerror="this.src='assets/campaign_banner.png'">
              <div class="gift-card-overlay"></div>
              <h3 class="gift-card-title">${gc.title}</h3>
              <span class="gift-card-badge">EXPLORE CARD &rarr;</span>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- 9. Promo Banner 3 -->${renderBannerSlot('gifts_promo_3') ? '<div class="gifts-img-banner">' + renderBannerSlot('gifts_promo_3') + '</div>' : ''}

    </div>
  `;

  // Interactive Builder Event Bindings
  const updateBuilderPreview = () => {
    const titleEl = document.getElementById("preview-gift-title");
    const pkgEl = document.getElementById("preview-gift-pkg");
    const noteEl = document.getElementById("preview-gift-note-display");
    const imgEl = document.getElementById("preview-gift-img");

    if (titleEl) titleEl.textContent = `${builderState.shape} · ${builderState.scent}`;
    if (pkgEl) pkgEl.textContent = `Packaged in ${builderState.packaging}`;
    if (noteEl) noteEl.textContent = builderState.note ? `"${builderState.note}"` : '"With all my love"';
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
        id: `custom-gift-${Date.now()}`,
        name: `Bespoke Gift: ${builderState.shape} (${builderState.scent})`,
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
}

function renderAboutPage() {
  const container = document.getElementById("about-page-container");
  if (!container) return;
  if (storeState.adminSettings.pages && storeState.adminSettings.pages['about_us']) {
    container.innerHTML = storeState.adminSettings.pages['about_us'];
    return;
  }

  const about = storeState.adminSettings.about || {};


  const bannerHtml = renderPageHeroHtml("about");

  container.innerHTML = `
    ${bannerHtml || ''}
    
    <div class="about-story-section section-container" id="our-story">
      <div class="about-story-grid">
        <div class="about-story-text animate-slide-up">
          <h2 class="about-section-heading">Our Origin</h2>
          <p class="about-paragraph">${about.desc1 || ''}</p>
          <p class="about-paragraph">${about.desc2 || ''}</p>
        </div>
        <div class="about-story-image animate-slide-up">
          <img src="${about.image1 || 'assets/story_banner.png'}" alt="Handcrafted Soy Candle Scenting" onerror="this.src='assets/story_banner.png'">
        </div>
      </div>
    </div>

    <div class="about-quote-banner">
      <div class="section-container">
        <blockquote class="about-quote">
          "A scent is an invisible architecture, shaping the quiet spaces of our memories."
        </blockquote>
        <span class="about-quote-author">— Harshida, Founder of CHIMINI</span>
      </div>
    </div>

    <div class="about-story-section section-container">
      <div class="about-story-grid reverse">
        <div class="about-story-image animate-slide-up">
          <img src="${about.image2 || 'assets/hero_banner_1.png'}" alt="Crafting Scented Elements" onerror="this.src='assets/hero_banner_1.png'">
        </div>
        <div class="about-story-text animate-slide-up">
          <h2 class="about-section-heading">Our Craft & Philosophy</h2>
          <p class="about-paragraph">Each batch is mixed and poured in micro-runs at our Mangalore atelier. We trace our ingredients back to their botanical sources: organic soy from local family farms, wild-harvested absolute oils, and lead-free cotton fibers.</p>
          <p class="about-paragraph">Sustainability isn't a badge we wear; it is the fundamental core of our design process. Every single container is engineered for secondary lifetime usage as a premium storage jar, vase, or decorative luxury organizer.</p>
        </div>
      </div>
    </div>

    <div class="about-values section-container">
      <h2 class="section-title">Core Principles</h2>
      <div class="values-grid">
        <div class="value-card">
          <h3>Soot-Free Purity</h3>
          <p>Strictly lead-free and chemical-free botanical elements.</p>
        </div>
        <div class="value-card">
          <h3>Artisanal Integrity</h3>
          <p>Micro-batch production ensures peak scent throw control.</p>
        </div>
        <div class="value-card">
          <h3>Lifetime Vessels</h3>
          <p>Refillable or repurposable containers that last forever.</p>
        </div>
      </div>
    </div>
  `;
}

function renderContactPage() {
  const container = document.getElementById("contact-page-container");
  if (!container) return;
  if (storeState.adminSettings.pages && storeState.adminSettings.pages['contact_us']) {
    container.innerHTML = storeState.adminSettings.pages['contact_us'];
    return;
  }

  const contact = storeState.adminSettings.contact || {};


  const bannerHtml = renderPageHeroHtml("contact");

  container.innerHTML = `
    ${bannerHtml || ''}

    <div class="contact-layout section-container">
      <div class="contact-details-col animate-slide-up">
        <h2 class="contact-col-heading">Atelier Details</h2>
        <div class="contact-detail-item">
          <h3>General Inquiry</h3>
          <p>${contact.email || 'chiminiofficial@gmail.com'}</p>
        </div>
        <div class="contact-detail-item">
          <h3>Concierge Phone</h3>
          <p>${contact.phone || '+91 97418 55293, +91 96320 90645'}</p>
          <span class="contact-detail-hours">Mon - Fri, 9:00 AM - 6:00 PM </span>
        </div>
        <div class="contact-detail-item">
          <h3>Atelier Location</h3>
          <p>${contact.address || 'Mangalore, Karnataka'}</p>
        </div>
        <div class="contact-detail-item">
          <h3>Corporate & Events Gifting</h3>
          <p>chiminiofficial@gmail.com</p>
        </div>
      </div>

      <div class="contact-form-col animate-slide-up">
        <h2 class="contact-col-heading">Send a Message</h2>
        <form id="luxury-contact-form" class="luxury-contact-form">
          <div class="form-row">
            <div class="form-group">
              <label for="contact-name">First & Last Name</label>
              <input type="text" id="contact-name" required placeholder="Your Name">
            </div>
            <div class="form-group">
              <label for="contact-email">Email Address</label>
              <input type="email" id="contact-email" required placeholder="you@example.com">
            </div>
          </div>
          <div class="form-group">
            <label for="contact-subject">Topic of Inquiry</label>
            <select id="contact-subject" class="contact-form-select">
              <option value="concierge">Order Support & Concierge</option>
              <option value="bespoke">Bespoke / Custom Fragrance</option>
              <option value="corporate">Corporate & Bulk Gifting</option>
              <option value="press">Press & Partnership</option>
            </select>
          </div>
          <div class="form-group">
            <label for="contact-message">Message</label>
            <textarea id="contact-message" rows="6" required placeholder="How can our concierge assist you today?"></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block contact-submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById("luxury-contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you. Your message has been received by our Client Concierge. We will respond within 24 hours.");
      form.reset();
    });
  }
}

function renderSustainabilityPage() {
  const container = document.getElementById("sustainability-page-container");
  if (!container) return;

  const customContent = storeState.adminSettings.pages?.['sustainability'];
  if (customContent && typeof customContent === 'string') {
    container.innerHTML = customContent;
    return;
  }

  const s = (typeof customContent === 'object' && customContent) ? customContent : {};
  const bannerHtml = renderPageHeroHtml("sustainability") || `
    <div class="page-hero-banner">
      <div class="section-container">
        <span class="page-hero-subtitle">${s.subtitle || 'OUR CONSCIOUS COMMITMENT'}</span>
        <h1 class="page-hero-title">${s.title || 'Crafted with Reverence for Nature'}</h1>
        <p class="page-hero-desc">${s.desc || 'At Chimini, sustainability is not an afterthought — it is the soul of our artisan craft. Every candle is mindfully created to bring pure warmth to your sanctuary while leaving a gentle footprint on the earth.'}</p>
      </div>
    </div>
  `;

  container.innerHTML = `
    ${bannerHtml}

    <div class="section-container">
      <div class="sustainability-pillars-grid">
        <div class="pillar-card animate-slide-up">
          <div class="pillar-icon">🌱</div>
          <h3>100% Botanical Soy Wax</h3>
          <p>Hand-poured using pure, renewable soy wax free from paraffin, toxic petroleum derivatives, phthalates, and synthetic dyes. Clean, slow-burning, and naturally biodegradable.</p>
        </div>

        <div class="pillar-card animate-slide-up">
          <div class="pillar-icon">🕯️</div>
          <h3>Lead-Free Cotton Wicks</h3>
          <p>Every wick is spun from organic cotton and natural cellulose fibers, precisely selected to ensure a soot-free, tranquil flame with zero heavy metals.</p>
        </div>

        <div class="pillar-card animate-slide-up">
          <div class="pillar-icon">🏺</div>
          <h3>Zero-Waste Lifetime Vessels</h3>
          <p>Crafted in reusable glass, ceramic, and concrete vessels engineered for a lifetime beyond candle burning — perfect as luxury decor, planters, or artisanal organizers.</p>
        </div>

        <div class="pillar-card animate-slide-up">
          <div class="pillar-icon">📦</div>
          <h3>Eco-Conscious Packaging</h3>
          <p>Enclosed in 100% recyclable, plastic-free gift boxes with water-soluble adhesives and biodegradable paper cushioning.</p>
        </div>
      </div>

      <div class="eco-stats-banner animate-slide-up">
        <div class="eco-stats-grid">
          <div class="eco-stat-item">
            <div class="eco-stat-val">100%</div>
            <div class="eco-stat-label">Plant-Based Soy</div>
          </div>
          <div class="eco-stat-item">
            <div class="eco-stat-val">0%</div>
            <div class="eco-stat-label">Paraffin & Toxins</div>
          </div>
          <div class="eco-stat-item">
            <div class="eco-stat-val">100%</div>
            <div class="eco-stat-label">Vegan & Cruelty Free</div>
          </div>
          <div class="eco-stat-item">
            <div class="eco-stat-val">Zero</div>
            <div class="eco-stat-label">Plastic Packaging</div>
          </div>
        </div>
      </div>

      <div class="about-story-section" style="margin-bottom: 60px;">
        <div class="about-story-grid">
          <div class="about-story-text">
            <h2 class="about-section-heading">Our Ethical Philosophy</h2>
            <p class="about-paragraph">We believe luxury and ecological mindfulness should exist in complete harmony. In our Mangalore atelier, our master candlemakers blend therapeutic botanical essences with responsibly harvested ingredients.</p>
            <p class="about-paragraph">From our supply chain to your sanctuary, every step honors transparency, fair compensation for regional agricultural partners, and a profound respect for the natural world.</p>
          </div>
          <div class="about-story-image">
            <img src="assets/story_banner.png" alt="Artisanal Sustainable Candle Crafting" onerror="this.src='assets/story_banner.png'">
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderShippingReturnsPage() {
  const container = document.getElementById("shipping-returns-page-container");
  if (!container) return;

  const customContent = storeState.adminSettings.pages?.['shipping_returns'];
  if (customContent && typeof customContent === 'string') {
    container.innerHTML = customContent;
    return;
  }

  const s = (typeof customContent === 'object' && customContent) ? customContent : {};
  const bannerHtml = renderPageHeroHtml("shipping_returns") || `
    <div class="page-hero-banner">
      <div class="section-container">
        <span class="page-hero-subtitle">${s.subtitle || 'TRANSPARENT & COMPLIMENTARY'}</span>
        <h1 class="page-hero-title">${s.title || 'Shipping & Returns Policy'}</h1>
        <p class="page-hero-desc">${s.desc || 'Every handcrafted Chimini creation is packaged with extreme care to arrive safely at your doorstep. Enjoy complimentary luxury delivery across India and dedicated concierge assistance.'}</p>
      </div>
    </div>
  `;

  container.innerHTML = `
    ${bannerHtml}

    <div class="section-container">
      <div class="policy-grid">
        <!-- Shipping Policy -->
        <div class="policy-box animate-slide-up">
          <h2>📦 Shipping Policy</h2>
          
          <div class="policy-step-item">
            <div class="policy-step-icon">✨</div>
            <div class="policy-step-content">
              <h4>Complimentary Luxury Shipping</h4>
              <p>We are delighted to offer complimentary express shipping on all orders across India, with zero hidden transit fees.</p>
            </div>
          </div>

          <div class="policy-step-item">
            <div class="policy-step-icon">⏱️</div>
            <div class="policy-step-content">
              <h4>Dispatch Timelines</h4>
              <p>Every candle is freshly inspected and dispatched within <strong>24 to 48 business hours</strong> from our Mangalore atelier.</p>
            </div>
          </div>

          <div class="policy-step-item">
            <div class="policy-step-icon">🚚</div>
            <div class="policy-step-content">
              <h4>Delivery Durations</h4>
              <p><strong>Metro Hubs:</strong> 3 – 5 business days (Bangalore, Mumbai, Delhi, Chennai, Hyderabad, Kolkata).<br><strong>Regional Areas:</strong> 5 – 7 business days.</p>
            </div>
          </div>

          <div class="policy-step-item">
            <div class="policy-step-icon">📱</div>
            <div class="policy-step-content">
              <h4>Live WhatsApp & SMS Tracking</h4>
              <p>You will receive live tracking updates directly on WhatsApp and SMS the moment your order departs our sanctuary.</p>
            </div>
          </div>
        </div>

        <!-- Returns & Exchange Policy -->
        <div class="policy-box animate-slide-up">
          <h2>🔄 Returns & Exchanges</h2>

          <div class="policy-step-item">
            <div class="policy-step-icon">🛡️</div>
            <div class="policy-step-content">
              <h4>7-Day Return Privilege</h4>
              <p>We honor returns for unburned, undamaged candles in their original gold-embossed packaging within 7 days of delivery.</p>
            </div>
          </div>

          <div class="policy-step-item">
            <div class="policy-step-icon">💔</div>
            <div class="policy-step-content">
              <h4>Transit Damage Guarantee</h4>
              <p>If your vessel arrives broken or defective, we provide an immediate <strong>100% complimentary replacement</strong> upon receiving an unboxing photo within 48 hours.</p>
            </div>
          </div>

          <div class="policy-step-item">
            <div class="policy-step-icon">💬</div>
            <div class="policy-step-content">
              <h4>Effortless Concierge Returns</h4>
              <p>No complicated return portals. Simply message our Concierge at <strong>+91 74118 65577</strong> or email <strong>support@chimini.in</strong> with your Order ID.</p>
            </div>
          </div>

          <div class="policy-step-item">
            <div class="policy-step-icon">💳</div>
            <div class="policy-step-content">
              <h4>Refund Timelines</h4>
              <p>Approved refunds are processed back to your original payment mode (UPI/Bank) within 3 to 5 business days after inspection.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Concierge Banner -->
      <div class="faq-cta-box" style="margin-bottom: 60px;">
        <h3>Need Assistance with an Order?</h3>
        <p>Our dedicated Concierge team is available on WhatsApp to assist you with dispatch inquiries, address updates, or bespoke gifting.</p>
        <a href="https://wa.me/917411865577?text=Hello%20Chimini%20Concierge,%20I%20have%20a%20question%20about%20shipping%20and%20returns." target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
          💬 Chat with Concierge (+91 74118 65577)
        </a>
      </div>
    </div>
  `;
}

function renderFaqPage() {
  const container = document.getElementById("faq-page-container");
  if (!container) return;

  const customContent = storeState.adminSettings.pages?.['faq'];
  if (customContent && typeof customContent === 'string') {
    container.innerHTML = customContent;
    return;
  }

  const s = (typeof customContent === 'object' && customContent) ? customContent : {};
  const bannerHtml = renderPageHeroHtml("faq") || `
    <div class="page-hero-banner">
      <div class="section-container">
        <span class="page-hero-subtitle">${s.subtitle || 'FREQUENTLY ASKED QUESTIONS'}</span>
        <h1 class="page-hero-title">${s.title || 'Everything You Need to Know'}</h1>
        <p class="page-hero-desc">${s.desc || 'Find quick answers to common questions about our botanical soy candles, candle care, ordering process, WhatsApp checkout, and gifting.'}</p>
      </div>
    </div>
  `;

  const faqs = [
    {
      category: "🕯️ Candle Care & Burning",
      items: [
        {
          q: "How do I prevent my candle from tunneling?",
          a: "On the first burn, always allow the wax melt pool to reach the full circumference of the vessel (approximately 2 to 3 hours). Wax has memory; allowing a full melt pool ensures an even, flat burn throughout the candle's lifetime."
        },
        {
          q: "Why should I trim the wick before every lighting?",
          a: "Trimming the wick to 1/4 inch (6mm) before every burn prevents excess carbon buildup ('mushrooming'), eliminates black smoke, maintains a calm flame, and extends the burning life of your candle by up to 25%."
        },
        {
          q: "What makes Chimini 100% soy wax superior to paraffin?",
          a: "Paraffin wax is a byproduct of crude petroleum refinement that emits soot and synthetic chemicals. In contrast, Chimini uses 100% natural botanical soy wax, which burns 40-50% slower, cooler, and cleanly without releasing harmful toxins into your home."
        },
        {
          q: "How can I reuse the candle container when it finishes?",
          a: "When 1/2 inch of wax remains, pour warm soapy water to clean the vessel and wipe clean with a cloth. Our signature vessels make exquisite vanity brush holders, succulent planters, cocktail glasses, or tea-light holders."
        }
      ]
    },
    {
      category: "🛍️ Orders, Shipping & WhatsApp Checkout",
      items: [
        {
          q: "How does the WhatsApp checkout process work?",
          a: "When you click 'Proceed to Checkout' and confirm your details, your complete order summary is securely formatted and transferred to a WhatsApp chat with our Chimini Concierge team (+91 74118 65577). We confirm item availability and provide instant, verified payment links (UPI, Google Pay, NetBanking)."
        },
        {
          q: "Is shipping complimentary?",
          a: "Yes! We provide complimentary luxury shipping on all orders across India."
        },
        {
          q: "How long will my order take to arrive?",
          a: "Orders are freshly handcrafted and dispatched within 24 to 48 business hours. Deliveries to metro hubs take 3–5 business days, while regional pin codes take 5–7 business days with live WhatsApp tracking."
        },
        {
          q: "How do promotional coupon codes work?",
          a: "You can enter promotional coupon codes (such as CHIMINI10 or WELCOME15) directly in Step 1 of the checkout modal. The discount will instantly reflect on your subtotal before you place your order."
        }
      ]
    },
    {
      category: "🎁 Bespoke Hampers & Corporate Gifting",
      items: [
        {
          q: "Can I customize a bespoke gift hamper?",
          a: "Absolutely. Visit our Gifts page to build a customized gift hamper selecting your vessel style, botanical fragrance, luxury gift box, and personalized greeting card."
        },
        {
          q: "Do you offer corporate or bulk wedding favor discounts?",
          a: "Yes! We specialize in bespoke corporate gifting, festive hampers, and wedding return gifts with custom branding. Please reach out to us at chiminiofficial@gmail.com or WhatsApp +91 74118 65577 for volume pricing."
        }
      ]
    }
  ];

  let faqsHtml = '';
  faqs.forEach((cat, catIdx) => {
    faqsHtml += `<h3 class="faq-category-header">${cat.category}</h3>`;
    cat.items.forEach((item, itemIdx) => {
      faqsHtml += `
        <div class="faq-accordion-item" data-faq-id="${catIdx}-${itemIdx}">
          <button type="button" class="faq-question-btn">
            <span>${item.q}</span>
            <span class="faq-icon-chevron">▼</span>
          </button>
          <div class="faq-answer-panel">
            <p>${item.a}</p>
          </div>
        </div>
      `;
    });
  });

  container.innerHTML = `
    ${bannerHtml}

    <div class="section-container faq-container">
      ${faqsHtml}

      <div class="faq-cta-box animate-slide-up">
        <h3>Still Have a Question?</h3>
        <p>Our concierge team is available to help you choose fragrances, track shipments, or create custom gifts.</p>
        <a href="https://wa.me/917411865577?text=Hello%20Chimini%20Concierge,%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
          💬 Chat with Concierge (+91 74118 65577)
        </a>
      </div>
    </div>
  `;

  // Bind accordion clicks
  container.querySelectorAll(".faq-question-btn").forEach(btn => {
    btn.onclick = () => {
      const item = btn.closest(".faq-accordion-item");
      if (item) {
        const isActive = item.classList.contains("active");
        container.querySelectorAll(".faq-accordion-item").forEach(other => other.classList.remove("active"));
        if (!isActive) item.classList.add("active");
      }
    };
  });
}

function renderStoreLocatorPage() {
  const container = document.getElementById("store-locator-page-container");
  if (!container) return;

  const customContent = storeState.adminSettings.pages?.['store_locator'];
  if (customContent && typeof customContent === 'string') {
    container.innerHTML = customContent;
    return;
  }

  const s = (typeof customContent === 'object' && customContent) ? customContent : {};
  const bannerHtml = renderPageHeroHtml("store_locator") || `
    <div class="page-hero-banner">
      <div class="section-container">
        <span class="page-hero-subtitle">${s.subtitle || 'EXPERIENCE THE SANCTUARY'}</span>
        <h1 class="page-hero-title">${s.title || 'Atelier & Store Locator'}</h1>
        <p class="page-hero-desc">${s.desc || 'While Chimini operates primarily as a direct-to-consumer digital boutique delivering pan-India, you can learn about our crafting atelier in Mangalore or book a private appointment.'}</p>
      </div>
    </div>
  `;

  container.innerHTML = `
    ${bannerHtml}

    <div class="section-container">
      <div class="locator-layout">
        <!-- Main Atelier Card -->
        <div class="locator-card animate-slide-up">
          <span class="locator-badge">Crafting Atelier & Studio</span>
          <h2>Mangalore Atelier Studio</h2>
          
          <div class="locator-item">
            <div class="locator-icon">📍</div>
            <div class="locator-info">
              <strong>Studio Location</strong>
              <span>Mangalore, Karnataka, India</span>
            </div>
          </div>

          <div class="locator-item">
            <div class="locator-icon">🕒</div>
            <div class="locator-info">
              <strong>Operating & Concierge Hours</strong>
              <span>Monday – Saturday: 10:00 AM – 7:00 PM IST<br>Sunday: Closed for artisanal pouring</span>
            </div>
          </div>

          <div class="locator-item">
            <div class="locator-icon">📞</div>
            <div class="locator-info">
              <strong>Concierge Contact</strong>
              <span>+91 74118 65577 / +91 97418 55293</span>
            </div>
          </div>

          <div class="locator-item">
            <div class="locator-icon">✉️</div>
            <div class="locator-info">
              <strong>Direct Inquiries</strong>
              <span>chiminiofficial@gmail.com / support@chimini.in</span>
            </div>
          </div>

          <div style="margin-top: 24px; display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="https://wa.me/917411865577?text=Hello%20Chimini,%20I%20would%20like%20to%20inquire%20about%20a%20studio%20visit%20or%20bulk%20order." target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
              💬 Book Private Studio Appointment
            </a>
            <a href="shop.html" class="btn btn-secondary" style="text-decoration: none;">
              Explore Boutique Online
            </a>
          </div>
        </div>

        <!-- Online Sanctuary Card -->
        <div class="locator-perks-box animate-slide-up">
          <h3>Online Sanctuary Privileges</h3>

          <div class="locator-perk-item">
            <div class="locator-perk-dot"></div>
            <div class="locator-perk-text">
              <h4>Pan-India Express Delivery</h4>
              <p>Complimentary luxury shipping delivered safely to your doorstep anywhere in India.</p>
            </div>
          </div>

          <div class="locator-perk-item">
            <div class="locator-perk-dot"></div>
            <div class="locator-perk-text">
              <h4>Gold-Embossed Gift Packaging</h4>
              <p>Every order arrives encased in our signature luxury presentation box, ready for gifting.</p>
            </div>
          </div>

          <div class="locator-perk-item">
            <div class="locator-perk-dot"></div>
            <div class="locator-perk-text">
              <h4>1-on-1 Fragrance Consultation</h4>
              <p>Not sure which fragrance notes suit your mood or space? Chat with our scent sommelier on WhatsApp.</p>
            </div>
          </div>

          <div class="locator-perk-item">
            <div class="locator-perk-dot"></div>
            <div class="locator-perk-text">
              <h4>Pure Scent Purity Guarantee</h4>
              <p>100% natural botanical soy wax, zero phthalates, and lead-free cotton wicks.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// --- 4. SUPABASE DATA FETCHING ---
const SUPABASE_URL = "https://jvopwqkbtrupkayzfyvl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2b3B3cWtidHJ1cGtheXpmeXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDQwMjksImV4cCI6MjA5NjgyMDAyOX0.KHWIko4CvlGHDq8QPdNEFqPMXBFkfiZTn_wr9qXWguw";

async function fetchSupabaseData() {
  try {
    const headers = {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache'
    };

    // Parallel fetch for speed with no-store cache directive (clean PostgREST URLs)
    const [settingsRes, bannersRes, productsRes, categoriesRes, testimonialsRes, pagesRes, collectionsRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/settings?select=*`, { headers, cache: 'no-store' }),
      fetch(`${SUPABASE_URL}/rest/v1/banners?select=*&order=sort_order.asc`, { headers, cache: 'no-store' }),
      fetch(`${SUPABASE_URL}/rest/v1/products?select=*,categories(title)&is_published=eq.true&order=sort_order.asc`, { headers, cache: 'no-store' }),
      fetch(`${SUPABASE_URL}/rest/v1/categories?select=*&order=sort_order.asc`, { headers, cache: 'no-store' }),
      fetch(`${SUPABASE_URL}/rest/v1/testimonials?select=*&is_published=eq.true&order=sort_order.asc`, { headers, cache: 'no-store' }),
      fetch(`${SUPABASE_URL}/rest/v1/page_content?select=*`, { headers, cache: 'no-store' }),
      fetch(`${SUPABASE_URL}/rest/v1/collections?select=*&order=sort_order.asc`, { headers, cache: 'no-store' }).catch(() => ({ json: () => [] }))
    ]);

    const [settings, banners, products, categories, testimonials, pages, collections] = await Promise.all([
      settingsRes.json().catch(() => []),
      bannersRes.json().catch(() => []),
      productsRes.json().catch(() => []),
      categoriesRes.json().catch(() => []),
      testimonialsRes.json().catch(() => []),
      pagesRes.json().catch(() => []),
      collectionsRes.json ? collectionsRes.json().catch(() => []) : []
    ]);

    // Initialize mapped settings object
    const newSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

    // Store raw banners array directly on storeState
    if (Array.isArray(banners)) {
      storeState.banners = banners;
    }

    // Store live collections from Supabase
    if (Array.isArray(collections) && collections.length > 0) {
      storeState.collections = collections;
      newSettings.collections = collections.map(c => {
        const cTitle = c.title || c.name || '';
        const cSlug = cTitle.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
        const defaultLink = '/shop?category=' + encodeURIComponent(cSlug);
        const rawLink = c.link_url || c.link || '';
        const resolvedLink = (rawLink && rawLink !== '/shop' && rawLink !== '/shop?category=all' && !rawLink.startsWith('#'))
          ? rawLink
          : defaultLink;

        return {
          id: c.id,
          name: cTitle,
          title: cTitle,
          description: c.description || '',
          image: c.image_url || c.image || 'assets/campaign_banner.png',
          image_url: c.image_url || c.image || 'assets/campaign_banner.png',
          link: resolvedLink,
          link_url: resolvedLink,
          is_published: c.is_published !== false,
          is_featured: c.is_featured === true || c.is_featured === "true",
          sort_order: c.sort_order || 0
        };
      });
    }


    // Map Categories (Shop by Fragrance circles) from Supabase
    if (Array.isArray(categories) && categories.length > 0) {
      newSettings.categories = categories
        .filter(c => c.is_published !== false)
        .map(c => ({
          id: c.id,
          name: c.title || '',
          title: c.title || '',
          slug: c.slug || c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          image: c.image_url || 'assets/product_jasmine.png',
          image_url: c.image_url || 'assets/product_jasmine.png',
          sort_order: c.sort_order || 0
        }));
    }

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
        originalPrice: p.original_price || null,
        badge: (p.badges && p.badges.trim() !== '') ? p.badges.trim() : null,
        image: p.image_url || 'assets/product_jasmine.png',
        secondaryImage: p.secondary_image_url || p.image_url || 'assets/product_sandalwood.png',
        images: (Array.isArray(p.images) && p.images.length > 0)
          ? p.images
          : (p.image_url ? [p.image_url, p.secondary_image_url || 'assets/product_sandalwood.png', 'assets/product_rose.png', 'assets/product_fig.png'].filter(Boolean) : ['assets/product_jasmine.png']),
        category: p.categories?.title?.toLowerCase() || p.category || 'candles',
        categoryTitle: p.categories?.title || 'Artisanal Candles',
        fragrance_tag: p.fragrance_tag || '',
        collection_tag: p.collection_tag || '',
        fragrance: p.fragrance || 'Signature Botanical Blend',
        description: p.description || '',
        careInfo: p.care_info || '',
        shippingInfo: p.shipping_info || '',
        returnsInfo: p.returns_info || '',
        rating: p.rating || 4.9,
        reviewCount: p.review_count || 128,
        is_best_seller: p.is_best_seller || false,
        is_gift: p.is_gift || false
      }));
    }

    // Overwrite global store and persist in localStorage to prevent image flash on future page loads
    storeState.adminSettings = newSettings;
    try {
      localStorage.setItem("chimini_admin_settings", JSON.stringify(newSettings));
      if (Array.isArray(banners) && banners.length > 0) {
        localStorage.setItem("chimini_banners", JSON.stringify(banners));
      }
      if (Array.isArray(collections) && collections.length > 0) {
        localStorage.setItem("chimini_collections", JSON.stringify(collections));
      }
    } catch (cacheErr) {
      console.warn("Could not save store cache to localStorage:", cacheErr);
    }

  } catch (err) {
    console.error("Failed to load live Supabase data. Falling back to local data.", err);
  }
}

// Start everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  initStore();
  initAdminFields();

  // Fetch latest live data from Supabase in background without blocking initial DOM paint
  fetchSupabaseData().then(() => {
    initStore();
  initAuth();
});
});



// --- 10. PRODUCT DETAIL PAGE (PDP) RENDERER ---

function renderProductDetailPage() {
  const container = document.getElementById("product-page-container");
  if (!container) return;

  const products = (storeState.adminSettings && storeState.adminSettings.products) || [];
  if (products.length === 0) return;

  // Get product ID from URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const prodId = urlParams.get("id");

  // Find product or fallback to first product
  let product = products.find(p => p.id === prodId || String(p.id) === String(prodId));
  if (!product) {
    product = products[0];
  }

  // Page title update
  document.title = product.name + " | CHIMINI Luxury Scented Candles";

  // Determine gallery images
  let galleryImages = [];
  if (Array.isArray(product.images) && product.images.length > 0) {
    galleryImages = product.images;
  } else if (product.image) {
    galleryImages = [
      product.image,
      product.secondaryImage || 'assets/product_sandalwood.png',
      'assets/product_rose.png',
      'assets/product_fig.png'
    ].filter(Boolean);
  } else {
    galleryImages = ['assets/product_jasmine.png'];
  }

  // Pricing calculations
  const priceNum = parseFloat(product.price) || 0;
  const origPriceNum = product.originalPrice ? parseFloat(product.originalPrice) : null;
  const isDiscounted = (origPriceNum && origPriceNum > priceNum);
  const discountPercent = isDiscounted ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100) : null;

  // Scent swatches
  const swatches = getScentSwatches(product.name);

  // Badge text
  const badgeText = (product.badge && product.badge.trim() !== '') ? product.badge.trim() : null;

  // Wishlist state
  const isWishlisted = storeState.wishlist.includes(product.id);

  // Descriptions & Accordion Content with luxury fallback
  const descriptionText = product.description || ("Immerse your sanctuary in the transcendent warmth of " + product.name + ". Handcrafted with 100% natural botanical soy wax and infused with rare essential oils, this slow-burning candle fills your living spaces with an aura of understated luxury and serene calm.");

  const fragranceNotes = product.fragrance || 'Top: Night Blooming Flora · Heart: Warm Smoked Botanicals · Base: Aged Amber & Precious Woods';

  const careInfoText = product.careInfo || product.care_info || "• Wick Care: Trim wick to 1/4 inch (6mm) before each lighting to ensure a soot-free, even flame.\n• First Burn: Allow the melt pool to reach the full circumference of the vessel (2-3 hours) to prevent tunneling.\n• Safety: Never leave a burning candle unattended. Keep away from drafts, flammable materials, children, and pets.";

  const shippingInfoText = product.shippingInfo || product.shipping_info || "• Complimentary Luxury Shipping: On all orders over ₹100.\n• Dispatch Timeline: Handcrafted & dispatched within 24-48 business hours with live SMS & email tracking.\n• Bespoke Packaging: Securely encased in our signature gold-embossed ivory gift box.";

  const returnsInfoText = product.returnsInfo || product.returns_info || "• 7-Day Complimentary Returns: We honor returns for unburned, sealed items in original luxury packaging.\n• Concierge Support: Contact concierge@chimini.com or WhatsApp +91 97418 55293 for instant assistance.";

  // Related products (exclude current)
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 8);

  // Render Full PDP Template
  let relatedHtml = '';
  if (relatedProducts.length > 0) {
    relatedHtml = '<section class="pdp-related-section">' +
      '<div class="pdp-related-header-wrap">' +
      '<div>' +
      '<h2 class="pdp-related-title">You Might Also Like</h2>' +
      '<p class="pdp-related-subtitle">Handpicked luxury creations curated to complement your space.</p>' +
      '</div>' +
      '<div class="pdp-related-nav-btns">' +
      '<button type="button" class="pdp-nav-arrow-btn" id="pdp-related-prev" aria-label="Previous">&larr;</button>' +
      '<button type="button" class="pdp-nav-arrow-btn" id="pdp-related-next" aria-label="Next">&rarr;</button>' +
      '</div>' +
      '</div>' +
      '<div class="pdp-related-carousel" id="pdp-related-carousel">' +
      relatedProducts.map(rel => {
        const relPrice = parseFloat(rel.price) || 0;
        const relOrigPrice = rel.originalPrice ? parseFloat(rel.originalPrice) : null;
        const relIsDisc = (relOrigPrice && relOrigPrice > relPrice);
        const isRelWish = storeState.wishlist.includes(rel.id);

        return '<div class="pdp-related-card-item">' +
          '<div class="product-card">' +
          '<a href="/product?id=' + rel.id + '" class="product-image-wrapper" style="display:block; text-decoration:none;">' +
          (rel.badge ? '<span class="product-badge">' + rel.badge + '</span>' : '') +
          '<img src="' + rel.image + '" class="product-image-main" alt="' + rel.name + '" onerror="this.src=\'assets/product_jasmine.png\'">' +
          (rel.secondaryImage ? '<img src="' + rel.secondaryImage + '" class="product-image-hover" alt="' + rel.name + '" onerror="this.style.display=\'none\'">' : '') +
          '<button type="button" class="wishlist-toggle-btn ' + (isRelWish ? 'active' : '') + '" data-id="' + rel.id + '" aria-label="Wishlist">' +
          '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>' +
          '</button>' +
          '</a>' +
          '<div class="product-info">' +
          '<a href="/product?id=' + rel.id + '" style="text-decoration:none; color:inherit;">' +
          '<h3 class="product-name">' + rel.name + '</h3>' +
          '</a>' +
          '<div class="product-price-wrapper">' +
          '<span class="mrp-label">MRP: </span><span class="current-price">₹' + Number(relPrice).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + '</span>' +
          (relIsDisc ? ' <span class="original-price" style="text-decoration: line-through;">₹' + Number(relOrigPrice).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + '</span>' : '') +
          '</div>' +
          '<div style="font-size:0.75rem; color:#D4AF37; margin-top:4px;">★★★★★ 4.9</div>' +
          '</div>' +
          '</div>' +
          '</div>';
      }).join('') +
      '</div>' +
      '</section>';
  }

  container.innerHTML =
    '<div class="pdp-page-wrapper section-container">' +

    '<!-- Breadcrumb -->' +
    '<nav class="pdp-breadcrumb-container" aria-label="Breadcrumb">' +
    '<div class="pdp-breadcrumb">' +
    '<a href="/home">Home</a>' +
    '<span class="pdp-breadcrumb-sep">/</span>' +
    '<a href="/shop">Shop</a>' +
    '<span class="pdp-breadcrumb-sep">/</span>' +
    '<a href="/shop?category=' + encodeURIComponent(product.category || 'candles') + '">' + (product.categoryTitle || (product.category ? product.category.toUpperCase() : 'CANDLES')) + '</a>' +
    '<span class="pdp-breadcrumb-sep">/</span>' +
    '<span class="pdp-breadcrumb-current">' + product.name + '</span>' +
    '</div>' +
    '</nav>' +

    '<!-- Above The Fold Main 2-Column Grid -->' +
    '<div class="pdp-main-grid">' +

    '<!-- Left: Gallery Column -->' +
    '<div class="pdp-gallery-column">' +
    '<div class="pdp-main-image-card" id="pdp-main-card">' +
    (badgeText ? '<span class="pdp-badge-floating ' + (badgeText.includes('BEST') ? 'pdp-badge-gold' : '') + '">' + badgeText + '</span>' : '') +
    '<img src="' + galleryImages[0] + '" alt="' + product.name + '" class="pdp-main-image" id="pdp-active-image" onerror="this.src=\'assets/product_jasmine.png\'">' +
    '</div>' +

    '<!-- Thumbnails Row -->' +
    '<div class="pdp-thumbnails-strip" id="pdp-thumbs-container">' +
    galleryImages.map((img, idx) =>
      '<div class="pdp-thumb-item ' + (idx === 0 ? 'active' : '') + '" data-index="' + idx + '" data-src="' + img + '">' +
      '<img src="' + img + '" alt="' + product.name + ' view ' + (idx + 1) + '" onerror="this.src=\'assets/product_jasmine.png\'">' +
      '</div>'
    ).join('') +
    '</div>' +
    '</div>' +

    '<!-- Right: Information & Purchasing Column -->' +
    '<div class="pdp-info-column">' +

    '<div class="pdp-header-meta">' +
    '<span class="pdp-category-tag">' + (product.categoryTitle || 'ARTISANAL LUXURY') + '</span>' +
    '<button class="pdp-share-btn-top" id="pdp-open-share-btn">' +
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>' +
    '<span>Share</span>' +
    '</button>' +
    '</div>' +

    '<h1 class="pdp-product-title">' + product.name + '</h1>' +

    '<div class="pdp-rating-row">' +
    '<span class="pdp-stars">★★★★★</span>' +
    '<span class="pdp-rating-val">' + (product.rating || '4.9') + '</span>' +
    '<span class="pdp-rating-count">(' + (product.reviewCount || product.review_count || 128) + ' client reviews)</span>' +
    '<span class="pdp-stock-badge">In Stock</span>' +
    '</div>' +

    '<!-- Price -->' +
    '<div class="pdp-price-container">' +
    '<span class="pdp-price-current">₹' + Number(priceNum).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + '</span>' +
    (isDiscounted ?
      '<span class="pdp-price-original">₹' + Number(origPriceNum).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + '</span>' +
      '<span class="pdp-discount-badge">' + discountPercent + '% OFF</span>'
      : '') +
    '<span class="pdp-tax-note">Inclusive of all taxes</span>' +
    '</div>' +

    '<!-- Scent Notes / Variants Swatches -->' +
    '<div class="pdp-variant-section">' +
    '<div class="pdp-variant-title">' +
    '<span>Scent Profile: <strong id="pdp-active-scent-label">' + (swatches[0]?.name || 'Signature Aroma') + '</strong></span>' +
    '</div>' +
    '<div class="pdp-swatches-row" id="pdp-swatches-container">' +
    swatches.map((s, idx) =>
      '<button type="button" class="pdp-swatch-chip ' + (idx === 0 ? 'active' : '') + '" data-name="' + s.name + '">' +
      '<span class="swatch-color-dot" style="background-color: ' + s.color + ';"></span>' +
      '<span>' + s.name + '</span>' +
      '</button>'
    ).join('') +
    '</div>' +
    '</div>' +

    '<!-- Action Buttons: Quantity, Add to Cart, Wishlist -->' +
    '<div class="pdp-actions-wrapper">' +
    '<div class="pdp-qty-picker">' +
    '<button type="button" class="pdp-qty-btn" id="pdp-qty-minus" aria-label="Decrease quantity">&minus;</button>' +
    '<input type="number" class="pdp-qty-input" id="pdp-qty-val" value="1" min="1" max="99" readonly>' +
    '<button type="button" class="pdp-qty-btn" id="pdp-qty-plus" aria-label="Increase quantity">&plus;</button>' +
    '</div>' +

    '<button type="button" class="pdp-add-cart-btn" id="pdp-add-to-cart-btn">' +
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>' +
    '<span>Add to Cart &bull; ₹' + Number(priceNum).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + '</span>' +
    '</button>' +

    '<button type="button" class="pdp-wishlist-btn-main ' + (isWishlisted ? 'active' : '') + '" id="pdp-wishlist-toggle-btn" aria-label="Add to Wishlist">' +
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="' + (isWishlisted ? '#8C6A3D' : 'none') + '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>' +
    '<span>' + (isWishlisted ? 'Saved' : 'Wishlist') + '</span>' +
    '</button>' +
    '</div>' +

    '<!-- Value Pillars -->' +
    '<div class="pdp-value-pillars">' +
    '<div class="pdp-pillar-item">' +
    '<span class="pdp-pillar-icon">🌿</span>' +
    '<span>100% Botanical Soy</span>' +
    '</div>' +
    '<div class="pdp-pillar-item">' +
    '<span class="pdp-pillar-icon">✨</span>' +
    '<span>50+ Hour Clean Burn</span>' +
    '</div>' +
    '<div class="pdp-pillar-item">' +
    '<span class="pdp-pillar-icon">🚚</span>' +
    '<span>Free Luxury Shipping</span>' +
    '</div>' +
    '</div>' +

    '<!-- Accordions -->' +
    '<div class="pdp-accordion-group">' +

    '<!-- 1. Description -->' +
    '<div class="pdp-accordion-item open">' +
    '<button type="button" class="pdp-accordion-trigger">' +
    '<span>Description & Olfactory Notes</span>' +
    '<span class="pdp-accordion-icon">&plus;</span>' +
    '</button>' +
    '<div class="pdp-accordion-content">' +
    '<p style="margin-bottom: 12px;">' + descriptionText.replace(/\n/g, '<br>') + '</p>' +
    '<div style="padding: 12px; background: #FAF8F5; border-radius: 6px; border-left: 3px solid var(--color-gold, #C5A880);">' +
    '<strong>Fragrance Notes:</strong> ' + fragranceNotes +
    '</div>' +
    '</div>' +
    '</div>' +

    '<!-- 2. Product Information & Care -->' +
    '<div class="pdp-accordion-item">' +
    '<button type="button" class="pdp-accordion-trigger">' +
    '<span>Product Information & Care</span>' +
    '<span class="pdp-accordion-icon">&plus;</span>' +
    '</button>' +
    '<div class="pdp-accordion-content">' +
    '<p style="white-space: pre-line;">' + careInfoText + '</p>' +
    '</div>' +
    '</div>' +

    '<!-- 3. Shipping Information -->' +
    '<div class="pdp-accordion-item">' +
    '<button type="button" class="pdp-accordion-trigger">' +
    '<span>Shipping Information</span>' +
    '<span class="pdp-accordion-icon">&plus;</span>' +
    '</button>' +
    '<div class="pdp-accordion-content">' +
    '<p style="white-space: pre-line;">' + shippingInfoText + '</p>' +
    '</div>' +
    '</div>' +

    '<!-- 4. Returns & Exchanges -->' +
    '<div class="pdp-accordion-item">' +
    '<button type="button" class="pdp-accordion-trigger">' +
    '<span>Returns & Exchanges</span>' +
    '<span class="pdp-accordion-icon">&plus;</span>' +
    '</button>' +
    '<div class="pdp-accordion-content">' +
    '<p style="white-space: pre-line;">' + returnsInfoText + '</p>' +
    '</div>' +
    '</div>' +

    '</div>' +

    '</div>' +

    '</div>' +

    '<!-- Below The Fold: You Might Also Like Section -->' +
    relatedHtml +

    '</div>';

  // --- BIND PDP INTERACTIVE BEHAVIORS ---

  // 1. Thumbnail Clicking
  const mainImg = document.getElementById("pdp-active-image");
  const thumbs = container.querySelectorAll(".pdp-thumb-item");
  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      const targetSrc = thumb.getAttribute("data-src");
      if (mainImg && targetSrc) {
        mainImg.style.opacity = '0.3';
        setTimeout(() => {
          mainImg.src = targetSrc;
          mainImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  // 2. Scent Swatches Selection
  let selectedVariant = swatches[0]?.name || 'Signature';
  const swatchBtns = container.querySelectorAll(".pdp-swatch-chip");
  const scentLabel = document.getElementById("pdp-active-scent-label");
  swatchBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      swatchBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedVariant = btn.getAttribute("data-name");
      if (scentLabel) scentLabel.textContent = selectedVariant;
    });
  });

  // 3. Quantity Controls
  const qtyInput = document.getElementById("pdp-qty-val");
  const minusBtn = document.getElementById("pdp-qty-minus");
  const plusBtn = document.getElementById("pdp-qty-plus");
  const addCartBtn = document.getElementById("pdp-add-to-cart-btn");

  const updateCartBtnText = () => {
    const qty = parseInt(qtyInput.value) || 1;
    const total = priceNum * qty;
    if (addCartBtn) {
      addCartBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> <span>Add to Cart &bull; ₹' + Number(total).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + '</span>';
    }
  };

  if (minusBtn && qtyInput) {
    minusBtn.addEventListener("click", () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) {
        qtyInput.value = val - 1;
        updateCartBtnText();
      }
    });
  }

  if (plusBtn && qtyInput) {
    plusBtn.addEventListener("click", () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val < 99) {
        qtyInput.value = val + 1;
        updateCartBtnText();
      }
    });
  }

  // 4. Add to Cart Action
  if (addCartBtn) {
    addCartBtn.addEventListener("click", () => {
      const qty = parseInt(qtyInput ? qtyInput.value : 1) || 1;
      for (let i = 0; i < qty; i++) {
        addToCart(product.id);
      }
      showToast(qty + "x " + product.name + " added to cart");
    });
  }

  // 5. Wishlist Action
  const pdpWishlistBtn = document.getElementById("pdp-wishlist-toggle-btn");
  if (pdpWishlistBtn) {
    pdpWishlistBtn.addEventListener("click", () => {
      toggleWishlist(product.id);
      const isNowWishlisted = storeState.wishlist.includes(product.id);
      pdpWishlistBtn.classList.toggle("active", isNowWishlisted);
      pdpWishlistBtn.querySelector("span").textContent = isNowWishlisted ? "Saved" : "Wishlist";
      const svg = pdpWishlistBtn.querySelector("svg");
      if (svg) svg.setAttribute("fill", isNowWishlisted ? "#8C6A3D" : "none");
    });
  }

  // 6. Accordion Toggles
  const accordionTriggers = container.querySelectorAll(".pdp-accordion-trigger");
  accordionTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const item = trigger.parentElement;
      item.classList.toggle("open");
    });
  });

  // 7. Share Modal Controls
  const shareModal = document.getElementById("share-modal");
  const openShareBtn = document.getElementById("pdp-open-share-btn");
  const closeShareBtn = document.getElementById("close-share-modal");
  const shareUrlInput = document.getElementById("share-url-input");
  const copyShareBtn = document.getElementById("copy-share-url-btn");
  const sharePreview = document.getElementById("share-product-preview");

  if (openShareBtn && shareModal) {
    const fullUrl = window.location.href;
    if (shareUrlInput) shareUrlInput.value = fullUrl;

    if (sharePreview) {
      sharePreview.innerHTML =
        '<img src="' + galleryImages[0] + '" alt="' + product.name + '" onerror="this.src=\'assets/product_jasmine.png\'">' +
        '<div>' +
        '<strong style="display:block; font-size:0.92rem; color:#2C221E;">' + product.name + '</strong>' +
        '<span style="font-size:0.8rem; color:#8C827A;">₹' + Number(priceNum).toLocaleString('en-IN', { maximumFractionDigits: 0 }) + ' &bull; Handcrafted Luxury</span>' +
        '</div>';
    }

    // Social Links
    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedText = encodeURIComponent("Discover " + product.name + " luxury scented candle from CHIMINI:");
    const waBtn = document.getElementById("share-whatsapp-btn");
    const fbBtn = document.getElementById("share-facebook-btn");
    const twBtn = document.getElementById("share-twitter-btn");
    const emBtn = document.getElementById("share-email-btn");

    if (waBtn) waBtn.href = "https://api.whatsapp.com/send?text=" + encodedText + "%20" + encodedUrl;
    if (fbBtn) fbBtn.href = "https://www.facebook.com/sharer/sharer.php?u=" + encodedUrl;
    if (twBtn) twBtn.href = "https://twitter.com/intent/tweet?text=" + encodedText + "&url=" + encodedUrl;
    if (emBtn) emBtn.href = "mailto:?subject=" + encodeURIComponent(product.name + ' - CHIMINI Luxury') + "&body=" + encodedText + "%0A%0A" + encodedUrl;

    openShareBtn.addEventListener("click", () => {
      shareModal.style.display = "flex";
    });

    if (closeShareBtn) {
      closeShareBtn.addEventListener("click", () => {
        shareModal.style.display = "none";
      });
    }

    shareModal.addEventListener("click", (e) => {
      if (e.target === shareModal) shareModal.style.display = "none";
    });

    if (copyShareBtn && shareUrlInput) {
      copyShareBtn.addEventListener("click", () => {
        shareUrlInput.select();
        navigator.clipboard.writeText(shareUrlInput.value);
        copyShareBtn.textContent = "Copied ✓";
        setTimeout(() => { copyShareBtn.textContent = "Copy Link"; }, 2000);
      });
    }
  }

  // 8. Related Products Carousel Navigation
  const carousel = document.getElementById("pdp-related-carousel");
  const prevBtn = document.getElementById("pdp-related-prev");
  const nextBtn = document.getElementById("pdp-related-next");

  if (carousel && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -320, behavior: "smooth" });
    });
    nextBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: 320, behavior: "smooth" });
    });
  }

  // Bind wishlist buttons in related products
  container.querySelectorAll(".wishlist-toggle-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const id = btn.getAttribute("data-id");
      if (id) toggleWishlist(id);
    });
  });
}


// ==========================================================================

// ==========================================================================
// 8. CUSTOMER AUTHENTICATION ENGINE (Supabase Auth + Email OTP + Session)
// ==========================================================================

let supabaseAuthClient = null;
try {
  if (typeof supabase !== 'undefined' && supabase.createClient) {
    supabaseAuthClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  }
} catch (e) {
  console.warn("Supabase Auth client initialization deferred:", e);
}

let otpCountdownInterval = null;
let resetOtpCountdownInterval = null;

function initAuth() {
  if (!supabaseAuthClient) {
    try {
      if (typeof supabase !== 'undefined' && supabase.createClient) {
        supabaseAuthClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      }
    } catch (e) {}
  }

  if (supabaseAuthClient) {
    // Listen to real-time auth changes
    supabaseAuthClient.auth.onAuthStateChange((event, session) => {
      if (session && session.user) {
        storeState.currentUser = session.user;
        updateAccountUI(session.user);

        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          const userMeta = session.user.user_metadata || {};
          const isGoogle = session.user.app_metadata?.provider === 'google' || userMeta.avatar_url;
          syncUserToGoogleSheet({
            name: userMeta.full_name || userMeta.name || session.user.email.split('@')[0],
            phone: userMeta.phone || (isGoogle ? "Google Account" : "Not provided"),
            email: session.user.email,
            type: isGoogle ? "Google OAuth" : "Login"
          });
        }
      } else {
        storeState.currentUser = null;
        updateAccountUI(null);
      }
    });

    // Check existing session
    supabaseAuthClient.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user) {
        storeState.currentUser = session.user;
        updateAccountUI(session.user);
      } else {
        storeState.currentUser = null;
        updateAccountUI(null);
      }
    }).catch(err => console.warn("Session check error:", err));
  }

  bindAuthModalEvents();
  bindCheckoutModalEvents();
}

function updateAccountUI(user) {
  const accountBtns = document.querySelectorAll("#account-btn");
  accountBtns.forEach(btn => {
    let indicator = btn.querySelector(".user-logged-in-indicator");
    if (user) {
      btn.style.position = "relative";
      if (!indicator) {
        indicator = document.createElement("span");
        indicator.className = "user-logged-in-indicator";
        btn.appendChild(indicator);
      }
      btn.setAttribute("title", user.user_metadata?.full_name || user.email);
    } else {
      if (indicator) indicator.remove();
      btn.removeAttribute("title");
    }
  });
}

function openAuthModal(view = 'login', isGate = false) {
  const modal = document.getElementById("auth-modal");
  if (!modal) return;

  const gateNotice = document.getElementById("auth-gate-notice");
  if (gateNotice) {
    gateNotice.style.display = isGate ? "block" : "none";
  }

  clearAuthAlert();
  switchAuthView(view);

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeAuthModal() {
  const modal = document.getElementById("auth-modal");
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  clearAuthAlert();
  if (otpCountdownInterval) {
    clearInterval(otpCountdownInterval);
    otpCountdownInterval = null;
  }
}

function switchAuthView(viewName) {
  clearAuthAlert();
  const views = document.querySelectorAll(".auth-view");
  views.forEach(v => v.classList.remove("active"));

  const targetView = document.getElementById("auth-view-" + viewName);
  if (targetView) targetView.classList.add("active");

  // Sync tab active states across all views
  document.querySelectorAll(".auth-tab").forEach(tab => {
    const tabTarget = tab.getAttribute("data-tab");
    if (tabTarget === viewName) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  const subtitle = document.getElementById("auth-modal-subtitle");
  if (subtitle) {
    if (viewName === 'signup') subtitle.textContent = "Join Chimini Sanctuary";
    else if (viewName === 'otp') subtitle.textContent = "Verify Security Code";
    else if (viewName === 'forgot') subtitle.textContent = "Recover Your Password";
    else if (viewName === 'reset') subtitle.textContent = "Create New Password";
    else if (viewName === 'profile') subtitle.textContent = "Artisanal Client Account";
    else subtitle.textContent = "Welcome to Artisanal Luxury";
  }

  // Populate profile info if viewing profile
  if (viewName === 'profile' && storeState.currentUser) {
    const user = storeState.currentUser;
    const meta = user.user_metadata || {};
    const name = meta.full_name || user.email.split('@')[0];
    const phone = meta.phone || "Not provided";

    const nameEl = document.getElementById("profile-user-name");
    const emailEl = document.getElementById("profile-user-email");
    const phoneEl = document.getElementById("profile-user-phone");
    const avatarEl = document.getElementById("user-avatar-initials");

    if (nameEl) nameEl.textContent = name;
    if (emailEl) emailEl.textContent = user.email;
    if (phoneEl) phoneEl.textContent = phone;
    if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();
  }

  // Auto focus appropriate input
  if (viewName === 'otp') {
    const firstDigit = document.querySelector(".otp-digit[data-idx='0']");
    if (firstDigit) setTimeout(() => firstDigit.focus(), 100);
  } else if (viewName === 'forgot') {
    const forgotInput = document.getElementById("forgot-email");
    if (forgotInput) setTimeout(() => forgotInput.focus(), 100);
  } else if (viewName === 'reset') {
    const firstResetDigit = document.querySelector(".reset-otp-digit[data-idx='0']");
    if (firstResetDigit) setTimeout(() => firstResetDigit.focus(), 100);
  } else if (viewName === 'signup') {
    const nameInput = document.getElementById("signup-name");
    if (nameInput) setTimeout(() => nameInput.focus(), 100);
  } else if (viewName === 'login') {
    const loginInput = document.getElementById("login-email");
    if (loginInput) setTimeout(() => loginInput.focus(), 100);
  }
}

function setAuthAlert(message, type = 'error') {
  const alert = document.getElementById("auth-alert");
  if (!alert) return;
  alert.textContent = message;
  alert.className = "auth-alert " + type;
  alert.style.display = "block";
}

function clearAuthAlert() {
  const alert = document.getElementById("auth-alert");
  if (alert) {
    alert.style.display = "none";
    alert.textContent = "";
    alert.className = "auth-alert";
  }
}


function startResetOtpTimer() {
  const countdownEl = document.getElementById("reset-countdown");
  const resendBtn = document.getElementById("btn-resend-reset-otp");
  if (!countdownEl || !resendBtn) return;

  if (resetOtpCountdownInterval) clearInterval(resetOtpCountdownInterval);

  let seconds = 60;
  resendBtn.disabled = true;
  countdownEl.textContent = seconds;

  resetOtpCountdownInterval = setInterval(() => {
    seconds--;
    countdownEl.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(resetOtpCountdownInterval);
      resendBtn.disabled = false;
      resendBtn.innerHTML = "Resend Code";
    }
  }, 1000);
}

function startOtpTimer() {
  const countdownEl = document.getElementById("resend-countdown");
  const resendBtn = document.getElementById("btn-resend-otp");
  if (!countdownEl || !resendBtn) return;

  if (otpCountdownInterval) clearInterval(otpCountdownInterval);

  let seconds = 60;
  resendBtn.disabled = true;
  countdownEl.textContent = seconds;

  otpCountdownInterval = setInterval(() => {
    seconds--;
    countdownEl.textContent = seconds;
    if (seconds <= 0) {
      clearInterval(otpCountdownInterval);
      otpCountdownInterval = null;
      resendBtn.disabled = false;
      resendBtn.textContent = "Resend Code";
    }
  }, 1000);
}

function bindAuthModalEvents() {
  // Close Modal
  const closeBtn = document.getElementById("close-auth-modal");
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.preventDefault();
      closeAuthModal();
    };
  }

  const modal = document.getElementById("auth-modal");
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) closeAuthModal();
    };
  }

  // Header Account Button Click
  const accountBtns = document.querySelectorAll("#account-btn");
  accountBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      if (storeState.currentUser) {
        openAuthModal('profile', false);
      } else {
        openAuthModal('login', false);
      }
    };
  });

  // Tab & Switch Buttons (delegate to ensure clicks are always caught)
  document.querySelectorAll(".auth-tab, .auth-switch-btn").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const target = btn.getAttribute("data-tab") || btn.getAttribute("data-switch");
      if (target) switchAuthView(target);
    };
  });

  // Toggle Password Visibility
  document.querySelectorAll(".auth-toggle-pwd").forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const targetId = btn.getAttribute("data-target");
      const input = document.getElementById(targetId);
      if (input) {
        const isPassword = input.type === "password";
        input.type = isPassword ? "text" : "password";
        btn.innerHTML = isPassword ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>' : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
        btn.setAttribute("title", isPassword ? "Hide password" : "Show password");
        btn.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
      }
    };
  });

  // Sign Up Form Submission
  const signupForm = document.getElementById("auth-signup-form");
  if (signupForm) {
    signupForm.onsubmit = async (e) => {
      e.preventDefault();
      clearAuthAlert();

      const name = document.getElementById("signup-name").value.trim();
      const phone = document.getElementById("signup-phone").value.trim();
      const email = document.getElementById("signup-email").value.trim().toLowerCase();
      const password = document.getElementById("signup-password").value;
      const submitBtn = document.getElementById("btn-signup-submit");

      if (!name || !phone || !email || !password) {
        setAuthAlert("Please fill in all required fields.", "error");
        return;
      }

      if (password.length < 6) {
        setAuthAlert("Password must be at least 6 characters.", "error");
        return;
      }

      if (!supabaseAuthClient) {
        setAuthAlert("Authentication service is temporarily unavailable. Please try again later.", "error");
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Sending OTP...</span>";

      try {
        const { data, error } = await supabaseAuthClient.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              phone: phone
            }
          }
        });

        if (error) {
          // Supabase error code for already-registered emails
          if (
            error.message?.toLowerCase().includes("already registered") ||
            error.message?.toLowerCase().includes("email already") ||
            error.message?.toLowerCase().includes("user already registered") ||
            error.code === "user_already_exists" ||
            error.status === 422
          ) {
            // Already-registered — do NOT silently proceed; send user to login
            setAuthAlert("This email is already registered. Please sign in instead.", "error");
            setTimeout(() => {
              switchAuthView('login');
              const loginEmailEl = document.getElementById("login-email");
              if (loginEmailEl) loginEmailEl.value = email;
              const loginPasswordEl = document.getElementById("login-password");
              if (loginPasswordEl) loginPasswordEl.focus();
            }, 1400);
            return;
          }
          throw error;
        }

        // Supabase sometimes returns data.user with identities=[] for already-confirmed emails
        // (it doesn't error, it just returns an empty identity array)
        if (data && data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
          setAuthAlert("This email is already registered with Chimini. Please sign in instead.", "error");
          setTimeout(() => {
            switchAuthView('login');
            const loginEmailEl = document.getElementById("login-email");
            if (loginEmailEl) loginEmailEl.value = email;
            const loginPasswordEl = document.getElementById("login-password");
            if (loginPasswordEl) loginPasswordEl.focus();
          }, 1400);
          return;
        }

        storeState.otpEmail = email;
        storeState.pendingSignupMeta = { name, phone, email };
        const targetEmailEl = document.getElementById("otp-target-email");
        if (targetEmailEl) targetEmailEl.textContent = email;

        // Reset digits
        document.querySelectorAll(".otp-digit").forEach(d => d.value = "");

        switchAuthView('otp');
        startOtpTimer();
        setAuthAlert("Verification code sent! Please check your email inbox (and spam folder).", "success");

      } catch (err) {
        console.error("Signup error:", err);
        setAuthAlert(err.message || "Failed to create account. Please try again.", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    };
  }

  // OTP Form Submission & Verification
  const otpForm = document.getElementById("auth-otp-form");
  if (otpForm) {
    otpForm.onsubmit = async (e) => {
      e.preventDefault();
      clearAuthAlert();

      const digits = Array.from(document.querySelectorAll(".otp-digit")).map(d => d.value.trim()).join("");
      if (digits.length !== 6) {
        setAuthAlert("Please enter the complete 6-digit verification code.", "error");
        return;
      }

      if (!storeState.otpEmail) {
        setAuthAlert("Session expired. Please sign up again.", "error");
        switchAuthView('signup');
        return;
      }

      const submitBtn = document.getElementById("btn-verify-otp-submit");
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Verifying...</span>";

      try {
        const { data, error } = await supabaseAuthClient.auth.verifyOtp({
          email: storeState.otpEmail,
          token: digits,
          type: 'signup'
        });

        if (error) {
          // Fallback verify type for email confirmation token
          const fallback = await supabaseAuthClient.auth.verifyOtp({
            email: storeState.otpEmail,
            token: digits,
            type: 'email'
          });
          if (fallback.error) throw error;
        }

        const user = data?.user || (await supabaseAuthClient.auth.getUser()).data?.user;
        storeState.currentUser = user;
        updateAccountUI(user);

        // Sync new verified user to Google Sheet
        const meta = (user && user.user_metadata) || storeState.pendingSignupMeta || {};
        syncUserToGoogleSheet({
          name: meta.full_name || meta.name || user?.email?.split('@')[0] || "Valued Client",
          phone: meta.phone || "Not provided",
          email: user?.email || storeState.otpEmail,
          type: "Signup (Verified)"
        });

        closeAuthModal();
        const userName = user?.user_metadata?.full_name || "Valued Client";
        showToast("✨ Welcome to Chimini, " + userName + "! Your account is verified.");

        // Check if there is a pending checkout
        if (storeState.pendingCheckout) {
          storeState.pendingCheckout = false;
          triggerCheckoutSuccess();
        }

      } catch (err) {
        console.error("OTP verification error:", err);
        setAuthAlert(err.message || "Invalid or expired verification code. Please check your email or request a new code.", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    };
  }

  // OTP Digits Auto-focus & Paste Handling
  const digitInputs = document.querySelectorAll(".otp-digit");
  digitInputs.forEach((input, idx) => {
    input.oninput = (e) => {
      const val = e.target.value;
      if (val.length >= 1) {
        e.target.value = val.slice(0, 1);
        if (idx < digitInputs.length - 1) {
          digitInputs[idx + 1].focus();
        }
      }
    };

    input.onkeydown = (e) => {
      if (e.key === "Backspace" && !e.target.value && idx > 0) {
        digitInputs[idx - 1].focus();
      }
    };

    input.onpaste = (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData("text").trim();
      if (/^\d{6}$/.test(pasted)) {
        pasted.split("").forEach((char, i) => {
          if (digitInputs[i]) digitInputs[i].value = char;
        });
        digitInputs[digitInputs.length - 1].focus();
      }
    };
  });

  // Resend OTP Button
  const resendBtn = document.getElementById("btn-resend-otp");
  if (resendBtn) {
    resendBtn.onclick = async () => {
      if (!storeState.otpEmail || !supabaseAuthClient) return;
      resendBtn.disabled = true;
      try {
        const { error } = await supabaseAuthClient.auth.resend({
          type: 'signup',
          email: storeState.otpEmail
        });
        if (error) throw error;
        startOtpTimer();
        setAuthAlert("A fresh 6-digit code has been dispatched to your email from support@chimini.in.", "success");
      } catch (err) {
        setAuthAlert(err.message || "Could not resend OTP. Please wait a moment and try again.", "error");
        resendBtn.disabled = false;
      }
    };
  }

  // Change Email Button
  const changeEmailBtn = document.getElementById("btn-change-email");
  if (changeEmailBtn) {
    changeEmailBtn.onclick = () => switchAuthView('signup');
  }

  // Login Form Submission with Automatic Redirect for Unregistered Users
  const loginForm = document.getElementById("auth-login-form");
  if (loginForm) {
    loginForm.onsubmit = async (e) => {
      e.preventDefault();
      clearAuthAlert();

      const email = document.getElementById("login-email").value.trim().toLowerCase();
      const password = document.getElementById("login-password").value;
      const submitBtn = document.getElementById("btn-login-submit");

      if (!email || !password) {
        setAuthAlert("Please enter your email and password.", "error");
        return;
      }

      if (!supabaseAuthClient) {
        setAuthAlert("Authentication service is temporarily unavailable. Please try again later.", "error");
        return;
      }

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Signing In...</span>";

      try {
        const { data, error } = await supabaseAuthClient.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        storeState.currentUser = data.user;
        updateAccountUI(data.user);

        // Sync logged in user to Google Sheet
        const loginMeta = data.user.user_metadata || {};
        syncUserToGoogleSheet({
          name: loginMeta.full_name || loginMeta.name || data.user.email.split('@')[0],
          phone: loginMeta.phone || "Not provided",
          email: data.user.email,
          type: "Login"
        });

        closeAuthModal();
        const userName = data.user?.user_metadata?.full_name || "Valued Client";
        showToast("✨ Welcome back, " + userName + "!");

        // Check if there is a pending checkout
        if (storeState.pendingCheckout) {
          storeState.pendingCheckout = false;
          triggerCheckoutSuccess();
        }

      } catch (err) {
        console.error("Login error:", err);
        const errMsg = (err.message || "").toLowerCase();

        if (errMsg.includes("email not confirmed")) {
          storeState.otpEmail = email;
          const targetEmailEl = document.getElementById("otp-target-email");
          if (targetEmailEl) targetEmailEl.textContent = email;
          switchAuthView('otp');
          startOtpTimer();
          setAuthAlert("Your email is not verified yet. A verification code is required.", "error");
        } else if (
          errMsg.includes("invalid login credentials") ||
          errMsg.includes("invalid credentials") ||
          errMsg.includes("wrong password") ||
          errMsg.includes("incorrect password")
        ) {
          // Registered user, wrong password — stay on login tab
          setAuthAlert("Incorrect password. Please try again, or use 'Forgot Password' to reset it.", "error");
        } else if (
          errMsg.includes("user not found") ||
          errMsg.includes("no user found") ||
          errMsg.includes("email not found") ||
          errMsg.includes("unable to validate") ||
          errMsg.includes("no account") ||
          errMsg.includes("does not exist")
        ) {
          // Truly unregistered email — guide to signup
          switchAuthView('signup');
          const signupEmailEl = document.getElementById("signup-email");
          if (signupEmailEl) signupEmailEl.value = email;
          const signupNameEl = document.getElementById("signup-name");
          if (signupNameEl) setTimeout(() => signupNameEl.focus(), 150);
          setAuthAlert("No account found for this email. Please fill in your name and phone number below to create your Chimini account.", "info");
        } else {
          // Generic / network error — stay on login, show message
          setAuthAlert("Login failed: " + (err.message || "Please check your credentials and try again."), "error");
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    };
  }

  
  // Google OAuth Handlers
  const handleGoogleAuth = async () => {
    if (!supabaseAuthClient) {
      setAuthAlert("Authentication service is temporarily unavailable. Please try again later.", "error");
      return;
    }
    try {
      const redirectUrl = window.location.origin + window.location.pathname;
      const { data, error } = await supabaseAuthClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });
      if (error) throw error;
    } catch (err) {
      console.error("Google Auth error:", err);
      setAuthAlert(err.message || "Failed to initiate Google sign in. Please try again.", "error");
    }
  };

  const googleLoginBtn = document.getElementById("btn-google-login");
  if (googleLoginBtn) googleLoginBtn.onclick = handleGoogleAuth;
  const googleSignupBtn = document.getElementById("btn-google-signup");
  if (googleSignupBtn) googleSignupBtn.onclick = handleGoogleAuth;

  // Forgot Password Link Click
  const forgotBtn = document.getElementById("btn-forgot-password");
  if (forgotBtn) {
    forgotBtn.onclick = (e) => {
      e.preventDefault();
      clearAuthAlert();
      const loginEmail = document.getElementById("login-email")?.value.trim();
      const forgotEmailInput = document.getElementById("forgot-email");
      if (loginEmail && forgotEmailInput) forgotEmailInput.value = loginEmail;
      switchAuthView('forgot');
    };
  }

  // Back to Forgot Email Request
  const backToForgotBtn = document.getElementById("btn-back-to-forgot");
  if (backToForgotBtn) {
    backToForgotBtn.onclick = (e) => {
      e.preventDefault();
      switchAuthView('forgot');
    };
  }

  // Forgot Password Form Submission (Sends 6-digit Recovery OTP)
  const forgotForm = document.getElementById("auth-forgot-form");
  if (forgotForm) {
    forgotForm.onsubmit = async (e) => {
      e.preventDefault();
      clearAuthAlert();

      const email = document.getElementById("forgot-email").value.trim().toLowerCase();
      const submitBtn = document.getElementById("btn-forgot-submit");

      if (!email) {
        setAuthAlert("Please enter your registered email address.", "error");
        return;
      }

      if (!supabaseAuthClient) {
        setAuthAlert("Authentication service is temporarily unavailable.", "error");
        return;
      }

      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Sending Recovery Code...</span>";

      try {
        const { data, error } = await supabaseAuthClient.auth.resetPasswordForEmail(email);
        if (error) throw error;

        storeState.resetEmail = email;
        const targetEmailEl = document.getElementById("reset-target-email");
        if (targetEmailEl) targetEmailEl.textContent = email;

        // Reset digits & password fields
        document.querySelectorAll(".reset-otp-digit").forEach(d => d.value = "");
        const newPwdInput = document.getElementById("reset-new-password");
        if (newPwdInput) newPwdInput.value = "";

        switchAuthView('reset');
        startResetOtpTimer();
        setAuthAlert("A 6-digit recovery code has been sent to your email from support@chimini.in.", "success");
      } catch (err) {
        console.error("Forgot password error:", err);
        setAuthAlert(err.message || "Failed to send recovery code. Please check the email and try again.", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
      }
    };
  }

  // Reset Password Form Submission (Verifies OTP + Sets New Password)
  const resetForm = document.getElementById("auth-reset-form");
  if (resetForm) {
    resetForm.onsubmit = async (e) => {
      e.preventDefault();
      clearAuthAlert();

      const email = storeState.resetEmail || document.getElementById("forgot-email")?.value.trim().toLowerCase();
      const newPassword = document.getElementById("reset-new-password").value;
      const submitBtn = document.getElementById("btn-reset-submit");

      // Gather 6-digit OTP
      const resetDigits = document.querySelectorAll(".reset-otp-digit");
      let token = "";
      resetDigits.forEach(d => token += d.value.trim());

      if (token.length !== 6) {
        setAuthAlert("Please enter the complete 6-digit recovery code.", "error");
        return;
      }

      if (!newPassword || newPassword.length < 6) {
        setAuthAlert("New password must be at least 6 characters.", "error");
        return;
      }

      if (!supabaseAuthClient) {
        setAuthAlert("Authentication service is temporarily unavailable.", "error");
        return;
      }

      const origText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Updating Password...</span>";

      try {
        // Step 1: Verify OTP token as recovery type
        const { data: verifyData, error: verifyErr } = await supabaseAuthClient.auth.verifyOtp({
          email,
          token,
          type: 'recovery'
        });

        if (verifyErr) throw verifyErr;

        // Step 2: Update password for current session
        const { data: updateData, error: updateErr } = await supabaseAuthClient.auth.updateUser({
          password: newPassword
        });

        if (updateErr) throw updateErr;

        const user = updateData?.user || verifyData?.user;
        if (user) {
          storeState.currentUser = user;
          updateAccountUI(user);
        }

        setAuthAlert("✨ Password successfully updated! Welcome back to Chimini.", "success");
        setTimeout(() => {
          closeAuthModal();
          showToast("✨ Password successfully updated!");
        }, 1500);

      } catch (err) {
        console.error("Password reset error:", err);
        setAuthAlert(err.message || "Invalid or expired recovery code. Please try again.", "error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = origText;
      }
    };
  }

  // Resend Reset OTP Button
  const resendResetBtn = document.getElementById("btn-resend-reset-otp");
  if (resendResetBtn) {
    resendResetBtn.onclick = async () => {
      const email = storeState.resetEmail || document.getElementById("forgot-email")?.value.trim().toLowerCase();
      if (!email || !supabaseAuthClient) return;
      resendResetBtn.disabled = true;
      try {
        const { error } = await supabaseAuthClient.auth.resetPasswordForEmail(email);
        if (error) throw error;
        startResetOtpTimer();
        setAuthAlert("A fresh 6-digit recovery code has been sent from support@chimini.in.", "success");
      } catch (err) {
        setAuthAlert(err.message || "Could not resend recovery code. Please try again in a moment.", "error");
        resendResetBtn.disabled = false;
      }
    };
  }

  // Reset OTP Digits Auto-focus & Paste Handling
  const resetDigitInputs = document.querySelectorAll(".reset-otp-digit");
  resetDigitInputs.forEach((input, idx) => {
    input.oninput = (e) => {
      const val = e.target.value;
      if (val.length >= 1) {
        e.target.value = val.slice(0, 1);
        if (idx < resetDigitInputs.length - 1) {
          resetDigitInputs[idx + 1].focus();
        }
      }
    };

    input.onkeydown = (e) => {
      if (e.key === "Backspace" && !e.target.value && idx > 0) {
        resetDigitInputs[idx - 1].focus();
      }
    };

    input.onpaste = (e) => {
      e.preventDefault();
      const pasted = (e.clipboardData || window.clipboardData).getData("text").trim();
      if (/^\d{6}$/.test(pasted)) {
        pasted.split("").forEach((char, i) => {
          if (resetDigitInputs[i]) resetDigitInputs[i].value = char;
        });
        resetDigitInputs[resetDigitInputs.length - 1].focus();
      }
    };
  });

  // Sign Out Button
  const signoutBtn = document.getElementById("btn-user-signout");
  if (signoutBtn) {
    signoutBtn.onclick = async () => {
      if (supabaseAuthClient) {
        await supabaseAuthClient.auth.signOut();
      }
      storeState.currentUser = null;
      updateAccountUI(null);
      closeAuthModal();
      showToast("Signed out successfully.");
    };
  }

  
}

function triggerCheckoutSuccess() {
  openCheckoutModal();
}

// ==========================================================================
// 9. MULTI-STEP CHECKOUT & WHATSAPP CONCIERGE ENGINE
// ==========================================================================

const STARTER_COUPONS = {
  'CHIMINI10': { code: 'CHIMINI10', discount_percentage: 10, discount_type: 'percentage', description: '10% off on all collections' },
  'WELCOME15': { code: 'WELCOME15', discount_percentage: 15, discount_type: 'percentage', description: '15% off for sanctuary members' },
  'LUXURY20': { code: 'LUXURY20', discount_percentage: 20, discount_type: 'percentage', description: '20% VIP privilege discount' }
};

function openCheckoutModal() {
  if (!storeState.cart || storeState.cart.length === 0) {
    showToast("Your cart is empty. Please add luxury pieces to proceed.");
    return;
  }

  // Mandatory login check
  if (!storeState.currentUser) {
    storeState.pendingCheckout = true;
    closeAllDrawers();
    openAuthModal('login', true);
    return;
  }

  const modal = document.getElementById("checkout-modal");
  if (!modal) return;

  closeAllDrawers();

  // Pre-fill user details if available
  const user = storeState.currentUser;
  const nameInput = document.getElementById("checkout-name");
  const phoneInput = document.getElementById("checkout-phone");
  const emailInput = document.getElementById("checkout-email");

  if (user) {
    const meta = user.user_metadata || {};
    if (nameInput && !nameInput.value) nameInput.value = meta.full_name || '';
    if (phoneInput && !phoneInput.value) phoneInput.value = meta.phone || '';
    if (emailInput && !emailInput.value) emailInput.value = user.email || '';
  }

  switchCheckoutStep(1);

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  if (!modal) return;

  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function calculateCheckoutTotals() {
  const cart = storeState.cart || [];
  const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price || 0) * (item.quantity || 1)), 0);
  
  let discount = 0;
  if (storeState.appliedCoupon) {
    const c = storeState.appliedCoupon;
    if (c.discount_type === 'flat' && c.discount_amount) {
      discount = Math.min(subtotal, parseFloat(c.discount_amount) || 0);
    } else {
      const pct = parseInt(c.discount_percentage || 10);
      discount = Math.round(subtotal * (pct / 100));
    }
  }

  const total = Math.max(0, subtotal - discount);
  return { subtotal, discount, total, shipping: 0 };
}

function renderCheckoutItemsList(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const cart = storeState.cart || [];
  if (cart.length === 0) {
    container.innerHTML = '<div style="padding: 12px; color: var(--text-secondary); font-size: 0.8rem; text-align: center;">No items in cart</div>';
    return;
  }

  container.innerHTML = cart.map(item => {
    const itemImg = item.image || (Array.isArray(item.images) ? item.images[0] : 'assets/product_jasmine.png');
    const itemPrice = parseFloat(item.price || 0) * (item.quantity || 1);
    const scentNote = item.scent || item.fragrance || item.name;

    return `
      <div class="checkout-item-row">
        <img src="${itemImg}" alt="${item.name}" class="checkout-item-thumb" onerror="this.src='assets/product_jasmine.png'">
        <div class="checkout-item-info">
          <div class="checkout-item-name">${item.name}</div>
          <div class="checkout-item-meta">Qty: ${item.quantity} · ${scentNote}</div>
        </div>
        <div class="checkout-item-price">₹${itemPrice.toLocaleString('en-IN')}</div>
      </div>
    `;
  }).join('');
}

function updateCheckoutTotalsUI() {
  const totals = calculateCheckoutTotals();

  // Step 1 UI
  const subtotalStep1 = document.getElementById("checkout-subtotal-step1");
  const discountRowStep1 = document.getElementById("checkout-discount-row-step1");
  const discountValStep1 = document.getElementById("checkout-discount-val-step1");
  const discountLabelStep1 = document.getElementById("checkout-discount-label-step1");
  const totalStep1 = document.getElementById("checkout-total-step1");

  if (subtotalStep1) subtotalStep1.textContent = '₹' + totals.subtotal.toLocaleString('en-IN');
  if (totalStep1) totalStep1.textContent = '₹' + totals.total.toLocaleString('en-IN');

  if (discountRowStep1 && discountValStep1) {
    if (totals.discount > 0 && storeState.appliedCoupon) {
      discountRowStep1.style.display = "flex";
      discountValStep1.textContent = '-₹' + totals.discount.toLocaleString('en-IN');
      if (discountLabelStep1) discountLabelStep1.textContent = 'Coupon (' + storeState.appliedCoupon.code + ')';
    } else {
      discountRowStep1.style.display = "none";
    }
  }

  // Step 2 UI
  const subtotalStep2 = document.getElementById("checkout-subtotal-step2");
  const discountRowStep2 = document.getElementById("checkout-discount-row-step2");
  const discountValStep2 = document.getElementById("checkout-discount-val-step2");
  const discountLabelStep2 = document.getElementById("checkout-discount-label-step2");
  const totalStep2 = document.getElementById("checkout-total-step2");

  if (subtotalStep2) subtotalStep2.textContent = '₹' + totals.subtotal.toLocaleString('en-IN');
  if (totalStep2) totalStep2.textContent = '₹' + totals.total.toLocaleString('en-IN');

  if (discountRowStep2 && discountValStep2) {
    if (totals.discount > 0 && storeState.appliedCoupon) {
      discountRowStep2.style.display = "flex";
      discountValStep2.textContent = '-₹' + totals.discount.toLocaleString('en-IN');
      if (discountLabelStep2) discountLabelStep2.textContent = 'Coupon (' + storeState.appliedCoupon.code + ')';
    } else {
      discountRowStep2.style.display = "none";
    }
  }

  // Coupon Badge in Step 1
  const badgeContainer = document.getElementById("checkout-coupon-badge");
  if (badgeContainer) {
    if (storeState.appliedCoupon) {
      badgeContainer.style.display = "block";
      badgeContainer.innerHTML = `
        <div class="coupon-active-badge">
          <span>✨ <strong>${storeState.appliedCoupon.code}</strong> applied (-₹${totals.discount.toLocaleString('en-IN')})</span>
          <button type="button" class="coupon-remove-btn" id="btn-remove-coupon">Remove</button>
        </div>
      `;
      const removeBtn = document.getElementById("btn-remove-coupon");
      if (removeBtn) removeBtn.onclick = removeCouponCode;
    } else {
      badgeContainer.style.display = "none";
      badgeContainer.innerHTML = "";
    }
  }
}

async function applyCouponCode(rawCode) {
  const code = (rawCode || '').trim().toUpperCase();
  if (!code) {
    showToast("Please enter a valid promo code.");
    return;
  }

  const applyBtn = document.getElementById("btn-apply-coupon");
  if (applyBtn) {
    applyBtn.disabled = true;
    applyBtn.textContent = "...";
  }

  let matchedCoupon = null;

  // 1. Try querying Supabase
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/coupons?code=eq.${encodeURIComponent(code)}&active=eq.true&select=*`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        matchedCoupon = data[0];
      }
    }
  } catch (err) {
    console.warn("Coupon database lookup note:", err);
  }

  // 2. Fallback to starter coupons
  if (!matchedCoupon && STARTER_COUPONS[code]) {
    matchedCoupon = STARTER_COUPONS[code];
  }

  if (applyBtn) {
    applyBtn.disabled = false;
    applyBtn.textContent = "Apply";
  }

  if (matchedCoupon) {
    storeState.appliedCoupon = matchedCoupon;
    updateCheckoutTotalsUI();
    showToast("✨ Coupon " + code + " applied successfully!");
    const input = document.getElementById("checkout-coupon-input");
    if (input) input.value = "";
  } else {
    showToast("Invalid or expired coupon code: " + code);
  }
}

function removeCouponCode() {
  storeState.appliedCoupon = null;
  updateCheckoutTotalsUI();
  showToast("Coupon removed.");
}

function switchCheckoutStep(stepNumber) {
  const views = document.querySelectorAll(".checkout-view");
  views.forEach(v => v.classList.remove("active"));

  const step1Indicator = document.getElementById("step-indicator-1");
  const step2Indicator = document.getElementById("step-indicator-2");

  if (stepNumber === 1) {
    const view1 = document.getElementById("checkout-view-step1");
    if (view1) view1.classList.add("active");
    if (step1Indicator) {
      step1Indicator.className = "checkout-step-item active";
    }
    if (step2Indicator) {
      step2Indicator.className = "checkout-step-item";
    }

    renderCheckoutItemsList("checkout-items-list-step1");
    updateCheckoutTotalsUI();

  } else if (stepNumber === 2) {
    // Validate shipping form
    const name = (document.getElementById("checkout-name")?.value || "").trim();
    const phone = (document.getElementById("checkout-phone")?.value || "").trim();
    const email = (document.getElementById("checkout-email")?.value || "").trim();
    const address1 = (document.getElementById("checkout-address1")?.value || "").trim();
    const address2 = (document.getElementById("checkout-address2")?.value || "").trim();
    const city = (document.getElementById("checkout-city")?.value || "").trim();
    const state = (document.getElementById("checkout-state")?.value || "").trim();
    const pincode = (document.getElementById("checkout-pincode")?.value || "").trim();

    if (!name || !phone || !email || !address1 || !city || !state || !pincode) {
      showToast("Please fill in all required shipping fields marked with *");
      return;
    }

    if (pincode.length < 5) {
      showToast("Please enter a valid postal pincode.");
      return;
    }

    storeState.shippingDetails = {
      name, phone, email, address1, address2, city, state, pincode
    };

    // Populate Review Details
    const revName = document.getElementById("review-recipient-name");
    const revContact = document.getElementById("review-recipient-contact");
    const revAddress = document.getElementById("review-recipient-address");

    if (revName) revName.textContent = name;
    if (revContact) revContact.textContent = phone + " · " + email;
    if (revAddress) {
      revAddress.textContent = address1 + (address2 ? ", " + address2 : "") + ", " + city + ", " + state + " - " + pincode;
    }

    const view2 = document.getElementById("checkout-view-step2");
    if (view2) view2.classList.add("active");

    if (step1Indicator) {
      step1Indicator.className = "checkout-step-item completed";
    }
    if (step2Indicator) {
      step2Indicator.className = "checkout-step-item active";
    }

    renderCheckoutItemsList("checkout-items-list-step2");
    updateCheckoutTotalsUI();

  } else if (stepNumber === 3) {
    const view3 = document.getElementById("checkout-view-step3");
    if (view3) view3.classList.add("active");

    if (step1Indicator) step1Indicator.className = "checkout-step-item completed";
    if (step2Indicator) step2Indicator.className = "checkout-step-item completed";
  }
}

async function submitOrderAndOpenWhatsApp() {
  const shipping = storeState.shippingDetails;
  if (!shipping) {
    switchCheckoutStep(1);
    return;
  }

  const totals = calculateCheckoutTotals();
  const orderRefId = "CHM-" + Math.floor(100000 + Math.random() * 900000);
  const user = storeState.currentUser;

  const orderPayload = {
    order_id: orderRefId,
    customer_id: user?.id || null,
    customer_name: shipping.name,
    customer_phone: shipping.phone,
    customer_email: shipping.email,
    shipping_details: shipping,
    items: storeState.cart.map(item => ({
      id: item.id,
      name: item.name,
      scent: item.scent || item.fragrance || item.name,
      price: parseFloat(item.price || 0),
      quantity: parseInt(item.quantity || 1),
      image: item.image || (Array.isArray(item.images) ? item.images[0] : '')
    })),
    subtotal: totals.subtotal,
    discount_amount: totals.discount,
    coupon_code: storeState.appliedCoupon ? storeState.appliedCoupon.code : '',
    total_amount: totals.total,
    status: 'pending'
  };

  const submitBtn = document.getElementById("btn-place-order-whatsapp");
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = "<span>Preparing WhatsApp Order...</span>";
  }

  // 1. Save order to Supabase orders table
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(orderPayload)
    });
  } catch (err) {
    console.warn("Could not record order in database:", err);
  }

  // 2. Format WhatsApp Message
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  let itemsListText = '';
  storeState.cart.forEach((item, index) => {
    const itemTotal = parseFloat(item.price || 0) * (item.quantity || 1);
    itemsListText += `${index + 1}. *${item.name}* (x${item.quantity}) — ₹${itemTotal.toLocaleString('en-IN')}\n`;
  });

  const couponLine = totals.discount > 0 && storeState.appliedCoupon
    ? `• Coupon (${storeState.appliedCoupon.code}): -₹${totals.discount.toLocaleString('en-IN')}\n`
    : '';

  const whatsAppMessage = 
`🕯️ *NEW ORDER — CHIMINI ARTISANAL LUXURY*
*Order Ref:* #${orderRefId}
*Date:* ${dateStr}

👤 *Client Details:*
• Name: ${shipping.name}
• Phone: ${shipping.phone}
• Email: ${shipping.email}

📍 *Shipping Destination:*
• ${shipping.address1}${shipping.address2 ? ', ' + shipping.address2 : ''}
• ${shipping.city}, ${shipping.state} - ${shipping.pincode}

🛍️ *Order Items:*
${itemsListText}
💰 *Payment Summary:*
• Subtotal: ₹${totals.subtotal.toLocaleString('en-IN')}
${couponLine}• Luxury Shipping: Complimentary (₹0)
• *Grand Total: ₹${totals.total.toLocaleString('en-IN')}*

Please confirm my order and share payment instructions! ✨`;

  const conciergePhone = "917411865577";
  const whatsappUrl = `https://wa.me/${conciergePhone}?text=${encodeURIComponent(whatsAppMessage)}`;

  // 3. Clear cart
  storeState.cart = [];
  storeState.appliedCoupon = null;
  localStorage.removeItem("chimini_cart");
  renderCart();

  // 4. Setup Step 3 Confirmation UI
  const confOrderEl = document.getElementById("conf-order-id");
  const confWaBtn = document.getElementById("conf-whatsapp-btn");

  if (confOrderEl) confOrderEl.textContent = "ORDER #" + orderRefId;
  if (confWaBtn) confWaBtn.href = whatsappUrl;

  switchCheckoutStep(3);

  // 5. Open WhatsApp
  try {
    window.open(whatsappUrl, '_blank');
  } catch (e) {
    window.location.href = whatsappUrl;
  }
}

function bindCheckoutModalEvents() {
  // Close Checkout Modal
  const closeBtn = document.getElementById("close-checkout-modal");
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.preventDefault();
      closeCheckoutModal();
    };
  }

  const modal = document.getElementById("checkout-modal");
  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) closeCheckoutModal();
    };
  }

  // Apply Coupon Button
  const applyCouponBtn = document.getElementById("btn-apply-coupon");
  if (applyCouponBtn) {
    applyCouponBtn.onclick = (e) => {
      e.preventDefault();
      const input = document.getElementById("checkout-coupon-input");
      if (input) applyCouponCode(input.value);
    };
  }

  const couponInput = document.getElementById("checkout-coupon-input");
  if (couponInput) {
    couponInput.onkeydown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applyCouponCode(couponInput.value);
      }
    };
  }

  // Continue to Step 2 (Review)
  const gotoStep2Btn = document.getElementById("btn-goto-step2");
  if (gotoStep2Btn) {
    gotoStep2Btn.onclick = (e) => {
      e.preventDefault();
      switchCheckoutStep(2);
    };
  }

  // Back to Step 1
  const backToStep1Btn = document.getElementById("btn-back-to-step1");
  if (backToStep1Btn) {
    backToStep1Btn.onclick = (e) => {
      e.preventDefault();
      switchCheckoutStep(1);
    };
  }

  const editShippingBtn = document.getElementById("btn-edit-shipping");
  if (editShippingBtn) {
    editShippingBtn.onclick = (e) => {
      e.preventDefault();
      switchCheckoutStep(1);
    };
  }

  // Place Order Button (WhatsApp)
  const placeOrderBtn = document.getElementById("btn-place-order-whatsapp");
  if (placeOrderBtn) {
    placeOrderBtn.onclick = (e) => {
      e.preventDefault();
      submitOrderAndOpenWhatsApp();
    };
  }

  // Step 3 Close Button
  const confCloseBtn = document.getElementById("btn-conf-close");
  if (confCloseBtn) {
    confCloseBtn.onclick = (e) => {
      e.preventDefault();
      closeCheckoutModal();
    };
  }

  // Proceed to Checkout Button in Cart Drawer
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.onclick = (e) => {
      e.preventDefault();
      openCheckoutModal();
    };
  }
}

// ==========================================================================
// 10. GOOGLE SHEETS REAL-TIME SYNC ENGINE
// ==========================================================================

const DEFAULT_SHEET_WEBHOOK = "https://script.google.com/macros/s/AKfycbz_your_deployment_id/exec";

async function syncUserToGoogleSheet(userData) {
  if (!userData || !userData.email) return;

  const payload = {
    name: userData.name || "Valued Client",
    phone: userData.phone || "Not provided",
    email: userData.email,
    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
    type: userData.type || "Signup/Login"
  };

  console.log("Syncing client to Google Sheet [1KpVARxf7_lAdQtFDOt7gWpAWRpTF8L246YfJeq3cbsg]:", payload);

  const webhookUrl = window.CHIMINI_GOOGLE_SHEET_WEBHOOK || 
                     (storeState.adminSettings && storeState.adminSettings.googleSheetWebhook) ||
                     localStorage.getItem("chimini_google_sheet_webhook");

  if (webhookUrl && webhookUrl.startsWith("http")) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      console.log("Client successfully synchronized to Google Sheet.");
    } catch (err) {
      console.warn("Could not sync to Google Sheet webhook:", err);
    }
  } else {
    // Store in pending queue in localStorage so it pushes as soon as webhook URL is configured
    try {
      const queue = JSON.parse(localStorage.getItem("chimini_pending_sheet_sync") || "[]");
      queue.push(payload);
      localStorage.setItem("chimini_pending_sheet_sync", JSON.stringify(queue));
    } catch (e) {}
  }
}
