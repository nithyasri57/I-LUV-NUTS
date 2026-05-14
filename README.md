# 🥜 I LUV NUTS — Premium Nuts & Dry Fruits Store

A full-stack e-commerce web application for a premium nuts and dry fruits store. Built with React.js frontend and Node.js/Express backend, featuring a complete shopping cart, checkout flow, and beautiful 3D UI effects.

![I LUV NUTS](./backend/new%20logo.jpg)

---

## 🌟 Features

- 🛍️ Product catalog with 12+ nuts & dry fruits
- 🛒 Full cart system — add, update quantity, remove items
- 📦 Checkout flow with delivery information collection
- 💳 Payment method selection (Cash on Delivery, UPI, Card)
- ✅ Order placement and confirmation
- 🎨 3D card tilt effects and smooth CSS animations
- 📱 Fully responsive design
- 🖼️ Real product images served from backend

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, Axios, CSS3 |
| Backend | Node.js, Express.js |
| Styling | Custom CSS with 3D transforms & animations |
| Fonts | Google Fonts — Poppins, Playfair Display |

---

## 📁 Project Structure

```
nuts-main/
├── backend/
│   ├── server.js              # Express REST API
│   ├── package.json
│   ├── .env                   # Environment variables
│   └── *.jpg / *.png / *.webp # Product images
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js             # Main React component
│       ├── App.css            # All styles + 3D effects
│       ├── index.js
│       └── components/
│           ├── Cart.js        # Cart sidebar component
│           └── Checkout.js    # Checkout flow component
│
├── main.html                  # Standalone HTML version
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or above)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/nithyasri57/I-LUV-NUTS.git
cd I-LUV-NUTS
```

### 2. Start the Backend

```bash
cd backend
npm install
node server.js
```

Backend runs on **http://localhost:5000**

### 3. Start the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on **http://localhost:3000**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/update/:id` | Update item quantity |
| DELETE | `/api/cart/remove/:id` | Remove item from cart |
| DELETE | `/api/cart/clear` | Clear entire cart |
| POST | `/api/orders/create` | Create a new order |
| POST | `/api/payment/process` | Process payment |
| GET | `/api/orders/:id` | Get order by ID |

---

## 🎨 UI Highlights

- **3D Card Tilt** — Product cards respond to mouse movement with real-time perspective rotation
- **Glassmorphism Navbar** — Frosted glass effect with backdrop blur
- **Layered Shadows** — Buttons and cards use multi-layer box shadows for depth
- **Smooth Animations** — fadeInUp, slideIn, pop animations throughout
- **Warm Color Palette** — Browns and ambers inspired by natural nuts

---

## 📸 Pages

- **Home** — Hero section with call-to-action
- **Products** — Grid of all products with 3D hover effects
- **About** — Store story with feature highlights
- **Contact** — Contact form and store information
- **Cart** — Slide-in sidebar cart
- **Checkout** — Multi-step delivery + payment flow

---

## 👩‍💻 Author

**Nithyasri** — [@nithyasri57](https://github.com/nithyasri57)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
