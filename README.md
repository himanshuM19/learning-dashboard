# Learning Dashboard

A student dashboard I built for a frontend intern challenge. Dark bento-grid layout, live course data from Supabase, and a bunch of Framer Motion animations. Tried to make it feel like something you'd actually want to use rather than just a cookie-cutter CRUD app.

Live: [project-o9a7g.vercel.app](https://project-o9a7g.vercel.app)

---

## Stack

Next.js (App Router), Supabase, Tailwind CSS v4, Framer Motion, Lucide React

---

## How I structured it

The biggest decision was the server/client split. Since this is a dashboard that fetches real data, I wanted the Supabase call to happen on the server — that way credentials never reach the browser and the first paint already has data. `DashboardContent` in `page.tsx` is an async server component that calls `getCourses()`, and if Supabase isn't reachable it just falls back to hardcoded demo data so the UI doesn't break.

Components that need browser stuff (`useState`, `useEffect`, hover animations) are marked `"use client"` — the sidebar, course cards, activity tile, hero tile. Everything else stays server-side.

Wrapped `DashboardContent` in `<Suspense>` so skeleton loaders show up immediately while the data loads. Also have a `loading.tsx` for the route-level loading state and an `error.tsx` boundary for unexpected crashes.

### The hydration bug that annoyed me

The activity heatmap was causing a hydration mismatch — I was using `Math.random()` at module level to generate the activity data, which runs on the server during SSR and then again on the client, producing different values each time. Fixed it by writing a simple seeded PRNG so both sides always get the same output.

### Animations

Everything uses only `transform` and `opacity` — no `width`, `height`, or anything that causes layout shifts. Card hover uses spring physics, sidebar active state uses `layoutId` so the highlight animates between nav items instead of just appearing. The bento tiles stagger in on load rather than all appearing at once.

---

## Running it locally

```bash
git clone https://github.com/himanshuM19/learning-dashboard.git
cd learning-dashboard
npm install
```

Copy `.env.example` → `.env.local` and add your Supabase project URL and anon key (Settings → API in your Supabase dashboard).

Run the SQL in `database/seed.sql` from the Supabase SQL editor to create the courses table and seed it with some data.

```bash
npm run dev
# http://localhost:3000
```

---

## Database schema

One table — `courses`:

- `id` uuid, primary key
- `title` text
- `progress` integer (0–100)
- `icon_name` text — maps to a Lucide icon component
- `created_at` timestamptz

RLS is on with a public read policy so the anon key can query it safely.

---

## Responsive

- Desktop: full sidebar with labels, 4-column bento grid
- Tablet: sidebar collapses to icons only (auto, not manual)
- Mobile: sidebar replaced by a bottom nav bar, grid goes single column
