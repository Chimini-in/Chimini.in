/* ==========================================================================
   CHIMINI LUXURY ECOMMERCE - APPLICATION LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Default Store Data in LocalStorage if Empty
  await initStoreData();

  // Load and Render Store Components
  renderStore();

  // Initialize Interactive Event Listeners
  initHeaderScroll();
  initHeroSlider();
  initCartSystem();
  initTestimonialsSlider();
  initSearchFilter();
  initAdminDashboard();
  initAnnouncementBar();
  initGiftsPage();
  initContactForm();
  initCollectionsPage();
});

import { supabaseClient } from './config.js';

/* ==========================================================================
   STATE MANAGEMENT (SUPABASE TO LOCAL CACHE SYNC)
   ========================================================================== */

async function initStoreData() {
  if (supabaseClient) {
    try {
      // Fetch Products
      const { data: products } = await supabaseClient.from('products').select('*');
      if (products && products.length > 0) {
        const mappedProducts = products.map(p => ({
          id: p.id,
          name: p.title,
          price: parseFloat(p.price),
          image: p.image_url,
          category: p.category,
          fragrance: p.fragrance,
          availability: p.availability ? "In Stock" : "Out of Stock",
          badge: p.badges || ""
        }));
        localStorage.setItem('chimini_products', JSON.stringify(mappedProducts));
      }

      // Fetch all dynamic settings
      const { data: allSettings } = await supabaseClient.from('settings').select('*');
      if (allSettings && allSettings.length > 0) {
        allSettings.forEach(row => {
          localStorage.setItem('chimini_' + row.setting_key, JSON.stringify(row.setting_value));
        });
      }
    } catch (e) {
      console.error("Supabase sync error:", e);
    }
  } else {
    console.warn("Supabase client not initialized. Using local defaults.");
  }
}

