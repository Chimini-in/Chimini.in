-- ============================================================
-- Chimini.in — Products Table: COMPLETE Migration
-- Run this in the Supabase SQL Editor:
--   Dashboard → SQL Editor → New Query → Paste → Run
--
-- Every ALTER uses IF NOT EXISTS — safe to re-run at any time.
-- ============================================================

-- Core fields (may already exist, safe to re-run)
ALTER TABLE products ADD COLUMN IF NOT EXISTS title           TEXT            DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS description     TEXT            DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS price           NUMERIC(10, 2)  DEFAULT 0;
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_url       TEXT            DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS category_id     TEXT            DEFAULT NULL;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_published    BOOLEAN         DEFAULT TRUE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS sort_order      INTEGER         DEFAULT 0;

-- PDP redesign columns (these are the ones causing the errors)
ALTER TABLE products ADD COLUMN IF NOT EXISTS original_price       NUMERIC(10, 2) DEFAULT NULL;
ALTER TABLE products ADD COLUMN IF NOT EXISTS secondary_image_url  TEXT           DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS images               TEXT[]         DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS fragrance            TEXT           DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS badges               TEXT           DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS care_info            TEXT           DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS shipping_info        TEXT           DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS returns_info         TEXT           DEFAULT '';
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_best_seller       BOOLEAN        DEFAULT FALSE;
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_gift              BOOLEAN        DEFAULT FALSE;

-- ============================================================
-- Verify — should return 10 rows, one per new column
-- ============================================================
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'products'
  AND column_name IN (
    'original_price', 'secondary_image_url', 'images',
    'fragrance', 'badges', 'care_info', 'shipping_info',
    'returns_info', 'is_best_seller', 'is_gift',
    'sort_order', 'is_published'
  )
ORDER BY column_name;
