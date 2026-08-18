-- ============================================================================
-- CHIMINI — Clean Supabase Permissions Fix (Existing Tables Only)
-- Run this in Supabase SQL Editor:
--   Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================================

-- 1. Grant ALL table permissions to anon & authenticated roles
GRANT ALL ON public.banners TO anon, authenticated;
GRANT ALL ON public.products TO anon, authenticated;
GRANT ALL ON public.categories TO anon, authenticated;
GRANT ALL ON public.testimonials TO anon, authenticated;
GRANT ALL ON public.settings TO anon, authenticated;
GRANT ALL ON public.page_content TO anon, authenticated;
GRANT ALL ON public.collections TO anon, authenticated;

-- 2. Grant sequence permissions for auto-generated IDs
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 3. Enable RLS and add full access policies for existing tables
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "full_access_banners" ON public.banners;
CREATE POLICY "full_access_banners" ON public.banners FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "full_access_products" ON public.products;
CREATE POLICY "full_access_products" ON public.products FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "full_access_categories" ON public.categories;
CREATE POLICY "full_access_categories" ON public.categories FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "full_access_testimonials" ON public.testimonials;
CREATE POLICY "full_access_testimonials" ON public.testimonials FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "full_access_settings" ON public.settings;
CREATE POLICY "full_access_settings" ON public.settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "full_access_page_content" ON public.page_content;
CREATE POLICY "full_access_page_content" ON public.page_content FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "full_access_collections" ON public.collections;
CREATE POLICY "full_access_collections" ON public.collections FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
