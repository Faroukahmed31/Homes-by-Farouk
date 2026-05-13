'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set a simple cookie for auth (in a real app, this should be a secure server-side session)
    if (username === 'Akukzeey' && password === 'Acookie@001') {
      document.cookie = "admin_session=true; path=/; max-age=3600; SameSite=Strict";
      router.push('/admin/leads');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <main className="min-h-screen bg-[#131313] text-white flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md gold-border bg-[#1c1b1b] p-8 md:p-12 animate-in fade-in zoom-in duration-500">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <Lock className="text-primary" size={32} />
            </div>
          </div>
          
          <h1 className="text-3xl font-heading text-center mb-2">Admin Access</h1>
          <p className="text-sm text-muted-foreground text-center mb-8">Enter your credentials to manage leads.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Username</label>
              <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-transparent border-b border-primary/30 py-3 focus:border-primary outline-none transition-colors"
                placeholder="Username"
              />
            </div>
            
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-bold text-primary mb-2">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent border-b border-primary/30 py-3 focus:border-primary outline-none transition-colors"
                placeholder="Password"
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-xs font-bold bg-red-500/10 p-3 border border-red-500/20">
                {error}
              </p>
            )}
            
            <button 
              type="submit"
              className="w-full red-button py-4 mt-4 font-bold text-sm tracking-widest"
            >
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
