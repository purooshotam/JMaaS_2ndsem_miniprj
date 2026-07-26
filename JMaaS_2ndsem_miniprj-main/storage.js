// ========================================
// HYBRID STORAGE SYSTEM
// Uses file-based storage locally, in-memory storage on Vercel
// ========================================

const fs = require('fs');
const path = require('path');

// Check if we're in a serverless environment
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME;

const dbDir = path.join(__dirname, '../db');

// In-memory storage (used in serverless or as fallback)
let memoryStorage = {
  users: [
    {
      id: 1,
      username: 'demo',
      password: 'demo123',
      email: 'demo@jmaas.com',
      role: 'manager',
      createdAt: new Date(),
      lastLogin: null,
      profile: {
        fullName: 'Demo Manager',
        phone: '9876543210',
        store: 'Main Store'
      }
    }
  ],
  customers: [
    {
      id: 1,
      name: 'Rajesh Kumar',
      email: 'rajesh@email.com',
      phone: '9876543210',
      joinDate: new Date('2024-01-15'),
      totalSpent: 125000,
      orderCount: 5
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@email.com',
      phone: '9876543211',
      joinDate: new Date('2024-02-20'),
      totalSpent: 95000,
      orderCount: 3
    }
  ],
  transactions: [],
  ratings: []
};

// File paths
const usersFile = path.join(dbDir, 'users.json');
const customersFile = path.join(dbDir, 'customers.json');
const transactionsFile = path.join(dbDir, 'transactions.json');
const ratingsFile = path.join(dbDir, 'ratings.json');

// Helper: Read data (file or memory)
function readData(filePath, memoryKey) {
  if (isServerless) {
    return memoryStorage[memoryKey] || [];
  }
  
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
    return memoryStorage[memoryKey] || [];
  } catch (error) {
    console.error(`Error reading ${filePath}, using memory:`, error.message);
    return memoryStorage[memoryKey] || [];
  }
}

// Helper: Save data (file or memory)
function saveData(filePath, memoryKey, data) {
  if (isServerless) {
    memoryStorage[memoryKey] = data;
    return true;
  }
  
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}, saving to memory:`, error.message);
    memoryStorage[memoryKey] = data;
    return true;
  }
}

// Initialize storage
function initializeStorage() {
  if (isServerless) {
    console.log('Running in serverless mode - using in-memory storage');
    return;
  }
  
  // Create db directory
  if (!fs.existsSync(dbDir)) {
    try {
      fs.mkdirSync(dbDir);
    } catch (err) {
      console.log('Cannot create db directory:', err.message);
    }
  }

  // Initialize files with default data
  if (!fs.existsSync(usersFile)) {
    saveData(usersFile, 'users', memoryStorage.users);
  }
  if (!fs.existsSync(customersFile)) {
    saveData(customersFile, 'customers', memoryStorage.customers);
  }
  if (!fs.existsSync(transactionsFile)) {
    saveData(transactionsFile, 'transactions', []);
  }
  if (!fs.existsSync(ratingsFile)) {
    saveData(ratingsFile, 'ratings', []);
  }
}

// Storage API
const Storage = {
  init: () => {
    initializeStorage();
  },

  // USER OPERATIONS
  getUser: (username) => {
    const users = readData(usersFile, 'users');
    return users.find(u => u.username === username);
  },

  getUserById: (id) => {
    const users = readData(usersFile, 'users');
    return users.find(u => u.id === id);
  },

  getAllUsers: () => {
    return readData(usersFile, 'users');
  },

  registerUser: (username, password, email, fullName) => {
    const users = readData(usersFile, 'users');
    
    if (users.find(u => u.username === username)) {
      return { success: false, message: 'Username already exists' };
    }
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    const newUser = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      username: username.toLowerCase(),
      password: password,
      email: email,
      role: 'user',
      createdAt: new Date(),
      lastLogin: null,
      profile: {
        fullName: fullName,
        phone: '',
        store: 'Main Store'
      }
    };

    users.push(newUser);
    saveData(usersFile, 'users', users);
    return { success: true, message: 'Registration successful' };
  },

  updateLastLogin: (username) => {
    const users = readData(usersFile, 'users');
    const user = users.find(u => u.username === username);
    if (user) {
      user.lastLogin = new Date();
      saveData(usersFile, 'users', users);
    }
  },

  // CUSTOMER OPERATIONS
  getCustomers: () => {
    return readData(customersFile, 'customers');
  },

  addCustomer: (name, email, phone) => {
    const customers = readData(customersFile, 'customers');
    const newCustomer = {
      id: Math.max(...customers.map(c => c.id), 0) + 1,
      name: name,
      email: email,
      phone: phone,
      joinDate: new Date(),
      totalSpent: 0,
      orderCount: 0
    };
    customers.push(newCustomer);
    saveData(customersFile, 'customers', customers);
    return newCustomer;
  },

  deleteCustomer: (id) => {
    const customers = readData(customersFile, 'customers');
    const filtered = customers.filter(c => c.id !== id);
    saveData(customersFile, 'customers', filtered);
  },

  updateCustomerSpent: (customerId, amount) => {
    const customers = readData(customersFile, 'customers');
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      customer.totalSpent += amount;
      customer.orderCount += 1;
      saveData(customersFile, 'customers', customers);
    }
  },

  // TRANSACTION OPERATIONS
  getTransactions: (limit = null) => {
    let transactions = readData(transactionsFile, 'transactions');
    transactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    return limit ? transactions.slice(0, limit) : transactions;
  },

  addTransaction: (customerId, items, total, gst) => {
    const transactions = readData(transactionsFile, 'transactions');
    const newTransaction = {
      id: Math.max(...transactions.map(t => t.id || 0), 0) + 1,
      customerId: customerId,
      items: items,
      subtotal: total - gst,
      gst: gst,
      totalAmount: total,
      date: new Date(),
      status: 'completed',
      paymentMethod: 'cash'
    };
    transactions.push(newTransaction);
    saveData(transactionsFile, 'transactions', transactions);
    return newTransaction;
  },

  // RATING OPERATIONS
  addRating: (productId, productName, rating, comment, customerId) => {
    const ratings = readData(ratingsFile, 'ratings');
    const newRating = {
      id: Math.max(...ratings.map(r => r.id || 0), 0) + 1,
      productId: productId,
      productName: productName,
      rating: rating,
      comment: comment,
      customerId: customerId,
      date: new Date()
    };
    ratings.push(newRating);
    saveData(ratingsFile, 'ratings', ratings);
    return newRating;
  },

  getRatings: (productId = null) => {
    let ratings = readData(ratingsFile, 'ratings');
    if (productId) {
      ratings = ratings.filter(r => r.productId === productId);
    }
    return ratings.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  getAverageRating: (productId) => {
    const ratings = readData(ratingsFile, 'ratings').filter(r => r.productId === productId);
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    return (sum / ratings.length).toFixed(1);
  }
};

module.exports = Storage;
