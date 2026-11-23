# SES//BUILDS — Srinath's Portfolio (Desk Redesign)

Interactive painted desk portfolio for Srinath (Thota Sai Eswar Srinath), CS student at MAHE Bengaluru and founder of GoFocusGen & Bujji.

## Features
- **Interactive Desk Scene**: Painted desk illustration (`scene.webp`) with accessible hotspot buttons and live note popovers.
- **Interactive Laptop Drawer**: Drag-and-drop charger plug with physics tween, boot sequence, and OS folder navigation (Projects, Hackathons, Stack).
- **Drawer Modals**: Accessible native `<dialog>` drawers for Blog, Now, Photos, About, and Contact.
- **Content Data Layer**: Clean separation of content in `content/` (`projects.ts`, `hackathons.ts`, `stack.ts`, `now.ts`, `photos.ts`, `about.ts`, `contact.ts`, `desk.ts`).
- **Markdown Blog**: Real Next.js routes at `/blog` and `/blog/[slug]` driven by markdown files in `content/blog/`.
- **Dynamic Sitemap**: Generates `/sitemap.xml` including published (non-draft) posts.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build and Lint

```bash
npm run build
npm run lint
```

## TODO: Scene Image Regeneration
- **Known Limit of `scene.webp`**: The hero paragraph, book spine labels (`DS`, `DCCN`, `DSCO`, `DA`), and folder names on the painted laptop screen (`Projects`, `Notes`, `Ideas`) are currently baked into the raster `scene.webp` illustration.
- **TODO**: In a future asset update, regenerate or inpaint `scene.webp` without that embedded text so all labels are exclusively rendered by dynamic DOM overlays.
