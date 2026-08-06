# Dr. Daniel Manrique, M.D. — Next.js Frontend

Full-scale TypeScript frontend for the facial plastic & reconstructive surgery practice website.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- CSS (custom design system in `globals.css`)
- EN / ES translations via React context

## Scripts

```bash
npm install
npm run dev
npm run build
npm start
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Home — hero, about, procedures preview, stats, advantages, contact |
| `/procedures` | Full procedures catalog by category |
| `/contact` | Consultation request page |
| `/about/profile` | Doctor biography |
| `/about/press` | Press & publications |
| `/about/awards` | Awards & certifications |

## Structure

```
src/
  app/                 # App Router pages & layouts (.tsx)
  components/          # UI components (.tsx)
    home/              # Homepage sections
  context/             # LanguageProvider
  data/                # procedures + site content (.ts)
  hooks/               # useScrollReveal (.ts)
  utils/translations.ts
public/assets/         # Images
```
