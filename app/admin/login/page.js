"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      router.push('/admin');
    } else {
      alert('Incorrect Password');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-bg)' }}>
      <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px', color: 'var(--color-text-dark)', fontSize: '1.5rem' }}>CHIMINI Admin Portal</h1>
        <p style={{ marginBottom: '30px', color: 'var(--color-text-muted)' }}>Enter admin credentials to manage store.</p>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <input 
            type="password" 
            placeholder="Password (try 'admin')" 
            className="admin-form-control" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button type="submit" className="btn-accent">Login to Portal</button>
        </form>
      </div>
    </div>
  );
}
