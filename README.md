# Our Soul Purpose — Website

Premium informational website for **Our Soul Purpose**, an international humanitarian organization.

**Tagline:** Serving Humanity One Life at a Time

## Stack

- Next.js (App Router)
- React + TypeScript (strict)
- Tailwind CSS
- Lucide React
- Motion for React
- Google Fonts (Fraunces + Outfit)

No CMS, authentication, database, or donation processing.

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form ID. Contact form stays **inactive** until set. |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key for the Global Presence map. |
| `NEXT_PUBLIC_SITE_URL` | Production URL for absolute Open Graph links (optional). |

Example:

```env
NEXT_PUBLIC_FORMSPREE_ID=abcdefgd
```

Create a form at [formspree.io](https://formspree.io), copy the form ID, and restart the dev server.

## Editing content

All replaceable copy and configuration lives in `src/data/`:

| File | Contents |
| --- | --- |
| `organization.ts` | Name, tagline, locations, email, phone, socials |
| `about.ts` | Mission, vision, introduction |
| `programs.ts` | Seven programs |
| `impact.ts` | Narrative impact (add verified metrics when available) |
| `stories.ts` | Illustrative story cards |
| `values.ts` | Core values |
| `involved.ts` | Participation options |
| `navigation.ts` | Nav / footer links |
| `media.ts` | Image paths and credits |
| `seo.ts` | Metadata defaults |

- Leave `email`, `phone`, and social URLs empty to hide them in the UI.
- Do not invent contact details, addresses, or impact statistics.
- Story cards are labeled as **illustrative examples** until verified stories are supplied.

## Replacing images

Place files under `public/images/`:

```
public/images/
  brand/logo-primary.jpeg
  hero/hero.jpg
  about/about.jpg
  programs/programs.jpg
  map/presence.jpg
  stories/story-1.jpg
  stories/story-2.jpg
  stories/story-3.jpg
```

Update paths in `src/data/media.ts` and `src/data/stories.ts` if filenames change.

Current photography is **licensed atmospheric stock** for layout only. It must not be presented as beneficiaries or completed OSP projects. Replace with consented organizational photography when available.

## Scripts

```bash
npm run dev      # development
npm run build    # production build
npm run start    # serve production build
npm run lint     # ESLint
```

## Deployment (GitHub Pages)

This project is configured for static export and deploys automatically via GitHub Actions on push to `master`.

**Live URL:** https://izarrar124-svg.github.io/our-soul-purpose/

1. In the repo, add Actions secret `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
2. Push to `master` (or run the **Deploy to GitHub Pages** workflow manually).
3. In **Settings → Pages**, ensure Source is **GitHub Actions**.

Local Pages-style build:

```bash
GITHUB_PAGES=true npm run build
```

### Vercel (optional)

You can also import the repo in Vercel. Set `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` and optional `NEXT_PUBLIC_FORMSPREE_ID` in project env vars. Do not set `GITHUB_PAGES` on Vercel.

## Brand

Design tokens follow `OSP_Brand_Guidelines.pdf`:

- Deep Navy `#163A5C`
- Ocean Blue `#0F4C6E`
- Globe Blue `#5FA4C1`
- Sky Mist `#E6EEF6`
- Warm Cream `#FBF8F5`
- Hope Gold `#C8871F` (CTAs)
- Ink Grey `#4A5A6A`

Logo asset: `public/images/brand/logo-primary.jpeg` (approved original — do not redraw).

## Pages

- `/` — single-page site with section anchors
- `/privacy` — privacy policy

## Accessibility & SEO

- Skip link, semantic landmarks, focus-visible styles
- One primary `h1` on the homepage
- Open Graph / Twitter metadata from `src/data/seo.ts`
- `next/image` for responsive imagery
- Reduced-motion friendly animations
