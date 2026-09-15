# HotelBook Admin Dashboard

## Goal
Build a production-quality, responsive hotel booking administration workspace using the selected “Front-desk control room” direction. The experience will be operational, restrained, and optimized for booking, inventory, pricing, payment, cancellation, and reporting workflows.

## What I’ll build
- A persistent desktop sidebar with collapse support, mobile drawer, active navigation, operator profile, and shared command header.
- A complete dashboard with six KPIs, booking trends, revenue breakdown, recent bookings, booking-status distribution, top hotels, room availability, pending actions, and quick actions.
- Separate working pages for Bookings, Hotels & Rooms, Rates & Pricing, Availability, Coupons & Offers, Cancellations, Payments, Reports, and Settings.
- Realistic tables, filters, selectors, badges, pagination, empty/loading/error examples where relevant, profile and notification menus, and confirmation dialogs for destructive actions.
- Fully responsive behavior, including horizontally scrollable data tables and compact mobile controls.

## Visual system
- Deep green-black navigation rail, warm off-white content canvas, teal operational accent, amber warnings, and restrained red destructive states.
- Space Grotesk for headings and Inter for body text.
- Compact rounded cards, subtle borders, light shadows, dense readable tables, and minimal motion that respects reduced-motion preferences.
- Consistent semantic tokens and reusable controls for buttons, cards, fields, menus, badges, tables, dialogs, tabs, and pagination.

## Technical approach
- Keep the existing TanStack Start structure and create one route per management page.
- Build reusable application-shell and admin UI components shared across all routes.
- Use Lucide icons and lightweight CSS/SVG chart rendering so the dashboard remains fast and responsive.
- Keep data as realistic in-app sample data; no authentication, database, or live booking API is included in this UI-only scope.
- Add unique page metadata for every route and verify desktop and mobile rendering, navigation, menus, filters, and dialogs.
