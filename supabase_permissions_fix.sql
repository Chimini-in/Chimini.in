-- ============================================================================
-- CHIMINI Supabase Permissions Fix
-- Run this in Supabase SQL Editor: Dashboard → SQL Editor → New Query
-- ============================================================================

-- 1. GRANT SELECT (read) to anon role for all storefront tables
--    This lets the live website read all data without authentication.
GRANT SELECT ON public.banners TO anon;
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.categories TO anon;
GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT ON public.settings TO anon;
GRANT SELECT ON public.page_content TO anon;
GRANT SELECT ON public.collections TO anon;
GRANT SELECT ON public.reviews TO anon;

-- 2. GRANT ALL to authenticated role (logged-in admin users)
GRANT ALL ON public.banners TO authenticated;
GRANT ALL ON public.products TO authenticated;
GRANT ALL ON public.categories TO authenticated;
GRANT ALL ON public.testimonials TO authenticated;
GRANT ALL ON public.settings TO authenticated;
GRANT ALL ON public.page_content TO authenticated;
GRANT ALL ON public.collections TO authenticated;
GRANT ALL ON public.reviews TO authenticated;

-- 3. Also grant sequence usage so INSERT auto-increment IDs work
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- 4. Enable RLS on tables (best practice — policies control access per role)
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policy: anon can read all published banners
DROP POLICY IF EXISTS "anon_read_banners" ON public.banners;
CREATE POLICY "anon_read_banners" ON public.banners
  FOR SELECT TO anon USING (true);

-- 6. RLS Policy: anon can read all published products
DROP POLICY IF EXISTS "anon_read_products" ON public.products;
CREATE POLICY "anon_read_products" ON public.products
  FOR SELECT TO anon USING (is_published = true);

-- 7. RLS Policy: anon can read categories
DROP POLICY IF EXISTS "anon_read_categories" ON public.categories;
CREATE POLICY "anon_read_categories" ON public.categories
  FOR SELECT TO anon USING (true);

-- 8. RLS Policy: anon can read published testimonials
DROP POLICY IF EXISTS "anon_read_testimonials" ON public.testimonials;
CREATE POLICY "anon_read_testimonials" ON public.testimonials
  FOR SELECT TO anon USING (true);

-- 9. RLS Policy: anon can read settings
DROP POLICY IF EXISTS "anon_read_settings" ON public.settings;
CREATE POLICY "anon_read_settings" ON public.settings
  FOR SELECT TO anon USING (true);

-- 10. RLS Policy: anon can read page content
DROP POLICY IF EXISTS "anon_read_page_content" ON public.page_content;
CREATE POLICY "anon_read_page_content" ON public.page_content
  FOR SELECT TO anon USING (true);

-- 11. RLS Policy: authenticated (admin) can do everything on all tables
DROP POLICY IF EXISTS "admin_all_banners" ON public.banners;
CREATE POLICY "admin_all_banners" ON public.banners
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_all_products" ON public.products;
CREATE POLICY "admin_all_products" ON public.products
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_all_categories" ON public.categories;
CREATE POLICY "admin_all_categories" ON public.categories
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_all_testimonials" ON public.testimonials;
CREATE POLICY "admin_all_testimonials" ON public.testimonials
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_all_settings" ON public.settings;
CREATE POLICY "admin_all_settings" ON public.settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_all_page_content" ON public.page_content;
CREATE POLICY "admin_all_page_content" ON public.page_content
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ============================================================================
-- After running this, verify with:
-- SELECT grantee, table_name, privilege_type FROM information_schema.role_table_grants WHERE table_schema = 'public';
-- ============================================================================
