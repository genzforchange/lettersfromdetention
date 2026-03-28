# Letters From Detention

## Overview
A static website showcasing "Letters From Detention" — stories from people in immigration detention, organized by US state. Letter cards display a person's photo, name, and description bullet points. Cards turn black with white text on hover. Clicking a card opens a fullscreen popup modal showing the letter image(s) and translated text.

## Tech Stack
- **Pure static site**: HTML, CSS, JavaScript only (no server-side dependencies)
- **Data**: Letter data is embedded directly in `script.js` as a JavaScript array
- **Styling**: Custom CSS with Montserrat font from Google Fonts
- **Responsive**: Mobile-first with breakpoints at 1024px and 600px

## Project Structure
```
├── index.html             # Main page
├── script.css             # All styling
├── script.js              # All logic + embedded letter data
├── favicon.png            # Site favicon
├── assets/
│   └── background.png     # Hero background image
└── figmaAssets/           # Design reference files (SVGs, screenshots)
```

## Key Design Decisions
- Cards are white with black border by default, turn black background with white text on hover only (CSS `:hover`)
- Two-column card grid on desktop, single column on tablet/mobile
- Card descriptions rendered as bullet points
- Cards stack vertically on mobile (< 600px)
- Popup modal: white overlay at 95% opacity, shows all letter images + translation
- Modal closes via X button, overlay click, or Escape key
- Font: Montserrat (Bold 700 for headings, Regular 400 for body)
- Redacted text effect using "Redacted" Google Font for privacy-sensitive content

## Running
- Served as static files via Python HTTP server on port 5000
- No build step needed — open `index.html` directly or serve with any static file server
