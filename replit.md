# Letters From Detention

## Overview
A static website showcasing "Letters From Detention" — stories organized by US state (currently Colorado and Alaska). Each letter card displays a person's photo, name, and description. Cards turn black with white text on hover.

## Tech Stack
- **Frontend**: Plain HTML, CSS, JavaScript (no frameworks)
- **Server**: Node.js with Express (ESM), serves static files from `public/`
- **Styling**: Custom CSS with Montserrat font from Google Fonts
- **Responsive**: Mobile-first with breakpoints at 1024px and 600px

## Project Structure
```
├── server.js              # Express server (serves static files)
├── public/
│   ├── index.html         # Main page
│   ├── styles.css         # All styling
│   ├── favicon.png        # Site favicon
│   └── figmaAssets/       # Images from Figma design
├── package.json           # Dependencies (express only)
```

## Running
- **Development**: `node server.js` (port 5000)
- **Production**: Same command via deployment

## Key Design Decisions
- Cards are white with black border by default, turn black background with white text on hover only (CSS `:hover`)
- Two-column card grid on desktop, single column on tablet/mobile
- Hero section decorative images hidden on smaller screens
- Cards stack vertically on mobile (< 600px)
- Font: Montserrat (Bold 700 for headings, Regular 400 for body)
