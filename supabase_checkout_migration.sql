-- ============================================================================
-- CHIMINI — Checkout, Orders & Coupons Supabase Migration
-- Run this in Supabase SQL Editor:
--   Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================================

-- 1. Create or update the `orders` table
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id text UNIQUE,
  customer_id uuid,
  customer_name text DEFAULT '',
  customer_phone text DEFAULT '',
  customer_email text DEFAULT '',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  shipping_details jsonb NOT NULL DEFAULT '{}'::jsonb,
  subtotal numeric(10,2) NOT NULL DEFAULT 0.00,
  discount_amount numeric(10,2) DEFAULT 0.00,
  coupon_code text DEFAULT '',
  total_amount numeric(10,2) NOT NULL DEFAULT 0.00,
  status text DEFAULT 'pending',
  notes text DEFAULT '',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure all columns exist in `orders`
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS order_id text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_id uuid;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_name text DEFAULT '';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_phone text DEFAULT '';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_email text DEFAULT '';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS items jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS shipping_details jsonb DEFAULT '{}'::jsonb;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS subtotal numeric(10,2) DEFAULT 0.00;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS discount_amount numeric(10,2) DEFAULT 0.00;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS coupon_code text DEFAULT '';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS total_amount numeric(10,2) DEFAULT 0.00;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS notes text DEFAULT '';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS created_at timestamp with time zone DEFAULT timezone('utc'::text, now());

-- 2. Create or update the `coupons` table
CREATE TABLE IF NOT EXISTS public.coupons (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code text UNIQUE NOT NULL,
  discount_percentage integer DEFAULT 10,
  discount_amount numeric(10,2) DEFAULT 0.00,
  discount_type text DEFAULT 'percentage', -- 'percentage' or 'flat'
  min_order_amount numeric(10,2) DEFAULT 0.00,
  active boolean DEFAULT true,
  description text DEFAULT '',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ensure all columns exist in `coupons`
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS code text;
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS discount_percentage integer DEFAULT 10;
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS discount_amount numeric(10,2) DEFAULT 0.00;
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS discount_type text DEFAULT 'percentage';
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS min_order_amount numeric(10,2) DEFAULT 0.00;
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS active boolean DEFAULT true;
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS description text DEFAULT '';

-- 3. Seed starter luxury coupon codes
INSERT INTO public.coupons (code, discount_percentage, discount_type, active, description)
VALUES 
  ('CHIMINI10', 10, 'percentage', true, '10% off on all artisanal collections'),
  ('WELCOME15', 15, 'percentage', true, '15% off for new sanctuary members'),
  ('LUXURY20', 20, 'percentage', true, '20% VIP privilege discount')
ON CONFLICT (code) DO UPDATE 
SET 
  discount_percentage = EXCLUDED.discount_percentage,
  discount_type = EXCLUDED.discount_type,
  active = EXCLUDED.active,
  description = EXCLUDED.description;

-- 4. Grant table permissions to anon and authenticated roles
GRANT ALL ON public.orders TO anon, authenticated;
GRANT ALL ON public.coupons TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- 5. Row Level Security Policies
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "full_access_orders" ON public.orders;
CREATE POLICY "full_access_orders" ON public.orders FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "full_access_coupons" ON public.coupons;
CREATE POLICY "full_access_coupons" ON public.coupons FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 6. Reload schema cache for PostgREST
NOTIFY pgrst, 'reload schema';
