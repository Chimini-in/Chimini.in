import { supabaseClient } from '../../config.js';

document.addEventListener('DOMContentLoaded', async () => {
  const adminEmail = document.getElementById('adminEmail');
  const logoutBtn = document.getElementById('logoutBtn');
  const navItems = document.querySelectorAll('.admin-nav-item');
  const pageTitle = document.getElementById('pageTitle');
  const adminContent = document.getElementById('adminContent');

  if (!supabaseClient) {
    window.location.href = 'login.html';
    return;
  }

  // Session check
  const { data: { session } } = await supabaseClient.auth.getSession();
  
  if (!session) {
    window.location.href = 'login.html';
    return;
  }

  adminEmail.textContent = session.user.email;

  // Logout
  logoutBtn.addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    window.location.href = 'login.html';
  });

  async function saveSetting(key, value) {
    try {
      const { error } = await supabaseClient
        .from('settings')
        .upsert({ setting_key: key, setting_value: value }, { onConflict: 'setting_key' });
      
      if (error) throw error;
      localStorage.setItem('chimini_' + key, JSON.stringify(value));
      alert('Saved successfully! The live site is updated.');
    } catch (e) {
      alert('Error saving: ' + e.message);
    }
  }

  // Helper to safely parse local storage
  function getLocalSetting(key, defaultValue) {
    const val = localStorage.getItem('chimini_' + key);
    return val ? JSON.parse(val) : defaultValue;
  }

  // Global exposes for inline handlers
  window.updateNavLinks = async function() {
    const text = document.getElementById('navLinksInput').value;
    try {
      const links = JSON.parse(text);
      await saveSetting('nav_links', links);
    } catch(e) {
      alert("Invalid JSON format");
    }
  };

  window.updateFooter = async function() {
    const text = document.getElementById('footerInput').value;
    try {
      const footer = JSON.parse(text);
      await saveSetting('footer_content', footer);
    } catch(e) {
      alert("Invalid JSON format");
    }
  };

  window.updateAnnouncements = async function() {
    const text = document.getElementById('announcementsInput').value;
    try {
      const anns = JSON.parse(text);
      await saveSetting('announcements', anns);
    } catch(e) {
      alert("Invalid JSON format");
    }
  };

  window.updateBanners = async function() {
    const banners = {
      promoBanner: {
        image: document.getElementById('promoImage').value,
        link: document.getElementById('promoLink').value
      },
      campaignBanner: {
        image: document.getElementById('campaignImage').value,
        title: document.getElementById('campaignTitle').value,
        subtitle: document.getElementById('campaignSubtitle').value,
        link: document.getElementById('campaignLink').value
      },
      storyBanner: {
        image: document.getElementById('storyImage').value,
        link: document.getElementById('storyLink').value
      }
    };
    await saveSetting('banners', banners);
  };

  window.updateHero = async function() {
    const heroSlides = [{
      image: document.getElementById('heroImage').value,
      title: document.getElementById('heroTitle').value,
      subtitle: document.getElementById('heroSubtitle').value,
      link: document.getElementById('heroLink').value
    }];
    await saveSetting('hero_slides', heroSlides);
  };

  window.updateTestimonials = async function() {
    const text = document.getElementById('testimonialsInput').value;
    try {
      const tests = JSON.parse(text);
      await saveSetting('testimonials', tests);
    } catch(e) {
      alert("Invalid JSON format");
    }
  };
  
  window.updateCategories = async function() {
    const text = document.getElementById('categoriesInput').value;
    try {
      const cats = JSON.parse(text);
      await saveSetting('categories', cats);
    } catch(e) {
      alert("Invalid JSON format");
    }
  };

  window.updateCollections = async function() {
    const text = document.getElementById('collectionsInput').value;
    try {
      const cols = JSON.parse(text);
      await saveSetting('collections', cols);
    } catch(e) {
      alert("Invalid JSON format");
    }
  };


  // Dynamic Module Rendering
  async function renderModule(tabName) {
    adminContent.innerHTML = '<div style="padding:40px; text-align:center;">Loading module...</div>';
    
    if (tabName === 'dashboard') {
      let productCount = 0;
      try {
        const { count } = await supabaseClient.from('products').select('*', { count: 'exact', head: true });
        productCount = count || 0;
      } catch (e) {
        console.error("Error fetching product count:", e);
      }

      adminContent.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
          <div class="admin-card" style="text-align: center; padding: 30px;">
            <h3 style="margin: 0; font-size: 2.5rem; color: var(--text-dark);">${productCount}</h3>
            <p style="margin: 5px 0 0; color: #666; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px;">Total Products</p>
          </div>
          <div class="admin-card" style="text-align: center; padding: 30px;">
            <h3 style="margin: 0; font-size: 2.5rem; color: var(--text-dark);">24</h3>
            <p style="margin: 5px 0 0; color: #666; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px;">Orders This Week</p>
          </div>
          <div class="admin-card" style="text-align: center; padding: 30px;">
            <h3 style="margin: 0; font-size: 2.5rem; color: var(--text-dark);">$1,450</h3>
            <p style="margin: 5px 0 0; color: #666; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px;">Weekly Revenue</p>
          </div>
        </div>
      `;
    } else if (tabName === 'products') {
      const { data: products } = await supabaseClient.from('products').select('*').order('created_at', { ascending: false });
      
      let tableRows = '';
      if (products) {
        products.forEach(p => {
          tableRows += `
            <tr>
              <td><img src="${p.image_url || ''}" style="height:40px; border-radius:4px;"></td>
              <td>${p.title}</td>
              <td>$${p.price}</td>
              <td>${p.availability ? 'In Stock' : 'Out of Stock'}</td>
              <td>
                <button class="btn-accent edit-btn" data-id="${p.id}" style="padding: 5px 10px; font-size: 0.8rem;">Edit</button>
              </td>
            </tr>
          `;
        });
      }

      adminContent.innerHTML = `
        <div class="admin-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 class="admin-card-title" style="margin:0; border:none; padding:0;">Products Management</h3>
          </div>
          <table class="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </div>
      `;
    } else if (tabName === 'homepage') {
      const banners = getLocalSetting('banners', { promoBanner:{}, campaignBanner:{}, storyBanner:{} });
      const heroSlides = getLocalSetting('hero_slides', [{}]);
      const tests = getLocalSetting('testimonials', []);

      adminContent.innerHTML = `
        <div class="admin-card" style="margin-bottom:20px;">
          <h3 class="admin-card-title">Hero Banner</h3>
          <label>Image URL</label><input type="text" id="heroImage" class="admin-input" value="${heroSlides[0].image || ''}">
          <label>Title</label><input type="text" id="heroTitle" class="admin-input" value="${heroSlides[0].title || ''}">
          <label>Subtitle</label><input type="text" id="heroSubtitle" class="admin-input" value="${heroSlides[0].subtitle || ''}">
          <label>Button Link</label><input type="text" id="heroLink" class="admin-input" value="${heroSlides[0].link || ''}">
          <button class="btn-accent" onclick="updateHero()" style="margin-top:10px;">Save Hero Banner</button>
        </div>

        <div class="admin-card" style="margin-bottom:20px;">
          <h3 class="admin-card-title">Promotional, Campaign, and Brand Story Banners</h3>
          
          <h4 style="margin-top:10px;margin-bottom:5px;">Promotional Offer Banner</h4>
          <label>Image URL</label><input type="text" id="promoImage" class="admin-input" value="${banners.promoBanner.image || ''}">
          <label>Link</label><input type="text" id="promoLink" class="admin-input" value="${banners.promoBanner.link || ''}">

          <h4 style="margin-top:20px;margin-bottom:5px;">Seasonal Campaign Banner</h4>
          <label>Image URL</label><input type="text" id="campaignImage" class="admin-input" value="${banners.campaignBanner.image || ''}">
          <label>Title</label><input type="text" id="campaignTitle" class="admin-input" value="${banners.campaignBanner.title || ''}">
          <label>Subtitle</label><input type="text" id="campaignSubtitle" class="admin-input" value="${banners.campaignBanner.subtitle || ''}">
          <label>Link</label><input type="text" id="campaignLink" class="admin-input" value="${banners.campaignBanner.link || ''}">

          <h4 style="margin-top:20px;margin-bottom:5px;">Brand Story Banner</h4>
          <label>Image URL</label><input type="text" id="storyImage" class="admin-input" value="${banners.storyBanner.image || ''}">
          <label>Link</label><input type="text" id="storyLink" class="admin-input" value="${banners.storyBanner.link || ''}">

          <button class="btn-accent" onclick="updateBanners()" style="margin-top:15px;">Save Banners</button>
        </div>

        <div class="admin-card">
          <h3 class="admin-card-title">Customer Testimonials (JSON Editor)</h3>
          <textarea id="testimonialsInput" class="admin-input" style="height:150px; font-family:monospace;">${JSON.stringify(tests, null, 2)}</textarea>
          <button class="btn-accent" onclick="updateTestimonials()">Save Testimonials</button>
        </div>
      `;

    } else if (tabName === 'collections') {
      const cats = getLocalSetting('categories', []);
      const cols = getLocalSetting('collections', []);

      adminContent.innerHTML = `
        <div class="admin-card" style="margin-bottom:20px;">
          <h3 class="admin-card-title">Shop by Fragrance Categories (JSON Editor)</h3>
          <textarea id="categoriesInput" class="admin-input" style="height:200px; font-family:monospace;">${JSON.stringify(cats, null, 2)}</textarea>
          <button class="btn-accent" onclick="updateCategories()">Save Categories</button>
        </div>
        <div class="admin-card">
          <h3 class="admin-card-title">Featured Collections (JSON Editor)</h3>
          <textarea id="collectionsInput" class="admin-input" style="height:200px; font-family:monospace;">${JSON.stringify(cols, null, 2)}</textarea>
          <button class="btn-accent" onclick="updateCollections()">Save Collections</button>
        </div>
      `;

    } else if (tabName === 'settings') {
      const navLinks = getLocalSetting('nav_links', []);
      const footer = getLocalSetting('footer_content', {});
      const anns = getLocalSetting('announcements', []);

      adminContent.innerHTML = `
        <div class="admin-card" style="margin-bottom:20px;">
          <h3 class="admin-card-title">Header Navigation Links (JSON Editor)</h3>
          <textarea id="navLinksInput" class="admin-input" style="height:150px; font-family:monospace;">${JSON.stringify(navLinks, null, 2)}</textarea>
          <button class="btn-accent" onclick="updateNavLinks()">Save Nav Links</button>
        </div>

        <div class="admin-card" style="margin-bottom:20px;">
          <h3 class="admin-card-title">Footer Content (JSON Editor)</h3>
          <textarea id="footerInput" class="admin-input" style="height:250px; font-family:monospace;">${JSON.stringify(footer, null, 2)}</textarea>
          <button class="btn-accent" onclick="updateFooter()">Save Footer Content</button>
        </div>

        <div class="admin-card">
          <h3 class="admin-card-title">Announcement Bar Messages (JSON Array)</h3>
          <textarea id="announcementsInput" class="admin-input" style="height:100px; font-family:monospace;">${JSON.stringify(anns, null, 2)}</textarea>
          <button class="btn-accent" onclick="updateAnnouncements()">Save Announcements</button>
        </div>
      `;

    } else {
      adminContent.innerHTML = `
        <div class="admin-card">
          <h3 class="admin-card-title">Module Pending</h3>
          <p>The ${tabName} module is currently being built.</p>
        </div>
      `;
    }
  }

  // Sidebar Navigation
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      const tab = item.getAttribute('data-tab');
      pageTitle.textContent = item.textContent;

      renderModule(tab);
    });
  });
  
  // Render initial module
  renderModule('dashboard');
});
