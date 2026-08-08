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
      badge: "BEST SELLER",
      image: "assets/product_jasmine.png",
      secondaryImage: "assets/product_sandalwood.png",
      category: "candles"
    },
    {
      id: "prod-2",
      name: "Sandalwood & Amber",
      price: 32.00,
      originalPrice: null,
      badge: "NEW ARRIVAL",
      image: "assets/product_sandalwood.png",
      secondaryImage: "assets/product_jasmine.png",
      category: "candles"
    },
    {
      id: "prod-3",
      name: "Velvet Rose & Oud",
      price: 34.00,
      originalPrice: 48.00,
      badge: "FAST MOVING",
      image: "assets/product_rose.png",
      secondaryImage: "assets/product_fig.png",
      category: "candles"
    },
    {
      id: "prod-4",
      name: "Wild Fig & Honey",
      price: 29.00,
      originalPrice: null,
      badge: "LIMITED EDITION",
      image: "assets/product_fig.png",
      secondaryImage: "assets/product_rose.png",
      category: "candles"
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
    email: "concierge@chimini.com",
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
let storeState = {
  cart: JSON.parse(localStorage.getItem("chimini_cart")) || [],
  wishlist: JSON.parse(localStorage.getItem("chimini_wishlist")) || [],
  searchQuery: "",
  activeCategory: "all",
  currentTestimonialIndex: 0,
  adminSettings: JSON.parse(localStorage.getItem("chimini_admin_settings")) || JSON.parse(JSON.stringify(DEFAULT_SETTINGS)),
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

// A. Announcement Bar
function renderAnnouncement() {
  if (DOM.announcementText) {
    DOM.announcementText.textContent = storeState.adminSettings.announcementText;
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

function startHeroAutoplay() {}
function stopHeroAutoplay() {}

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
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/product_jasmine.png'">
        <button class="wishlist-toggle-btn ${isWishlisted ? "active" : ""}" data-id="${product.id}" aria-label="Add to Wishlist">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
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
  
  const cats = storeState.adminSettings.categories;
  
  cats.forEach(cat => {
    const item = document.createElement("div");
    item.className = "category-item";
    item.innerHTML = `
      <div class="category-circle-wrapper">
        <img src="${cat.image}" alt="${cat.name}" onerror="this.src='assets/product_jasmine.png'">
      </div>
      <span class="category-title">${cat.name}</span>
    `;
    item.addEventListener("click", () => {
      // Filter best sellers by category query
      storeState.activeCategory = cat.name.toLowerCase();
      storeState.searchQuery = "";
      if (DOM.searchInput) DOM.searchInput.value = "";
      
      // Update nav states
      DOM.navLinks.forEach(l => l.classList.remove("active"));
      
      renderBestSellers();
      // Scroll to best sellers
      document.getElementById("best-sellers").scrollIntoView({ behavior: "smooth" });
    });
    DOM.categoriesList.appendChild(item);
  });
}

// E. Featured Collections Grid
function renderFeaturedCollections() {
  if (!DOM.collectionsGrid) return;
  DOM.collectionsGrid.innerHTML = "";
  
  const colls = storeState.adminSettings.collections;
  colls.forEach(coll => {
    const card = document.createElement("div");
    card.className = "collection-card";
    card.innerHTML = `
      <img src="${coll.image}" alt="${coll.name}" onerror="this.src='assets/campaign_banner.png'">
      <div class="collection-overlay">
        <span class="collection-title-overlay">${coll.name}</span>
      </div>
    `;
    card.addEventListener("click", () => {
      if (coll.link && coll.link.startsWith('#')) {
        storeState.activeCategory = "all";
        storeState.searchQuery = coll.name;
        if (DOM.searchInput) DOM.searchInput.value = coll.name;
        renderBestSellers();
        document.getElementById("best-sellers").scrollIntoView({ behavior: "smooth" });
      } else if (coll.link) {
        window.location.href = coll.link;
      }
    });
    DOM.collectionsGrid.appendChild(card);
  });
}

// F. Marketing Banners & Story Sections
function renderMarketingBanners() {
  // 1. Products Ads Banner 1
  if (DOM.productsAdsBanner1) {
    const ad1 = storeState.adminSettings.adsBanner1;
    DOM.productsAdsBanner1.innerHTML = `
      <a href="${ad1.link || '#'}">
        <img src="${ad1.image}" alt="Products Ads Banner 1" onerror="this.src='assets/promo_banner.png'">
      </a>
    `;
  }
  
  // 2. Products Ads Banner 2
  if (DOM.productsAdsBanner2) {
    const ad2 = storeState.adminSettings.adsBanner2;
    DOM.productsAdsBanner2.innerHTML = `
      <a href="${ad2.link || '#'}">
        <img src="${ad2.image}" alt="Products Ads Banner 2" onerror="this.src='assets/campaign_banner.png'">
      </a>
    `;
  }
  
  // 3. Brand Story Banner
  if (DOM.brandStoryBanner) {
    const story = storeState.adminSettings.storyBanner;
    DOM.brandStoryBanner.innerHTML = `
      <a href="${story.link || '#'}">
        <img src="${story.image}" alt="Our Brand Story" onerror="this.src='assets/story_banner.png'">
      </a>
    `;
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

      <!-- Bottom Stats Bar -->
      <div class="tg-stats-bar">
        <div class="tg-stat">
          <div class="tg-stat-value">4.9★</div>
          <div class="tg-stat-label">Average Rating</div>
        </div>
        <div class="tg-stat-divider"></div>
        <div class="tg-stat">
          <div class="tg-stat-value">12K+</div>
          <div class="tg-stat-label">Happy Customers</div>
        </div>
        <div class="tg-stat-divider"></div>
        <div class="tg-stat">
          <div class="tg-stat-value">98%</div>
          <div class="tg-stat-label">Would Gift Again</div>
        </div>
      </div>
      
      <!-- Decorative Pattern & CTA -->
      <div class="tg-bottom-decor">
        <div class="tg-pattern">✦ ❋ ✦ ❋ ✦</div>
        <button class="tg-cta-btn">READ MORE REVIEWS</button>
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
  closeAllDrawers();
  drawerElement.classList.add("active");
  drawerElement.setAttribute("aria-hidden", "false");
  DOM.drawerOverlay.classList.add("active");
  document.body.style.overflow = "hidden"; // disable body scrolling
}

function closeAllDrawers() {
  DOM.cartDrawer.classList.remove("active");
  DOM.cartDrawer.setAttribute("aria-hidden", "true");
  DOM.wishlistDrawer.classList.remove("active");
  DOM.wishlistDrawer.setAttribute("aria-hidden", "true");
  DOM.adminDrawer.classList.remove("active");
  DOM.adminDrawer.setAttribute("aria-hidden", "true");
  
  const filterDrawer = document.getElementById("filter-drawer");
  if (filterDrawer) {
    filterDrawer.classList.remove("active");
    filterDrawer.setAttribute("aria-hidden", "true");
  }
  
  DOM.drawerOverlay.classList.remove("active");
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
        reader.onload = function(evt) {
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
      reader.onload = function(evt) {
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
        reader.onload = function(evt) {
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
      reader.onload = function(evt) {
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
      reader.onload = function(evt) {
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
    showToast("Defaults restored successfully!");
  }
}

// --- 7. EVENT BINDING & HANDLERS ---
function bindEvents() {
  
  // Drawer Toggles
  if (DOM.cartBtn) DOM.cartBtn.addEventListener("click", () => openDrawer(DOM.cartDrawer));
  if (DOM.closeCartBtn) DOM.closeCartBtn.addEventListener("click", closeAllDrawers);
  
  if (DOM.wishlistBtn) DOM.wishlistBtn.addEventListener("click", () => openDrawer(DOM.wishlistDrawer));
  if (DOM.closeWishlistBtn) DOM.closeWishlistBtn.addEventListener("click", closeAllDrawers);
  
  if (DOM.adminToggleBtn) DOM.adminToggleBtn.addEventListener("click", () => {
    initAdminFields(); // load values before opening
    openDrawer(DOM.adminDrawer);
  });
  if (DOM.closeAdminBtn) DOM.closeAdminBtn.addEventListener("click", closeAllDrawers);
  
  if (DOM.drawerOverlay) DOM.drawerOverlay.addEventListener("click", closeAllDrawers);
  
  // Checkout simulation
  if (DOM.checkoutBtn) {
    DOM.checkoutBtn.addEventListener("click", () => {
      alert("Thank you for choosing CHIMINI. Checkout simulation complete.");
      storeState.cart = [];
      localStorage.removeItem("chimini_cart");
      renderCart();
      closeAllDrawers();
    });
  }
  
  // Search filtering
  if (DOM.searchInput) {
    DOM.searchInput.addEventListener("input", (e) => {
      storeState.searchQuery = e.target.value;
      storeState.activeCategory = "all";
      DOM.navLinks.forEach(l => l.classList.remove("active"));
      renderBestSellers();
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
}

function renderShopPage() {
  const container = document.getElementById("shop-page-container");
  if (!container) return;
  
  // Parse URL parameters for initial category filter
  const params = new URLSearchParams(window.location.search);
  const catQuery = params.get("category");
  if (catQuery && !storeState.shopInitialized) {
    storeState.activeCategory = catQuery.toLowerCase();
    storeState.shopInitialized = true;
  }
  
  if (!container.innerHTML.trim() || !container.querySelector(".catalog-toolbar")) {
    container.innerHTML = `
      <section class="subpage-hero">
        <h1 class="subpage-title">The Atelier Shop</h1>
        <p class="subpage-subtitle">Immersive botanical fragrances hand-poured in luxury vessels</p>
      </section>
      
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
  
  // Apply category tag filter
  if (storeState.activeCategory !== "all") {
    products = products.filter(p => p.category === storeState.activeCategory);
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
    countEl.textContent = `${products.length} product${products.length !== 1 ? 's' : ''} found`;
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
    const badgeText = product.badge ? product.badge.trim() : null;
    
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
          <img src="${product.image}" class="product-image-main" alt="${product.name}" onerror="this.src='assets/product_jasmine.png'">
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
          <img src="${product.image}" class="product-image-main" alt="${product.name}" onerror="this.src='assets/product_jasmine.png'">
          ${product.secondaryImage ? `<img src="${product.secondaryImage}" class="product-image-hover" alt="${product.name}" onerror="this.style.display='none'">` : ''}
          <button class="wishlist-toggle-btn ${isWishlisted ? "active" : ""}" data-id="${product.id}" aria-label="Add to Wishlist">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <button class="product-cart-overlay-btn add-to-cart-btn" data-id="${product.id}" aria-label="Add to Cart">+</button>
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
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
  
  const collections = storeState.adminSettings.collections;
  
  container.innerHTML = `
    <section class="subpage-hero">
      <h1 class="subpage-title">Curated Collections</h1>
      <p class="subpage-subtitle">Aesthetic scents and vessels designed for every mood and season</p>
    </section>
    <div class="collections-page-grid section-container" id="collections-page-grid"></div>
  `;
  
  const grid = document.getElementById("collections-page-grid");
  if (!grid) return;
  
  collections.forEach(coll => {
    const card = document.createElement("div");
    card.className = "collection-page-card animate-slide-up";
    card.innerHTML = `
      <div class="collection-page-card-image">
        <img src="${coll.image}" alt="${coll.name}" onerror="this.src='assets/campaign_banner.png'">
      </div>
      <div class="collection-page-card-content">
        <h3 class="collection-page-card-title">${coll.name}</h3>
        <p class="collection-page-card-desc">Exquisite fragrance notes meticulously blended to elevate your luxury home ambiance.</p>
        <a href="/shop?category=all" class="btn btn-secondary collection-page-card-btn">Explore Collection</a>
      </div>
    `;
    
    card.querySelector(".collection-page-card-btn").addEventListener("click", (e) => {
      e.preventDefault();
      if (coll.link && coll.link.startsWith('#')) {
        window.location.href = `/shop?category=all`;
      } else if (coll.link) {
        window.location.href = coll.link;
      } else {
        window.location.href = `/shop?category=all`;
      }
    });
    
    grid.appendChild(card);
  });
}

function renderGiftsPage() {
  const container = document.getElementById("gifts-page-container");
  if (!container) return;
  
  container.innerHTML = `
    <section class="subpage-hero">
      <h1 class="subpage-title">The Art of Gifting</h1>
      <p class="subpage-subtitle">Meticulously curated gift sets and custom aromatic assortments for your loved ones</p>
    </section>
    
    <div class="gift-features section-container">
      <div class="gift-feature-item">
        <h3>Bespoke Wrapping</h3>
        <p>Every gift order is hand-wrapped in our signature textured boxes with linen ribbon.</p>
      </div>
      <div class="gift-feature-item">
        <h3>Personalized Note</h3>
        <p>Include a handwritten calligraphy message printed on heavyweight cotton paper.</p>
      </div>
      <div class="gift-feature-item">
        <h3>Concierge Delivery</h3>
        <p>White-glove premium shipping option with custom schedule availability.</p>
      </div>
    </div>

    <div class="gifts-grid section-container">
      <h2 class="section-title">Signature Gift Hampers</h2>
      <div class="products-grid" id="gifts-products-grid"></div>
    </div>
  `;
  
  const grid = document.getElementById("gifts-products-grid");
  if (!grid) return;
  
  const products = storeState.adminSettings.products.filter(p => p.category === 'gifts');
  
  if (products.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px 0; color: var(--text-secondary); font-family: var(--font-serif); font-size: 1.2rem;">Our luxury gift sets are currently fully booked. Please check back soon.</div>`;
    return;
  }
  
  products.forEach(product => {
    const isWishlisted = storeState.wishlist.includes(product.id);
    const card = document.createElement("div");
    card.className = "product-card animate-slide-up";
    card.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/product_jasmine.png'">
        <button class="wishlist-toggle-btn ${isWishlisted ? "active" : ""}" data-id="${product.id}" aria-label="Add to Wishlist">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">₹${Number(product.price).toFixed(2)}</p>
        <button class="btn btn-primary product-card-btn add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    
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

function renderAboutPage() {
  const container = document.getElementById("about-page-container");
  if (!container) return;
  
  if (storeState.adminSettings.pages && storeState.adminSettings.pages['about_us']) {
    container.innerHTML = storeState.adminSettings.pages['about_us'];
    return;
  }

  const about = storeState.adminSettings.about || {};
  
  container.innerHTML = `
    <section class="subpage-hero">
      <h1 class="subpage-title">${about.title || 'A Quest for Olfactory Purity'}</h1>
      <p class="subpage-subtitle">The story of CHIMINI's clean-burning luxury scents</p>
    </section>
    
    <div class="about-story-section section-container">
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
  
  container.innerHTML = `
    <section class="subpage-hero">
      <h1 class="subpage-title">Client Concierge</h1>
      <p class="subpage-subtitle">We are here to assist with custom orders, corporate gifts, or scent inquiries</p>
    </section>

    <div class="contact-layout section-container">
      <div class="contact-details-col animate-slide-up">
        <h2 class="contact-col-heading">Atelier Details</h2>
        <div class="contact-detail-item">
          <h3>General Inquiry</h3>
          <p>${contact.email || 'concierge@chimini.com'}</p>
        </div>
        <div class="contact-detail-item">
          <h3>Concierge Phone</h3>
          <p>${contact.phone || '+91 97418 55293, +91 96320 90645'}</p>
          <span class="contact-detail-hours">Mon - Fri, 9:00 AM - 6:00 PM CET</span>
        </div>
        <div class="contact-detail-item">
          <h3>Atelier Location</h3>
          <p>${contact.address || 'Mangalore, Karnataka'}</p>
        </div>
        <div class="contact-detail-item">
          <h3>Corporate & Events Gifting</h3>
          <p>partners@chimini.com</p>
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

// --- 4. SUPABASE DATA FETCHING ---
const SUPABASE_URL = "https://jvopwqkbtrupkayzfyvl.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2b3B3cWtidHJ1cGtheXpmeXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNDQwMjksImV4cCI6MjA5NjgyMDAyOX0.KHWIko4CvlGHDq8QPdNEFqPMXBFkfiZTn_wr9qXWguw";

async function fetchSupabaseData() {
  try {
    const headers = {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`
    };

    // Parallel fetch for speed
    const [settingsRes, bannersRes, productsRes, categoriesRes, testimonialsRes, pagesRes] = await Promise.all([
      fetch(`${SUPABASE_URL}/rest/v1/settings?select=*`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/banners?select=*&is_published=eq.true&order=sort_order.asc`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/products?select=*,categories(title)&is_published=eq.true&order=sort_order.asc`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/categories?select=*&order=sort_order.asc`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/testimonials?select=*&is_published=eq.true&order=sort_order.asc`, { headers }),
      fetch(`${SUPABASE_URL}/rest/v1/page_content?select=*`, { headers })
    ]);

    const [settings, banners, products, categories, testimonials, pages] = await Promise.all([
      settingsRes.json(), bannersRes.json(), productsRes.json(), categoriesRes.json(), testimonialsRes.json(), pagesRes.json()
    ]);

    // Map to legacy DEFAULT_SETTINGS format for compatibility
    const newSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));

    // Map Announcements
    const announcementSetting = settings.find(s => s.setting_key === 'announcements');
    if (announcementSetting) {
      const arr = Array.isArray(announcementSetting.setting_value) ? announcementSetting.setting_value : JSON.parse(announcementSetting.setting_value);
      if (arr.length > 0) newSettings.announcementText = arr.join(' • ');
    }

    // Map Banners
    const heroBanner = banners.find(b => b.section_id === 'hero');
    if (heroBanner) {
      newSettings.heroBanner = {
        title: heroBanner.title_overlay || '',
        subtitle: heroBanner.subtitle_overlay || '',
        image: heroBanner.image_url,
        link: heroBanner.link_url || '#',
        buttonText: heroBanner.button_text || 'Shop Now'
      };
    }

    // Map Products
    if (products && products.length > 0) {
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
    if (categories && categories.length > 0) {
      newSettings.categories = categories.map(c => ({
        id: c.id,
        name: c.title,
        image: c.image_url || 'assets/product_jasmine.png'
      }));
    }

    // Map Testimonials
    if (testimonials && testimonials.length > 0) {
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
    if (pages && pages.length > 0) {
      pages.forEach(p => {
        if (p.content && p.content.html) {
          newSettings.pages[p.page_name] = p.content.html;
        }
      });
    }

    // Overwrite global store
    storeState.adminSettings = newSettings;
    
  } catch (err) {
    console.error("Failed to load Supabase data. Falling back to local data.", err);
  }
}

// Start everything when DOM is loaded
document.addEventListener("DOMContentLoaded", async () => {
  await fetchSupabaseData();
  bindEvents();
  initStore();
  initAdminFields();
});
