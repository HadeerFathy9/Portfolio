# Hadeer Fathy | Portfolio

Personal portfolio for **Hadeer Fathy**, biomedical researcher and clinical laboratory chemist working in cancer biology, evidence synthesis, scientific writing, and laboratory diagnostics.

**Live site:** https://hadeerfathy9.github.io/Portfolio/

## Sections

| Section | What it shows |
| --- | --- |
| Hero | Name, role, short introduction, and an animated line drawing of cholesterol |
| About | Background summary and key facts: GPA, class rank, languages, location |
| Experience | Timeline of research and laboratory roles, plus additional experience |
| Publications | Elsevier book chapter with DOI link, and ongoing research |
| Education | Degrees from the Faculty of Science, Menoufia University |
| Skills | Research, laboratory, and computer skills |
| Contact | Email and LinkedIn |

## Features

- **Responsive**: mobile-first layout tested from 375px phones up to wide desktops, with a full-screen menu on small screens and fluid type sizes.
- **Smooth motion**: Lenis smooth scrolling, a one-time page-load sequence, scroll reveals that play once, and a timeline line that fills as you scroll.
- **Accessible**: semantic HTML, skip link, visible keyboard focus, `Escape` closes the menu, and `prefers-reduced-motion` turns movement into simple fades.
- **No build step**: plain HTML, CSS, and JavaScript. Nothing to install.

## Design

| Token | Hex | Use |
| --- | --- | --- |
| Paper | `#FBFAFC` | Page background |
| Ink | `#221C2B` | Body text and headings |
| Plum | `#5B3F7A` | Primary color, buttons, links |
| Deep plum | `#3A2752` | Contact section |
| Gold | `#C9A66B` | Accent lines and atoms |
| Gold text | `#8A6A2F` | Gold-colored text (readable contrast) |

Typefaces: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) for headings and [Manrope](https://fonts.google.com/specimen/Manrope) for body text, both from Google Fonts.

## Project structure

```
.
├── index.html            # All page content
├── assets/
│   ├── css/style.css     # Styles, layout, and animations
│   ├── js/main.js        # Smooth scroll, menu, reveals, timeline progress
│   └── img/favicon.svg   # HF monogram icon
├── .nojekyll             # Serve files as-is on GitHub Pages
└── README.md
```

## Run locally

Any static file server works. With Python:

```bash
python -m http.server 5500
```

Then open http://localhost:5500.

## Update the content

All text lives in `index.html`, one block per section, marked with comments such as `<!-- Experience -->`.

- **New role**: copy an existing `<li class="role">` inside the timeline and edit it.
- **New publication**: copy the `<article class="publication">` block.
- **New skill**: add an `<li>` to the right list under Skills.
- **Colors**: change the variables at the top of `assets/css/style.css`.

## Deploy on GitHub Pages

1. Push to the `main` branch.
2. In the repository, open **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then save.
4. The site goes live at https://hadeerfathy9.github.io/Portfolio/ within a minute or two. Later pushes to `main` update it automatically.

## Credits

- Smooth scrolling: [Lenis](https://github.com/darkroomengineering/lenis) (MIT), loaded from jsDelivr
- Fonts: Google Fonts

© 2026 Hadeer Fathy. All rights reserved.
