# SymptoCare Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from modern healthcare and productivity applications like Notion, Linear, and telemedicine platforms. This healthcare application requires trust-building design with clean, medical-grade aesthetics while maintaining user-friendly accessibility.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Light Mode: 59 85% 53% (healthcare green), 220 15% 20% (dark text)
- Dark Mode: 59 80% 60% (brighter green), 220 10% 95% (light text)

**Accent Colors:**
- Blue: 220 90% 56% (appointments, links)
- Red: 0 84% 60% (emergency contacts)
- Orange: 25 90% 61% (warnings, alerts)

**Background Treatments:**
- Hero gradients: Subtle green-to-blue (59 85% 53% to 220 90% 56%)
- Card backgrounds: Soft whites/grays with subtle shadows
- Emergency sections: Light red tints for urgency

### B. Typography
**Font Families:**
- Primary: Inter (headings, UI elements)
- Body: System fonts for readability

**Hierarchy:**
- H1: 2.5rem, bold (hero sections)
- H2: 2rem, semibold (page titles)
- H3: 1.5rem, medium (card titles)
- Body: 1rem, regular (content)

### C. Layout System
**Spacing Units:** Tailwind 2, 4, 6, 8, 12, 16
- Card padding: p-6
- Section margins: my-12
- Element spacing: gap-4
- Container max-width: max-w-6xl

### D. Component Library

**Navigation:**
- Clean horizontal nav with healthcare icons
- Mobile hamburger with slide-out drawer
- Breadcrumbs for nested pages

**Cards:**
- Rounded corners (rounded-lg)
- Subtle shadows (shadow-md)
- Hover lift effects (hover:shadow-lg)
- Green accent borders for health stats

**Forms:**
- Grouped form sections with clear labels
- Multi-select symptom checkboxes with visual feedback
- Date/time pickers for appointments
- Validation states with color coding

**Data Displays:**
- Timeline view for symptom history
- Stat cards for dashboard metrics
- Emergency contact cards with prominent call buttons
- Article cards with preview text

**Overlays:**
- Modal dialogs for article reading
- Confirmation dialogs for appointments
- Toast notifications for actions

### E. Healthcare-Specific Elements

**Trust Signals:**
- Professional medical iconography
- Clean, clinical white backgrounds
- Consistent spacing and alignment
- Subtle green accents throughout

**Accessibility:**
- High contrast ratios (4.5:1 minimum)
- Large touch targets (44px minimum)
- Clear focus indicators
- Screen reader friendly labels

**Emergency Features:**
- Red accent emergency contact cards
- Prominent call-to-action buttons
- Quick access floating action button

## Images
**Hero Section:** Large background image of modern healthcare professionals or medical technology, overlaid with gradient (59 85% 53% to transparent). Place variant="outline" buttons with blurred backgrounds over this image.

**Health Tips Cards:** Small thumbnail images of wellness activities (exercise, nutrition, meditation) - 200x150px approximate size.

**No other large images needed** - focus on clean iconography and typography for a professional medical aesthetic.

## Key Principles
1. **Trust through simplicity** - Clean, uncluttered interfaces
2. **Accessibility first** - High contrast, clear typography
3. **Progressive disclosure** - Show essential info first
4. **Consistent healthcare branding** - Green primary with professional blues
5. **Mobile-first responsive** - Touch-friendly interactions