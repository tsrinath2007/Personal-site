# Task: Replace my portfolio home page with an interactive "desk" scene

I'm Srinath (Thota Sai Eswar Srinath), a CS student and founder. My portfolio is live at https://sesbuilds.vercel.app. This folder is a finished single-file prototype of the new home page: `index.html` (inline CSS and JS) and `scene.webp`. Port it into this repo so it looks and behaves exactly like the prototype.

## Step 0: look before you change anything
Inspect the repo: framework and version, router (App Router or Pages), styling approach (Tailwind, CSS modules, plain CSS), package manager, existing routes, metadata and public files. Keep `/resume.pdf` and all existing links working. Work on a new branch called `desk-redesign`. Do not push to main or deploy to production. Tell me what you found before you start coding.

## What the prototype does (keep all of it)
- The home page is one painted desk image (`scene.webp`, 1672x867, already cropped, so don't re-crop it). Above it is a real header with the brand "SES//BUILDS", links (Home, Projects, Hackathons, Blog, Now, Photos, About) and an "Available for opportunities" button that opens Contact.
- Clickable objects are invisible buttons placed over the image with percentage positions. Copy the values from `index.html`. The laptop uses a polygon: a clip-path for the hit area and an SVG polygon for the dashed outline. Hover or keyboard focus shows a dashed pencil outline and a handwritten label.
- Tapping an object shows a small note beside it. It sits to the right of the object, flips to the left near the right edge, and becomes a fixed bottom sheet at 760px and below. The note has a title, one line and an "Enter" button. Focus moves to Enter, Esc closes the note, and clicking elsewhere closes it.
- Enter opens a right-side drawer page. Use a native `<dialog>` with `showModal()` or an equally accessible modal. Esc and a "Back to desk" button close it, focus returns to the object that opened it, and page scroll is locked while it is open.
- Objects and where they lead:
  - Laptop: out of battery. Drag the plug into the port, or tap it, then a boot sequence runs and the folders Projects, Hackathons and Stack appear.
  - Books: Blog.
  - Boarding pass and sticky note: Now.
  - The two photos: Photos.
  - Mug: the GoFocusGen project.
  - Header links: About and Contact.
- The charging puzzle is skipped when the laptop is opened from the header, the mug or a button. Once charged, it stays charged for the session, with an "Unplug to replay" link.
- Under 760px the scene scrolls sideways inside its own container, centered on the laptop, and a real text hero ("Hey there! I'm Srinath." plus one line) shows above it. On desktop that text is hidden visually but stays in the DOM for screen readers.
- Respect `prefers-reduced-motion`, keep every control keyboard accessible, and keep the focus styles.

## How to build it
1. Use client components for the interactive parts: `DeskScene`, `Note`, `Drawer`, `LaptopSheet` and one component per drawer page. Keep the logic from `index.html` and convert it to React state and effects. Don't redesign the behavior.
2. Load fonts with `next/font` (or the repo's equivalent): Newsreader, IBM Plex Mono and Caveat. Reuse the CSS variables and color tokens from the prototype's `:root` block.
3. Use `next/image` for `scene.webp` with `priority`, and keep hotspot positions in percentages so they stay aligned at every size.
4. Move all text into data files, for example `content/projects.ts`, `hackathons.ts`, `stack.ts`, `now.ts` and `photos.ts`, so I can edit content without touching components. Keep the wording from the prototype. Don't invent facts, results or links.
5. Blog: real routes `/blog` and `/blog/[slug]` with MDX or markdown files in `content/blog`. Frontmatter: `title`, `summary`, `date`, `draft`, `spineColor`. The Blog drawer lists the posts as books, using the spine colors from the prototype, and each book opens its own page. Create the four draft posts from the prototype as stub files with `draft: true` and a TODO body. Add posts to the sitemap only when they are not drafts.
6. Photos: a `photos.ts` array with `src`, `alt` and `caption`, rendered with `next/image` from `public/photos`. Show the empty placeholder frames when the array is empty. Remove the FileReader upload preview.
7. Keep the existing site metadata, and add a 1200x630 `og:image` and a Twitter card made from the scene.
8. Don't add heavy dependencies. No animation library is needed.

## Known limits of the image
The hero paragraph, the book spine labels (DS, DCCN, DSCO, DA) and the folder names on the painted laptop screen (Projects, Notes, Ideas) are painted into `scene.webp`. Leave them as they are, and add a short TODO in the README about regenerating the image without that text.

## Done means
- `npm run build` and lint pass with no errors.
- Checked at 1440x900 and 390x844: every object opens the right page, the note is placed correctly, there is no horizontal page scroll, and Esc and Tab work.
- You give me a summary of the files changed, how to run it, and anything you were unsure about. Ask me before deleting any existing page or component.
