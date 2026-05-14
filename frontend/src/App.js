import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

const API_URL = 'http://localhost:5000/api';

// 3D tilt hook for product cards
function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotY = ((x - cx) / cx) * 8;
      const rotX = -((y - cy) / cy) * 6;
      el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-10px) scale(1.02)`;
    };
    const handleLeave = () => {
      el.style.transform = '';
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [ref]);
}

function ProductCard({ product, onAddToCart }) {
  const ref = useRef(null);
  useTilt(ref);
  return (
    <div ref={ref} className="product" style={{ transition: 'transform 0.15s ease, box-shadow 0.15s ease' }}>
      <div className="product-image">
        <img src={`${API_URL.replace('/api', '')}/${product.image}`} alt={product.name} />
        <button className="quick-add" onClick={() => onAddToCart(product.id)}>+</button>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>Premium quality, fresh and nutritious</p>
        <div className="product-footer">
          <div className="price">₹{product.price}<span>/kg</span></div>
          <button className="add-to-cart-btn" onClick={() => onAddToCart(product.id)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`);
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(`${API_URL}/cart/add`, { productId, quantity: 1 });
      setCart(response.data.cart);
      showToast('Item added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      showToast('Failed to add item');
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await axios.put(`${API_URL}/cart/update/${itemId}`, { quantity });
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.delete(`${API_URL}/cart/remove/${itemId}`);
      setCart(response.data.cart);
      showToast('Item removed');
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${API_URL}/cart/clear`);
      setCart([]);
      showToast('Cart cleared');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    showToast('Message sent successfully!');
    e.target.reset();
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (showCheckout) {
    // Scroll to top when checkout opens
    window.scrollTo(0, 0);
    return (
      <div className="App checkout-page">
        <header id="header">
          <h1>I LUV <span>NUTS</span></h1>
          <nav>
            <ul>
              <li><button className="cart-nav-btn" onClick={() => setShowCart(true)}>
                🛒 Cart
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button></li>
            </ul>
          </nav>
        </header>

        {toast.show && <div className="toast show">✓ {toast.message}</div>}

        <div className="checkout-page-body">
          <Checkout 
            cart={cart} 
            total={cartTotal}
            onBack={() => setShowCheckout(false)}
            onSuccess={() => {
              setCart([]);
              setShowCheckout(false);
              showToast('Order placed successfully!');
            }}
          />
        </div>

        <Cart
          isOpen={showCart}
          cart={cart}
          total={cartTotal}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
          onClear={clearCart}
          onCheckout={() => {
            setShowCart(false);
            setShowCheckout(true);
          }}
        />
      </div>
    );
  }

  return (
    <div className="App">
      {/* NAVBAR */}
      <header id="header">
        <h1>I LUV <span>NUTS</span></h1>
        <nav>
          <ul>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a></li>
            <li><a href="#products" onClick={(e) => { e.preventDefault(); scrollToSection('products'); }}>Products</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a></li>
            <li>
              <button className="cart-nav-btn" onClick={() => setShowCart(true)}>
                🛒 Cart
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* TOAST NOTIFICATION */}
      {toast.show && <div className="toast show">✓ {toast.message}</div>}

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="hero-badge">🌿 100% Natural & Organic</span>
          <h2>Fresh & Premium<br /><span>Quality Nuts</span></h2>
          <p>Delight your taste buds with our healthy selection of dry fruits and nuts.<br />Sourced from trusted farmers, packed with love.</p>
          <div>
            <button className="btn" onClick={() => scrollToSection('products')}>Shop Now ↓</button>
            <button className="btn btn-outline" onClick={() => scrollToSection('about')}>Learn More</button>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="products" id="products">
        <span className="section-badge">Our Collection</span>
        <h2>Our <span>Best Sellers</span></h2>
        <p>Discover our handpicked selection of premium quality nuts and dry fruits, sourced directly from trusted farmers.</p>
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about" id="about">
        <div className="about-image">
          <img src="http://localhost:5000/I luv nuts shop image.jpg" alt="About I Luv Nuts" />
          <div className="about-badge">
            <span className="number">10+</span>
            Years of Trust
          </div>
        </div>
        <div className="about-content">
          <span className="section-badge">Our Story</span>
          <h2>About <span>Us</span></h2>
          <p>Welcome to <strong>I Luv Nuts</strong>, your one-stop destination for premium quality nuts and dry fruits. We source our products from trusted farmers, ensuring freshness and nutrition in every bite.</p>
          <p>Our goal is to promote healthy snacking while maintaining the rich taste and tradition of natural goodness. Every pack is a promise of quality, delivered straight from nature to your table.</p>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">🌿</div>
              <div>
                <h4>100% Natural</h4>
                <p>No preservatives or artificial flavors</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🛡️</div>
              <div>
                <h4>Quality Assured</h4>
                <p>Tested for freshness and purity</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🚚</div>
              <div>
                <h4>Fast Delivery</h4>
                <p>Fresh to your doorstep</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">❤️</div>
              <div>
                <h4>Made with Love</h4>
                <p>Family-owned since generations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact" id="contact">
        <span className="section-badge">Get in Touch</span>
        <h2>Contact <span>Us</span></h2>
        <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        
        <div className="contact-container">
          <div className="contact-info">
            <div className="info-card">
              <h3>Contact Information</h3>
              <div className="info-item">
                <div className="info-icon">📍</div>
                <div>
                  <h4>Visit Us</h4>
                  <p>123 Nut Street, Chennai, India</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📞</div>
                <div>
                  <h4>Call Us</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">✉️</div>
                <div>
                  <h4>Email Us</h4>
                  <p>hello@iluvnuts.com</p>
                </div>
              </div>
            </div>
            <div className="hours-card">
              <h3>Working Hours</h3>
              <div className="hours-item">
                <span>Monday - Friday</span>
                <span>9:00 AM - 8:00 PM</span>
              </div>
              <div className="hours-item">
                <span>Saturday</span>
                <span>10:00 AM - 6:00 PM</span>
              </div>
              <div className="hours-item">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <form onSubmit={handleContactSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>Your Email</label>
                  <input type="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: '25px' }}>
                <label>Your Message</label>
                <textarea placeholder="How can we help you?" required></textarea>
              </div>
              <button className="btn" type="submit">Send Message →</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">I LUV NUTS ❤️</div>
        <p>© 2025 I LUV NUTS | All Rights Reserved</p>
        <p style={{ fontSize: '12px', marginTop: '5px' }}>Premium Quality Nuts & Dry Fruits</p>
      </footer>

      {/* CART SIDEBAR */}
      <Cart
        isOpen={showCart}
        cart={cart}
        total={cartTotal}
        onClose={() => setShowCart(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={() => {
          setShowCart(false);
          setShowCheckout(true);
        }}
      />
    </div>
  );
}

export default App;
