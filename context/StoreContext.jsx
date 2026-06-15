"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([
    "Free shipping on orders over $150 | Use code: LUXE150",
    "Scent of the Month: 20% off with code: SCENT20",
    "Crafted with 100% natural soy wax & botanical oils"
  ]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    // Load initial data from localStorage if available
    const savedCart = sessionStorage.getItem('chimini_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedProducts = localStorage.getItem('chimini_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    const savedAnnouncements = localStorage.getItem('chimini_announcements');
    if (savedAnnouncements) {
      setAnnouncements(JSON.parse(savedAnnouncements));
    }

    // Sync from Supabase
    async function fetchStoreData() {
      if (supabaseClient) {
        try {
          const { data: productsData } = await supabaseClient.from('products').select('*');
          if (productsData && productsData.length > 0) {
            const mappedProducts = productsData.map(p => ({
              id: p.id,
              name: p.title,
              price: parseFloat(p.price),
              image: p.image_url,
              category: p.category,
              fragrance: p.fragrance,
              availability: p.availability ? "In Stock" : "Out of Stock",
              badge: p.badges || ""
            }));
            setProducts(mappedProducts);
            localStorage.setItem('chimini_products', JSON.stringify(mappedProducts));
          }
        } catch (e) {
          console.error("Supabase sync error:", e);
        }
      }
    }
    fetchStoreData();
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      let newCart;
      if (existing) {
        newCart = prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        newCart = [...prev, { product, quantity: 1 }];
      }
      sessionStorage.setItem('chimini_cart', JSON.stringify(newCart));
      return newCart;
    });
    setIsCartOpen(true);
  };

  const changeCartQty = (productId, delta) => {
    setCart(prev => {
      let newCart = prev.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity: item.quantity + delta };
        }
        return item;
      }).filter(item => item.quantity > 0);
      sessionStorage.setItem('chimini_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.product.id !== productId);
      sessionStorage.setItem('chimini_cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  return (
    <StoreContext.Provider value={{
      products,
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      changeCartQty,
      removeFromCart,
      announcements,
      heroSlides,
      featuredProducts
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
