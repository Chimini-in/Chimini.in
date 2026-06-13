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
          <div class="admin-card" style="text-align: center; padding: 30px;">
            <h3 style="margin: 0; font-size: 2.5rem; color: var(--text-dark);">142</h3>
            <p style="margin: 5px 0 0; color: #666; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 1px;">Active Customers</p>
          </div>
        </div>

        <div class="admin-card">
          <h3 class="admin-card-title">Recent Activity</h3>
          <table class="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#ORD-1024</td>
                <td>Priya Sharma</td>
                <td><span style="background: #e8f5e9; color: #2e7d32; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">Processing</span></td>
                <td>$45.00</td>
              </tr>
              <tr>
                <td>#ORD-1023</td>
                <td>Rahul Kumar</td>
                <td><span style="background: #e3f2fd; color: #1565c0; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">Shipped</span></td>
                <td>$120.00</td>
              </tr>
              <tr>
                <td>#ORD-1022</td>
                <td>Aisha Desai</td>
                <td><span style="background: #f5f5f5; color: #616161; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">Delivered</span></td>
                <td>$85.50</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    } else if (tabName === 'products') {
      // Products Module
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
              ${tableRows}
            </tbody>
          </table>
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
});



