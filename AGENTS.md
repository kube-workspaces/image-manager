<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Overview

Next.js 16.3.5 + React 19 UI that collects a form and produces a kube-workspaces `Image` custom resource (CRD) spec. Part of the `kube-workspaces` org. The form does NOT submit anywhere yet — `handleSubmit` in `src/components/ImageForm.tsx:89` is a stub (logs JSON, shows an alert). There are no API routes and no backend; field names must stay aligned with the `Image` CRD spec.

## Commands

- Dev server: `npm run dev` (also `make dev`). No `.env` needed.
- Verify: `make lint` (eslint) and `make check` (`npx tsc --noEmit`). Run both after changes.
- There is NO test framework installed: `make test` and `make format` call installed-less jest/prettier and silently no-op. Don't rely on them; README is unhelpful `create-next-app` boilerplate.

## Stack quirks

- Tailwind CSS v4 via `@tailwindcss/postcss` — there is NO `tailwind.config.*` file. The theme lives in CSS-first design tokens in `src/app/globals.css` (`:root` CSS custom properties, dark mode via `@media (prefers-color-scheme: dark)`).
- Hand-written component classes (`.form-input`, `.btn-primary`, `.code-block`, etc.) are defined in `globals.css`, not Tailwind utilities. Styling uses them alongside Tailwind classes.
- Path alias `@/*` → `./src/*`.
- `layout.tsx` uses the newer typed `LayoutProps<"/">` pattern — check `node_modules/next/dist/docs/` before assuming classic Next.js APIs (the block above).

## Known rough spots in `src/components/ImageForm.tsx`

- `imageHomepageURL` and `annotations` each appear as duplicated fields (required section + optional section). Don't add a third copy; consolidate instead.
- `validateField` port check has a precedence bug (`&&`/`||`); round-trip of JSON textareas can throw on invalid input.
- The "Copy YAML" button (ImageForm.tsx:405) actually copies JSON.
