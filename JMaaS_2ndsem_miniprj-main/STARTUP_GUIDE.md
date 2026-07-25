# JMaaS - Jewellery Management as a Service
## Complete Startup & Usage Guide

---

## 📋 Project Overview

**JMaaS** is a cloud-based jewellery business management system prototype designed for small and medium-sized jewellery stores. 

### ✨ Features Included (All 8 Modules):

1. **Login Page** - Demo authentication
2. **Dashboard** - Main hub with statistics and quick access
3. **Inventory Management** - View and filter jewellery items
4. **Billing System** - Create bills with GST calculation
5. **Customer Management (CRM)** - Manage customer database
6. **AI Greeting Generator** - Create personalized promotional greetings
7. **Analytics Dashboard** - View business metrics and charts
8. **E-Catalogue** - Digital brochure with search and pagination

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js installed (v14+)
- npm installed
- A modern web browser (Chrome, Firefox, Edge, Safari)

### Step 1: Navigate to Project Directory
```bash
cd d:\miniprj_2ndsem\jmaas-prototype
```

### Step 2: Start the Server
```bash
npm start
```

You should see:
```
╔════════════════════════════════════════════╗
║   JMaaS Prototype Server Running           ║
║   http://localhost:3000                    ║
║   Press Ctrl+C to stop                     ║
╚════════════════════════════════════════════╝
```

### Step 3: Open in Browser
Open your web browser and go to:
```
http://localhost:3000
```

You'll see the **Login Page**

---

## 🔐 Login Credentials

Use these demo credentials:

| Field | Value |
|-------|-------|
| **Username** | `demo` |
| **Password** | `demo123` |

**Note:** No real authentication is implemented. This is just for demo purposes.

---

## 📱 Application Structure

```
jmaas-prototype/
├── public/                          # Frontend files
│   ├── index.html                  # Login page
│   ├── dashboard.html              # Main dashboard
│   ├── inventory.html              # Inventory module
│   ├── billing.html                # Billing system
│   ├── customers.html              # Customer management
│   ├── greeting-generator.html     # AI greeting feature
│   ├── analytics.html              # Analytics dashboard
│   ├── catalogue.html              # E-catalogue
│   ├── wireframe-viewer.html       # Wireframe viewer
│   ├── css/
│   │   └── style.css               # All styling
│   └── js/
│       ├── main.js                 # Shared utilities
│       ├── inventory.js            # Inventory logic
│       ├── billing.js              # Billing logic
│       ├── greeting.js             # Greeting generator logic
│       ├── customers.js            # Customer mgmt logic
│       ├── analytics.js            # Analytics logic
│       └── catalogue.js            # Catalogue logic
├── server/
│   ├── server.js                   # Express server
│   ├── data.js                     # Dummy data
│   └── routes/                     # (Routes in server.js)
├── package.json                    # Dependencies
├── README.md                        # Project README
├── WIREFRAMES.md                   # Wireframe documentation
└── STARTUP_GUIDE.md               # This file
```

---

## 🎯 Module Guide

### 1. LOGIN PAGE
**URL:** `http://localhost:3000/`

**Purpose:** Authenticate user before accessing the system

**Features:**
- Username & password input fields
- Demo credentials display
- Clean, centered design
- Session storage of username

**Actions:**
1. Enter username: `demo`
2. Enter password: `demo123`
3. Click "Login" button
4. Get redirected to Dashboard

---

### 2. DASHBOARD
**URL:** `http://localhost:3000/dashboard.html`

**Purpose:** Main hub showing business overview and quick access to all modules

**Features:**
- Welcome message with username
- 5 statistics cards:
  - Total Inventory Value (₹)
  - Total Items in Stock (units)
  - Unique Products (count)
  - Total Customers (count)
  - Product Categories (count)
- Quick access cards to all modules
- Persistent sidebar navigation
- Logout button