function renderStore() {
  // 1. Render Header Nav
  const navMenu = document.getElementById('dynamicNavMenu');
  const navLinks = JSON.parse(localStorage.getItem('chimini_nav_links')) || [
    { label: 'Home', href: 'index.html' },
    { label: 'Collections', href: 'collections.html' },
    { label: 'Gifts', href: 'gifts.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Contact', href: 'contact.html' }
  ];
  if (navMenu) {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navMenu.innerHTML = navLinks.map(link => `
      <li class="nav-item ${currentPath === link.href ? 'active' : ''}"><a href="${link.href}">${link.label}</a></li>
    `).join('');
  }

  // 2. Render Footer
  const footerContainer = document.getElementById('dynamicFooter');
  const footerContent = JSON.parse(localStorage.getItem('chimini_footer_content')) || {
    about: 'Crafting ambient luxury with organic botanicals. Elevate your space with our signature hand-poured soy candles.',
    quickLinks: [
      { label: 'Shop All', href: 'collections.html' },
      { label: 'Our Story', href: 'about.html' },
      { label: 'Gift Hampers', href: 'gifts.html' },
      { label: 'Contact Us', href: 'contact.html' },
      { label: 'Admin Portal', href: 'admin/login.html' }
    ],
    customerCare: [
      { label: 'Shipping & Returns', href: '#' },
      { label: 'Candle Care Guide', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Privacy Policy', href: '#' }
    ]
  };
  if (footerContainer) {
    footerContainer.innerHTML = `
      <div class="footer-grid">
        <div class="footer-col">
          <h3 class="footer-brand">CHIMINI</h3>
          <p class="footer-desc">${footerContent.about}</p>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            ${footerContent.quickLinks.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Customer Care</h4>
          <ul class="footer-links">
            ${footerContent.customerCare.map(l => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Newsletter</h4>
          <p class="footer-desc" style="margin-bottom: 15px;">Subscribe to receive updates, access to exclusive deals, and more.</p>
          <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Subscribed to Chimini Newsletter!');">
            <input type="email" placeholder="Enter your email address" class="newsletter-input" required>
            <button type="submit" class="btn-primary" style="width:100%; margin-top:10px;">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} CHIMINI. All rights reserved.</p>
      </div>
    `;
  }

  // 3. Render Announcement Bar Carousel Slides
  const announcements = JSON.parse(localStorage.getItem('chimini_announcements'));
  const announcementSlider = document.getElementById('announcementSlider');
  if (announcementSlider && announcements) {
    announcementSlider.innerHTML = announcements.map(text => `
      <div class="announcement-slide">${text}</div>
    `).join('');
  }

  // 4. Render Hero Slider Banners
  const heroSlides = JSON.parse(localStorage.getItem('chimini_hero_slides'));
  const heroSlider = document.getElementById('heroSlider');
  const heroSliderDots = document.getElementById('heroSliderDots');
  if (heroSlider && heroSlides) {
    heroSlider.innerHTML = heroSlides.map(slide => `
      <a href="${slide.link}" class="hero-slide">
        <img src="${slide.image}" alt="${slide.title}" class="hero-slide-img" loading="eager">
        <div class="hero-slide-overlay">
          <div class="hero-slide-content">
            <span class="hero-slide-subtitle">${slide.subtitle}</span>
            <h1 class="hero-slide-title">${slide.title}</h1>
            <span class="hero-slide-btn">Shop Collection</span>
          </div>
        </div>
      </a>
    `).join('');

    if (heroSliderDots) {
      heroSliderDots.innerHTML = heroSlides.map((_, index) => `
        <button class="slider-dot ${index === 0 ? 'active' : ''}" data-slide="${index}" aria-label="Go to slide ${index + 1}"></button>
      `).join('');
    }
  }

  // 5. Render Best Sellers Products
  const allProducts   = JSON.parse(localStorage.getItem('chimini_products')) || [];
  const featuredIds   = JSON.parse(localStorage.getItem('chimini_featured'))   || [];
  const featuredProds = featuredIds
    .map(id => allProducts.find(p => p.id === id))
    .filter(Boolean)
    .slice(0, 4);
  const productGrid = document.getElementById('productGrid');
  if (productGrid) {
    if (featuredProds.length === 0) {
      productGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--color-text-muted);padding:40px 0;">No featured products selected. Choose up to 4 in the Admin panel.</p>`;
    } else {
      productGrid.innerHTML = featuredProds.map(prod => `
        <article class="product-card" data-name="${prod.name.toLowerCase()}">
          <div class="product-img-wrapper">
            ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
            <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy">
          </div>
          <div class="product-info">
            <h3 class="product-name">${prod.name}</h3>
            <span class="product-price">$${prod.price.toFixed(2)}</span>
            <button class="product-btn" onclick="addToCart('${prod.id}')">Add to Cart</button>
          </div>
        </article>
      `).join('');
    }
  }

  // 6. Render Shop by Fragrance / Category
  const categories = JSON.parse(localStorage.getItem('chimini_categories'));
  const fragranceList = document.getElementById('fragranceList');
  if (fragranceList && categories) {
    fragranceList.innerHTML = categories.map(cat => `
      <a href="#bestSellers" class="fragrance-item" onclick="filterByCategory('${cat.name}')">
        <div class="fragrance-thumb-wrapper">
          <img src="${cat.image}" alt="${cat.name}" class="fragrance-thumb" loading="lazy">
        </div>
        <span class="fragrance-name">${cat.name}</span>
      </a>
    `).join('');
  }

  // 7. Render Featured Collections
  const collections = JSON.parse(localStorage.getItem('chimini_collections'));
  const collectionsGrid = document.getElementById('collectionsGrid');
  if (collectionsGrid && collections) {
    collectionsGrid.innerHTML = collections.map(col => `
      <a href="${col.link}" class="collection-card">
        <img src="${col.image}" alt="${col.title}" class="collection-img" loading="lazy">
        <div class="collection-overlay">
          <h3 class="collection-title">${col.title}</h3>
          <span class="collection-link">
            Explore 
            <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </a>
    `).join('');
  }

  // 8. Render Banners Setup
  const banners = JSON.parse(localStorage.getItem('chimini_banners'));
  if (banners) {
    const promoBannerImg = document.getElementById('promoBannerImg');
    const promoBannerLink = document.getElementById('promoBannerLink');
    if (promoBannerImg) promoBannerImg.src = banners.promoBanner.image;
    if (promoBannerLink) promoBannerLink.href = banners.promoBanner.link;

    const campaignBannerImg = document.getElementById('campaignBannerImg');
    const campaignBannerLink = document.getElementById('campaignBannerLink');
    const campaignTitle = document.getElementById('campaignTitle');
    const campaignSubtitle = document.getElementById('campaignSubtitle');
    if (campaignBannerImg) campaignBannerImg.src = banners.campaignBanner.image;
    if (campaignBannerLink) campaignBannerLink.href = banners.campaignBanner.link;
    if (campaignTitle && banners.campaignBanner.title) campaignTitle.textContent = banners.campaignBanner.title;
    if (campaignSubtitle && banners.campaignBanner.subtitle) campaignSubtitle.textContent = banners.campaignBanner.subtitle;

    const storyBannerImg = document.getElementById('storyBannerImg');
    const storyBannerLink = document.getElementById('storyBannerLink');
    if (storyBannerImg) storyBannerImg.src = banners.storyBanner.image;
    if (storyBannerLink) storyBannerLink.href = banners.storyBanner.link;
  }

  // 9. Render Customer Testimonials
  const testimonials = JSON.parse(localStorage.getItem('chimini_testimonials'));
  const testimonialsContainer = document.getElementById('testimonialsContainer');
  const testimonialsDots = document.getElementById('testimonialsDots');
  if (testimonialsContainer && testimonials) {
    testimonialsContainer.innerHTML = testimonials.map((test, index) => `
      <div class="testimonial-card">
        <p class="testimonial-text">${test.text}</p>
        <span class="testimonial-author">&mdash; ${test.author}</span>
      </div>
    `).join('');

    if (testimonialsDots) {
      testimonialsDots.innerHTML = testimonials.map((_, index) => `
        <button class="testimonial-dot ${index === 0 ? 'active' : ''}" data-testimonial="${index}" aria-label="Go to testimonial ${index + 1}"></button>
      `).join('');
    }
  }

  // 10. Render Gift Hampers (Gifts Page Specific)
  const gifts = JSON.parse(localStorage.getItem('chimini_gifts'));
  const giftsGrid = document.getElementById('giftsGrid');
  if (giftsGrid && gifts) {
    giftsGrid.innerHTML = gifts.map(gift => `
      <article class="product-card" data-name="${gift.name.toLowerCase()}">
        <div class="product-img-wrapper">
          ${gift.badge ? `<span class="product-badge">${gift.badge}</span>` : ''}
          <img src="${gift.image}" alt="${gift.name}" class="product-img" loading="lazy">
        </div>
        <div class="product-info">
          <h3 class="product-name">${gift.name}</h3>
          <span class="product-price">$${gift.price.toFixed(2)}</span>
          <button class="product-btn" onclick="addToCart('${gift.id}')">Add to Cart</button>
        </div>
      </article>
    `).join('');
  }
}

