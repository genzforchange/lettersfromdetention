# Letters From Detention

## Overview
A website showcasing "Letters From Detention" — stories from people in immigration detention, organized by US state. Letter cards are dynamically generated from a CSV data file. Cards display a person's photo, name, and description bullet points. Cards turn black with white text on hover. Clicking a card opens a fullscreen popup modal showing the letter image(s) and translated text.

## Tech Stack
- **Frontend**: Plain HTML, CSS, JavaScript (no frameworks)
- **Server**: Node.js with Express (ESM), serves static files and a JSON API
- **Data**: CSV file (`public/lfd.csv`) drives all card content
- **CSV Parsing**: `csv-parse` package
- **Styling**: Custom CSS with Montserrat font from Google Fonts
- **Responsive**: Mobile-first with breakpoints at 1024px and 600px

## Project Structure
```
├── server.js              # Express server (API + static files)
├── public/
│   ├── index.html         # Main page (dynamic rendering via JS)
│   ├── styles.css         # All styling
│   ├── lfd.csv            # Letter data (images, names, descriptions, translations)
│   ├── favicon.png        # Site favicon
│   └── figmaAssets/       # Images from Figma design
├── package.json           # Dependencies (express, csv-parse)
```

## API
- `GET /api/letters` — Returns JSON array of letter objects parsed from `lfd.csv`
  - Each object: `{ id, firstName, descriptions[], images[], state, stateAbbr, translation }`
  - State abbreviations are mapped to full names (e.g. CO → Colorado)

## CSV Format
The `public/lfd.csv` file has these columns:
- `Image1` — Primary image URL (shown as card thumbnail and in popup)
- `Image2` — Optional second image URL (shown only in popup)
- `FirstName` — Person's first name
- `Desc1` — First description bullet point
- `Desc2` — Second description bullet point
- `State` — US state abbreviation (e.g. CO, AK)
- `Translation` — Full translated letter text (shown in popup modal)

To add a new letter, simply add a row to the CSV. New state values automatically create new sections.

## Running
- **Development**: `node server.js` (port 5000)
- **Production**: Same command via deployment

## Key Design Decisions
- Cards are white with black border by default, turn black background with white text on hover only (CSS `:hover`)
- Two-column card grid on desktop, single column on tablet/mobile
- Card descriptions rendered as bullet points (Desc1, Desc2 from CSV)
- Cards stack vertically on mobile (< 600px)
- Popup modal: white overlay at 90% opacity, shows all letter images + translation
- Modal closes via X button, overlay click, or Escape key
- Font: Montserrat (Bold 700 for headings, Regular 400 for body)