**Navigation:**
- Click on any feature card to navigate
- Use sidebar menu for navigation
- All sidebar menu items are accessible from any page

---

### 3. INVENTORY MANAGEMENT
**URL:** `http://localhost:3000/inventory.html`

**Purpose:** View, filter, and manage jewellery inventory

**Sample Data:**
- 8 pre-loaded jewellery items
- Categories: Rings, Necklaces, Bracelets, Bangles, Earrings, Chains
- Prices range: ₹2,500 to ₹55,000

**Features:**
- **Filter by Category:** All, Rings, Necklaces, Bracelets, etc.
- Display item cards with:
  - Item name & category
  - Price (in ₹)
  - Weight
  - Purity (18K, 22K Gold)
  - Stock status (Good/Low/Out)
- "Add to Bill" button on each item
- Responsive 3-column grid layout

**Actions:**
1. Click category filter buttons to view specific categories
2. View item details in card format
3. Click "Add to Bill" to add to billing cart
4. System redirects to billing page

---

### 4. BILLING SYSTEM
**URL:** `http://localhost:3000/billing.html`

**Purpose:** Create bills with automatic GST calculation

**Features:**
- **Two-column layout:**
  - Left: Items table with quantity controls
  - Right: Sticky bill summary
- **Item Management:**
  - Quantity adjustment (+/- buttons)
  - Direct quantity input
  - Remove item button
- **Automatic Calculations:**
  - Subtotal per item (Price × Quantity)
  - Total of all items
  - GST at 18%
  - Grand Total (Subtotal + GST)
- **Actions:**
  - Print Bill (opens print dialog)
  - Clear Bill (remove all items)
  - Add More Items (back to inventory)

**Example Bill:**
```
Item: Gold Ring (₹25,000) × 1 = ₹25,000
Item: Diamond Pendant (₹45,000) × 1 = ₹45,000
Item: Pearl Bracelet (₹15,000) × 1 = ₹15,000
─────────────────────────────────────
Subtotal: ₹85,000
GST (18%): ₹15,300
Total: ₹100,300
```

**Workflow:**
1. Go to Inventory
2. Click "Add to Bill" on items
3. Navigate to Billing
4. Adjust quantities if needed
5. Review bill summary
6. Click "Print Bill" for receipt
7. Or clear and start new bill

---

### 5. CUSTOMER MANAGEMENT (CRM)
**URL:** `http://localhost:3000/customers.html`

**Purpose:** Manage customer database and relationships

**Pre-loaded Customers:**
- Rajesh Kumar (rajesh@email.com, 9876543210)
- Priya Sharma (priya@email.com, 9876543211)
- Amit Patel (amit@email.com, 9876543212)

**Features:**
- **Customer List:**
  - Table with: Name, Email, Phone, Join Date
  - View, Edit, Delete buttons
- **Search Functionality:**
  - Real-time search by name, email, or phone
  - Filters table as you type
- **Add New Customer:**
  - Modal form to add customer
  - Required: Name, Email, Phone
  - Email validation
  - Auto-generated join date
- **Delete Customer:**
  - Confirmation dialog before deletion
  - Removes from customer list

**Actions:**
1. View customer details (modal popup)
2. Search for customer using search box
3. Add new customer via modal form
4. Delete customer with confirmation
5. All changes stored in memory (resets on server restart)

---

### 6. AI GREETING GENERATOR
**URL:** `http://localhost:3000/greeting-generator.html`

**Purpose:** Create personalized promotional greetings for customers

**Features:**
- **Input Section:**
  - Customer name field
  - Occasion dropdown:
    - Birthday 🎂
    - Wedding 💍
    - Anniversary 💑
    - Engagement 💍
    - Festival 🪔
    - New Year 🎊
    - Graduation 🎓
    - Corporate Event 🏢
- **Output Section:**
  - Display generated greeting
  - Copy to Clipboard button
  - Share on WhatsApp button
  - Share via Email button

