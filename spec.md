# Makeover Unisex Salon

## Current State
The site is a static frontend React app for Makeover Unisex Salon (Civil Line, Rudrapur, Uttarakhand). It has 8 sections: Hero, About, Services, Why Choose Us, Gallery, Testimonials, Contact & Location, Footer. Black & gold luxury theme with WhatsApp booking, animated counters, masonry gallery, and a fixed mobile Call Now bar.

## Requested Changes (Diff)

### Add
- Auto-playing hero image slider cycling every 3–4 seconds with left/right slide transitions (one large image visible at a time)
- Slide-in animation: images enter from left/right alternately for a premium side-entry feel
- Navigation dots and prev/next arrows on the hero slider
- Gallery image hover zoom effect
- New gallery images: haircut, hair styling, facial treatment, makeup, salon interior
- New hero images: hair cutting, hair styling, beauty salon, facial treatment, makeup, salon interior

### Modify
- Hero section: replace static image with animated full-width slider; keep title "Makeover Unisex Salon", subtitle "Professional Hair & Beauty Services in Rudrapur", Book Appointment + View Location buttons
- Services section: update to 6 services — Haircut & Styling, Beard Styling, Hair Spa, Hair Coloring, Facial & Skin Care, Bridal Makeup — with premium icons and gold-accent cards
- Full visual refresh of all sections (About, Why Choose Us, Testimonials, Contact) with more premium typography, spacing, and gold accents
- Gallery: refresh layout with hover zoom effects and improved grid
- index.css: upgraded animations, smoother scroll, refined gold/black palette

### Remove
- Static single hero image
- Old service entries that don't match the 6 listed

## Implementation Plan
1. Generate high-quality hero slider images (6 images: hair cutting, styling, beauty salon, facial, makeup, salon interior)
2. Generate gallery section images (5 images)
3. Build HeroSlider component: full-width, auto-play every 3.5s, CSS slide-left/right transition, dots + arrows, overlay text + CTA buttons
4. Rebuild ServicesSection with 6 updated services, premium icon cards, gold hover effects
5. Refresh all other sections (About, Why Choose Us, Testimonials, Contact) with upgraded typography, gold accents, and smoother layouts
6. Refresh Gallery section with new images and hover zoom
7. Update index.css with slide keyframes, smooth animations, and refined design tokens
8. Validate build
