-- ============================================================================
-- CHIMINI — COMPLETE Supabase Permissions Fix
-- Run this in Supabase SQL Editor:
--   Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================================

-- 1. Grant ALL table permissions (SELECT, INSERT, UPDATE, DELETE) to anon & authenticated
GRANT ALL ON public.banners TO anon, authenticated;
GRANT ALL ON public.products TO anon, authenticated;
GRANT ALL ON public.categories TO anon, authenticated;
GRANT ALL ON public.testimonials TO anon, authenticated;
GRANT ALL ON public.settings TO anon, authenticated;
GRANT ALL ON public.page_content TO anon, authenticated;
GRANT ALL ON public.collections TO anon, authenticated;
GRANT ALL ON public.reviews TO anon, authenticated;

-- 2. Grant sequence usage so auto-increment IDs work
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 3. Enable RLS on all tables
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 4. Open full access policies for anon & authenticated roles across all tables
DROP POLICY IF EXISTS "anon_full_banners" ON public.banners;
DROP POLICY IF EXISTS "admin_all_banners" ON public.banners;
DROP POLICY IF EXISTS "anon_read_banners" ON public.banners;
CREATE POLICY "full_access_banners" ON public.banners FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_products" ON public.products;
DROP POLICY IF EXISTS "admin_all_products" ON public.products;
DROP POLICY IF EXISTS "anon_read_products" ON public.products;
CREATE POLICY "full_access_products" ON public.products FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_categories" ON public.categories;
DROP POLICY IF EXISTS "admin_all_categories" ON public.categories;
DROP POLICY IF EXISTS "anon_read_categories" ON public.categories;
CREATE POLICY "full_access_categories" ON public.categories FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "admin_all_testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "anon_read_testimonials" ON public.testimonials;
CREATE POLICY "full_access_testimonials" ON public.testimonials FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_settings" ON public.settings;
DROP POLICY IF EXISTS "admin_all_settings" ON public.settings;
DROP POLICY IF EXISTS "anon_read_settings" ON public.settings;
CREATE POLICY "full_access_settings" ON public.settings FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_page_content" ON public.page_content;
DROP POLICY IF EXISTS "admin_all_page_content" ON public.page_content;
DROP POLICY IF EXISTS "anon_read_page_content" ON public.page_content;
CREATE POLICY "full_access_page_content" ON public.page_content FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_collections" ON public.collections;
DROP POLICY IF EXISTS "admin_all_collections" ON public.collections;
DROP POLICY IF EXISTS "anon_read_collections" ON public.collections;
CREATE POLICY "full_access_collections" ON public.collections FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_full_reviews" ON public.reviews;
DROP POLICY IF EXISTS "admin_all_reviews" ON public.reviews;
DROP POLICY IF EXISTS "anon_read_reviews" ON public.reviews;
CREATE POLICY "full_access_reviews" ON public.reviews FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- ============================================================================
-- Verification query: confirms table grants
-- ============================================================================
SELECT grantee, table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' AND grantee IN ('anon', 'authenticated')
ORDER BY table_name, grantee;
