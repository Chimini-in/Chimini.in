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

      async function handleMigration() {
    const migrateDataBtn = document.getElementById('migrateDataBtn');
    const migrateStatus = document.getElementById('migrateStatus');
    
    if (!migrateDataBtn || !migrateStatus) return;
    
    migrateDataBtn.disabled = true;
    migrateStatus.textContent = "Starting migration...";
    migrateStatus.style.color = "blue";

    try {
      const localProducts = JSON.parse(localStorage.getItem('chimini_products') || '[]');
      if (localProducts.length > 0) {
        migrateStatus.textContent = "Migrating " + localProducts.length + " products...";
        
        for (const p of localProducts) {
          await supabaseClient.from('products').insert({
            id: p.id,
            title: p.title,
            description: p.description,
            price: p.price,
            image_url: p.image_url,
            category: p.category || 'signature',
            availability: p.availability !== false
          });
        }
        migrateStatus.textContent = "Migration complete! " + localProducts.length + " products imported.";
      } else {
        migrateStatus.textContent = "No local products found to migrate.";
      }
      migrateStatus.style.color = "green";
    } catch (err) {
      migrateStatus.textContent = "Error: " + err.message;
      migrateStatus.style.color = "red";
    } finally {
      migrateDataBtn.disabled = false;
    }
  }

  // Dynamic Module Rendering
  async function renderModule(tabName) {
    adminContent.innerHTML = '<div style="padding:40px; text-align:center;">Loading module...</div>';
    
    if (tabName === 'dashboard') {
      adminContent.innerHTML = 
        <div class="admin-card">
          <h3 class="admin-card-title">Welcome to CHIMINI Admin Portal</h3>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--admin-border);">
            <h4 style="margin-top:0;">Data Migration</h4>
            <p style="font-size: 0.9rem; color: #666;">Move your existing local products and settings into your Supabase database.</p>
            <button id="migrateDataBtn" class="btn-accent" style="padding: 10px 20px;">Migrate Storefront Data to Supabase</button>
            <div id="migrateStatus" style="margin-top: 10px; font-size: 0.9rem; font-weight: bold;"></div>
          </div>
        </div>
      ;
      // Re-attach listener
      document.getElementById('migrateDataBtn').addEventListener('click', handleMigration);
    } else if (tabName === 'products') {
      // Products Module
      const { data: products } = await supabaseClient.from('products').select('*').order('created_at', { ascending: false });
      
      let tableRows = '';
      if (products) {
        products.forEach(p => {
          tableRows += 
            <tr>
              <td><img src=" + (p.image_url || '') + " style="height:40px; border-radius:4px;"></td>
              <td> + p.title + </td>
              <td>$ + p.price + </td>
              <td> + (p.availability ? 'In Stock' : 'Out of Stock') + </td>
              <td>
                <button class="btn-accent edit-btn" data-id=" + p.id + " style="padding: 5px 10px; font-size: 0.8rem;">Edit</button>
              </td>
            </tr>
          ;
        });
      }

      adminContent.innerHTML = 
        <div class="admin-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h3 class="admin-card-title" style="margin:0; border:none; padding:0;">Products Management</h3>
            <button id="addProductBtn" class="btn-accent">Add New Product</button>
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
               + tableRows + 
            </tbody>
          </table>
        </div>
      ;
    } else {
      adminContent.innerHTML = 
        <div class="admin-card">
          <h3 class="admin-card-title">Module Pending</h3>
          <p>The  + tabName +  module is currently being built.</p>
        </div>
      ;
    }
  }

  // Navigation Mock
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      const tab = item.getAttribute('data-tab');
      pageTitle.textContent = item.textContent;

      // Mock loading of content
      adminContent.innerHTML = `
        <div class="admin-card">
          <h3 class="admin-card-title">${item.textContent} Management</h3>
          <p>This module requires connection to the Supabase Database to function.</p>
          <p style="color: #666; font-size: 0.9rem;">Once you configure your <code>config.js</code> with valid keys and create the necessary tables, this interface will allow full CRUD operations.</p>
        </div>
      `;
    });
  });
});



