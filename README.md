# OmniMart

A full-featured e-commerce web application built with **Next.js 14** (App Router), TypeScript, and CSS custom properties. OmniMart is a modern one-stop shop with product browsing, search, cart management, checkout flow, and responsive design.

## Features

- **Product Catalog** — Browse thousands of products with category & subcategory filters, brand checkboxes, and free-text search
- **Product Detail** — View individual product pages with image gallery, ratings, stock status, quantity selector, and add-to-cart
- **Shopping Cart** — Manage items with quantity +/- controls, remove items, and view a live order summary with subtotal/tax/total
- **Checkout** — Secure checkout form with shipping address, credit card input (with formatting & validation), and order review
- **Login Page** — Ready-to-use login/sign-in form
- **Order Success** — Confirmation page after placing an order
- **Mobile Responsive** — Fully responsive with mobile drawer navigation, collapsible filters sidebar, and sticky add-to-cart bar
- **Toast Notifications** — Global toast system for add-to-cart confirmations
- **Persistent Cart** — Cart state is saved to `localStorage` and survives page refreshes
- **Card Expiry Validation** — Checks expiry date against the current date and shows inline error styling (red border + pink background)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | CSS Custom Properties (no Tailwind) |
| State Management | React Context API |
| Data | Static JSON (6,600+ product records) |
| Persistence | `localStorage` |

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (providers: Cart, Toast)
│   ├── globals.css                   # All global styles & component classes
│   ├── page.tsx                      # Home page (carousel, categories, featured, promo, newsletter)
│   ├── products/
│   │   ├── page.tsx                  # Products page (Suspense wrapper)
│   │   └── ProductsPageContent.tsx   # Product grid with search/filters
│   ├── product/[id]/page.tsx         # Dynamic product detail page
│   ├── cart/page.tsx                 # Shopping cart
│   ├── checkout/page.tsx            # Checkout form with card validation
│   ├── login/page.tsx               # Login page
│   ├── success/page.tsx             # Order success page
│   └── context/
│       ├── CartContext.tsx           # Cart state management
│       └── ToastContext.tsx          # Toast notification system
├── components/
│   ├── Header.tsx                    # Reusable header with search, cart badge, mobile drawer
│   ├── Footer.tsx                    # Reusable mega footer
│   └── ProductCard.tsx              # Reusable product card component
├── lib/
│   └── data.ts                      # Data layer (search, filter, category queries)
└── data/
    └── products.json                # Product catalog
```

## Getting Started

### Prerequisites

- [Node.js 18+](https://nodejs.org/)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd omnimart

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
npm run build
npm start
```

## Routes

| Route | Description |
|---|---|
| `/` | Home page with hero carousel, category grid, featured products, promo banner, and newsletter signup |
| `/products` | All products catalog |
| `/products?search=<query>` | Search results |
| `/products?category=Electronics` | Filter by category |
| `/products?category=Electronics&subcategory=Laptops` | Filter by category + subcategory |
| `/product/<id>` | Product detail page |
| `/cart` | Shopping cart |
| `/checkout` | Secure checkout form |
| `/login` | User login |
| `/success` | Order confirmation |

## Key Implementation Details

### Cart Context
The `CartContext` manages cart state globally. Items are persisted in `localStorage` under the `omniCart` key. The context provides `addToCart`, `updateQty`, `removeItem`, `clearCart`, `getCartCount`, and `cartTotal`.

### Toast Notifications
The `ToastContext` renders a fixed-position toast notification that auto-dismisses after 3 seconds. Used primarily for add-to-cart confirmations.

### Expired Card Validation
The checkout page validates the credit card expiry date (`MM/YY` format) on:
- **Blur** — when the user leaves the expiry input field
- **Submit** — when the user clicks "Place Order"

Invalid or expired cards show a red border and pink background (`.input-error` class). The validation checks:
- Month is between 1–12
- Year (interpreted as 20YY) is not in the past
- If year equals current year, month is not in the past

### Responsive Design
- Mobile drawer navigation (homepage)
- Collapsible sidebar filters (products page)
- Sticky add-to-cart bar on mobile (product detail)
- Cart/checkout grids collapse to single column

## License

This project is for educational/demonstration purposes.