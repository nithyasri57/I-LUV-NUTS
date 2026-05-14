# ⚡ Quick Reference Guide

## 🚀 Start Commands

### Backend
```bash
cd backend
npm start
```
**Port**: 5000

### Frontend
```bash
cd frontend
npm start
```
**Port**: 3000

---

## 📂 File Locations

| What | Where |
|------|-------|
| Backend API | `backend/server.js` |
| Frontend App | `frontend/src/App.js` |
| Styles | `frontend/src/App.css` |
| Cart Component | `frontend/src/components/Cart.js` |
| Checkout | `frontend/src/components/Checkout.js` |
| Product Images | Root folder (`nuts-main/`) |
| Environment | `backend/.env` |

---

## 🔗 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| Products API | http://localhost:5000/api/products |
| Cart API | http://localhost:5000/api/cart |

---

## 📦 Products List

1. Almonds - ₹450
2. Cashews - ₹600
3. Pistachios - ₹700
4. Walnuts - ₹850
5. Fox Nuts - ₹900
6. Brazil Nuts - ₹250
7. Raisins - ₹300
8. Mixed Dry Fruits - ₹950
9. Figs - ₹550
10. Dates - ₹300
11. Ground Nuts - ₹700
12. Hazel Nuts - ₹700

---

## 🎯 Key Features

✅ Hero section with CTA
✅ Product grid (12 items)
✅ Add to cart
✅ Cart sidebar
✅ Quantity management
✅ Checkout form
✅ Payment options (COD/UPI/Card)
✅ Order confirmation
✅ About section
✅ Contact form
✅ Responsive design

---

## 🔧 Common Tasks

### Add New Product
Edit `backend/server.js`:
```javascript
{ 
  id: 'newproduct', 
  name: 'New Product', 
  price: 500, 
  image: 'image.jpg' 
}
```

### Change Colors
Edit `frontend/src/App.css`:
- Primary: `#d68b30`
- Secondary: `#654321`
- Background: `#f5e6d3`

### Update Contact Info
Edit `frontend/src/App.js` - Contact section

---

## 🐛 Quick Fixes

**Images not showing?**
→ Check images are in root `nuts-main/` folder

**Port 5000 in use?**
→ Change PORT in `backend/.env`

**Cart not working?**
→ Check backend is running
→ Open browser console (F12)

**CORS error?**
→ Verify backend URL in `frontend/src/App.js`

---

## 📱 Test Checklist

- [ ] Backend starts without errors
- [ ] Frontend opens in browser
- [ ] All 12 products display
- [ ] Images load correctly
- [ ] Add to cart works
- [ ] Cart badge updates
- [ ] Cart sidebar opens
- [ ] Quantity +/- works
- [ ] Remove item works
- [ ] Clear cart works
- [ ] Checkout opens
- [ ] Form validation works
- [ ] Payment selection works
- [ ] Order confirmation shows
- [ ] Contact form submits
- [ ] Smooth scrolling works
- [ ] Mobile responsive

---

## 📊 API Quick Reference

```javascript
// Get products
GET /api/products

// Add to cart
POST /api/cart/add
Body: { productId: 'almonds', quantity: 1 }

// Update quantity
PUT /api/cart/update/:id
Body: { quantity: 2 }

// Remove item
DELETE /api/cart/remove/:id

// Create order
POST /api/orders/create
Body: { items, total, paymentMethod, customerInfo }
```

---

## 🎨 Component Structure

```
App.js
├── Header (Navigation + Cart Button)
├── Hero Section
├── Products Section
│   └── Product Cards (map)
├── About Section
├── Contact Section
├── Footer
├── Cart Component (Sidebar)
└── Checkout Component (Modal)
```

---

## 💾 Data Flow

```
User clicks "Add to Cart"
    ↓
Frontend sends POST to /api/cart/add
    ↓
Backend adds item to cartItems array
    ↓
Backend returns updated cart
    ↓
Frontend updates state
    ↓
UI re-renders with new cart count
```

---

## 🔐 Environment Variables

```env
# backend/.env
PORT=5000
STRIPE_SECRET_KEY=sk_test_...
```

---

## 📞 Support Contacts

- Email: hello@iluvnuts.com
- Phone: +91 98765 43210
- Address: 123 Nut Street, Chennai, India

---

## 📚 Documentation Files

1. **START-HERE.md** - Quick start guide
2. **README.md** - Project overview
3. **PROJECT-STRUCTURE.md** - Detailed structure
4. **QUICK-REFERENCE.md** - This file

---

**Last Updated**: 2025
**Version**: 1.0.0
**Status**: ✅ Production Ready
