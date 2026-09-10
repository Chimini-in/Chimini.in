-- ============================================================
-- Chimini.in — Banners Table: Add offer_pct column
-- Run this in the Supabase SQL Editor:
--   Dashboard → SQL Editor → New Query → Paste → Run
--
-- Uses IF NOT EXISTS — safe to re-run at any time.
-- ============================================================

-- Add offer_pct column: stores a numeric offer percentage (e.g. 10, 20, 30).
-- When set, banner click navigates to /shop?discount=N instead of link_url.
ALTER TABLE banners ADD COLUMN IF NOT EXISTS offer_pct INTEGER DEFAULT NULL;

-- ============================================================
-- Verify
-- ============================================================
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'banners'
  AND column_name IN ('offer_pct', 'link_url', 'section_id')
ORDER BY column_name;
