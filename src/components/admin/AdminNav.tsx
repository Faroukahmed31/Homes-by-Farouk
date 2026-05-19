'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Home, PlusCircle } from 'lucide-react';

export function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Leads',
      href: '/admin/leads',
      icon: Users,
    },
    {
      name: 'Properties',
      href: '/admin/properties',
      icon: Home,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-primary/20 pb-6 mb-8 gap-4">
      <div className="flex gap-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 text-xs uppercase tracking-widest font-bold pb-2 border-b-2 transition-all ${
                isActive
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-white'
              }`}
            >
              <Icon size={14} />
              {item.name}
            </Link>
          );
        })}
      </div>
      
      {pathname === '/admin/properties' && (
        <Link
          href="/admin/properties/new"
          className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-black transition-all w-fit"
        >
          <PlusCircle size={14} />
          Add New Property
        </Link>
      )}
    </div>
  );
}
