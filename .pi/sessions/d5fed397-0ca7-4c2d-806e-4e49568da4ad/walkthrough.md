# Walkthrough: Portfolio Redesign in skillsmp.com Style

## Summary
Complete visual redesign of the portfolio website to match the warm, minimal aesthetic of skillsmp.com.

## Files Modified
- `style.css` — complete rewrite of all styles
- `index.html` — added navigation, subtitle, footer, updated font imports

## Changes Made

### 1. Color Palette
Replaced blue-tinted dark theme with warm, neutral tones:
- Background: `#0f172a` → `#0a0a0a`
- Text: `#f8fafc` → `#ededed`
- Primary accent: `#38bdf8` (blue) → `#d99178` (coral)
- Secondary accent: `#f59e0b` (amber) — new
- Cards: `#1e293b` → `#111`
- Borders: `#334155` → `#606068`

### 2. Typography
- Added JetBrains Mono for headings (weight 800, tight letter-spacing)
- H1: 56px, JetBrains Mono, letter-spacing -2px
- Body: system-ui sans-serif stack

### 3. Navigation
- Fixed top nav bar with backdrop blur
- Logo "~/ yegor" with accent-colored name
- Links to sections and GitHub

### 4. Hero Section
- Added subtitle "ML Engineer & Full-Stack Developer"
- Monospace heading style
- Updated badge colors

### 5. Grid Background
- CSS pseudo-element with 32px grid pattern
- Very low opacity (0.03) for subtle texture

### 6. Project Cards
- New card background (#111)
- Rounded corners (16px)
- Coral accent on hover

### 7. Diagram Nodes
- Input nodes: coral (#d99178)
- Decision nodes: amber (#f59e0b)
- Output nodes: green (#10b981) — kept
- All connectors updated to new border color

### 8. Footer
- Simple footer with copyright and GitHub link
- Border-top separator

## Verification
- Visual comparison with skillsmp.com confirms matching aesthetic
- All interactive diagrams functional
- Lightbox works correctly
- Responsive layout maintained
