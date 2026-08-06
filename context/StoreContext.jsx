"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoadingStore, setIsLoadingStore] = useState(true);

  useEffect(() => {
    // Load cart from session storage
    const savedCart = sessionStorage.getItem('chimini_cart');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch (e) { }
    }

    // Sync from Supabase
    async function fetchStoreData() {
      if (!supabaseClient) return;
      setIsLoadingStore(true);
      try {
        const [
          { data: pData },
          { data: catData },
          { data: colData },
          { data: banData },
          { data: testData },
          { data: revData },
          { data: setData }
        ] = await Promise.all([
          supabaseClient.from('products').select('*').eq('is_published', true),
          supabaseClient.from('categories').select('*').eq('is_published', true).order('sort_order'),
          supabaseClient.from('collections').select('*').eq('is_published', true).order('sort_order'),
          supabaseClient.from('banners').select('*').eq('section_id', 'hero').order('sort_order'),
          supabaseClient.from('testimonials').select('*').eq('is_published', true).order('sort_order'),
          supabaseClient.from('reviews').select('*').eq('is_approved', true).order('created_at', { ascending: false }),
          supabaseClient.from('settings').select('*').eq('setting_key', 'announcements').single()
        ]);

        if (pData) {
          const mappedProducts = pData.map(p => ({
            id: p.id,
            name: p.title,
            description: p.description,
            price: parseFloat(p.price),
            image: p.image_url,
            category: p.category_id || p.category,
            fragrance: p.fragrance,
            availability: p.availability ? "In Stock" : "Out of Stock",
            badge: p.badges || "",
            is_best_seller: p.is_best_seller,
            is_gift: p.is_gift
          }));
          setProducts(mappedProducts);
        }

        if (catData) setCategories(catData);
        if (colData) setCollections(colData);
        if (banData) setHeroSlides(banData);
        if (testData) setTestimonials(testData);
        if (revData) setReviews(revData);
        
        if (setData && setData.setting_value) {
          try {
            const parsed = typeof setData.setting_value === 'string' ? JSON.parse(setData.setting_value) : setData.setting_value;
            if (Array.isArray(parsed)) setAnnouncements(parsed);
          } catch (e) { setAnnouncements([setData.setting_value]); }
        } else {
          setAnnouncements(["Welcome to Chimini"]); // Default fallback
        }

      } catch (e) {
        console.error("Supabase sync error:", e);
      } finally {
        setIsLoadingStore(false);
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
      categories,
      collections,
      heroSlides,
      testimonials,
      reviews,
      announcements,
      isLoadingStore,
      cart,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      changeCartQty,
      removeFromCart
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
