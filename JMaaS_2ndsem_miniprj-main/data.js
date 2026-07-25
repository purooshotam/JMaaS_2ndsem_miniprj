// ========================================
// DUMMY DATA FOR JMAAS PROTOTYPE
// This file contains all demo data for the prototype
// No database is used - data is stored in memory
// ========================================

// Sample inventory items - Jewellery products
const inventoryItems = [
  {
    id: 1,
    name: "Gold Wedding Ring",
    category: "Rings",
    price: 25000,
    weight: "5g",
    purity: "22K Gold",
    stock: 8
  },
  {
    id: 2,
    name: "Diamond Pendant",
    category: "Necklaces",
    price: 45000,
    weight: "3g",
    purity: "18K Gold",
    stock: 5
  },
  {
    id: 3,
    name: "Pearl Bracelet",
    category: "Bracelets",
    price: 15000,
    weight: "8g",
    purity: "18K Gold",
    stock: 12
  },
  {
    id: 4,
    name: "Gold Bangles (pair)",
    category: "Bangles",
    price: 35000,
    weight: "18g",
    purity: "22K Gold",
    stock: 6
  },
  {
    id: 5,
    name: "Emerald Earrings",
    category: "Earrings",
    price: 22000,
    weight: "2g",
    purity: "18K Gold",
    stock: 10
  },
  {
    id: 6,
    name: "Ruby Ring",
    category: "Rings",
    price: 55000,
    weight: "4g",
    purity: "18K Gold",
    stock: 3
  },
  {
    id: 7,
    name: "Gold Chain",
    category: "Chains",
    price: 32000,
    weight: "10g",
    purity: "22K Gold",
    stock: 9
  },
  {
    id: 8,
    name: "Sapphire Necklace",
    category: "Necklaces",
    price: 50000,
    weight: "4g",
    purity: "18K Gold",
    stock: 4
  }
];

// Sample customers
const customers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh@email.com",
    phone: "9876543210",
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@email.com",
    phone: "9876543211",
    joinDate: "2024-02-20"
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit@email.com",
    phone: "9876543212",
    joinDate: "2024-03-10"
  }
];

// Store information
const storeInfo = {
  name: "Sparkling Gems Store",
  owner: "Demo Owner",
  location: "New Delhi, India",
  phone: "011-XXXX-XXXX",
  email: "info@sparklinggems.in",
  established: 2015
};

// Export all data
module.exports = {
  inventoryItems,
  customers,
  storeInfo
};
