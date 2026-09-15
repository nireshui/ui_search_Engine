# HotelHub Admin

Hotel Booking Engine — Admin Dashboard

Objective

Design a modern, clean, professional Admin Dashboard for a Hotel Booking Engine.

The dashboard is for administrators who manage hotel bookings, rooms, availability, pricing, payments, cancellations, coupons, and reports.

The UI should be designed using:

HTML5

Tailwind CSS

Responsive design

Modern dashboard UI patterns

Clean typography

Reusable components

Desktop-first but fully responsive

Do not create a customer-facing booking website. This design is strictly for the Admin Booking Engine Dashboard.

1. Overall Layout

Create a dashboard layout with:

---------------------------------------------------------
| Sidebar                     | Top Header              |
|                             |                         |
| Booking Engine              | Search   Notification  |
|                             |                         |
| Dashboard                   |-------------------------|
| Bookings                    |                         |
| Hotels & Rooms              |     Main Content        |
| Rates & Pricing             |                         |
| Availability                |                         |
| Coupons & Offers            |                         |
| Cancellations               |                         |
| Payments                    |                         |
| Reports                     |                         |
| Settings                    |                         |
|                             |                         |
| Admin Profile               |                         |
---------------------------------------------------------


2. Sidebar

Create a fixed left sidebar.

Branding

Display:

HotelBook Admin

Subtitle:

Booking Engine

Navigation

Dashboard

Bookings

Hotels & Rooms

Rates & Pricing

Availability

Coupons & Offers

Cancellations

Payments

Reports

Settings

Each menu item should have an appropriate icon.

Sidebar States

Support:

Active menu state

Hover state

Collapsed sidebar

Mobile sidebar

The Dashboard item should be active by default.

At the bottom display:

Admin User
Administrator
[Profile Avatar]


3. Top Header

Create a clean top navigation bar.

Include:

Left

Page title:

Booking Engine Dashboard

Small breadcrumb:

Admin / Booking Engine

Right

Search

Notification icon

Help icon

Admin profile

Profile dropdown

4. Dashboard Overview

The main dashboard should start with summary KPI cards.

Create 6 KPI cards.

Card 1

Total Bookings

Value:

2,845

Additional information:

+12.5% from last month

Card 2

Pending Bookings

Value:

126

Additional information:

18 new today

Card 3

Confirmed Bookings

Value:

2,412

Additional information:

+8.4% from last month

Card 4

Cancelled Bookings

Value:

307

Additional information:

-3.2% from last month

Card 5

Booking Revenue

Value:

₹18,42,500

Additional information:

+14.8% from last month

Card 6

Occupancy Rate

Value:

78.4%

Additional information:

+5.6% from last month

5. Booking Analytics

Create a large analytics section below the KPI cards.

Booking Trends

Display a line/area chart.

Chart title:

Booking Trends

Filter:

Last 7 Days

Last 30 Days

Last 3 Months

Last 6 Months

This Year

Show:

Total bookings

Confirmed bookings

Cancelled bookings

The chart should visually communicate booking performance over time.

6. Revenue Analytics

Create a second analytics card.

Title:

Revenue Overview

Display a bar/line chart showing:

Room Revenue

Taxes

Discounts

Net Revenue

Include a date filter.

7. Recent Bookings

Create a professional table.

Title:

Recent Bookings

Include a View All button.

Table columns:

Booking IDGuestHotelRoomCheck-inCheck-outAmountStatusAction

Example data:

BK-10245
Rahul Kumar
Grand Palace Hotel
Deluxe Room
20 Sep 2026
22 Sep 2026
₹10,620
Confirmed
View


Other statuses:

Confirmed

Pending

Cancelled

Completed

Use visually distinct status badges.

8. Booking Status Overview

Create a card showing booking status distribution.

Display:

Confirmed

Pending

Cancelled

Completed

Use a donut/pie chart.

Example:

Confirmed     68%
Completed     18%
Pending        8%
Cancelled      6%


9. Top Performing Hotels

Create a table/card titled:

Top Performing Hotels

Columns:

Hotel

Location

Bookings

Revenue

Occupancy

Status

Example:

Grand Palace Hotel
Chennai
428 bookings
₹4,82,500
84%
Active


Show the top 5 hotels.

10. Room Availability Overview

Create a section titled:

Room Availability

Display summary cards:

Total Rooms       850
Available         214
Booked            526
Blocked           110


Also provide an Availability Calendar button.

Show availability using simple status indicators.

11. Pending Actions

Create a compact section:

Pending Actions

Display:

Pending booking confirmations

Cancellation requests

Payment verification

Hotel approval requests

Refund requests

Example:

Pending Booking Confirmations       24
Cancellation Requests               8
Refund Requests                     5
Payment Verification                3


Each item should have a View button.

12. Quick Actions

Create a Quick Actions section.

Buttons:

Add Hotel

Add Room

Add Rate

Update Availability

Create Coupon

View Bookings

Use icons with each action.

13. Booking Management Page

Create a separate page accessible from:

Bookings

Include:

Filters

Booking ID

Customer

