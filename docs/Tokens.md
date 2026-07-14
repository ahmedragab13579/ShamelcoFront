# Design Tokens & Iconography

## Border Radius

radius-sm: 6px
Badges, tags, and small tooltips

radius-md: 10px
Buttons, inputs, and dropdown menus

radius-lg: 16px
Cards, modals, and large image containers

radius-full: 9999px
Avatars, status pills, and round buttons

---

## Shadows

shadow-sm
0 1px 2px rgba(0, 0, 0, 0.05)
Subtle elevation for borders and small cards

shadow-md
0 4px 6px rgba(0, 0, 0, 0.07)
Default cards, dropdowns, and navigation

shadow-lg (Hover Elevation)
0 10px 15px rgba(0, 0, 0, 0.1)
Hover state for interactive cards and modals

shadow-gold
0 4px 12px rgba(212, 175, 55, 0.25)
Glow effect for primary gold CTA buttons

---

## Iconography System

Icon Library
Use a single consistent library (e.g., Lucide or Phosphor).
Maintain consistent 1.5px or 2px stroke width.

16px
Inline icons, badges, and input prefixes/suffixes

20px
Button icons and card metadata

24px
Navigation items, section headers, and action bars
## Iconography System (Lucide React)

Library: `lucide-react`
Default Stroke Width: `strokeWidth={1.75}` or `strokeWidth={2}` (must be consistent across the entire app)

---

### Standard Sizes

16px (`size={16}`)
Inline icons, badges, input prefixes/suffixes, and small tooltips

20px (`size={20}`)
Default button icons, card metadata, and dropdown items

24px (`size={24}`)
Navigation items, section headers, and modal close buttons

32px+ (`size={32}`)
Empty states, error illustrations, and feature cards

---

### Rules

Never hardcode hex colors inside the icon prop; always let it inherit the parent text color using `currentColor` or Tailwind text color classes (e.g., `text-shamelco-dark`).

Never mix different stroke widths in the same view or component.

Always add `aria-hidden="true"` to decorative icons, or provide `aria-label` if the icon acts as a standalone button.

Avoid importing the entire library; always use named imports for better performance and smaller bundle size:
`import { Calendar, MapPin, Search } from 'lucide-react';`