/* ==========================================================================
   STICKY HEADER SCROLL LOGIC
   ========================================================================== */

function initHeaderScroll() {
  const header = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
    

function initAnnouncementBar() {
  const slider = document.getElementById('announcementSlider');
  if (!slider) return;
  
  let currentIdx = 0;
  const slideCount = slider.children.length;
  
  setInterval(() => {
    currentIdx = (currentIdx + 1) % slideCount;
    slider.style.transform = `translateY(-${currentIdx * 16}px)`;
  }, 4000);
}

/* ==========================================================================
   HERO BANNER SLIDER LOGIC
   ========================================================================== */

function initHeroSlider() {
  const slider = document.getElementById('heroSlider');
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('#heroSliderDots .slider-dot');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  
  if (!slider || slides.length === 0) return;
  
  let currentIndex = 0;
  let slideInterval;
  
  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }
  
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }
  
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }
  
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 6000);
  }
  
  // Controls click listeners
  if (nextBtn) nextBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
  
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      currentIndex = parseInt(e.target.getAttribute('data-slide'));
      updateSlider();
      resetInterval();
    });
  });
  
  // Start rotation
  resetInterval();
}

/* ==========================================================================
   CUSTOMER TESTIMONIALS SLIDER LOGIC
   ========================================================================== */

function initTestimonialsSlider() {
  const container = document.getElementById('testimonialsContainer');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('#testimonialsDots .testimonial-dot');
  
  if (!container || testimonialCards.length === 0) return;
  
  let currentIndex = 0;
  let testimonialInterval;
  
  function updateTestimonials() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }
  
  function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonialCards.length;
    updateTestimonials();
  }
  
  function resetInterval() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonial, 5000);
  }
  
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      currentIndex = parseInt(e.target.getAttribute('data-testimonial'));
      updateTestimonials();
      resetInterval();
    });
  });
  
  resetInterval();
}

/* ==========================================================================
   SHOPPING CART DRAWER SYSTEM
   ========================================================================== */

let cart = [];

