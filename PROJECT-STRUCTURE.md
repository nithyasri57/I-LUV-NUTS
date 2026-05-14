# 📁 I LUV NUTS - Complete Project Structure

## Current Folder Organization

```
nuts-main/
│
├── 📂 backend/                          # Backend Server (Node.js + Express)
│   ├── node_modules/                    # Backend dependencies (installed)
│   ├── server.js                        # Main server file with all APIs
│   ├── package.json                     # Backend dependencies list
│   ├── package-lock.json               # Locked versions
│   └── .env                            # Environment variables (PORT=5000)
│
├── 📂 frontend/                         # Frontend Application (React)
│   ├── node_modules/                    # Frontend dependencies (installed)
│   ├── public/
│   │   └── index.html                  # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Cart.js                 # Shopping cart sidebar component
│   │   │   └── Checkout.js             # Checkout & payment component
│   │   ├── App.js                      # Main app with all sections
│   │   ├── App.css                     # Complete styling
│   │   ├── index.js                    # React entry point
│   │   └── index.css                   # Global styles
│   ├── package.json                    # Frontend dependencies list
│   └── package-lock.json              # Locked versions
│
├── 📷 Product Images (in root folder)
│   ├── almonds-nut-with-leaves-in-glass-cup-on-wood-background-photo.jpg
│   ├── Copy_20of_20Untitled_9_c2d76d7f-b5bf-4552-a279-ebc857260eab.png
│   ├── 65f79c6c50221.jpg
│   ├── walnut-sha6_1200x.jpg
│   ├── makhana-1296x728-header.jpg
│   ├── Image-brazil-nut-97-1717420815-1 - Copy.png
│   ├── blackraisins-500x500.webp
│   ├── IMG-20251030-WA0077.jpg
│   ├── Fig-Athipalam-250g-300x300-1.jpg
│   ├── GettyImages-516816754-d3066527a1284216a16125d9fce2e1d0.jpg
│   ├── groundnut.jpeg
│   ├── hazelnuts-779304208.jpg
│   └── I luv nuts shop image.jpg       # About section image
│
├── 📄 Documentation Files
│   ├── START-HERE.md                   # Quick start guide
│   ├── PROJECT-STRUCTURE.md            # This file
│   ├── README.md                       # Project overview
│   ├── main.html                       # Original HTML design (reference)
│   └── cart.css                        # Original cart CSS (reference)
│
└── 🖼️ Other Assets
    ├── new bg.jpg                      # Background image
    └── new logo.jpg                    # Logo image
```

## ✅ What's Working

### Backend (Port 5000)
- ✅ Express server running
- ✅ CORS enabled for frontend communication
- ✅ Static file serving for product images
- ✅ All API endpoints functional
- ✅ In-memory cart and order storage

### Frontend (Port 3000)
- ✅ React app with all sections
- ✅ Hero section with CTA buttons
- ✅ Products grid with 12 products
- ✅ About Us section
- ✅ Contact form
- ✅ Shopping cart sidebar
- ✅ Checkout process
- ✅ Payment options
- ✅ Responsive design

### Image Serving
- ✅ Backend serves images from root folder
- ✅ Frontend accesses images via backend URL
- ✅ All product images mapped correctly

## 🚀 How to Run

### Terminal 1 - Start Backend
```bash
cd nuts-main/backend
npm start
```
Output: `✅ Server running on port 5000`

### Terminal 2 - Start Frontend
```bash
cd nuts-main/frontend
npm start
```
Output: Opens browser at `http://localhost:3000`

## 📊 Data Flow

```
User Action → Frontend (React)
              ↓
         HTTP Request
              ↓
    Backend API (Express) → Process → Response
              ↓
         Update State
              ↓
    Re-render UI (React)
```

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart/add` | Add item to cart |
| PUT | `/api/cart/update/:id` | Update quantity |
| DELETE | `/api/cart/remove/:id` | Remove item |
| DELETE | `/api/cart/clear` | Clear cart |
| POST | `/api/orders/create` | Create order |
| POST | `/api/payment/process` | Process payment |
| GET | `/api/orders/:id` | Get order details |
| GET | `/api/orders` | Get all orders |

## 📦 Installed Packages

### Backend Dependencies
- express - Web framework
- cors - Cross-origin resource sharing
- dotenv - Environment variables
- stripe - Payment processing (optional)

### Frontend Dependencies
- react - UI library
- react-dom - React DOM rendering
- react-scripts - Build tools
- axios - HTTP client

## 🎨 Key Features

1. **Hero Section** - Eye-catching landing with CTA
2. **Product Catalog** - 12 products with images
3. **Shopping Cart** - Real-time cart management
4. **Checkout** - Multi-step checkout process
5. **Payment** - COD, UPI, Card options
6. **About** - Company information
7. **Contact** - Contact form
8. **Responsive** - Mobile-friendly design

## 📝 Important Notes

1. **Images Location**: All product images are in the root `nuts-main/` folder
2. **Backend serves images**: The backend serves static files from parent directory
3. **Cart Storage**: Currently in-memory (resets on server restart)
4. **No Database**: Using arrays for storage (add MongoDB/PostgreSQL for production)
5. **Development Mode**: Both servers run in development mode

## 🔧 Configuration Files

### Backend `.env`
```
PORT=5000
STRIPE_SECRET_KEY=your_key_here
```

### Frontend `package.json`
- Proxy not needed (using full URL in axios)
- Scripts: start, build, test, eject

## 🎯 Next Steps for Production

1. ✅ Add database (MongoDB/PostgreSQL)
2. ✅ Implement user authentication
3. ✅ Integrate payment gateway
4. ✅ Add email notifications
5. ✅ Deploy backend (Heroku/Railway/Render)
6. ✅ Deploy frontend (Vercel/Netlify)
7. ✅ Set up CI/CD pipeline
8. ✅ Add admin dashboard

## 🐛 Troubleshooting

**Images not showing?**
- Check backend is running
- Verify image filenames in `backend/server.js`
- Ensure images are in root `nuts-main/` folder

**Cart not working?**
- Check browser console for errors
- Verify backend is running on port 5000
- Check API_URL in `frontend/src/App.js`

**Port conflicts?**
- Backend: Change PORT in `.env`
- Frontend: Will prompt for different port

## 📞 Support

Check the browser console (F12) and backend terminal for error messages.

---

**Project Status**: ✅ Fully Functional
**Last Updated**: 2025
**Version**: 1.0.0
