const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files (images) from parent directory
app.use(express.static(path.join(__dirname, '..')));

// In-memory storage (use database in production)
let orders = [];
let cartItems = [];

// Products data with correct image paths
const products = [
  { id: 'almonds', name: 'Almonds', price: 450, image: 'almonds-nut-with-leaves-in-glass-cup-on-wood-background-photo.jpg' },
  { id: 'cashews', name: 'Cashews', price: 600, image: 'Copy_20of_20Untitled_9_c2d76d7f-b5bf-4552-a279-ebc857260eab.png' },
  { id: 'pistachios', name: 'Pistachios', price: 700, image: '65f79c6c50221.jpg' },
  { id: 'walnuts', name: 'Walnuts', price: 850, image: 'walnut-sha6_1200x.jpg' },
  { id: 'foxnuts', name: 'Fox Nuts', price: 900, image: 'makhana-1296x728-header.jpg' },
  { id: 'brazilnuts', name: 'Brazil Nuts', price: 250, image: 'Image-brazil-nut-97-1717420815-1 - Copy.png' },
  { id: 'raisins', name: 'Raisins', price: 300, image: 'blackraisins-500x500.webp' },
  { id: 'mixed', name: 'Mixed Dry Fruits', price: 950, image: 'IMG-20251030-WA0077.jpg' },
  { id: 'figs', name: 'Figs', price: 550, image: 'Fig-Athipalam-250g-300x300-1.jpg' },
  { id: 'dates', name: 'Dates', price: 300, image: 'GettyImages-516816754-d3066527a1284216a16125d9fce2e1d0.jpg' },
  { id: 'groundnuts', name: 'Ground Nuts', price: 700, image: 'groundnut.jpeg' },
  { id: 'hazelnuts', name: 'Hazel Nuts', price: 700, image: 'hazelnuts-779304208.jpg' }
];

// Get all products
app.get('/api/products', (req, res) => {
  res.json({ success: true, products });
});

// Get cart items
app.get('/api/cart', (req, res) => {
  res.json({ success: true, cart: cartItems });
});

// Add to cart
app.post('/api/cart/add', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  const product = products.find(p => p.id === productId);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const existingItem = cartItems.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({
      id: Date.now().toString(),
      productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  }

  res.json({ success: true, message: 'Item added to cart', cart: cartItems });
});

// Update cart item quantity
app.put('/api/cart/update/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const item = cartItems.find(item => item.id === id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Item not found' });
  }

  if (quantity <= 0) {
    cartItems = cartItems.filter(item => item.id !== id);
  } else {
    item.quantity = quantity;
  }

  res.json({ success: true, cart: cartItems });
});

// Remove from cart
app.delete('/api/cart/remove/:id', (req, res) => {
  const { id } = req.params;
  cartItems = cartItems.filter(item => item.id !== id);
  res.json({ success: true, message: 'Item removed', cart: cartItems });
});

// Clear cart
app.delete('/api/cart/clear', (req, res) => {
  cartItems = [];
  res.json({ success: true, message: 'Cart cleared' });
});

// Create order
app.post('/api/orders/create', (req, res) => {
  const { items, total, paymentMethod, customerInfo } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  const order = {
    id: `ORD${Date.now()}`,
    items,
    total,
    paymentMethod,
    customerInfo,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  cartItems = []; // Clear cart after order

  res.json({ success: true, message: 'Order created', order });
});

// Process payment
app.post('/api/payment/process', async (req, res) => {
  const { orderId, paymentMethod, paymentDetails } = req.body;

  const order = orders.find(o => o.id === orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  // Simulate payment processing
  setTimeout(() => {
    order.status = 'confirmed';
    order.paymentStatus = 'paid';
    order.paymentMethod = paymentMethod;
  }, 1000);

  res.json({
    success: true,
    message: 'Payment processed successfully',
    order: {
      id: order.id,
      status: 'confirmed',
      paymentStatus: 'paid'
    }
  });
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  res.json({ success: true, order });
});

// Get all orders
app.get('/api/orders', (req, res) => {
  res.json({ success: true, orders });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📁 Serving images from: ${path.join(__dirname, '..')}`);
  console.log(`🌐 API available at: http://localhost:${PORT}/api`);
});
