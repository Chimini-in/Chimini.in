"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { supabaseClient } from '../../lib/supabase';

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If on login page, immediately bypass
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    // Fast initial check: Check if Supabase session is already stored locally
    let initialSessionFound = false;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('sb-') && k.endsWith('-auth-token')) {
          const raw = localStorage.getItem(k);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed?.user) {
              setUser(parsed.user);
              setLoading(false);
              initialSessionFound = true;
              break;
            }
          }
        }
      }
    } catch (e) {}

    const checkAuth = async () => {
      if (!supabaseClient) {
        setLoading(false);
        return;
      }

      try {
        // Fast timeout wrapper (1.8s) so admin pages never get stuck on "Loading..."
        const sessionPromise = supabaseClient.auth.getSession();
        const timeoutPromise = new Promise((resolve) => 
          setTimeout(() => resolve({ data: { session: null }, timedOut: true }), 1800)
        );

        const result = await Promise.race([sessionPromise, timeoutPromise]);
        const session = result?.data?.session;

        if (session && session.user) {
          setUser(session.user);
          setLoading(false);
        } else if (result?.timedOut && initialSessionFound) {
          // Keep current local session if network was just slow
          setLoading(false);
        } else if (!initialSessionFound && !session) {
          router.push('/admin/login');
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.warn("Admin auth check:", err);
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: authListener } = supabaseClient?.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
          router.push('/admin/login');
        } else if (session?.user) {
          setUser(session.user);
          setLoading(false);
        }
      }
    ) || { data: { subscription: { unsubscribe: () => {} } } };

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []); // Run once on mount, NOT on every pathname change!

  const handleSignOut = async () => {
    if (supabaseClient) {
      await supabaseClient.auth.signOut();
      router.push('/admin/login');
    }
  };

  // Render children immediately if login page or if already loaded
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fcfbf9', gap: '16px' }}>
        <div style={{ width: '36px', height: '36px', border: '3px solid rgba(197, 168, 128, 0.2)', borderTopColor: '#c5a880', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
        <style dangerouslySetInnerHTML={{ __html: '@keyframes spin { to { transform: rotate(360deg); } }' }} />
        <span style={{ fontFamily: 'sans-serif', fontSize: '0.9rem', color: '#64748b', letterSpacing: '0.5px' }}>Loading CHIMINI Admin...</span>
      </div>
    );
  }

  // Render just the children if we are on the login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Dashboard Layout
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '25px 20px', borderBottom: '1px solid #e2e8f0' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', margin: 0, color: '#1a1a1a' }}>CHIMINI</h1>
          <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Admin Portal</p>
        </div>
        
        <nav style={{ flex: 1, padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <SidebarLink href="/admin/dashboard" current={pathname}>Dashboard</SidebarLink>
          <SidebarLink href="/admin/orders" current={pathname}>🛍️ Orders & Inquiries</SidebarLink>
          <SidebarLink href="/admin/banners" current={pathname}>Banners & Hero</SidebarLink>
          <SidebarLink href="/admin/categories" current={pathname}>Fragrances (Home Circles)</SidebarLink>
          <SidebarLink href="/admin/collections" current={pathname}>Collections</SidebarLink>
          <SidebarLink href="/admin/products" current={pathname}>Products & Shop</SidebarLink>
          <SidebarLink href="/admin/pages" current={pathname}>Static Pages</SidebarLink>
          <SidebarLink href="/admin/gifts" current={pathname}>Gifts Page</SidebarLink>
          <SidebarLink href="/admin/testimonials" current={pathname}>Testimonials</SidebarLink>
          <SidebarLink href="/admin/reviews" current={pathname}>Reviews</SidebarLink>
          <SidebarLink href="/admin/settings" current={pathname}>Global Settings</SidebarLink>
          <SidebarLink href="/admin/setup" current={pathname}>⚙ Database Setup</SidebarLink>
        </nav>

        <div style={{ padding: '20px', borderTop: '1px solid #e2e8f0' }}>
          <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '10px', wordBreak: 'break-all' }}>{user?.email}</p>
          <button 
            onClick={handleSignOut}
            style={{ width: '100%', padding: '10px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '500' }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        <header style={{ backgroundColor: '#ffffff', padding: '20px 30px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '500', color: '#1a1a1a' }}>
            {pathname === '/admin/dashboard' ? 'Overview' : 
             pathname === '/admin/banners' ? 'Manage Banners' :
             pathname === '/admin/categories' ? 'Manage Categories' :
             pathname === '/admin/collections' ? 'Manage Collections' :
             pathname === '/admin/products' ? 'Manage Products' :
             pathname === '/admin/pages' ? 'Manage Static Pages' :
             pathname === '/admin/testimonials' ? 'Manage Testimonials' :
             pathname === '/admin/reviews' ? 'Manage Reviews' :
             pathname === '/admin/settings' ? 'Global Settings' :
             pathname === '/admin/setup' ? 'Database Setup & Permissions' : ''}
          </h2>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--color-accent)', textDecoration: 'none', fontWeight: '500' }}>
            View Live Store &rarr;
          </a>
        </header>
        
        <div style={{ padding: '30px', flex: 1 }}>
          {children}
        </div>
      </main>
    </div>
  );
}

function SidebarLink({ href, current, children }) {
  const isActive = current === href || (current?.startsWith(href) && href !== '/admin/dashboard');
  
  return (
    <Link href={href} style={{ 
      display: 'block', 
      padding: '12px 25px', 
      color: isActive ? 'var(--color-accent)' : '#475569', 
      backgroundColor: isActive ? '#f0fbf8' : 'transparent',
      textDecoration: 'none',
      fontSize: '0.95rem',
      fontWeight: isActive ? '600' : '400',
      borderRight: isActive ? '3px solid var(--color-accent)' : '3px solid transparent'
    }}>
      {children}
    </Link>
  );
}
