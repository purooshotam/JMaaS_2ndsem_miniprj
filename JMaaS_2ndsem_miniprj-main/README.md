# 💎 JMaaS - Jewellery Management as a Service

<div align="center">

![JMaaS Banner](https://img.shields.io/badge/JMaaS-Jewellery_Management-gold?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A comprehensive, cloud-based jewellery business management system for small and medium stores**

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [API Documentation](#api-documentation) • [Screenshots](#screenshots)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Demo Credentials](#demo-credentials)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 About

JMaaS (Jewellery Management as a Service) is a modern, web-based management system designed specifically for jewellery stores. It provides essential business operations including inventory management, billing, customer relationship management, transaction tracking, product ratings, and AI-powered greeting generation.

This prototype demonstrates a full-stack application with a RESTful API backend and a responsive frontend interface.

---

## ✨ Features

### 🔐 Authentication System

- User registration with validation
- Secure login with session management
- Demo credentials for quick testing

### 📊 Dashboard

- Business metrics overview
- Sales summary (today/week/month)
- Low stock alerts
- Recent transactions display
- Top-selling products
- Quick action buttons

### 💍 Inventory Management

- View all jewellery items
- Filter by categories (Rings, Necklaces, Earrings, Bracelets, etc.)
- Track stock levels
- View prices and product details
- Low stock notifications

### 🧾 Billing & Invoicing

- Calculate bills with automatic GST (3%)
- Apply custom discounts
- Generate itemized invoices
- Customer selection
- Real-time total calculation

### 🎁 AI Greeting Generator

- Personalized promotional greetings
- Occasion-based templates (Birthday, Wedding, Anniversary, Festival, etc.)
- Copy to clipboard functionality
- Share via WhatsApp
- Share via Email

### 👥 Customer Management

- Add new customers
- View customer database
- Track customer spending
- Email validation
- Delete customer records

### 📈 Analytics & Reports

- Sales analytics
- Inventory value tracking
- Customer insights
- Export reports to CSV
- Visual data presentation

### 📱 E-Catalogue

- Browse all products
- Advanced search functionality
- Category filtering
- Pagination support
- Detailed product views

### 💰 Transaction History

- View all past sales
- Filter transactions
- Export transaction data
- Customer-wise transaction tracking
- Date-wise sorting

### ⭐ Product Ratings

- Customer product reviews
- Star rating system (1-5)
- Comment/feedback support
- Average rating calculation
- Product-wise rating display

---

## 🛠 Tech Stack

### Backend

- **Runtime:** Node.js v14+
- **Framework:** Express.js 4.18+
- **Data Storage:** File-based persistence (JSON)

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **Vanilla JavaScript** - ES6+ features
- **Fetch API** - Asynchronous data handling

### Development

- **npm** - Package management
- **REST API** - Client-server communication
- **JSON** - Data interchange format

---

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/JMaaS_2ndsem_miniprj.git
cd JMaaS_2ndsem_miniprj-main
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the server**

```bash
npm start
```

Or use the development command:

```bash
npm run dev
```

4. **Open in browser**

Navigate to `http://localhost:3000`

---

## 🚀 Usage

### First Time Setup

1. Start the server using `npm start`
2. Open `http://localhost:3000` in your browser
3. Login with demo credentials or create a new account

### Demo Credentials

- **Username:** `demo`
- **Password:** `demo123`

### Creating a New Account

1. Click "Create Account" on the login page
2. Fill in all required fields
3. Submit the registration form
4. Login with your new credentials

### Basic Workflow

1. **Login** → Access the system
2. **Dashboard** → View business overview
3. **Inventory** → Check available products
4. **Billing** → Create new sales
5. **Customers** → Manage customer database
6. **Analytics** → View business insights

---

## 📁 Project Structure

```plaintext
JMaaS_2ndsem_miniprj-main/
│
├── css/                          # Stylesheets
│   └── style.css                 # Main stylesheet
│
├── js/                           # JavaScript files
│   ├── main.js                   # Core functions and API calls
│   ├── greeting.js               # Greeting generator logic
│   ├── billing.js                # Billing page logic
│   ├── inventory.js              # Inventory page logic
│   ├── customers.js              # Customer management logic
│   ├── analytics.js              # Analytics page logic
│   ├── catalogue.js              # E-catalogue logic
│   ├── transactions.js           # Transaction history logic
│   └── ratings.js                # Product ratings logic
│
├── *.html                        # HTML pages
│   ├── index.html                # Login page
│   ├── signup.html               # Registration page
│   ├── dashboard.html            # Main dashboard
│   ├── inventory.html            # Inventory management
│   ├── billing.html              # Billing system
│   ├── customers.html            # Customer management
│   ├── greeting-generator.html   # AI greeting generator
│   ├── analytics.html            # Analytics & reports
│   ├── catalogue.html            # Product catalogue
│   ├── transactions.html         # Transaction history
│   └── ratings.html              # Product ratings
│
├── server.js                     # Express server
├── data.js                       # Dummy inventory data
├── storage.js                    # File-based storage system
│
├── *.json                        # Data files
│   ├── users.json                # User accounts
│   ├── customers.json            # Customer database
│   ├── transactions.json         # Transaction records
│   └── ratings.json              # Product ratings
│
├── package.json                  # Project dependencies
├── package-lock.json             # Dependency lock file
│
└── *.md                          # Documentation
    ├── README.md                 # This file
    ├── API_DOCUMENTATION.md      # API reference
    ├── PROJECT_SUMMARY.md        # Project overview
    ├── COMPLETION_REPORT.md      # Project completion details
    ├── ENHANCEMENTS.md           # Enhancement suggestions
    ├── GETTING_STARTED_ENHANCED.md
    ├── STARTUP_GUIDE.md          # Getting started guide
    └── WIREFRAMES.md             # UI wireframes
```

---

## 📡 API Documentation

### Authentication Endpoints

#### POST `/api/login`

Login with credentials

**Request Body:**

```json
{
  "username": "demo",
  "password": "demo123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "username": "demo",
    "role": "admin",
    "fullName": "Demo User",
    "email": "demo@jmaas.com"
  }
}
```

#### POST `/api/register`

Register a new user

**Request Body:**

```json
{
  "username": "newuser",
  "password": "password123",
  "confirmPassword": "password123",
  "email": "user@example.com",
  "fullName": "New User"
}
```

### Inventory Endpoints

#### GET `/api/inventory`

Get all inventory items

#### GET `/api/inventory/category/:category`

Get items by category

### Customer Endpoints

#### GET `/api/customers`

Get all customers

#### POST `/api/customers`

Add new customer

#### DELETE `/api/customers/:id`

Delete customer by ID

### Transaction Endpoints

#### GET `/api/transactions`

Get all transactions

#### POST `/api/transactions`

Create new transaction

### Greeting Endpoint

#### POST `/api/greeting`

Generate AI greeting

**Request Body:**

```json
{
  "customerName": "John Doe",
  "occasion": "Birthday"
}
```

### Rating Endpoints

#### GET `/api/ratings`

Get all ratings

#### GET `/api/ratings/:productId`

Get ratings for a product

#### POST `/api/ratings`

Add new rating

### Statistics Endpoint

#### GET `/api/stats`

Get business statistics

For complete API documentation, see [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 📸 Screenshots

### Login Page

![Login Page](https://via.placeholder.com/800x400?text=Login+Page)

### Dashboard

![Dashboard](https://via.placeholder.com/800x400?text=Dashboard)

### Inventory Management

![Inventory](https://via.placeholder.com/800x400?text=Inventory+Management)

### Billing System

![Billing](https://via.placeholder.com/800x400?text=Billing+System)

### AI Greeting Generator

![Greeting Generator](https://via.placeholder.com/800x400?text=AI+Greeting+Generator)

---

## 🔒 Security Notes

⚠️ **Important:** This is a prototype for educational purposes.

- Passwords are stored in plain text (NOT for production use)
- No encryption implemented
- No HTTPS/SSL
- Basic validation only
- In production, implement:
  - Password hashing (bcrypt)
  - JWT tokens
  - HTTPS
  - Input sanitization
  - CSRF protection

---

## 🎓 Academic Project

This project was created as a mini-project for the 2nd Semester. It demonstrates:

- Full-stack web development
- RESTful API design
- Client-server architecture
- File-based data persistence
- Responsive UI design
- Modern JavaScript practices

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Purooshotam Kumar**

- GitHub: [@purooshotam](https://github.com/purooshotam)
- Email: purooshotamkumar0005@gmail.com

---

## 🙏 Acknowledgments

- Node.js and Express.js communities
- All open-source contributors
- College faculty for guidance
- Teammates for collaboration

---

## 📞 Support

For support, email purooshotamkumar0005@gmail.com or open an issue in the repository.

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ for Jewellery Store Management

</div>
