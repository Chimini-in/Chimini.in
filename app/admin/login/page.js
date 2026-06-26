"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '../../../lib/supabase';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('chiminiofficial@gmail.com');
  const [password, setPassword] = useState('Chimini@2026');
  const [mode, setMode] = useState('login'); // 'login' | 'forgot' | 'setup'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!supabaseClient) {
      setError("Supabase client is not initialized.");
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (mode === 'login') {
        const { data, error: signInError } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        if (data.session) {
          router.push('/admin');
        }
      } else if (mode === 'setup') {
        // Hidden feature to easily create the first admin account
        const { data, error: signUpError } = await supabaseClient.auth.signUp({
          email,
          password,
        });
        
        if (signUpError) throw signUpError;
        setMessage('Account setup successful. You can now login.');
        setMode('login');
      } else if (mode === 'forgot') {
        const { error: resetError } = await supabaseClient.auth.resetPasswordForEmail(email);
        if (resetError) throw resetError;
        setMessage('Password reset instructions sent to your email.');
        setMode('login');
      }
    } catch (err) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 40px rgba(0,0,0,0.08)', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '10px', color: 'var(--color-text-dark)', fontSize: '1.8rem', fontFamily: 'var(--font-serif)' }}>CHIMINI</h1>
        <h2 style={{ marginBottom: '25px', color: 'var(--color-text-dark)', fontSize: '1.2rem', fontWeight: '500' }}>
          {mode === 'login' ? 'Admin Portal Login' : mode === 'forgot' ? 'Reset Password' : 'Setup Admin Account'}
        </h2>
        
        {error && (
          <div style={{ padding: '12px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}
        
        {message && (
          <div style={{ padding: '12px', backgroundColor: '#ecfdf5', color: '#047857', borderRadius: '6px', marginBottom: '20px', fontSize: '0.9rem' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-dark)' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="admin@chimini.com" 
              className="admin-form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.95rem' }}
            />
          </div>

          {mode !== 'forgot' && (
            <div style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-text-dark)' }}>Password</label>
                {mode === 'login' && (
                  <button 
                    type="button" 
                    onClick={() => setMode('forgot')}
                    style={{ background: 'none', border: 'none', color: 'var(--color-accent)', fontSize: '0.8rem', cursor: 'pointer', padding: 0 }}
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="admin-form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                style={{ width: '100%', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '0.95rem' }}
              />
            </div>
          )}

          <button 
            type="submit" 
            style={{ 
              width: '100%', 
              padding: '14px', 
              backgroundColor: 'var(--color-text-dark)', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '6px', 
              fontSize: '1rem', 
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginTop: '10px'
            }}
            disabled={loading}
          >
            {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : mode === 'forgot' ? 'Send Reset Link' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
          {mode !== 'login' && (
            <button 
              type="button" 
              onClick={() => setMode('login')}
              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              Back to Login
            </button>
          )}
          {mode === 'login' && (
            <button 
              type="button" 
              onClick={() => setMode('setup')}
              style={{ background: 'none', border: 'none', color: '#cbd5e1', fontSize: '0.75rem', cursor: 'pointer' }}
            >
              First Time Setup
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
