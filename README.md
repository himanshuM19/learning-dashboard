# LearnFlow — Next-Gen Student Dashboard

A high-fidelity learning dashboard built for the Frontend Intern Challenge. Dark-mode Bento Grid layout with live Supabase data, Framer Motion animations, and full responsive design.

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Database | Supabase (PostgreSQL) |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |

## Architecture

### Server / Client Split

Data fetching happens entirely in **Server Components** (`page.tsx` → `DashboardContent`). The Supabase client is instantiated server-side via `@supabase/supabase-js`, so credentials never reach the browser. Only interactive components that need browser APIs (`useState`, `useEffect`, Framer Motion hooks) are marked `"use client"`:

- `Sidebar` — collapsible state, `layoutId` nav animation
- `BentoGrid` — stagger entrance animations
- `CourseCard` — hover spring physics, animated progress bar
- `ActivityTile` — Framer Motion entrance per cell
- `HeroTile` — streak dot animation

### Suspense Boundary

`DashboardContent` is wrapped in `<Suspense fallback={<DashboardSkeleton />}>` so skeleton loaders appear immediately while Supabase data is in flight. A dedicated `loading.tsx` also handles Next.js route-level loading state.

### Error Handling

If Supabase is unreachable (missing env vars, network error), `getCourses()` throws and `DashboardContent` catches it, falling back to static demo data so the UI always renders. `error.tsx` handles unexpected runtime errors with a retry button.

### Animation Strategy

All animations use `transform` and `opacity` only — never `width`, `height`, or layout-affecting properties — ensuring **zero layout shifts**. Framer Motion's spring physics (`stiffness: 300, damping: 20`) power all hover states. The sidebar's active highlight uses `layoutId` for a snapped, shared-element transition.

## Setup

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/learning-dashboard.git
cd learning-dashboard
npm install
```

### 2. Supabase setup

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `database/seed.sql`
3. Copy your project URL and anon key from **Project Settings → API**

### 3. Environment variables

```bash
cp .env.example .env.local
# Fill in your Supabase URL and anon key
```

### 4. Run

```bash
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel

```bash
vercel --prod
# Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel dashboard
```

## Responsive Behaviour

| Breakpoint | Sidebar | Grid |
|---|---|---|
| Desktop >1024px | Full sidebar with labels | 4-column Bento |
| Tablet 768-1024px | Collapsed to icons only | 2-column Bento |
| Mobile <768px | Hidden; bottom nav bar | Single column |
