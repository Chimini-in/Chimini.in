const fs = require('fs');
const path = require('path');

const richDefaultProducts = `  products: [
    {
      id: "prod-1",
      name: "Jasmine & Oakwood",
      price: 28.00,
      originalPrice: 38.00,
      badge: "BEST SELLER",
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
      careInfo: "• Trim wick to 1/4 inch (6mm) before every burn.\\n• On first light, allow the melt pool to reach the full diameter of the vessel (2-3 hours) to prevent tunneling.\\n• Do not burn for more than 4 consecutive hours.\\n• Keep away from drafts, flammable items, children, and pets.",
      shippingInfo: "• Complimentary Luxury Shipping on orders over ₹100.\\n• Dispatched within 24-48 business hours with live SMS & email tracking.\\n• Securely encased in our signature gold-embossed ivory gift box.",
      returnsInfo: "• 7-Day Complimentary Returns on unburned, sealed items in original luxury packaging.\\n• Contact concierge@chimini.com or WhatsApp +91 97418 55293 for instant concierge support.",
      rating: 4.9,
      reviewCount: 142
    },
    {
      id: "prod-2",
      name: "Sandalwood & Amber",
      price: 32.00,
      originalPrice: null,
      badge: "NEW ARRIVAL",
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
      careInfo: "• Trim wick to 1/4 inch before each light.\\n• Allow wax to melt to edges on initial burn (2-3 hours).\\n• Keep burning surface level and heat-resistant.",
      shippingInfo: "• Free shipping on orders above ₹100.\\n• Dispatched within 24-48 hours with full tracking.\\n• Luxury packaging suitable for immediate gifting.",
      returnsInfo: "• 7-day hassle-free returns for unused candles in original condition.",
      rating: 4.8,
      reviewCount: 96
    },
    {
      id: "prod-3",
      name: "Velvet Rose & Oud",
      price: 34.00,
      originalPrice: 48.00,
      badge: "FAST MOVING",
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
      careInfo: "• Trim cotton wick to 1/4 inch prior to every use.\\n• Keep wax pool free of debris.\\n• Discontinue use when 1/2 inch of wax remains.",
      shippingInfo: "• Complimentary shipping on orders above ₹100.\\n• Dispatched in 24-48 hours in luxury embossed packaging.",
      returnsInfo: "• 7-day return policy for unused, unopened candles.",
      rating: 5.0,
      reviewCount: 168
    },
    {
      id: "prod-4",
      name: "Wild Fig & Honey",
      price: 29.00,
      originalPrice: null,
      badge: "LIMITED EDITION",
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
      careInfo: "• Trim wick to 1/4 inch before lighting.\\n• Ensure even melt pool on first burn.\\n• Never leave unattended while lit.",
      shippingInfo: "• Complimentary luxury shipping over ₹100 threshold.\\n• Handcrafted and dispatched within 24-48 business hours.",
      returnsInfo: "• 7-day complimentary return policy on all eligible items.",
      rating: 4.9,
      reviewCount: 114
    }
  ]`;

const richSupabaseProductMap = `    // Map Products
    if (products && Array.isArray(products) && products.length > 0) {
      newSettings.products = products.map(p => ({
        id: p.id,
        name: p.title,
        price: p.price,
        originalPrice: p.original_price || null,
        badge: p.badges || (p.is_best_seller ? 'BEST SELLER' : null),
        image: p.image_url || 'assets/product_jasmine.png',
        secondaryImage: p.secondary_image_url || p.image_url || 'assets/product_sandalwood.png',
        images: (Array.isArray(p.images) && p.images.length > 0) 
          ? p.images 
          : (p.image_url ? [p.image_url, p.secondary_image_url || 'assets/product_sandalwood.png', 'assets/product_rose.png', 'assets/product_fig.png'].filter(Boolean) : ['assets/product_jasmine.png']),
        category: p.categories?.title?.toLowerCase() || p.category || 'candles',
        categoryTitle: p.categories?.title || 'Artisanal Candles',
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
    }`;

const jsFiles = [
  path.join(__dirname, 'app.js'),
  path.join(__dirname, 'public', 'app.js'),
  path.join(__dirname, 'legacy', 'app.js')
];

for (const jsFile of jsFiles) {
  if (!fs.existsSync(jsFile)) continue;
  let content = fs.readFileSync(jsFile, 'utf8');

  // Replace default products
  content = content.replace(/products:\s*\[[\s\S]*?\](?=,\s*categories:)/m, richDefaultProducts);

  // Replace fetchSupabaseData products mapping
  content = content.replace(/\/\/ Map Products[\s\S]*?newSettings\.products = products\.map\([\s\S]*?\n\s*\}\);\s*\}/m, richSupabaseProductMap);

  fs.writeFileSync(jsFile, content, 'utf8');
  console.log('Updated rich product mappings in', jsFile);
}

console.log('Product data mappings synced successfully.');
