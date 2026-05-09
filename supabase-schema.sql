-- ============================================================
-- BABIMOOD V1 — Schéma Supabase
-- À exécuter dans l'éditeur SQL de ton projet Supabase
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ─── TABLE: events ─────────────────────────────────────────
create table if not exists events (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  description   text,
  image_url     text,
  date          date not null,
  time          text,
  location      text not null,
  category      text not null check (category in ('nightclub','beach','brunch','afterwork','rooftop','lounge','concert','autre')),
  whatsapp_link text,
  ticket_link   text,
  price         integer,
  is_featured   boolean default false,
  is_published  boolean default true,
  created_at    timestamptz default now()
);

-- ─── TABLE: spots ──────────────────────────────────────────
create table if not exists spots (
  id             uuid primary key default uuid_generate_v4(),
  name           text not null,
  description    text,
  vibe           text,
  images         text[] default '{}',
  location       text not null,
  type           text not null check (type in ('nightclub','rooftop','lounge','plage','restaurant','bar')),
  instagram_link text,
  whatsapp_number text,
  phone          text,
  opening_hours  text,
  is_featured    boolean default false,
  is_published   boolean default true,
  created_at     timestamptz default now()
);

-- ─── TABLE: submissions ────────────────────────────────────
create table if not exists submissions (
  id              uuid primary key default uuid_generate_v4(),
  organizer_name  text not null,
  event_name      text not null,
  flyer_url       text,
  event_date      text not null,
  event_location  text not null,
  description     text,
  contact_phone   text not null,
  contact_email   text,
  status          text default 'pending' check (status in ('pending','approved','rejected')),
  created_at      timestamptz default now()
);

-- ─── RLS (Row Level Security) ──────────────────────────────

-- Activer RLS sur toutes les tables
alter table events enable row level security;
alter table spots enable row level security;
alter table submissions enable row level security;

-- EVENTS: lecture publique (published uniquement)
create policy "Public can view published events"
  on events for select
  using (is_published = true);

-- EVENTS: admin peut tout faire
create policy "Authenticated users can manage events"
  on events for all
  to authenticated
  using (true)
  with check (true);

-- SPOTS: lecture publique (published uniquement)
create policy "Public can view published spots"
  on spots for select
  using (is_published = true);

-- SPOTS: admin peut tout faire
create policy "Authenticated users can manage spots"
  on spots for all
  to authenticated
  using (true)
  with check (true);

-- SUBMISSIONS: n'importe qui peut créer (formulaire public)
create policy "Anyone can submit an event"
  on submissions for insert
  with check (true);

-- SUBMISSIONS: seuls les admins peuvent lire et gérer
create policy "Authenticated users can manage submissions"
  on submissions for all
  to authenticated
  using (true)
  with check (true);

-- ─── DONNÉES DE TEST (optionnel) ───────────────────────────
-- Décommente pour insérer quelques données de test

/*
insert into events (title, description, image_url, date, time, location, category, whatsapp_link, is_featured, is_published, price) values
  ('Vendredi Noir Vol.3', 'La soirée afrobeats incontournable du mois', 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800', '2025-06-06', '22:00', 'La Coupole, Cocody', 'nightclub', 'https://wa.me/2250700000000', true, true, 5000),
  ('Beach Vibes Sunday', 'Journée détente et bonne musique les pieds dans le sable', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', '2025-06-08', '14:00', 'Plage de Port-Bouët', 'beach', 'https://wa.me/2250700000001', true, true, 3000),
  ('Brunch & Good Mood', 'Le brunch dominical avec DJ live', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', '2025-06-07', '11:00', 'Rooftop Les Jardins, Plateau', 'brunch', 'https://wa.me/2250700000002', false, true, 8000);

insert into spots (name, description, vibe, images, location, type, instagram_link, is_featured, is_published, opening_hours) values
  ('La Coupole', 'Le night club premium d''Abidjan. Sound system de folie, lumières laser, dancefloor immense.', 'Nightclub premium · Afrobeats · House', ARRAY['https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800'], 'Cocody, Abidjan', 'nightclub', 'https://instagram.com/lacoupoleabidjan', true, true, 'Ven-Sam 22h - 6h'),
  ('Sky Lounge Abidjan', 'Rooftop panoramique avec vue sur la lagune. Cocktails raffinés, ambiance chill.', 'Rooftop · Vue lagune · Cocktails', ARRAY['https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800'], 'Plateau, Abidjan', 'rooftop', 'https://instagram.com/skyloungeabidjan', true, true, 'Mar-Dim 18h - 2h');
*/