Hotel

Check-in date

Check-out date

Booking status

Payment status

Table

Columns:

Booking ID

Customer

Hotel

Room

Dates

Guests

Amount

Payment

Status

Actions

Actions:

View

Edit

Cancel

Download Invoice

14. Hotel & Room Management

Create a page for:

Hotels & Rooms

Display:

Hotel list

Hotel status

Number of rooms

Available rooms

Occupied rooms

Add Hotel button

Manage Rooms button

Room management should include:

Room Type

Total Rooms

Available Rooms

Price

Status

15. Rates & Pricing

Create a page:

Rates & Pricing

Include:

Hotel selector

Room type selector

Date range

Base price

Weekend price

Seasonal price

Discount

Tax

Final price

Provide:

Add Rate

button.

16. Availability

Create an availability management page.

Display a calendar/table.

Rows:

Room Type

Columns:

Dates

Example:

                Sep 20  Sep 21  Sep 22  Sep 23

Deluxe Room       12      10       8       15
Executive Room     6       5       7        8
Suite              3       2       2        4


Allow admin to:

Update inventory

Block rooms

Unblock rooms

View bookings

17. Coupons & Offers

Create a page:

Coupons & Offers

Table columns:

Coupon Code

Discount

Applicable Hotels

Valid From

Valid Until

Usage

Status

Actions

Add:

Create Coupon

button.

18. Cancellations

Create a page:

Cancellation Management

Display:

Booking ID

Customer

Hotel

Booking Amount

Cancellation Date

Cancellation Reason

Refund Amount

Status

Statuses:

Requested

Approved

Refunded

Rejected

19. Payments

Create:

Payment Management

Summary cards:

Total Payments

Successful

Pending

Failed

Refunded

Transaction table:

Transaction ID

Booking ID

Customer

Amount

Payment Method

Date

Status

20. Reports

Create:

Booking Reports

Include report filters:

Date range

Hotel

Room

Booking status

Payment status

Report cards:

Total Bookings

Total Revenue

Average Booking Value

Cancellation Rate

Occupancy Rate

Provide buttons:

Export CSV

Export PDF

21. Settings

Create a simple settings page.

Sections:

Booking Settings

Booking confirmation mode

Minimum stay

Maximum stay

Advance booking period

Cancellation Settings

Cancellation deadline

Cancellation fee

Refund rules

Payment Settings

Payment methods

Deposit percentage

Payment status

Notification Settings

Booking confirmation email

Cancellation email

Payment notification

Hotel notification

22. Design System

Use a professional hotel/travel SaaS dashboard style.

Design Characteristics

Clean

Modern

Minimal

Professional

Spacious

Easy to scan

Enterprise SaaS appearance

Use:

Rounded cards

Subtle borders

Soft shadows

Clear hierarchy

Consistent spacing

Professional typography

Clear status badges

Clean tables

Avoid:

Excessive gradients

Overly colorful UI

Large decorative illustrations

Unnecessary animations

Cluttered layouts

23. Responsive Design

The dashboard must work on:

Desktop

Laptop

Tablet

Mobile

Desktop

Use:

Sidebar + Header + Main Content


Tablet

Sidebar can collapse.

Mobile

Use:

Top Header
Hamburger Menu
Main Content


Tables should support horizontal scrolling on smaller screens.

24. Tailwind CSS Requirements

Use Tailwind CSS utility classes throughout the interface.

Use reusable styles/components for:

Buttons

Cards

Tables

Badges

Inputs

Dropdowns

Modals

Tabs

Navigation

Pagination

Do not use inline CSS unless absolutely necessary.

Keep the HTML semantic and well structured.

25. Icons

Use a consistent modern icon set.

Recommended:

Lucide Icons

Use icons for:

Dashboard

Bookings

Hotels

Rooms

Pricing

Availability

Coupons

Payments

Reports

Settings

Search

Notifications

User

Calendar

Revenue

Check

Close

Warning

26. Important UI Interactions

Include visual states for:

Hover

Active

Focus

Disabled

Loading

Empty state

Error state

Include confirmation dialogs for destructive actions such as:

Cancel booking

Delete coupon

Block rooms

27. Overall Dashboard Structure

The final dashboard should visually follow this hierarchy:

ADMIN BOOKING ENGINE
│
├── Sidebar
│
├── Header
│
└── Dashboard
    │
    ├── KPI Cards
    │
    ├── Booking Analytics
    │
    ├── Revenue Analytics
    │
    ├── Recent Bookings
    │
    ├── Booking Status
    │
    ├── Top Hotels
    │
    ├── Room Availability
    │
    ├── Pending Actions
    │
    └── Quick Actions


Final Requirement

Create a production-quality Admin Booking Engine Dashboard UI.

The design should feel like a real hotel reservation management system rather than a generic admin template.

Prioritize:

Booking management

Availability management

Revenue visibility

Hotel/room management

Pricing management

Payment management

Cancellation management

Reports

Keep the interface clean, professional, responsive, and easy for an administrator to operate.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c327743d-6739-4e96-949d-5ee239972c0e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
