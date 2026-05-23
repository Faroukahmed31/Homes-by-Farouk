'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'KES' | 'USD' | 'GBP' | 'EUR' | 'AUD' | 'CNY';

export const rates: Record<Exclude<Currency, 'KES'>, number> = {
  USD: 129.57,
  GBP: 174.26,
  EUR: 150.48,
  AUD: 92.46,
  CNY: 19.03,
};

export const currencySymbols: Record<Currency, string> = {
  KES: 'KES',
  USD: '$',
  GBP: '£',
  EUR: '€',
  AUD: 'A$',
  CNY: '¥',
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceKES: number | string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('KES');

  useEffect(() => {
    const saved = localStorage.getItem('selected_currency') as Currency;
    if (saved && currencySymbols[saved]) {
      setCurrencyState(saved);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('selected_currency', c);
  };

  const formatPrice = (price: number | string): string => {
    let numericPrice: number;
    if (typeof price === 'number') {
      numericPrice = price;
    } else {
      // Clean string to extract digits
      const cleaned = price.replace(/[^0-9.]/g, '');
      const num = parseFloat(cleaned);
      if (isNaN(num)) return price; // fallback to original string if no numbers found
      numericPrice = num;
    }

    if (currency === 'KES') {
      return `KES ${numericPrice.toLocaleString()}`;
    }
    const rate = rates[currency];
    const converted = numericPrice / rate;
    const rounded = Math.round(converted);
    return `${currencySymbols[currency]} ${rounded.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
