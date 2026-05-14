# 🚀 Complete Guide - I LUV NUTS E-Commerce Store

## ✅ Installation Complete!

Your full-stack e-commerce application is ready with all features integrated!

## 📦 What's Included

### Backend (Node.js + Express)
- RESTful API for products, cart, orders, and payments
- Located in: `backend/`
- Port: 5000

### Frontend (React with Full Design)
- Hero section with call-to-action
- Products showcase with add to cart
- About Us section
- Contact form
- Shopping cart sidebar
- Checkout process with payment options
- Located in: `frontend/`
- Port: 3000

## 🏃 How to Run

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd backend
npm start
```

You should see: `Server running on port 5000`

### Step 2: Start the Frontend (in a new terminal)

Open another terminal and run:

```bash
cd frontend
npm start
```

The app will automatically open in your browser at `http://localhost:3000`

## 🎯 Complete Features

### Frontend Pages
✅ Hero Section - "100% Natural & Organic" with Shop Now button
✅ Products Section - Grid of all products with add to cart
✅ About Us Section - Company story with features
✅ Contact Section - Contact form and business information
✅ Smooth scrolling navigation
✅ Fully responsive design

### E-Commerce Features
✅ Add to cart from product cards
✅ Quick add button on hover
✅ Cart sidebar with item management
✅ Update quantities (+/-)
✅ Remove items from cart
✅ Clear entire cart
✅ Real-time cart total calculation
✅ Cart badge showing item count
✅ Toast notifications for actions

### Checkout & Payment
✅ Customer information form (name, email, phone, address)
✅ Multiple payment methods:
  - Cash on Delivery (COD)
  - UPI / Google Pay
  - Debit / Credit Card
✅ Order summary with totals
✅ Order confirmation page
✅ Order ID generation

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products

### Cart Management
- `GET /api/cart` - Get cart items
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:id` - Update quantity
- `DELETE /api/cart/remove/:id` - Remove item
- `DELETE /api/cart/clear` - Clear cart

### Orders & Payment
- `POST /api/orders/create` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders
- `POST /api/payment/process` - Process payment

## 📁 Project Structure

```
nuts-main/
├── backend/
│   ├── server.js          # Express server with all APIs
│   ├── package.json
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js        # Main app with all sections
│   │   ├── App.css       # Complete styling
│   │   ├── index.js
│   │   ├── index.css
│   │   └── components/
│   │       ├── Cart.js   # Shopping cart sidebar
│   │       └── Checkout.js # Checkout process
│   ├── public/
│   │   └── index.html
│   └── package.json
└── Product images (in root folder)
```

## 🎨 Customization

### Add More Products
Edit `backend/server.js` and add to the products array:
```javascript
{
  id: 'product-id',
  name: 'Product Name',
  price: 500,
  image: 'image-filename.jpg'
}
```

### Update Styles
- Main styles: `frontend/src/App.css`
- Colors are defined with CSS variables
- Responsive breakpoints at 900px

### Change Contact Info
Edit the Contact section in `frontend/src/App.js`

## 📝 Important Notes

- Backend must be running before starting frontend
- Both servers must run simultaneously
- Cart data is stored in memory (resets on server restart)
- Product images should be in the root `nuts-main/` folder
- For production, add a database (MongoDB/PostgreSQL)

## 🐛 Troubleshooting

**Port already in use?**
- Backend: Change PORT in `backend/.env`
- Frontend: Will prompt you to use a different port

**Images not showing?**
- Make sure image files are in the root folder
- Check image filenames match in `backend/server.js`

**CORS errors?**
- Ensure backend is running on port 5000
- Check API_URL in `frontend/src/App.js`

**Cart not updating?**
- Check browser console for errors
- Verify backend is running and accessible

## 🚀 Next Steps for Production

1. Add database (MongoDB/PostgreSQL)
2. Implement user authentication
3. Add payment gateway (Razorpay/Stripe)
4. Set up email notifications
5. Add order tracking
6. Implement admin dashboard
7. Deploy backend (Heroku/Railway)
8. Deploy frontend (Vercel/Netlify)

## 📞 Support

For issues or questions, check the browser console and backend terminal for error messages.

Enjoy your complete e-commerce store! 🥜🛒