**Example Output:**
```
"Welcome John! 🎉 Celebrate your Birthday with our 
stunning collection of jewellery. Special discount 
of 10% available today!"
```

**AI Features:**
- Randomly selects from 5 pre-written greeting templates
- Personalizes with customer name and occasion
- Each generation is unique

**Usage:**
1. Enter customer name (e.g., "Priya")
2. Select occasion (e.g., "Wedding")
3. Click "Generate Greeting"
4. View personalized greeting
5. Copy or share via WhatsApp/Email

---

### 7. ANALYTICS DASHBOARD
**URL:** `http://localhost:3000/analytics.html`

**Purpose:** View business metrics and insights

**Features:**
- **Time Period Filter:**
  - This Month
  - This Quarter
  - This Year
  - All Time
- **Key Performance Indicators (KPIs):**
  - Total Inventory Value (₹)
  - Total Items in Stock
  - Unique Products
  - Total Customers
  - Product Categories
- **Visual Charts:**
  - Category Distribution (Bar chart)
  - Stock Level Status (Good/Low/Out)
  - Inventory Summary Table
- **Export Report:**
  - Download analytics as text file
  - Includes all KPIs and inventory details

**Example Analytics:**
```
Total Inventory Value: ₹364,000
Total Stock: 85 items
Products: 8 unique items
Customers: 3
Categories: 8 different types
```

**Chart Information:**
- Bar chart shows item count per category
- Stock status shows:
  - Good Stock (>5 items)
  - Low Stock (1-4 items)
  - Out of Stock (0 items)
- Table lists each item with value calculation

---

### 8. E-CATALOGUE (Digital Brochure)
**URL:** `http://localhost:3000/catalogue.html`

**Purpose:** Beautiful digital catalogue for showcasing products

**Features:**
- **Search & Filter:**
  - Full-text search by item name
  - Filter by category dropdown
  - Sort options:
    - By Name (A-Z)
    - Price Low to High
    - Price High to Low
    - Most Stock
- **Display:**
  - Grid layout (responsive)
  - Item cards showing:
    - Product icon/placeholder
    - Name, Category, Price
    - Weight, Purity details
    - View Details button
    - Inquire button
- **Pagination:**
  - 12 items per page
  - Previous/Next buttons
  - Page number navigation
  - Total count display
- **Download:**
  - Download catalogue as text file
  - Suitable for printing

**Usage:**
1. Browse all items or search for specific product
2. Filter by category or sort by preference
3. View item details by clicking "View Details"
4. Add to inquiry list with "Inquire" button
5. Download catalogue for offline viewing

---

## 🎨 Wireframe Viewer

**URL:** `http://localhost:3000/wireframe-viewer.html`

An interactive tool to view all wireframe designs:
- Visual layouts of all 8 modules
- Low-fidelity ASCII wireframes
- Component descriptions
- Navigation flow diagram

**Usage:**
Click on any page button to see its wireframe design.

---

## 💾 Data Management

### In-Memory Data
All data is stored in browser memory:
- **Session Storage:** Bill items, customer inquiries
- **Array Data (Backend):** Inventory, customers

### Data Persistence
- **Resets on:** Server restart
- **Not Persistent:** All data is demo/temporary
- **No Database:** Uses dummy arrays in `server/data.js`

### Sample Data Included
- **8 Jewellery Items** with prices, weights, categories
- **3 Customers** with contact information
- **Store Information** with business details

---

## 🔧 API Endpoints

The backend Express server provides these endpoints:

### Authentication
```
POST /api/login
Body: { username, password }
Response: { success, message, user }
```

### Inventory
```
GET /api/inventory
Response: { success, data, totalItems }

GET /api/inventory/category/:category
Response: { success, data, category }
```

### Greeting Generator
```
POST /api/greeting
Body: { customerName, occasion }
Response: { success, greeting, customer, occasion }
```

