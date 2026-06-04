# 🛍️ LUXE – Modern E-Commerce Product Page

A **production-ready, single-file** React + Tailwind CSS e-commerce application with a clean, professional UI inspired by modern platforms like Amazon, Flipkart, and Apple Store.

---

## ✅ Completed Features

### 🏠 Product Listing Page (Home `/`)
- Responsive hero banner with gradient background and decorative elements
- Category filter chips (All, Electronics, Smartphones, Laptops, Fashion, etc.)
- Sort toolbar: Featured / Newest / Price Low–High / Price High–Low / Top Rated
- Price range slider filter panel
- **Skeleton loaders** (1.2s shimmer effect while data loads)
- Responsive product grid: 1 col (mobile) → 2 (tablet) → 3 (desktop) → 4 (wide)
- Empty state illustration with reset button

### 🃏 Product Card
- Lazy-loaded product image with hover zoom (scale 1.1)
- Category badge, custom label badge (Best Seller, New, Hot Deal, etc.)
- Discount % badge calculated from originalPrice vs price
- Low-stock warning overlay ("Only N left!")
- Star rating component with half-star support
- Price + original price + savings display
- **View Details** & **Add to Cart** buttons with hover effects
- translateY(-6px) lift + shadow enhancement on card hover

### 📄 Product Details Page (`/product/:id`)
- **4-image gallery** with thumbnail selector + active state
- Breadcrumb navigation
- Product title, category chip, badge chip
- Star rating with review count
- Price / originalPrice / savings chip
- Real-time stock status (In Stock / Low Stock / Out of Stock)
- Tag chips
- **Quantity selector** (+/−) with stock cap
- Dynamic **Total Price Preview** (price × qty)
- **Add to Cart** button (shows count if already in cart)
- **Buy Now** → adds to cart then navigates to cart page
- Trust badges (Secure Payment / Fast Delivery / Easy Returns)
- **Tab panel**: Description | Specifications | Reviews (4)
- Specifications displayed as key-value grid
- Customer reviews with avatar, verified badge, rating, date
- **Related Products carousel** with prev/next arrows

### 🛒 Cart Page (`/cart`)
- Empty cart illustration with CTA button
- Cart item list with image, name, category, quantity controls, subtotal, remove
- **Order Summary card** (sticky on desktop):
  - Subtotal, Tax (10%), Shipping (FREE over ₹50,000), Grand Total
  - Free-shipping progress hint
  - Secure Checkout button with spinner animation
  - Continue Shopping, Clear Cart buttons
  - Payment method icons (Visa, Mastercard, Amex, PayPal)

### 🧠 State Management (CartContext API)
- Add / Remove / Increase / Decrease quantity / Clear cart
- Auto-calculated: totalItems, subtotal, tax, shipping, grandTotal
- **localStorage persistence** (survives page refresh)
- Dark mode preference persisted to localStorage

### 🔔 Toast Notifications
- ✅ Product added to cart
- ❌ Product removed from cart
- ℹ️ Cart cleared
- Auto-dismiss after 3.5s, manual close button, slide-in animation

### 🌙 Dark Mode Toggle
- One-click toggle in Navbar
- Full dark palette across all components
- Persisted in localStorage

### 🔍 Search
- Real-time search (title + category matching)
- Works from any page (navigates to home automatically)
- Mobile-friendly collapsible search bar

### 🎨 UI Enhancements
- **Glassmorphism navbar** (backdrop blur + semi-transparent)
- Smooth hover transitions on all interactive elements
- Page enter fade-in animations
- Skeleton loaders with pulse animation
- Custom scrollbar styling
- Professional footer with links & social icons

---

## 📐 Component Structure (inline single-file architecture)

```
index.html
│
├── PRODUCTS[]              ← 12 product data objects
├── REVIEWS[]               ← 4 review objects
│
├── CartContext             ← Context API + localStorage
├── CartProvider            ← Wraps entire app
│
├── Components
│   ├── Navbar              ← Logo, Search, Cart badge, Dark mode
│   ├── Rating              ← Filled / half / empty stars
│   ├── SkeletonCard        ← Shimmer loading placeholder
│   ├── ProductCard         ← Grid card with interactions
│   ├── ProductGrid         ← Listing page with filters & sort
│   ├── ProductDetails      ← Detail page with gallery & tabs
│   ├── CartItem            ← Single cart row
│   ├── CartSummary         ← Totals + checkout
│   ├── CartPage            ← Full cart view
│   ├── ToastContainer      ← Notification stack
│   └── Footer
│
└── App                     ← SPA router (home / product / cart)
```

---

## 🛣️ Routes (client-side SPA)

| State         | View                    |
|---------------|-------------------------|
| `home`        | Product Listing Page    |
| `product + id`| Product Details Page    |
| `cart`        | Shopping Cart Page      |

---

## 🗂️ Product Data Structure

```js
{
  id: 1,
  title: "Sony WH-1000XM5",
  category: "Electronics",
  price: 29999,
  originalPrice: 34999,
  rating: 4.8,
  reviews: 2847,
  stock: 25,
  badge: "Best Seller",
  image: "https://...",        // card thumbnail
  images: ["...", "...", "...", "..."],  // gallery
  description: "...",
  specs: { "Key": "Value", ... },
  tags: ["Wireless", "Premium"]
}
```

---

## 💰 Cart Calculation Logic

```
subtotal   = Σ (price × quantity)
tax        = subtotal × 10%
shipping   = subtotal > ₹50,000 ? FREE : ₹499
grandTotal = subtotal + tax + shipping
```

---

## 🛠️ Tech Stack

| Technology       | Purpose                          |
|-----------------|----------------------------------|
| React 18         | UI components & state            |
| Tailwind CSS v3  | Utility-first styling            |
| Font Awesome 6   | Icons                            |
| Inter (Google Fonts) | Typography                   |
| Babel Standalone | JSX transpilation in browser     |
| localStorage     | Cart & dark-mode persistence     |

---

## 🚀 Deployment

To make this site live, go to the **Publish tab** and click **Publish**. No build step required — it's a pure static HTML file.

---

## 🔮 Recommended Next Steps

1. **Add authentication** — login/register with JWT or OAuth
2. **Backend API** — real product & order database (Node.js / Supabase)
3. **Payment gateway** — Razorpay / Stripe integration
4. **Wishlist feature** — heart icon to save products
5. **Product filtering** — multi-select categories, brand filter
6. **User reviews submission** — form to post reviews
7. **Order history page** — view past orders
8. **PWA support** — service worker for offline access
