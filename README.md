
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=250&color=e8633a&text=LUXE&fontSize=70&fontColor=ffffff&animation=fadeIn"/>

<img src="https://readme-typing-svg.demolab.com?font=Playfair+Display&weight=700&size=30&pause=1000&color=E8633A&center=true&vCenter=true&width=1000&lines=Premium+Modern+E-Commerce+Experience;Luxury+Shopping+Built+with+React+%26+TailwindCSS;Elegant+UI+%7C+Micro+Animations+%7C+Dual+Theme;Fast+Responsive+and+Production+Ready"/>

<br/>

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-LUXE-E8633A?style=for-the-badge)](https://e-commerce-web-luke.netlify.app/)

![Version](https://img.shields.io/badge/Version-v1.0.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Stable-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3-38BDF8?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)

</div>

---

# 🛍️ Overview

**LUXE** is a premium modern E-Commerce platform crafted with **React**, **Tailwind CSS**, and **Vite**.

Built with a luxury-inspired design system, immersive animations, glassmorphism components, dual-theme support, intelligent product discovery, and a seamless shopping experience.

<img width="1355" height="626" alt="image" src="https://github.com/user-attachments/assets/31b82e0a-a098-4bf2-a5ef-1f1a46f227b8" />


### 🔗 Live Demo

https://e-commerce-web-luke.netlify.app/

---

# ✨ Key Highlights

- 🎨 Premium Luxury UI
- 🌗 Dynamic Light & Dark Themes
- ⚡ Vite Powered Performance
- 🔍 Smart Product Search
- 🏷️ Advanced Product Filtering
- 📱 Fully Responsive Design
- 🛒 Interactive Cart System
- 🔐 Authentication Modals
- 💾 Persistent Storage
- 🔔 Toast Notification System
- 🎭 Glassmorphism Components
- 🚀 Production Ready Architecture

---

# 🎨 Theme System

### ☀️ Light Mode

- Elegant luxury-inspired interface
- Soft neutral backgrounds
- Premium typography
- High readability
<img width="1362" height="632" alt="image" src="https://github.com/user-attachments/assets/ef11e417-da1a-4ea0-a663-0452417bcc09" />


### 🌙 Dark Mode

- Deep contrast visuals
- Enhanced focus on products
- Smooth animated transitions
- Persistent theme preferences
<img width="1355" height="626" alt="image" src="https://github.com/user-attachments/assets/21d881cf-279b-4f62-bc15-a88405ce44ff" />


### Theme Features

- Animated Sun / Moon Toggle
- 0.4s Smooth Theme Transition
- localStorage Persistence
- Dynamic Color Variables

---

# 📄 Pages Overview

| Page | Description |
|--------|------------|
| 🏠 Home | Product discovery, search, filters & sorting |
| 📦 Product Details | Gallery, stock status, quantity controls |
| 🛒 Cart | Shopping cart & checkout summary |
| 🔐 Auth Modal | Login & Signup experience |

---

# ✨ Features & Micro Interactions

## 🎨 Visual Experience

- Glassmorphism Navbar
- Floating Background Animations
- Animated Theme Toggle
- Smooth Hover Effects
- Dynamic Product Badges
- Animated Page Transitions

## 🔍 Product Discovery

- Real-Time Search
- Category Filters
- Smart Sorting
- Featured Collections
- Empty Search States

## 📦 Product Experience

- Product Gallery
- Dynamic Pricing
- Stock Tracking
- Quantity Controls
- Related Products

## 🛒 Shopping Experience

- Cart Management
- Shipping Calculator
- Order Summary
- Checkout Workflow
- Authentication Integration

---

# 🛠️ Technology Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=react,vite,tailwind,js,html,css,git,github,netlify" />

</div>

| Category | Technology |
|-----------|-----------|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router DOM |
| State Management | Context API |
| Storage | localStorage |
| Deployment | Netlify |

---

# 🏗️ System Architecture

```mermaid
flowchart TD

User[User]

User --> ReactApp

ReactApp[React Frontend]

ReactApp --> ThemeContext
ReactApp --> CartContext
ReactApp --> AuthContext

ThemeContext --> LocalStorage
CartContext --> ProductState
AuthContext --> Authentication

ReactApp --> Router

Router --> Home
Router --> ProductDetails
Router --> Cart

Home --> Search
Home --> Filter
Home --> Sort

ProductDetails --> Gallery
ProductDetails --> Quantity

Cart --> Checkout
```

---

# 🔄 Application Workflow

```mermaid
flowchart TD

A[User Visits Website]

A --> B[Home Page]

B --> C[Search Products]
B --> D[Filter Products]
B --> E[Sort Products]

C --> F[View Product]
D --> F
E --> F

F --> G[Product Details]

G --> H[Select Quantity]

H --> I[Add To Cart]

I --> J[Cart Page]

J --> K[Checkout]

K --> L[Authentication]

L --> M[Order Confirmation]
```

---

# 📁 Project Structure

```bash
src/
├── components/
│   ├── AuthModal.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ThemeToggle.jsx
│   └── Toast.jsx
│
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── ThemeContext.jsx
│
├── data/
│   └── products.js
│
├── pages/
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   └── Cart.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/ayushtripathi8846-eng/CODEVEDX_Task3_-E-Commerce_Product-Page.git
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

---

# 📊 Project Statistics

### Core Features

✅ Light / Dark Theme

✅ Authentication System

✅ Product Search

✅ Category Filtering

✅ Cart Management

✅ Product Recommendations

✅ Responsive Layout

✅ Persistent Storage

---

# 🔮 Future Enhancements

### Phase 2

- 🔐 JWT Authentication
- ❤️ Wishlist System
- ⭐ Product Reviews
- 📦 Order History
- 💳 Razorpay Integration

### Phase 3

- 🤖 AI Product Recommendations
- 📊 Admin Dashboard
- 📈 Analytics Panel
- 🌎 Multi-Language Support
- 📱 Progressive Web App

---

# 🌐 Deployment

| Service | Status |
|----------|---------|
| Netlify | ✅ Live |
| Vercel | ⚡ Compatible |
| GitHub Pages | ⚡ Compatible |

---

# 👨‍💻 Developer

<div align="center">

## Ayush Tripathi

### Full Stack Developer

<a href="https://github.com/ayushtripathi-45">
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github"/>
</a>

<a href="https://linkedin.com">
<img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin"/>
</a>

<a href="mailto:yourmail@gmail.com">
<img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail"/>
</a>

<br/><br/>

<img src="https://github-readme-stats.vercel.app/api?username=ayushtripathi-45&show_icons=true&theme=transparent"/>

</div>

---

<div align="center">

### ⭐ If you like this project, give it a Star

<img src="https://capsule-render.vercel.app/api?type=waving&height=120&color=e8633a&section=footer"/>

</div>

