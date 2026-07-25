// ========================================
// FILE-BASED STORAGE SYSTEM
// Stores data in JSON files for persistence
// ========================================

const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, '../db');

// Create db directory if it doesn't exist
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

// File paths
const usersFile = path.join(dbDir, 'users.json');
const inventoryFile = path.join(dbDir, 'inventory.json');
const customersFile = path.join(dbDir, 'customers.json');
const transactionsFile = path.join(dbDir, 'transactions.json');
const ratingsFile = path.join(dbDir, 'ratings.json');

// Initialize files with default data
function initializeStorage() {
  // Users data
  if (!fs.existsSync(usersFile)) {
    const defaultUsers = [
      {
        id: 1,
        username: 'demo',
        password: 'demo123', // In production, use bcrypt for encryption
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
    ];
    saveData(usersFile, defaultUsers);
  }

  // Customers data
  if (!fs.existsSync(customersFile)) {
    const defaultCustomers = [
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
      },
      {
        id: 3,
        name: 'Amit Patel',
        email: 'amit@email.com',
        phone: '9876543212',
        joinDate: new Date('2024-03-10'),
        totalSpent: 220000,
        orderCount: 8
      }
    ];
    saveData(customersFile, defaultCustomers);
  }

  // Transactions data
  if (!fs.existsSync(transactionsFile)) {
    const defaultTransactions = [];
    saveData(transactionsFile, defaultTransactions);
  }

  // Ratings data
  if (!fs.existsSync(ratingsFile)) {
    const defaultRatings = [];
    saveData(ratingsFile, defaultRatings);
  }
}

// Read data from file
function readData(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
}

// Write data to file
function saveData(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error);
    return false;
  }
}

// User Management
const Storage = {
  // Initialize storage
  init: () => {
    initializeStorage();
  },

  // USER OPERATIONS
  getUser: (username) => {
    const users = readData(usersFile);
    return users.find(u => u.username === username);
  },

  getUserById: (id) => {
    const users = readData(usersFile);
    return users.find(u => u.id === id);
  },

  getAllUsers: () => {
    return readData(usersFile);
  },

  registerUser: (username, password, email, fullName) => {
    const users = readData(usersFile);
    
    // Check if user exists
    if (users.find(u => u.username === username)) {
      return { success: false, message: 'Username already exists' };
    }
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    // Create new user
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
    saveData(usersFile, users);
    return { success: true, message: 'Registration successful' };
  },

  updateLastLogin: (username) => {
    const users = readData(usersFile);
    const user = users.find(u => u.username === username);
    if (user) {
      user.lastLogin = new Date();
      saveData(usersFile, users);
    }
  },

  // CUSTOMER OPERATIONS
  getCustomers: () => {
    return readData(customersFile);
  },

  addCustomer: (name, email, phone) => {
    const customers = readData(customersFile);
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
    saveData(customersFile, customers);
    return newCustomer;
  },

  deleteCustomer: (id) => {
    const customers = readData(customersFile);
    const filtered = customers.filter(c => c.id !== id);
    saveData(customersFile, filtered);
  },

  updateCustomerSpent: (customerId, amount) => {
    const customers = readData(customersFile);
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      customer.totalSpent += amount;
      customer.orderCount += 1;
      saveData(customersFile, customers);
    }
  },

  // TRANSACTION OPERATIONS
  getTransactions: (limit = null) => {
    let transactions = readData(transactionsFile);
    transactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    return limit ? transactions.slice(0, limit) : transactions;
  },

  addTransaction: (customerId, items, total, gst) => {
    const transactions = readData(transactionsFile);
    const newTransaction = {
      id: Math.max(...transactions.map(t => t.id || 0), 0) + 1,
      customerId: customerId,
      items: items,
      subtotal: total - gst,
      gst: gst,
      total: total,
      date: new Date(),
      status: 'completed',
      paymentMethod: 'cash'
    };
    transactions.push(newTransaction);
    saveData(transactionsFile, transactions);
    return newTransaction;
  },

  // RATING OPERATIONS
  addRating: (productId, productName, rating, comment, customerId) => {
    const ratings = readData(ratingsFile);
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
    saveData(ratingsFile, ratings);
    return newRating;
  },

  getRatings: (productId = null) => {
    let ratings = readData(ratingsFile);
    if (productId) {
      ratings = ratings.filter(r => r.productId === productId);
    }
    return ratings.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  getAverageRating: (productId) => {
    const ratings = readData(ratingsFile).filter(r => r.productId === productId);
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    return (sum / ratings.length).toFixed(1);
  }
};

module.exports = Storage;
