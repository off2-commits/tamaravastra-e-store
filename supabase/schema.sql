create extension if not exists pgcrypto;

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric not null,
  image text,
  images jsonb default '[]',
  category text not null check (category in ('cotton','silk','party-wear','designer')),
  colors jsonb default '[]',
  description text,
  stock integer default 0,
  is_bestseller boolean default false
);

alter table products enable row level security;
create policy "Public read products" on products for select using (true);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  reviewer_name text not null,
  reviewer_email text,
  reviewer_phone text,
  rating int not null check (rating between 1 and 5),
  title text,
  text text,
  images jsonb default '[]',
  date timestamptz default now(),
  verified boolean default false,
  order_id uuid
);

alter table reviews enable row level security;
create policy "Public read reviews" on reviews for select using (true);
create policy "Public insert reviews" on reviews for insert with check (true);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  date timestamptz default now(),
  status text default 'pending',
  subtotal numeric not null default 0,
  shipping numeric not null default 0,
  tax numeric not null default 0,
  total numeric not null default 0,
  payment_method text,
  payment_status text,
  delivery_date date,
  tracking_number text,
  notes text,
  customer_name text,
  customer_email text,
  customer_phone text,
  address text,
  city text,
  state text,
  pincode text,
  country text
);

alter table orders enable row level security;
create policy "Public read orders" on orders for select using (true);
create policy "Public insert orders" on orders for insert with check (true);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid not null references products(id),
  name text,
  price numeric not null,
  quantity int not null,
  color text
);

alter table order_items enable row level security;
create policy "Public read order_items" on order_items for select using (true);
create policy "Public insert order_items" on order_items for insert with check (true);