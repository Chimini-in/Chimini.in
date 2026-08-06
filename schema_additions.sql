-- CHIMINI Schema Additions
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. Add new columns to existing tables

alter table products add column if not exists is_best_seller boolean default false;
alter table products add column if not exists is_gift boolean default false;

alter table categories add column if not exists image_url text;
alter table categories add column if not exists icon text;
alter table categories add column if not exists is_published boolean default true;

alter table collections add column if not exists link_url text;
alter table collections add column if not exists sort_order integer default 0;
alter table collections add column if not exists is_published boolean default true;
alter table collections add column if not exists description text;

-- 2. Create the reviews table

create table if not exists reviews (
  id uuid default uuid_generate_v4() primary key,
  author text not null,
  city text,
  rating integer default 5,
  content text not null,
  product_tag text,
  is_approved boolean default false,
  is_pinned boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table reviews enable row level security;

drop policy if exists "Public read access for reviews" on reviews;
create policy "Public read access for reviews" on reviews for select using (is_approved = true);

drop policy if exists "Admin all access for reviews" on reviews;
create policy "Admin all access for reviews" on reviews for all using (auth.role() = 'authenticated');

-- 3. Update existing RLS policy on products to include new columns in public reads
-- (The existing policy already allows all published products, no change needed)

-- 4. Seed default about_us and contact_us page content if not already set

insert into page_content (page_name, content) values (
  'about_us',
  '{
    "hero_image": "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=2000",
    "hero_title": "Born from the Heart of India 🕯️",
    "hero_subtitle": "Every candle tells a story of craft, scent, and celebration",
    "story_a_heading": "Where It All Began",
    "story_a_body": "CHIMINI was born from a simple desire: to create a sensory sanctuary that feels vibrant, joyful, and deeply rooted in Indian culture.",
    "story_a_quote": "We wanted to bottle the feeling of coming home.",
    "story_a_image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    "story_b_heading": "Crafted with Nature, Made with Love",
    "story_b_body": "Our philosophy is simple: what goes into the air you breathe should be as pure as the intentions behind it.",
    "story_b_image": "https://images.unsplash.com/photo-1596431969695-1f9db8d26c5f?auto=format&fit=crop&q=80&w=800",
    "values": [
      {"icon": "🌿", "title": "Rooted in Nature", "desc": "All our ingredients are ethically sourced, cruelty-free, and designed to respect the earth.", "color": "#F4A623"},
      {"icon": "👐", "title": "Handcrafted Joy", "desc": "No machines, just artisan hands. Every pour, every wick done with meticulous care.", "color": "#E8533A"},
      {"icon": "💖", "title": "Vibrant Living", "desc": "We reject the dull and embrace the bold — making festive energy for everyday spaces.", "color": "#2A7C6F"}
    ],
    "big_quote": "Every flame we light is an act of intention.",
    "founder_name": "Priya Sharma",
    "founder_image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
    "founder_quote": "I started CHIMINI because I could not find a brand that married the rich, vibrant heritage of India with modern, clean-burning home fragrance.",
    "process_steps": [
      {"num": "01", "icon": "🌱", "title": "Sourcing", "desc": "Ethically gathering the finest natural soy and botanical extracts."},
      {"num": "02", "icon": "🧪", "title": "Blending", "desc": "Expertly mixing fragrance notes to create our signature joyful scents."},
      {"num": "03", "icon": "👐", "title": "Hand-Pouring", "desc": "Pouring every batch by hand in our local artisanal studio."},
      {"num": "04", "icon": "🎁", "title": "Packaging", "desc": "Wrapping it up in our bold, vibrant, eco-friendly boxes."}
    ],
    "trust_badges": ["✨ 100% Natural", "🇮🇳 Handmade in India", "🐰 Cruelty-Free", "♻️ Eco Packaging"]
  }'::jsonb
) on conflict (page_name) do nothing;

insert into page_content (page_name, content) values (
  'contact_us',
  '{
    "address": "124 Artisan Lane, Bandra West, Mumbai 400050, India",
    "email": "hello@chimini.in",
    "phone": "+91 98765 43210",
    "whatsapp": "+919876543210",
    "hours": "Mon - Sat: 10:00 AM – 8:00 PM\nSunday: Closed",
    "faqs": [
      {"question": "How do I track my order?", "answer": "Once your order ships, we will send you a tracking link via email and SMS."},
      {"question": "Do you offer gift wrapping?", "answer": "Yes! All gift sets come beautifully wrapped. Add custom wrapping at checkout."},
      {"question": "Can I customise a candle?", "answer": "Absolutely. Use our Build Your Own section on the Gifts page to personalise your order."},
      {"question": "Do you accept bulk or corporate orders?", "answer": "We do! Special pricing and custom branding available for bulk orders. Select Corporate Orders in the form."}
    ]
  }'::jsonb
) on conflict (page_name) do nothing;
