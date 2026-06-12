-- Supabase Initial Schema for CHIMINI Storefront & Admin Portal

-- 1. Create Storage Buckets
insert into storage.buckets (id, name, public) values ('images', 'images', true) ON CONFLICT (id) DO NOTHING;

-- Storage Policies: allow public read, but restrict uploads/deletes to authenticated admins
create policy "Public Access" on storage.objects for select using ( bucket_id = 'images' );
create policy "Admin Upload" on storage.objects for insert with check ( bucket_id = 'images' and auth.role() = 'authenticated' );
create policy "Admin Update" on storage.objects for update using ( bucket_id = 'images' and auth.role() = 'authenticated' );
create policy "Admin Delete" on storage.objects for delete using ( bucket_id = 'images' and auth.role() = 'authenticated' );

-- 2. Create Tables
create table if not exists products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price numeric(10,2) not null,
  image_url text,
  category text,
  fragrance text,
  availability boolean default true,
  badges text,
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
alter table products enable row level security;
alter table featured_products enable row level security;
alter table collections enable row level security;
alter table gift_hampers enable row level security;
alter table settings enable row level security;
alter table page_content enable row level security;
alter table customers enable row level security;
alter table orders enable row level security;
alter table coupons enable row level security;

-- Public read access policies
create policy "Public read access for products" on products for select using (true);
create policy "Public read access for featured_products" on featured_products for select using (true);
create policy "Public read access for collections" on collections for select using (true);
create policy "Public read access for gift_hampers" on gift_hampers for select using (true);
create policy "Public read access for settings" on settings for select using (true);
create policy "Public read access for page_content" on page_content for select using (true);
create policy "Public can insert orders" on orders for insert with check (true);
create policy "Public can insert customers" on customers for insert with check (true);
create policy "Public read access for coupons" on coupons for select using (true);

-- Admin write access policies (authenticated users only)
create policy "Admin all access for products" on products for all using (auth.role() = 'authenticated');
create policy "Admin all access for featured_products" on featured_products for all using (auth.role() = 'authenticated');
create policy "Admin all access for collections" on collections for all using (auth.role() = 'authenticated');
create policy "Admin all access for gift_hampers" on gift_hampers for all using (auth.role() = 'authenticated');
create policy "Admin all access for settings" on settings for all using (auth.role() = 'authenticated');
create policy "Admin all access for page_content" on page_content for all using (auth.role() = 'authenticated');
create policy "Admin all access for customers" on customers for all using (auth.role() = 'authenticated');
create policy "Admin all access for orders" on orders for all using (auth.role() = 'authenticated');
create policy "Admin all access for coupons" on coupons for all using (auth.role() = 'authenticated');

-- 4. Initial Seed Data
insert into settings (setting_key, setting_value) values 
('announcements', '["Free shipping on orders over $150 | Use code: LUXE150", "Scent of the Month: 20% off with code: SCENT20", "Crafted with 100% natural soy wax & botanical oils"]'::jsonb),
('hero_banner', '{"title": "Pure Botanical Elegance", "subtitle": "Discover Our Signature Series", "image_url": "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1600&q=80", "button_text": "Shop New Arrivals", "button_link": "collections.html"}'::jsonb)
ON CONFLICT (setting_key) DO NOTHING;
