# 🛍️ LUXE — Premium Modern E-Commerce Experience

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Link-brightgreen?style=for-the-badge&logo=netlify&color=e8633a)](https://e-commerce-web-luke.netlify.app/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react&color=61dafb)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v3-blue?style=for-the-badge&logo=tailwindcss&color=38bdf8)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-latest-purple?style=for-the-badge&logo=vite&color=646cff)](https://vitejs.dev/)

A highly immersive, production-ready, fully responsive React & Tailwind CSS E-Commerce platform. Designed with premium aesthetics, rich micro-animations, clean transition effects, and a dynamic interactive dual-theme system.

🔗 **Explore the Live Site:** [https://e-commerce-web-luke.netlify.app/](https://e-commerce-web-luke.netlify.app/)

---

## ✨ Features & Micro-Interactions

### 🎨 Visual & Motion Design
*   **Smooth Theme Transitions:** Seamless `0.4s` cross-fade transition when switching between dark and light modes.
*   **Animated Theme Toggle:** A custom, physics-based animated Toggle Button complete with stars, moon craters, and sun rays.
*   **Interactive Background (`.animated-bg`):** Floating dynamic particles and an animated backdrop gradient that shifts in real time under the page content.
*   **Premium Glassmorphism Header:** Floating Navbar with a transparent glass effect (`backdrop-blur-md`), integrated search bar, active navigation indicator, and dynamic user avatar menu.

### 🏠 Product Discovery Page (Home `/`)
*   **Curated Collection Hero:** Elegant hero heading with custom font pairing (`Playfair Display` + `DM Sans`) and custom accents.
*   **Interactive Filters:** Category pill filter buttons with active state animations.
*   **Smart Sorting:** Sort products dynamically by Featured, Top Rated, Price: Low to High, or Price: High to Low.
*   **Integrated Search:** Search system matching names and categories across all pages in real time.
*   **Empty Search States:** Polished custom empty search illustration with one-click clear button.

### 🃏 Product Cards
*   **Hover Lift Effects:** Smooth `translate-y-[-6px]` translation with expanding soft shadow on card hover.
*   **Dynamic Badges:** Auto-calculating discount badges, rating scores, and product label badges (e.g., *Bestseller*, *New*, *Popular*).
*   **Add to Cart Button:** Interactive buttons featuring custom scale physics and color shifts upon selection.

### 📄 Product Details Page (`/product/:id`)
*   **Artisan Image Gallery:** Interactive multi-image gallery with border-aligned thumbnail selectors and smooth active item focus.
*   **Flexible Breadcrumbs:** Category-aware breadcrumb trails for fast navigation.
*   **Stock Status Tracking:** Real-time indicator for In Stock, Low Stock, or Out of Stock conditions.
*   **Quantity Counter:** Interactive counters with caps matching available product stock.
*   **Dynamic Pricing:** Live preview displaying computed cart subtotal (price × quantity) before adding to cart.
*   **Trust Indicators:** Muted trust badges for Sustainability, Handcrafted quality, and Easy Returns.
*   **Related Products Grid:** Contextually filtered recommendations based on current category.

### 🛒 Cart & Checkout Page (`/cart`)
*   **Order Summary Card:** Sticky, glassmorphic summary showing subtotal, tax (8%), shipping costs, and grand totals.
*   **Free Shipping Goal Tracker:** A visual alert showing how much more to add to unlock free shipping (threshold: ₹1,000).
*   **Item Management:** Dynamic quantity adjustments and item-removal alerts.
*   **Secure Checkout & Sign-in Flow:** Built-in modal-based sign-in and sign-up flows that integrate smoothly with the checkout process.

### 🧠 Core Architecture
*   **State Management (Context API):** Global cart and auth context wrappers providing unified state manipulation.
*   **Persisted Storage:** Both cart data and the user's light/dark mode preference persist via `localStorage` (survives page reloads).
*   **Toast System:** Interactive float-in toast alert overlay for user action confirmations (e.g., adding/removing items).

---

## 🛠️ Technology Stack

*   **Framework:** React 18 (Hooks, Context, Web Storage)
*   **Bundler/Build Tool:** Vite (Ultra-fast HMR)
*   **Styling:** Tailwind CSS v3 & Custom Vanilla CSS Variables
*   **Typography:** Google Fonts (Playfair Display, DM Sans)
*   **Routing:** React Router DOM (Single Page Application routing)

---

## 🚀 Local Setup & Development

To run the project locally, follow these simple steps:

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/ayushtripathi8846-eng/CODEVEDX_Task3_-E-Commerce_Product-Page.git
    cd CODEVEDX_Task3_-E-Commerce_Product-Page
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Start Dev Server:**
    ```bash
    npm run dev
    ```

4.  **Build Production Bundle:**
    ```bash
    npm run build
    ```

---

## 📁 Component Directory

```
src/
├── components/
│   ├── AuthModal.jsx        ← Sign-in/Sign-up logic & animation modal
│   ├── Navbar.jsx           ← Navigation, Logo, Search, Cart count, User menu
│   ├── ProductCard.jsx      ← Grid product card with custom hover scaling
│   ├── ThemeToggle.jsx      ← Premium animated sun/moon toggle switch
│   └── Toast.jsx            ← Interactive slide-up notification system
├── context/
│   ├── AuthContext.jsx      ← Auth state provider
│   ├── CartContext.jsx      ← Cart operations & calculations
│   └── ThemeContext.jsx     ← Synchronous light/dark theme toggle context
├── data/
│   └── products.js          ← Curated dataset of products and metadata
├── pages/
│   ├── Cart.jsx             ← Cart list, Order Summary, checkout trigger
│   ├── Home.jsx             ← Product grid listing, search labels, sorting
│   └── ProductDetail.jsx    ← Multi-image gallery, reviews, quantity controls
├── App.jsx                  ← Layout routes definitions
├── index.css                ← Tailored design system tokens & animations
└── main.jsx                 ← React entrypoint
```

---

## 🔮 Roadmap & Next Steps

1.  **Backend Integration:** Connect to a Supabase or Node.js backend for user database persistence.
2.  **Payment Processing:** Integrate Razorpay or Stripe sandboxes for realistic payment checkout.
3.  **Advanced Filtering:** Multi-select checklist panel for category, price, and customer ratings filters.
