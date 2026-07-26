// ========================================
// MAIN EXPRESS SERVER FOR JMAAS
// This is the main entry point of the application
// Enhanced with file-based persistence
// ========================================

const express = require('express');
const path = require('path');
const Storage = require('./storage');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize storage
Storage.init();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers for Vercel
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Serve static files (HTML, CSS, JS) from current directory
app.use(express.static(__dirname));

// Import dummy data
const { inventoryItems, storeInfo } = require('./data');

// ========================================
// ROUTES
// ========================================

// 1. AUTHENTICATION ROUTES

// Login route - validate credentials
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Validate input
  if (!username || !password) {
    return res.json({
      success: false,
      message: 'Username and password required'
    });
  }

  // Check credentials using storage
  const user = Storage.getUser(username);
  if (user && user.password === password) {
    // Update last login
    Storage.updateLastLogin(username);
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        fullName: user.profile.fullName,
        email: user.email
      }
    });
  } else {
    res.json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Registration route - create new user
app.post('/api/register', (req, res) => {
  const { username, password, confirmPassword, email, fullName } = req.body;
  
  // Validation
  if (!username || !password || !email || !fullName) {
    return res.json({
      success: false,
      message: 'All fields are required'
    });
  }

  if (username.length < 3) {
    return res.json({
      success: false,
      message: 'Username must be at least 3 characters'
    });
  }

  if (password.length < 6) {
    return res.json({
      success: false,
      message: 'Password must be at least 6 characters'
    });
  }

  if (password !== confirmPassword) {
    return res.json({
      success: false,
      message: 'Passwords do not match'
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.json({
      success: false,
      message: 'Invalid email format'
    });
  }

  // Register user
  const result = Storage.registerUser(username, password, email, fullName);
  res.json(result);
});

// 2. INVENTORY ROUTES
app.get('/api/inventory', (req, res) => {
  // Return all inventory items
  res.json({
    success: true,
    data: inventoryItems,
    totalItems: inventoryItems.length
  });
});

app.get('/api/inventory/category/:category', (req, res) => {
  // Filter items by category
  const category = req.params.category;
  const filtered = inventoryItems.filter(item => 
    item.category.toLowerCase() === category.toLowerCase()
  );
  
  res.json({
    success: true,
    data: filtered,
    category: category
  });
});

// 3. GREETING GENERATOR ROUTE
app.post('/api/greeting', (req, res) => {
  const { customerName, occasion } = req.body;
  
  // Array of greeting templates
  const greetings = [
    `Welcome ${customerName}! 🎉 Celebrate your ${occasion} with our stunning collection of jewellery. Special discount of 10% available today!`,
    `Hi ${customerName}! 💎 We have the perfect piece for your ${occasion}. Visit us to explore our exclusive designs.`,
    `Dear ${customerName}! 👑 Make your ${occasion} memorable with our exquisite jewellery collection. Limited time offer - save 15%!`,
    `${customerName}, we're thrilled to enhance your ${occasion} celebrations! Come browse our premium jewellery and enjoy special rates.`,
    `Special greeting for ${customerName}! ✨ Your ${occasion} deserves something special. Check out our new collection with exclusive offers!`
  ];
  
  // Pick a random greeting
  const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
  
  res.json({
    success: true,
    greeting: randomGreeting,
    customer: customerName,
    occasion: occasion
  });
});

// 4. CUSTOMERS ROUTES
app.get('/api/customers', (req, res) => {
  const customers = Storage.getCustomers();
  res.json({
    success: true,
    data: customers,
    totalCustomers: customers.length
  });
});

app.post('/api/customers', (req, res) => {
  const { name, email, phone } = req.body;
  
  // Validation
  if (!name || !email || !phone) {
    return res.json({
      success: false,
      message: 'All customer fields are required'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.json({
      success: false,
      message: 'Invalid email format'
    });
  }

  const newCustomer = Storage.addCustomer(name, email, phone);
  res.json({
    success: true,
    message: 'Customer added successfully',
    data: newCustomer
  });
});

app.delete('/api/customers/:id', (req, res) => {
  const id = parseInt(req.params.id);
  Storage.deleteCustomer(id);
  res.json({
    success: true,
    message: 'Customer deleted successfully'
  });
});

// 5. STORE INFO ROUTE
app.get('/api/store-info', (req, res) => {
  res.json({
    success: true,
    data: storeInfo
  });
});

// 6. STATISTICS ROUTE
app.get('/api/stats', (req, res) => {
  // Calculate basic statistics
  const totalInventoryValue = inventoryItems.reduce((sum, item) => 
    sum + (item.price * item.stock), 0
  );
  
  const totalStock = inventoryItems.reduce((sum, item) => 
    sum + item.stock, 0
  );

  const customers = Storage.getCustomers();
  
  res.json({
    success: true,
    stats: {
      totalInventoryValue: totalInventoryValue,
      totalStock: totalStock,
      totalItems: inventoryItems.length,
      totalCustomers: customers.length,
      categories: [...new Set(inventoryItems.map(item => item.category))]
    }
  });
});

// 7. TRANSACTION ROUTES
app.get('/api/transactions', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  const transactions = Storage.getTransactions(limit);
  res.json({
    success: true,
    data: transactions,
    totalTransactions: transactions.length
  });
});

app.post('/api/transactions', (req, res) => {
  const { customerId, items, subtotal, gst, total } = req.body;
  
  if (!customerId || !items || !total) {
    return res.json({
      success: false,
      message: 'Missing required transaction data'
    });
  }

  const transaction = Storage.addTransaction(customerId, items, total, gst);
  
  // Update customer's spent amount
  if (customerId > 0) {
    Storage.updateCustomerSpent(customerId, total);
  }

  res.json({
    success: true,
    message: 'Transaction recorded successfully',
    data: transaction
  });
});

// 8. RATING ROUTES
app.post('/api/ratings', (req, res) => {
  const { productId, productName, rating, comment, customerId } = req.body;
  
  if (!productId || !productName || !rating) {
    return res.json({
      success: false,
      message: 'Product ID, name, and rating are required'
    });
  }

  if (rating < 1 || rating > 5) {
    return res.json({
      success: false,
      message: 'Rating must be between 1 and 5'
    });
  }

  const newRating = Storage.addRating(productId, productName, rating, comment, customerId || null);
  res.json({
    success: true,
    message: 'Rating added successfully',
    data: newRating
  });
});

app.get('/api/ratings/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  const ratings = Storage.getRatings(productId);
  const avgRating = Storage.getAverageRating(productId);
  
  res.json({
    success: true,
    data: ratings,
    averageRating: avgRating,
    totalRatings: ratings.length
  });
});

app.get('/api/ratings', (req, res) => {
  const ratings = Storage.getRatings();
  res.json({
    success: true,
    data: ratings,
    totalRatings: ratings.length
  });
});

// 7. ROOT ROUTE - Serve login page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server (only in non-Vercel environment)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`
  ╔════════════════════════════════════════╗
  ║   JMaaS Prototype Server Running       ║
  ║   http://localhost:${PORT}              ║
  ║   Press Ctrl+C to stop                 ║
  ╚════════════════════════════════════════╝
    `);
  });
}

// Export for Vercel
module.exports = app;
