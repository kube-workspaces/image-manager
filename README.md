# Kube Workspaces Image Manager

A web-based form for creating kube-workspaces `Image` custom resources. Fill in the form in `src/components/ImageForm.tsx` and the app renders a preview of the resulting CRD spec.

**Status:** work in progress. The form does not submit anywhere yet — `handleSubmit` is a stub that logs the form data and shows an alert. There are no API routes or backend.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/postcss` — no `tailwind.config.*`; the theme is defined as CSS custom properties in `src/app/globals.css`

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No `.env` or other setup is needed.

## Verification

```bash
npm run lint   # ESLint
npx tsc --noEmit  # TypeScript type check
```

`make lint` and `make check` are aliases for the above. There is no test framework configured.

## Make targets

| Target    | Description                          |
| --------- | ------------------------------------ |
| `dev`     | Run the development server           |
| `build`   | Production build                     |
| `start`   | Serve the production build           |
| `lint`    | Run ESLint                           |
| `check`   | TypeScript type check                |
| `clean`   | Remove build artifacts               |
| `devprod` | `build` then `start`                 |
| `deps`    | `npm install`                        |

## Layout

- `src/app/page.tsx` — single-page shell that renders the form
- `src/app/globals.css` — design tokens and hand-written component classes (`.form-input`, `.btn-primary`, `.code-block`)
- `src/components/ImageForm.tsx` — the Image CRD form (client component)