### Customers
```
GET /api/customers
Response: { success, data, totalCustomers }
```

### Store Information
```
GET /api/store-info
Response: { success, data }
```

### Statistics
```
GET /api/stats
Response: { success, stats }
```

---

## 📋 Checklist: Features to Try

- [ ] Login with demo/demo123
- [ ] View dashboard statistics
- [ ] Browse inventory with filters
- [ ] Add items to bill
- [ ] Calculate bill with GST
- [ ] Print bill
- [ ] Add new customer
- [ ] Search customers
- [ ] Generate greeting for customer
- [ ] Copy greeting to clipboard
- [ ] View analytics
- [ ] Export analytics report
- [ ] Browse e-catalogue
- [ ] Search and sort catalogue items
- [ ] Download catalogue
- [ ] Navigate using sidebar (all modules)
- [ ] Logout and return to login

---

## 🚨 Troubleshooting

### Issue: "Cannot find module 'express'"
**Solution:** Run `npm install` in project directory

### Issue: "Port 3000 already in use"
**Solution:** 
- Close other applications using port 3000
- Or modify PORT in `server/server.js`

### Issue: "Page shows blank or error"
**Solution:**
- Check browser console for errors (F12)
- Ensure server is running
- Hard refresh browser (Ctrl+Shift+R)

### Issue: "Data not persisting after page refresh"
**Expected Behavior:** In-memory data doesn't persist. This is a prototype.
- Customers added are lost on page refresh
- Bills are reset when navigating back
- This is intentional for the prototype

### Issue: "Greeting generator not working"
**Solution:**
- Check server console for errors
- Refresh page
- Try simpler text (avoid special characters)

---

## 📝 Notes for College Review

### What Makes This a Good Prototype:

1. **All 8 Modules Implemented:**
   - Covers full user journey
   - Shows understanding of business requirements

2. **User-Friendly Design:**
   - Consistent navbar and navigation
   - Color scheme suitable for jewellery business
   - Responsive layout

3. **Functional Features:**
   - Working calculations (GST, billing)
   - Search and filter functionality
   - Data management (CRUD operations)
   - Export capabilities

4. **AI Integration:**
   - Greeting generator with templates
   - Demonstrates AI feature concept

5. **Professional Structure:**
   - Clean code organization
   - Comments in code
   - Proper file naming
   - Modular design

6. **Documentation:**
   - Complete wireframes
   - API documentation
   - This startup guide
   - Code comments

---

## 🎯 For Further Enhancement

If you want to expand this prototype:

1. **Database Integration:**
   ```
   - Replace dummy data with MongoDB/PostgreSQL
   - Implement persistent storage
   ```

2. **Real Authentication:**
   ```
   - Implement JWT tokens
   - Add password hashing
   - User registration
   ```

3. **Advanced AI Features:**
   ```
   - Integrate with AI APIs (ChatGPT, etc.)
   - Recommendation system
   - Predictive analytics
   ```

4. **Payments Integration:**
   ```
   - Razorpay/PayPal integration
   - Invoice generation
   - Payment tracking
   ```

5. **Mobile App:**
   ```
   - React Native version
   - Progressive Web App (PWA)
   - Offline support
   ```

---

## 📞 Support

For issues or clarifications:
1. Check console (F12 → Console tab) for errors
2. Review code comments in respective files
3. Check WIREFRAMES.md for design details
4. Refer to this STARTUP_GUIDE.md

---

## 📜 Project Info

- **Project:** AI-Enabled Jewellery Management as a Service (JMaaS)
- **Type:** Mini Prototype for College Review
- **Created:** March 31, 2026
- **Tech Stack:** Node.js, Express, HTML, CSS, Vanilla JavaScript
- **Data:** In-memory dummy data (no database)
- **Modules:** 8 complete modules
- **Status:** ✅ Ready to present

---

**Happy exploring! 🎉**

*Created with ❤️ for your college project review*
