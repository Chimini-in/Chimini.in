const fs = require('fs');
const path = require('path');

// 1. Run CSS builder first
require('./build_pdp_system.js');

// 2. JavaScript Implementation for Product Detail Page
const pdpFunctionsCode = `
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
  const badgeText = product.badge ? product.badge.trim() : (product.is_best_seller ? 'BEST SELLER' : null);

  // Wishlist state
  const isWishlisted = storeState.wishlist.includes(product.id);

  // Descriptions & Accordion Content with luxury fallback
  const descriptionText = product.description || ("Immerse your sanctuary in the transcendent warmth of " + product.name + ". Handcrafted with 100% natural botanical soy wax and infused with rare essential oils, this slow-burning candle fills your living spaces with an aura of understated luxury and serene calm.");
  
  const fragranceNotes = product.fragrance || 'Top: Night Blooming Flora · Heart: Warm Smoked Botanicals · Base: Aged Amber & Precious Woods';

  const careInfoText = product.careInfo || product.care_info || "• Wick Care: Trim wick to 1/4 inch (6mm) before each lighting to ensure a soot-free, even flame.\\n• First Burn: Allow the melt pool to reach the full circumference of the vessel (2-3 hours) to prevent tunneling.\\n• Safety: Never leave a burning candle unattended. Keep away from drafts, flammable materials, children, and pets.";

  const shippingInfoText = product.shippingInfo || product.shipping_info || "• Complimentary Luxury Shipping: On all orders over ₹100.\\n• Dispatch Timeline: Handcrafted & dispatched within 24-48 business hours with live SMS & email tracking.\\n• Bespoke Packaging: Securely encased in our signature gold-embossed ivory gift box.";

  const returnsInfoText = product.returnsInfo || product.returns_info || "• 7-Day Complimentary Returns: We honor returns for unburned, sealed items in original luxury packaging.\\n• Concierge Support: Contact concierge@chimini.com or WhatsApp +91 97418 55293 for instant assistance.";

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
                '<img src="' + rel.image + '" class="product-image-main" alt="' + rel.name + '" onerror="this.src=\\'assets/product_jasmine.png\\'">' +
                (rel.secondaryImage ? '<img src="' + rel.secondaryImage + '" class="product-image-hover" alt="' + rel.name + '" onerror="this.style.display=\\'none\\'">' : '') +
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
            '<img src="' + galleryImages[0] + '" alt="' + product.name + '" class="pdp-main-image" id="pdp-active-image" onerror="this.src=\\'assets/product_jasmine.png\\'">' +
          '</div>' +

          '<!-- Thumbnails Row -->' +
          '<div class="pdp-thumbnails-strip" id="pdp-thumbs-container">' +
            galleryImages.map((img, idx) => 
              '<div class="pdp-thumb-item ' + (idx === 0 ? 'active' : '') + '" data-index="' + idx + '" data-src="' + img + '">' +
                '<img src="' + img + '" alt="' + product.name + ' view ' + (idx + 1) + '" onerror="this.src=\\'assets/product_jasmine.png\\'">' +
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
                '<p style="margin-bottom: 12px;">' + descriptionText.replace(/\\n/g, '<br>') + '</p>' +
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
        '<img src="' + galleryImages[0] + '" alt="' + product.name + '" onerror="this.src=\\'assets/product_jasmine.png\\'">' +
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
`;

// 3. Update app.js files
const jsFiles = [
  path.join(__dirname, 'app.js'),
  path.join(__dirname, 'public', 'app.js'),
  path.join(__dirname, 'legacy', 'app.js')
];

for (const jsFile of jsFiles) {
  if (!fs.existsSync(jsFile)) continue;
  let content = fs.readFileSync(jsFile, 'utf8');

  // Check if renderProductDetailPage already exists
  if (content.includes('function renderProductDetailPage()')) {
    content = content.replace(/\/\/ --- 10\. PRODUCT DETAIL PAGE \(PDP\) RENDERER ---[\s\S]*?\n\}/m, pdpFunctionsCode);
  } else {
    // Append before the end of the file
    content += '\n\n' + pdpFunctionsCode;
  }

  // Ensure renderProductDetailPage is called in renderPageContent
  if (!content.includes('renderProductDetailPage();')) {
    content = content.replace(/function renderPageContent\(\) \{([\s\S]*?)\}/, (match, inner) => {
      return 'function renderPageContent() {' + inner + '  renderProductDetailPage();\n}';
    });
  }

  // Update renderBestSellers to make product card images & titles link to /product?id=...
  content = content.replace(
    /<div class="product-image-wrapper">\s*<img src="\${product\.image}" alt="\${product\.name}" onerror="this\.src='assets\/product_jasmine\.png'">/g,
    '<a href="/product?id=${product.id}" class="product-image-wrapper" style="display:block; text-decoration:none;">\n        <img src="${product.image}" alt="${product.name}" onerror="this.src=\'assets/product_jasmine.png\'">'
  );

  content = content.replace(
    /<h3 class="product-name">\${product\.name}<\/h3>/g,
    '<a href="/product?id=${product.id}" style="text-decoration:none; color:inherit;"><h3 class="product-name">${product.name}</h3></a>'
  );

  // Update renderShopProducts to make product card images & titles link to /product?id=...
  content = content.replace(
    /<img src="\${product\.image}" class="product-image-main"/g,
    '<a href="/product?id=${product.id}" style="display:block;"><img src="${product.image}" class="product-image-main"'
  );

  fs.writeFileSync(jsFile, content, 'utf8');
  console.log('Updated PDP functions in', jsFile);
}

console.log('PDP system script applied successfully.');
