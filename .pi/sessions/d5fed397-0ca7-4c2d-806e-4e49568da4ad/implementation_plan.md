# Implementation Plan: Portfolio Redesign in skillsmp.com Style

## Overview
Transform the portfolio from its current blue-tinted dark theme to the warm, minimal aesthetic of skillsmp.com.

## Color Mapping

| Current | New (skillsmp) | Variable |
|---------|----------------|----------|
| #0f172a | #0a0a0a | --bg-color / --background |
| #f8fafc | #ededed | --text-primary / --foreground |
| #94a3b8 | #a3a3a3 | --text-secondary / --muted-foreground |
| #38bdf8 | #d99178 | --accent / --primary |
| #0ea5e9 | #c57f66 | --accent-hover / --primary-dark |
| #1e293b | #111 | --card-bg / --card |
| #334155 | #606068 | --border |
| (new) | #f59e0b | --accent-secondary |

## Approach

### 1. CSS Variables (style.css :root)
Replace the entire :root block with skillsmp.com's palette.

### 2. Typography
- Import JetBrains Mono from Google Fonts
- H1, H2, H3: JetBrains Mono, weight 800, tight letter-spacing
- Body: system-ui stack (remove Inter dependency or keep as fallback)

### 3. Hero Section
- Full-width with grid pattern background overlay
- H1 in JetBrains Mono, large (3-4rem)
- Badges restyled with new colors
- Avatar with subtle border glow

### 4. Navigation
- Add fixed top nav bar (logo + links)
- Backdrop blur, border-bottom

### 5. Skill Marquee
- Pill-shaped cards with new card bg (#111)
- Border hover → primary color
- Subtle scale on hover

### 6. Project Cards
- Background: rgba(17, 17, 17, 0.8)
- Border: 1px solid var(--border)
- Hover: border color change to primary
- Rounded corners: 12-16px

### 7. Diagram Nodes
- Update all node colors to use new palette
- Input nodes: primary (#d99178) instead of purple
- Decision nodes: accent (#f59e0b)
- Output nodes: green (#10b981) - keep
- Arrows and connectors: new border color

### 8. Grid Background
- Add CSS pseudo-element with grid pattern (like skillsmp)
- Very low opacity (0.02-0.04)

### 9. Transitions
- Add active:scale-95 to buttons/cards
- Smooth border-color transitions
- duration-200 for most interactions

### 10. Responsive
- Ensure mobile breakpoints work with new styles
- Test grid pattern doesn't break on mobile

## Files to Modify
- `style.css` — main stylesheet (complete overhaul)
- `index.html` — add nav bar, grid background div, font import update

## Verification
- Open in browser and visually compare to skillsmp.com
- Check all interactive diagrams still work
- Verify lightbox functionality
- Test responsive layout