function initCartSystem() {
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartOverlay = document.getElementById('cartOverlay');
  
  if (cartToggleBtn && cartOverlay) {
    cartToggleBtn.addEventListener('click', () => {
      cartOverlay.classList.add('open');
      renderCartItems();
    });
  }
  
  if (cartCloseBtn && cartOverlay) {
    cartCloseBtn.addEventListener('click', () => {
      cartOverlay.classList.remove('open');
    });
    
    // Close on overlay backdrop click
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
        cartOverlay.classList.remove('open');
      }
    });
  }

  // Load cart state from session storage if any
  const savedCart = sessionStorage.getItem('chimini_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCountBadge();
  }
}

// Global functions for add / modify
window.addToCart = function(productId) {
  const products = JSON.parse(localStorage.getItem('chimini_products')) || [];
  const gifts = JSON.parse(localStorage.getItem('chimini_gifts')) || [];
  const allItems = [...products, ...gifts];
  const product = allItems.find(p => p.id === productId);
  
  if (!product) return;
  
  const existingItem = cart.find(item => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  
  // Save cart state
  sessionStorage.setItem('chimini_cart', JSON.stringify(cart));
  
  // Visual feedback
  updateCartCountBadge();
  
  // Auto open cart
  const cartOverlay = document.getElementById('cartOverlay');
  if (cartOverlay) {
    cartOverlay.classList.add('open');
    renderCartItems();
  }
};

window.changeCartQty = function(productId, delta) {
  const cartItemIndex = cart.findIndex(item => item.product.id === productId);
  if (cartItemIndex === -1) return;
  
  cart[cartItemIndex].quantity += delta;
  
  if (cart[cartItemIndex].quantity <= 0) {
    cart.splice(cartItemIndex, 1);
  }
  
  sessionStorage.setItem('chimini_cart', JSON.stringify(cart));
  updateCartCountBadge();
  renderCartItems();
};

window.removeFromCart = function(productId) {
  cart = cart.filter(item => item.product.id !== productId);
  sessionStorage.setItem('chimini_cart', JSON.stringify(cart));
  updateCartCountBadge();
  renderCartItems();
};

function updateCartCountBadge() {
  const badge = document.getElementById('cartBadgeCount');
  if (!badge) return;
  
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  badge.textContent = totalCount;
  
  // Add animation bump effect
  badge.classList.remove('bump');
  void badge.offsetWidth; // Trigger reflow
  badge.classList.add('bump');
}

function renderCartItems() {
  const cartBody = document.getElementById('cartBody');
  const cartTotalValue = document.getElementById('cartTotalValue');
  const cartShippingValue = document.getElementById('cartShippingValue');
  const cartFooter = document.getElementById('cartFooter');
  
  if (!cartBody) return;
  
  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty-state">
        <svg viewBox="0 0 24 24"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12z"/></svg>
        <span class="cart-empty-text">Your cart is currently empty.</span>
        <button class="btn-accent" onclick="document.getElementById('cartOverlay').classList.remove('open')">Continue Shopping</button>
      </div>
    `;
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }
  
  if (cartFooter) cartFooter.style.display = 'block';
  
  cartBody.innerHTML = `
    <div class="cart-items-list">
      ${cart.map(item => `
        <div class="cart-item">
          <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.product.name}</h4>
            <span class="cart-item-price">$${item.product.price.toFixed(2)}</span>
            <div class="cart-item-controls">
              <div class="quantity-selector">
                <button class="quantity-btn" onclick="changeCartQty('${item.product.id}', -1)">-</button>
                <span class="quantity-val">${item.quantity}</span>
                <button class="quantity-btn" onclick="changeCartQty('${item.product.id}', 1)">+</button>
              </div>
              <button class="cart-item-remove" onclick="removeFromCart('${item.product.id}')">Remove</button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  
  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  
  // High-end Shipping calculation feedback
  if (subtotal >= 150) {
    if (cartShippingValue) {
      cartShippingValue.innerHTML = '<strong style="color: var(--color-accent);">FREE SHIPPING</strong>';
    }
    if (cartTotalValue) cartTotalValue.textContent = `$${subtotal.toFixed(2)}`;
  } else {
    const shippingCost = 15.00;
    if (cartShippingValue) cartShippingValue.textContent = `$${shippingCost.toFixed(2)}`;
    if (cartTotalValue) cartTotalValue.textContent = `$${(subtotal + shippingCost).toFixed(2)}`;
  }
}

/* ==========================================================================
   PRODUCT SEARCH & FILTER ENGINE
   ========================================================================== */

function initSearchFilter() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;
  
  searchInput.addEventListener('keyup', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
      const name = card.getAttribute('data-name');
      if (name.includes(query)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

window.filterByCategory = function(categoryName) {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;
  
  const query = categoryName.split(' ')[0].toLowerCase(); // e.g. Rose, Jasmine, Sandalwood
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = categoryName;

  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const name = card.getAttribute('data-name');
    if (name.includes(query)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  // Smooth scroll to grid
  const section = document.getElementById('bestSellers');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ==========================================================================
   ADMIN PANEL ACTIONS & BACKEND FORMS
   ========================================================================== */

function initAdminDashboard() {
  const adminOpenLink = document.getElementById('adminOpenLink');
  const adminCloseBtn = document.getElementById('adminCloseBtn');
  const adminOverlay = document.getElementById('adminOverlay');
  
  if (adminOpenLink && adminOverlay) {
    adminOpenLink.addEventListener('click', (e) => {
      e.preventDefault();
      adminOverlay.classList.add('open');
      populateAdminForms();
      renderAdminProductsTable();
    });
  }
  
  if (adminCloseBtn && adminOverlay) {
    adminCloseBtn.addEventListener('click', () => {
      adminOverlay.classList.remove('open');
    });
    
    // Close on overlay click
    adminOverlay.addEventListener('click', (e) => {
      if (e.target === adminOverlay) {
        adminOverlay.classList.remove('open');
      }
    });
  }

  // Sidebar navigation switching
  const tabs = document.querySelectorAll('.admin-tab-btn');
  const sections = document.querySelectorAll('.admin-section');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      
      const tabId = e.currentTarget.getAttribute('data-tab');
      e.currentTarget.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Form submit handlers
  const adminBannersForm = document.getElementById('adminBannersForm');
  if (adminBannersForm) {
    adminBannersForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const banners = JSON.parse(localStorage.getItem('chimini_banners'));
      const heroSlides = JSON.parse(localStorage.getItem('chimini_hero_slides'));

      // Save primary slide 1 changes
      heroSlides[0].image = document.getElementById('adminHeroImage').value;
      heroSlides[0].title = document.getElementById('adminHeroTitle').value;
      heroSlides[0].link = document.getElementById('adminHeroUrl').value;
      
      // Save other banners
      banners.promoBanner.image = document.getElementById('adminPromoBannerUrl').value;
      banners.promoBanner.link = document.getElementById('adminPromoLink').value;
      
      banners.campaignBanner.image = document.getElementById('adminCampaignBannerUrl').value;
      banners.campaignBanner.link = document.getElementById('adminCampaignLink').value;
      
      banners.storyBanner.image = document.getElementById('adminStoryBannerUrl').value;

      localStorage.setItem('chimini_hero_slides', JSON.stringify(heroSlides));
      localStorage.setItem('chimini_banners', JSON.stringify(banners));

      alert('Banners updated successfully! Reloading...');
      location.reload();
    });
  }

  const adminAnnouncementsForm = document.getElementById('adminAnnouncementsForm');
  if (adminAnnouncementsForm) {
    adminAnnouncementsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = [
        document.getElementById('announcement1').value,
        document.getElementById('announcement2').value,
        document.getElementById('announcement3').value
      ].filter(t => t.trim() !== "");

      localStorage.setItem('chimini_announcements', JSON.stringify(updated));
      alert('Announcements updated successfully! Reloading...');
      location.reload();
    });
  }

  const adminAddProductForm = document.getElementById('adminAddProductForm');
  if (adminAddProductForm) {
    adminAddProductForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newProduct = {
        id: 'prod_' + Date.now(),
        name: document.getElementById('newProductName').value,
        price: parseFloat(document.getElementById('newProductPrice').value),
        image: document.getElementById('newProductImage').value,
        badge: document.getElementById('newProductBadge').value || ""
      };

      const products = JSON.parse(localStorage.getItem('chimini_products'));
      products.push(newProduct);
      localStorage.setItem('chimini_products', JSON.stringify(products));

      adminAddProductForm.reset();
      renderAdminProductsTable();
      renderStore();
      alert('New luxury candle added to catalog.');
    });
  }
}

function populateAdminForms() {
  const announcements = JSON.parse(localStorage.getItem('chimini_announcements')) || [];
  if (announcements.length > 0) document.getElementById('announcement1').value = announcements[0] || "";
  if (announcements.length > 1) document.getElementById('announcement2').value = announcements[1] || "";
  if (announcements.length > 2) document.getElementById('announcement3').value = announcements[2] || "";

  const heroSlides = JSON.parse(localStorage.getItem('chimini_hero_slides')) || [];
  if (heroSlides.length > 0) {
    document.getElementById('adminHeroImage').value = heroSlides[0].image;
    document.getElementById('adminHeroTitle').value = heroSlides[0].title;
    document.getElementById('adminHeroUrl').value = heroSlides[0].link;
  }

  const banners = JSON.parse(localStorage.getItem('chimini_banners'));
  if (banners) {
    document.getElementById('adminPromoBannerUrl').value = banners.promoBanner.image;
    document.getElementById('adminPromoLink').value = banners.promoBanner.link;

    document.getElementById('adminCampaignBannerUrl').value = banners.campaignBanner.image;
    document.getElementById('adminCampaignLink').value = banners.campaignBanner.link;

    document.getElementById('adminStoryBannerUrl').value = banners.storyBanner.image;
  }
}

function renderAdminProductsTable() {
  const products    = JSON.parse(localStorage.getItem('chimini_products')) || [];
  const featuredIds = JSON.parse(localStorage.getItem('chimini_featured'))  || [];
  const tableBody   = document.getElementById('adminProductsTableBody');
  if (!tableBody) return;

  tableBody.innerHTML = products.map(prod => {
    const isFeatured = featuredIds.includes(prod.id);
    const isDisabled = !isFeatured && featuredIds.length >= 4;
    return `
      <tr class="${isFeatured ? 'admin-featured-row' : ''}">
        <td><img src="${prod.image}" alt="${prod.name}" class="admin-thumbnail-small"></td>
        <td><strong>${prod.name}</strong><br><span style="font-size:0.75rem;color:var(--color-text-muted)">${prod.category}</span></td>
        <td>$${prod.price.toFixed(2)}</td>
        <td>
          <label class="admin-featured-toggle" title="${isDisabled ? 'Max 4 featured products. Deselect another first.' : (isFeatured ? 'Remove from Best Sellers' : 'Add to Best Sellers')}">
            <input type="checkbox"
              ${isFeatured ? 'checked' : ''}
              ${isDisabled ? 'disabled' : ''}
              onchange="toggleFeaturedProduct('${prod.id}', this.checked)"
              class="admin-featured-checkbox">
            <span class="admin-featured-label">${isFeatured ? '★ Featured' : '☆ Feature'}</span>
          </label>
        </td>
      </tr>`;
  }).join('');

  // Update featured count indicator
  const countEl = document.getElementById('adminFeaturedCount');
  if (countEl) countEl.textContent = `${featuredIds.length} / 4 featured`;
}

window.toggleFeaturedProduct = function(productId, isChecked) {
  let featuredIds = JSON.parse(localStorage.getItem('chimini_featured')) || [];
  if (isChecked) {
    if (featuredIds.length >= 4) return; // Hard cap
    if (!featuredIds.includes(productId)) featuredIds.push(productId);
  } else {
    featuredIds = featuredIds.filter(id => id !== productId);
  }
  localStorage.setItem('chimini_featured', JSON.stringify(featuredIds));
  renderAdminProductsTable();
  renderStore(); // Live-update homepage Best Sellers
};

window.deleteProductFromAdmin = function(productId) {
  if (confirm('Are you sure you want to delete this product from the catalog?')) {
    let products = JSON.parse(localStorage.getItem('chimini_products')) || [];
    products = products.filter(p => p.id !== productId);
    localStorage.setItem('chimini_products', JSON.stringify(products));
    // Also remove from featured if it was there
    let featuredIds = JSON.parse(localStorage.getItem('chimini_featured')) || [];
    featuredIds = featuredIds.filter(id => id !== productId);
    localStorage.setItem('chimini_featured', JSON.stringify(featuredIds));
    renderAdminProductsTable();
    renderStore();
  }
};


function initGiftsPage() {
  const giftNoteInput = document.getElementById('giftNoteInput');
  const giftNotePreview = document.getElementById('giftCardNotePreview');
  if (giftNoteInput && giftNotePreview) {
    giftNoteInput.addEventListener('input', (e) => {
      giftNotePreview.textContent = e.target.value || "Your message will appear here...";
    });
  }

  const wrapOptions = document.querySelectorAll('.wrap-option');
  const selectedWrapName = document.getElementById('selectedWrapName');
  if (wrapOptions.length > 0 && selectedWrapName) {
    wrapOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        wrapOptions.forEach(o => o.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const wrapName = e.currentTarget.getAttribute('data-wrap');
        selectedWrapName.textContent = wrapName;
      });
    });
  }
}

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  if (contactForm && contactSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contactName');
      const senderNameElement = contactSuccess.querySelector('.sender-name');
      if (senderNameElement && nameInput) {
        senderNameElement.textContent = nameInput.value;
      }
      contactForm.style.display = 'none';
      contactSuccess.style.display = 'block';
    });
  }
}

/* ==========================================================================
   COLLECTIONS PAGE — SORT, FILTER & RENDER ENGINE
   ========================================================================== */

function initCollectionsPage() {
  const catalogGrid = document.getElementById('catalogGrid');
  if (!catalogGrid) return; // Only runs on collections page

  // ── State ──
  let activeFilters = { categories: [], fragrances: [], priceMin: 0, priceMax: 999, availability: [] };
  let currentSort = 'featured';
  const allProducts = JSON.parse(localStorage.getItem('chimini_products')) || [];

  // ── Render products ──
  function renderCatalog(products) {
    const countEl = document.getElementById('catalogCount');
    if (countEl) countEl.textContent = `${products.length} product${products.length !== 1 ? 's' : ''}`;

    if (products.length === 0) {
      catalogGrid.innerHTML = `
        <div class="catalog-empty">
          <svg viewBox="0 0 24 24" style="width:52px;height:52px;fill:none;stroke:var(--color-beige-dark);stroke-width:1.2;margin-bottom:16px;"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <h3 style="font-family:var(--font-serif);color:var(--color-text-muted);font-size:1.3rem;margin-bottom:8px;">No Products Found</h3>
          <p style="color:var(--color-text-muted);font-size:0.82rem;">Try adjusting your filters.</p>
        </div>`;
      return;
    }

    catalogGrid.innerHTML = products.map(prod => {
      const hasDiscount = prod.originalPrice && prod.originalPrice > prod.price;
      const discountPct = hasDiscount ? Math.round((1 - prod.price / prod.originalPrice) * 100) : 0;
      const isOOS = prod.availability === 'Out of Stock';
      const badgeClass = prod.badge ? prod.badge.toLowerCase().replace(/[^a-z]/g, '') : '';

      return `
        <article class="catalog-card${isOOS ? ' catalog-card--oos' : ''}" data-id="${prod.id}">
          <div class="catalog-img-wrapper">
            ${prod.badge ? `<span class="catalog-badge catalog-badge--${badgeClass}">${prod.badge}</span>` : ''}
            ${hasDiscount ? `<span class="catalog-discount-tag">${discountPct}% OFF</span>` : ''}
            <img src="${prod.image}" alt="${prod.name}" class="catalog-img" loading="lazy">
            <div class="catalog-img-overlay">
              <button class="catalog-quick-add${isOOS ? ' disabled' : ''}"
                onclick="${isOOS ? 'event.stopPropagation()' : `addToCart('${prod.id}'); event.stopPropagation()`}"
                ${isOOS ? 'disabled' : ''}
                aria-label="Add ${prod.name} to cart"
                title="${isOOS ? 'Out of Stock' : 'Add to Cart'}">
                ${isOOS ? '—' : '+'}
              </button>
            </div>
          </div>
          <div class="catalog-info">
            <h3 class="catalog-name">${prod.name}</h3>
            <div class="catalog-pricing">
              <span class="catalog-price-label">MRP :</span>
              <span class="catalog-price">$${prod.price.toFixed(2)}</span>
              ${hasDiscount ? `<span class="catalog-original-price">$${prod.originalPrice.toFixed(2)}</span>` : ''}
              ${hasDiscount ? `<span class="catalog-discount-pct">${discountPct}% OFF</span>` : ''}
            </div>
          </div>
        </article>`;
    }).join('');
  }

  // ── Filter & Sort logic ──
  function applyFiltersAndSort() {
    let result = [...allProducts];
    if (activeFilters.categories.length)   result = result.filter(p => activeFilters.categories.includes(p.category));
    if (activeFilters.fragrances.length)   result = result.filter(p => activeFilters.fragrances.includes(p.fragrance));
    if (activeFilters.availability.length) result = result.filter(p => activeFilters.availability.includes(p.availability));
    result = result.filter(p => p.price >= activeFilters.priceMin && p.price <= activeFilters.priceMax);
    switch (currentSort) {
      case 'price-asc':    result.sort((a, b) => a.price - b.price); break;
      case 'price-desc':   result.sort((a, b) => b.price - a.price); break;
      case 'new-arrivals': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case 'best-selling': result.sort((a, b) => (b.badge === 'Best Seller' ? 1 : 0) - (a.badge === 'Best Seller' ? 1 : 0)); break;
    }
    renderCatalog(result);
  }

  // ── Sort dropdown ──
  const sortSelect = document.getElementById('catalogSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', e => { currentSort = e.target.value; applyFiltersAndSort(); });
  }

  // ── Checkbox filters ──
  function bindCheckboxGroup(dataFilter, filterKey) {
    document.querySelectorAll(`input[data-filter="${dataFilter}"]`).forEach(cb => {
      cb.addEventListener('change', () => {
        activeFilters[filterKey] = Array.from(document.querySelectorAll(`input[data-filter="${dataFilter}"]:checked`)).map(c => c.value);
        applyFiltersAndSort();
      });
    });
  }
  bindCheckboxGroup('category', 'categories');
  bindCheckboxGroup('fragrance', 'fragrances');
  bindCheckboxGroup('availability', 'availability');

  // ── Price range ──
  const priceMinInput  = document.getElementById('priceRangeMin');
  const priceMaxInput  = document.getElementById('priceRangeMax');
  const priceMinLabel  = document.getElementById('priceMinLabel');
  const priceMaxLabel  = document.getElementById('priceMaxLabel');
  function updatePrice() {
    let min = parseInt(priceMinInput.value), max = parseInt(priceMaxInput.value);
    if (min > max) { min = max; priceMinInput.value = min; }
    priceMinLabel.textContent = `$${min}`; priceMaxLabel.textContent = `$${max}`;
    activeFilters.priceMin = min; activeFilters.priceMax = max;
    applyFiltersAndSort();
  }
  if (priceMinInput) { priceMinInput.addEventListener('input', updatePrice); priceMaxInput.addEventListener('input', updatePrice); }

  // ── Filter drawer (RIGHT slide-in) ──
  const filterPanel   = document.getElementById('filterPanel');
  const filterOverlay = document.getElementById('filterOverlay');
  const filterToggleBtn = document.getElementById('filterToggleBtn');
  const filterCloseBtn  = document.getElementById('filterCloseBtn');

  function openFilter()  { filterPanel.classList.add('open'); filterOverlay.classList.add('active'); document.body.style.overflow = 'hidden'; }
  function closeFilter() { filterPanel.classList.remove('open'); filterOverlay.classList.remove('active'); document.body.style.overflow = ''; }

  if (filterToggleBtn) filterToggleBtn.addEventListener('click', openFilter);
  if (filterCloseBtn)  filterCloseBtn.addEventListener('click', closeFilter);
  if (filterOverlay)   filterOverlay.addEventListener('click', closeFilter);

  // ── Clear All ──
  const clearBtn = document.getElementById('clearFiltersBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeFilters = { categories: [], fragrances: [], priceMin: 0, priceMax: 999, availability: [] };
      currentSort = 'featured';
      if (sortSelect) sortSelect.value = 'featured';
      document.querySelectorAll('.filter-checkbox').forEach(cb => cb.checked = false);
      if (priceMinInput) { priceMinInput.value = 0; priceMinLabel.textContent = '$0'; }
      if (priceMaxInput) { priceMaxInput.value = 999; priceMaxLabel.textContent = '$999'; }
      applyFiltersAndSort();
    });
  }

  // ── Filter accordion ──
  document.querySelectorAll('.filter-section-header').forEach(h => {
    h.addEventListener('click', () => h.closest('.filter-section').classList.toggle('collapsed'));
  });

  // ── View toggle buttons ──
  const view4Btn    = document.getElementById('view4Btn');
  const view3Btn    = document.getElementById('view3Btn');
  const view2Btn    = document.getElementById('view2Btn');
  const viewListBtn = document.getElementById('viewListBtn');
  const allViewBtns = [view4Btn, view3Btn, view2Btn, viewListBtn];

  function setView(btn, gridClass) {
    allViewBtns.forEach(b => b && b.classList.remove('active'));
    btn.classList.add('active');
    catalogGrid.className = 'catalog-grid' + (gridClass ? ` ${gridClass}` : '');
  }

  if (view4Btn)    view4Btn.addEventListener('click',    () => setView(view4Btn, ''));
  if (view3Btn)    view3Btn.addEventListener('click',    () => setView(view3Btn, 'cols-3'));
  if (view2Btn)    view2Btn.addEventListener('click',    () => setView(view2Btn, 'cols-2'));
  if (viewListBtn) viewListBtn.addEventListener('click', () => setView(viewListBtn, 'list-view'));

  // ── Initial render ──
  applyFiltersAndSort();
}


