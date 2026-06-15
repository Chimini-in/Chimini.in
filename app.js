/* ==========================================================================
   LUMIÈRE LUXURY ECOMMERCE JAVASCRIPT
   ========================================================================== */

// --- 1. DEFAULT LUXURY CONTENT (MOCK DATA) ---
const DEFAULT_SETTINGS = {
  announcementText: "Complimentary shipping on orders over $100 • Use code LUXE15 for 15% off",
  heroBanner: {
    image: "assets/hero_banner_1.png",
    link: "#best-sellers"
  },
  products: [
    {
      id: "prod-1",
      name: "Jasmine & Oakwood",
      price: 28.00,
      image: "assets/product_jasmine.png",
      category: "candles"
    },
    {
      id: "prod-2",
      name: "Sandalwood & Amber",
      price: 32.00,
      image: "assets/product_sandalwood.png",
      category: "candles"
    },
    {
      id: "prod-3",
      name: "Velvet Rose & Oud",
      price: 34.00,
      image: "assets/product_rose.png",
      category: "candles"
    },
    {
      id: "prod-4",
      name: "Wild Fig & Honey",
      price: 29.00,
      image: "assets/product_fig.png",
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
  testimonials: [
    {
      id: "test-1",
      rating: 5,
      text: "The Jasmine & Oakwood scent transformed my living room completely. It smells incredibly luxurious, and the burn is perfectly clean.",
      author: "Eleanor Vance"
    },
    {
      id: "test-2",
      rating: 5,
      text: "I purchased the Artisan Gift Hamper for a friend, and she was blown away by the presentation and fragrance. Lumière is my go-to gifting brand.",
      author: "Sebastian Thorne"
    },
    {
      id: "test-3",
      rating: 5,
      text: "Hands down the most beautiful candles I have ever owned. The ceramic containers are works of art, and the eco-wax burns so slowly.",
      author: "Camille Laurent"
    }
  ]
};

// --- 2. APPLICATION STATE ---
let storeState = {
  cart: JSON.parse(localStorage.getItem("lumiere_cart")) || [],
  wishlist: JSON.parse(localStorage.getItem("lumiere_wishlist")) || [],
  searchQuery: "",
  activeCategory: "all",
  currentTestimonialIndex: 0,
  adminSettings: JSON.parse(localStorage.getItem("lumiere_admin_settings")) || JSON.parse(JSON.stringify(DEFAULT_SETTINGS))
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
      <img src="${hero.image}" alt="LUMIÈRE Luxury Candles Banner" onerror="this.src='assets/hero_banner_1.png'">
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
        <p class="product-price">$${Number(product.price).toFixed(2)}</p>
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

// G. Customer Testimonials Slider
function renderTestimonials() {
  if (!DOM.testimonialsTrack) return;
  DOM.testimonialsTrack.innerHTML = "";
  DOM.testimonialsDots.innerHTML = "";
  
  const tests = storeState.adminSettings.testimonials;
  
  if (tests.length === 0) {
    DOM.testimonialsTrack.innerHTML = `<div class="testimonial-card"><p class="testimonial-text">No reviews listed yet.</p></div>`;
    return;
  }
  
  tests.forEach((test, index) => {
    // Generate Stars HTML
    let starsHtml = "";
    for (let i = 0; i < 5; i++) {
      starsHtml += `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${i < test.rating ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`;
    }
    
    // Card slide
    const card = document.createElement("div");
    card.className = "testimonial-card";
    card.innerHTML = `
      <div class="testimonial-stars">${starsHtml}</div>
      <p class="testimonial-text">"${test.text}"</p>
      <span class="testimonial-author">${test.author}</span>
    `;
    DOM.testimonialsTrack.appendChild(card);
    
    // Dot indicator
    const dot = document.createElement("button");
    dot.className = `testimonial-dot ${index === storeState.currentTestimonialIndex ? "active" : ""}`;
    dot.ariaLabel = `Go to review ${index + 1}`;
    dot.addEventListener("click", () => {
      setTestimonialSlide(index);
    });
    DOM.testimonialsDots.appendChild(dot);
  });
  
  // Set initial position
  setTestimonialSlide(storeState.currentTestimonialIndex);
}

function setTestimonialSlide(index) {
  const tests = storeState.adminSettings.testimonials;
  if (tests.length === 0) return;
  
  storeState.currentTestimonialIndex = (index + tests.length) % tests.length;
  
  if (DOM.testimonialsTrack) {
    DOM.testimonialsTrack.style.transform = `translateX(-${storeState.currentTestimonialIndex * 100}%)`;
  }
  
  const dots = DOM.testimonialsDots.querySelectorAll(".testimonial-dot");
  dots.forEach((dot, i) => {
    if (i === storeState.currentTestimonialIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function startTestimonialsAutoplay() {
  stopTestimonialsAutoplay();
  testimonialInterval = setInterval(() => {
    setTestimonialSlide(storeState.currentTestimonialIndex + 1);
  }, 7000);
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
    DOM.cartSubtotal.textContent = "$0.00";
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
        <span class="cart-item-price">$${Number(item.price).toFixed(2)}</span>
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
  
  DOM.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
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
  localStorage.setItem("lumiere_cart", JSON.stringify(storeState.cart));
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
    localStorage.setItem("lumiere_cart", JSON.stringify(storeState.cart));
    renderCart();
  }
}

function removeCartItem(productId) {
  storeState.cart = storeState.cart.filter(item => item.id !== productId);
  localStorage.setItem("lumiere_cart", JSON.stringify(storeState.cart));
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
        <span class="wishlist-item-price">$${Number(product.price).toFixed(2)}</span>
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
  
  localStorage.setItem("lumiere_wishlist", JSON.stringify(storeState.wishlist));
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
    { fileId: "admin-brand-story-banner-file", textId: "admin-brand-story-banner-url" }
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
        <label>Price ($)</label>
        <input type="number" step="0.01" class="prod-price-val" value="${prod.price}" data-index="${index}">
      </div>
      <div class="admin-form-group">
        <label>Image URL / Base64</label>
        <input type="text" class="prod-image-val" value="${prod.image}" data-index="${index}">
        <input type="file" class="prod-file-val admin-file-input" accept="image/*" data-index="${index}">
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
        <label>Image URL / Base64</label>
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
  
  // Save Products List
  const prodCards = document.querySelectorAll("#admin-products-list .admin-card");
  const updatedProducts = [];
  prodCards.forEach(card => {
    const name = card.querySelector(".prod-name-val").value;
    const price = parseFloat(card.querySelector(".prod-price-val").value) || 0.00;
    const image = card.querySelector(".prod-image-val").value;
    const category = card.querySelector(".prod-cat-val").value;
    const id = card.querySelector(".delete-product").getAttribute("data-id");
    
    if (name.trim() !== "") {
      updatedProducts.push({ id: id || `prod-${Math.random()}`, name, price, image, category });
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
  localStorage.setItem("lumiere_admin_settings", JSON.stringify(settings));
  
  // Close drawers & refresh page renderers
  closeAllDrawers();
  initStore();
  showToast("Customizer changes applied successfully!");
}

// Reset customizer defaults
function resetAdminSettings() {
  if (confirm("Are you sure you want to restore the default luxury layout? All customized images and text will be cleared.")) {
    localStorage.removeItem("lumiere_admin_settings");
    storeState.adminSettings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    
    // Clear cart and wishlist
    storeState.cart = [];
    storeState.wishlist = [];
    localStorage.removeItem("lumiere_cart");
    localStorage.removeItem("lumiere_wishlist");
    
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
      alert("Thank you for choosing LUMIÈRE. Checkout simulation complete.");
      storeState.cart = [];
      localStorage.removeItem("lumiere_cart");
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
            const yOffset = -DOM.mainHeader.offsetHeight;
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
        image: "assets/product_jasmine.png",
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
  
  // Sticky header class trigger on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      DOM.mainHeader.classList.add("sticky");
      document.body.classList.add("has-sticky-header");
    } else {
      DOM.mainHeader.classList.remove("sticky");
      document.body.classList.remove("has-sticky-header");
    }
  });

  // Footer Category clicks
  const footerLinks = document.querySelectorAll(".footer-cat-link");
  footerLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const cat = link.getAttribute("data-category");
      storeState.activeCategory = cat || "all";
      storeState.searchQuery = "";
      if (DOM.searchInput) DOM.searchInput.value = "";
      renderBestSellers();
      document.getElementById("best-sellers").scrollIntoView({ behavior: "smooth" });
    });
  });
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
  
  // Start carousel auto-scrolls
  startTestimonialsAutoplay();
}

// Start everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  bindEvents();
  initStore();
  initAdminFields();
});
