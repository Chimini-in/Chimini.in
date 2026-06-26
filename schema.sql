-- Supabase Initial Schema for CHIMINI Storefront & Admin Portal

-- 1. Create Storage Buckets
insert into storage.buckets (id, name, public) values ('images', 'images', true) ON CONFLICT (id) DO NOTHING;

-- Storage Policies: allow public read, but restrict uploads/deletes to authenticated admins
drop policy if exists "Public Access" on storage.objects;
create policy "Public Access" on storage.objects for select using ( bucket_id = 'images' );

drop policy if exists "Admin Upload" on storage.objects;
create policy "Admin Upload" on storage.objects for insert with check ( bucket_id = 'images' and auth.role() = 'authenticated' );

drop policy if exists "Admin Update" on storage.objects;
create policy "Admin Update" on storage.objects for update using ( bucket_id = 'images' and auth.role() = 'authenticated' );

drop policy if exists "Admin Delete" on storage.objects;
create policy "Admin Delete" on storage.objects for delete using ( bucket_id = 'images' and auth.role() = 'authenticated' );

-- 2. Create Tables
create table if not exists categories (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  description text,
  image_url text,
  parent_id uuid references categories(id) on delete cascade,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price numeric(10,2) not null,
  image_url text,
  category_id uuid references categories(id) on delete set null,
  category text, -- Legacy text field
  fragrance text,
  availability boolean default true,
  badges text,
  sort_order integer default 0,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ensure new columns are added if the table already existed
alter table products add column if not exists category_id uuid references categories(id) on delete set null;
alter table products add column if not exists sort_order integer default 0;
alter table products add column if not exists is_published boolean default true;

create table if not exists banners (
  id uuid default uuid_generate_v4() primary key,
  section_id text not null, -- e.g., 'hero', 'ads_1', 'brand_story'
  image_url text not null,
  link_url text,
  title_overlay text,
  subtitle_overlay text,
  button_text text,
  is_published boolean default true,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists testimonials (
  id uuid default uuid_generate_v4() primary key,
  author text not null,
  city text,
  caption text,
  content text not null,
  rating integer default 5,
  theme text default 'gold',
  image_url text,
  sort_order integer default 0,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists featured_products (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references products(id) on delete cascade unique,
  sort_order integer default 0
);

create table if not exists collections (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists gift_hampers (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price numeric(10,2) not null,
  image_url text,
  options jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists settings (
  id uuid default uuid_generate_v4() primary key,
  setting_key text unique not null,
  setting_value jsonb not null
);

create table if not exists page_content (
  id uuid default uuid_generate_v4() primary key,
  page_name text unique not null,
  content jsonb not null
);

-- Orders and Customers
create table if not exists customers (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  email text not null,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists orders (
  id uuid default uuid_generate_v4() primary key,
  customer_id uuid references customers(id),
  total_amount numeric(10,2) not null,
  status text default 'pending',
  shipping_details jsonb,
  items jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists coupons (
  id uuid default uuid_generate_v4() primary key,
  code text unique not null,
  discount_percentage integer,
  active boolean default true
);

-- 3. Row Level Security (RLS) setup
alter table categories enable row level security;
alter table products enable row level security;
alter table banners enable row level security;
alter table testimonials enable row level security;
alter table featured_products enable row level security;
alter table collections enable row level security;
alter table gift_hampers enable row level security;
alter table settings enable row level security;
alter table page_content enable row level security;
alter table customers enable row level security;
alter table orders enable row level security;
alter table coupons enable row level security;

-- Public read access policies
drop policy if exists "Public read access for categories" on categories;
create policy "Public read access for categories" on categories for select using (true);

drop policy if exists "Public read access for products" on products;
create policy "Public read access for products" on products for select using (is_published = true);

drop policy if exists "Public read access for banners" on banners;
create policy "Public read access for banners" on banners for select using (is_published = true);

drop policy if exists "Public read access for testimonials" on testimonials;
create policy "Public read access for testimonials" on testimonials for select using (is_published = true);

drop policy if exists "Public read access for featured_products" on featured_products;
create policy "Public read access for featured_products" on featured_products for select using (true);

drop policy if exists "Public read access for collections" on collections;
create policy "Public read access for collections" on collections for select using (true);

drop policy if exists "Public read access for gift_hampers" on gift_hampers;
create policy "Public read access for gift_hampers" on gift_hampers for select using (true);

drop policy if exists "Public read access for settings" on settings;
create policy "Public read access for settings" on settings for select using (true);

drop policy if exists "Public read access for page_content" on page_content;
create policy "Public read access for page_content" on page_content for select using (true);

drop policy if exists "Public can insert orders" on orders;
create policy "Public can insert orders" on orders for insert with check (true);

drop policy if exists "Public can insert customers" on customers;
create policy "Public can insert customers" on customers for insert with check (true);

drop policy if exists "Public read access for coupons" on coupons;
create policy "Public read access for coupons" on coupons for select using (true);

-- Admin write access policies (authenticated users only)
drop policy if exists "Admin all access for categories" on categories;
create policy "Admin all access for categories" on categories for all using (auth.role() = 'authenticated');

drop policy if exists "Admin all access for products" on products;
create policy "Admin all access for products" on products for all using (auth.role() = 'authenticated');

drop policy if exists "Admin all access for banners" on banners;
create policy "Admin all access for banners" on banners for all using (auth.role() = 'authenticated');

drop policy if exists "Admin all access for testimonials" on testimonials;
create policy "Admin all access for testimonials" on testimonials for all using (auth.role() = 'authenticated');

drop policy if exists "Admin all access for featured_products" on featured_products;
create policy "Admin all access for featured_products" on featured_products for all using (auth.role() = 'authenticated');

drop policy if exists "Admin all access for collections" on collections;
create policy "Admin all access for collections" on collections for all using (auth.role() = 'authenticated');

drop policy if exists "Admin all access for gift_hampers" on gift_hampers;
create policy "Admin all access for gift_hampers" on gift_hampers for all using (auth.role() = 'authenticated');

drop policy if exists "Admin all access for settings" on settings;
create policy "Admin all access for settings" on settings for all using (auth.role() = 'authenticated');

drop policy if exists "Admin all access for page_content" on page_content;
create policy "Admin all access for page_content" on page_content for all using (auth.role() = 'authenticated');

drop policy if exists "Admin all access for customers" on customers;
create policy "Admin all access for customers" on customers for all using (auth.role() = 'authenticated');

drop policy if exists "Admin all access for orders" on orders;
create policy "Admin all access for orders" on orders for all using (auth.role() = 'authenticated');

drop policy if exists "Admin all access for coupons" on coupons;
create policy "Admin all access for coupons" on coupons for all using (auth.role() = 'authenticated');

-- 4. Initial Seed Data
insert into settings (setting_key, setting_value) values 
('announcements', '["Complimentary shipping on orders over ₹100 • USE CODE LUXE15 FOR 15% OFF"]'::jsonb),
('hero_banner', '{"title": "Pure Botanical Elegance", "subtitle": "Discover Our Signature Series", "image_url": "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1600&q=80", "button_text": "Shop New Arrivals", "button_link": "collections.html"}'::jsonb)
ON CONFLICT (setting_key) DO NOTHING;

-- Seed default categories
insert into categories (title, slug, sort_order) values 
('Decor', 'decor', 1),
('Candles', 'candles', 2),
('Scented', 'scented', 3),
('Gifts', 'gifts', 4);

-- Seed initial testimonials
insert into testimonials (author, city, caption, content, rating, theme, sort_order) values 
('Priya Sharma', 'Mumbai, Maharashtra', 'Client photo · Diwali gift unboxing', 'Gifted the Jasmine & Sandalwood hamper to my mother on Diwali — she adored it. The packaging felt like unwrapping art. CHIMINI is my go-to for every festive occasion.', 5, 'gold', 1),
('Arjun Mehta', 'Bengaluru, Karnataka', 'Client photo · Rose & Oud shelfie', 'The Rose & Oud candle transformed my living space entirely. I light it every evening and it instantly feels like a luxury retreat. A brand that truly gets Indian homes.', 5, 'teal', 2),
('Neha Kapoor', 'Delhi, NCR', 'Client photo · Corporate gifting moment', 'Ordered the corporate gift set for my team of 20, and every single person loved it. The eco-friendly packaging and rich scents made me look like the best manager ever!', 5, 'coral', 3),
('Ananya Desai', 'Pune, Maharashtra', 'Client photo · Self-care Sunday', 'I have tried many luxury candle brands, but nothing comes close to CHIMINI’s throw and burn time. The Amber & Fig scent is a masterpiece.', 5, 'gold', 4);
