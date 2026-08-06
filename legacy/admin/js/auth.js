import { supabaseClient } from '../../config.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const errorMsg = document.getElementById('errorMsg');
  const setupMsg = document.getElementById('setupMsg');
  const setupAdminBtn = document.getElementById('setupAdminBtn');

  // Check if already logged in
  if (supabaseClient) {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        window.location.href = 'index.html';
      }
    });
  } else {
    showError("Supabase is not configured. Please update config.js with your URL and Anon Key.");
  }

  function showError(msg) {
    errorMsg.style.display = 'block';
    errorMsg.textContent = msg;
    setupMsg.style.display = 'none';
  }

  function showSuccess(msg) {
    setupMsg.style.display = 'block';
    setupMsg.textContent = msg;
    errorMsg.style.display = 'none';
  }

  // Handle Login
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!supabaseClient) {
        showError("Supabase credentials missing. Check config.js");
        return;
      }

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const loginBtn = document.getElementById('loginBtn');
      const originalBtnText = loginBtn.textContent;

      loginBtn.textContent = 'Signing in...';
      loginBtn.disabled = true;

      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
          email: email,
          password: password,
        });

        if (error) throw error;

        // Redirect to dashboard
        window.location.href = 'index.html';
      } catch (error) {
        showError(error.message);
        loginBtn.textContent = originalBtnText;
        loginBtn.disabled = false;
      }
    });
  }

  // Handle Initial Default Admin Setup
  if (setupAdminBtn) {
    setupAdminBtn.addEventListener('click', async () => {
      if (!supabaseClient) {
        showError("Supabase credentials missing. Check config.js");
        return;
      }

      const defaultEmail = 'chiminiofficial@gmail.com';
      const defaultPassword = 'Chimini@2026';
      
      setupAdminBtn.textContent = 'Creating account...';
      setupAdminBtn.disabled = true;

      try {
        const { data, error } = await supabaseClient.auth.signUp({
          email: defaultEmail,
          password: defaultPassword,
        });

        if (error) {
          // If the user already exists, Supabase throws an error or sends an email
          // Depending on settings, it might just return success
          throw error;
        }

        if (data.user && data.user.identities && data.user.identities.length === 0) {
           showError("Account already exists. Please sign in.");
        } else {
           showSuccess(`Default admin created! Email: ${defaultEmail} | Password: ${defaultPassword}`);
           // Auto-fill form
           document.getElementById('email').value = defaultEmail;
           document.getElementById('password').value = defaultPassword;
        }
      } catch (error) {
        showError(error.message);
      } finally {
        setupAdminBtn.textContent = 'Create default admin account';
        setupAdminBtn.disabled = false;
      }
    });
  }
});
