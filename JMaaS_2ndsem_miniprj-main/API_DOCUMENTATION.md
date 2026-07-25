# JMaaS API Documentation

## Base URL
```
http://localhost:3000
```

## Authentication
- Login required for all endpoints except `/api/login` and `/api/register`
- Username and password stored in localStorage after successful login
- Demo credentials: `demo` / `demo123`

---

## API Endpoints

### 1. Authentication Endpoints

#### Login
```http
POST /api/login
Content-Type: application/json

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
    "role": "manager",
    "fullName": "Demo Manager",
    "email": "demo@jmaas.com"
  }
}
```

#### Register New User
```http
POST /api/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "password123",
  "confirmPassword": "password123",
  "email": "user@example.com",
  "fullName": "John Doe"
}
```

**Validation Rules:**
- Username: 3-20 characters (alphanumeric + underscore)
- Password: Minimum 6 characters
- Email: Valid email format
- Full Name: Required

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": { ... }
}
```

---

### 2. Inventory Endpoints

#### Get All Inventory Items
```http
GET /api/inventory
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Gold Ring",
      "category": "Rings",
      "price": 5000,
      "weight": "2.5g",
      "purity": "22k",
      "stock": 15
    },
    ...
  ],
  "totalItems": 8
}
```

#### Get Inventory by Category
```http
GET /api/inventory/category/:category

Example: GET /api/inventory/category/Rings
```

**Response:**
```json
{
  "success": true,
  "data": [ ... ],
  "category": "Rings"
}
```

**Available Categories:**
- Rings
- Necklaces
- Bangles
- Bracelets
- Earrings
- Chains

---

### 3. Greeting Generator Endpoint

#### Generate AI Greeting
```http
POST /api/greeting
Content-Type: application/json

{
  "customerName": "John",
  "occasion": "Birthday"
}
```

**Occasion Options:**
- Birthday
- Wedding
- Anniversary
- Engagement
- Festival
- New Year
- Graduation
- Corporate

**Response:**
```json
{
  "success": true,
  "greeting": "Welcome John! 🎉 Celebrate your Birthday with our stunning collection of jewellery...",
  "customer": "John",
  "occasion": "Birthday"
}
```

---

### 4. Customer Management Endpoints

#### Get All Customers
```http
GET /api/customers
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Rajesh Kumar",
      "email": "rajesh@email.com",
      "phone": "9876543210",
      "joinDate": "2024-01-15",
      "totalSpent": 125000,
      "orderCount": 5
    },
    ...
  ],
  "totalCustomers": 3
}
```

#### Add New Customer
```http
POST /api/customers
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543220"
}
```

**Validation:**
- Name: Required
- Email: Valid email format, must be unique
- Phone: 10-digit number

**Response:**
```json
{
  "success": true,
  "message": "Customer added successfully",
  "data": { ... }
}
```

#### Delete Customer
```http
DELETE /api/customers/:id

Example: DELETE /api/customers/1
```

**Response:**
```json
{
  "success": true,
  "message": "Customer deleted successfully"
}
```

---

### 5. Store Information Endpoint

#### Get Store Info
```http
GET /api/store-info
```

**Response:**
```json
{
  "success": true,
  "data": {
    "storeName": "JMaaS Jewellery Store",
    "storeAddress": "123 Gold Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "phone": "1234567890",
    "email": "store@jmaas.com"
  }
}
```

---

### 6. Statistics Endpoint

#### Get Business Statistics
```http
GET /api/stats
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalInventoryValue": 500000,
    "totalStock": 150,
    "totalItems": 8,
    "totalCustomers": 3,
    "categories": ["Rings", "Necklaces", "Bangles", "Bracelets", "Earrings", "Chains"]
  }
}
```

---

### 7. Transaction Endpoints

#### Get All Transactions
```http
GET /api/transactions
GET /api/transactions?limit=10
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "customerId": 1,
      "items": [
        {
          "id": 1,
          "name": "Gold Ring",
          "quantity": 2,
          "price": 5000
        }
      ],
      "subtotal": 10000,
      "gst": 1800,
      "total": 11800,
      "date": "2026-04-01T10:30:00Z",
      "status": "completed",
      "paymentMethod": "cash"
    },
    ...
  ],
  "totalTransactions": 5
}
```

#### Create New Transaction
```http
POST /api/transactions
Content-Type: application/json

{
  "customerId": 1,
  "items": [
    {
      "id": 1,
      "name": "Gold Ring",
      "quantity": 2,
      "price": 5000
    }
  ],
  "subtotal": 10000,
  "gst": 1800,
  "total": 11800
}
```

**Response:**
```json
{
  "success": true,
  "message": "Transaction recorded successfully",
  "data": { ... }
}
```

---

### 8. Ratings & Reviews Endpoints

#### Submit Product Rating
```http
POST /api/ratings
Content-Type: application/json

{
  "productId": 1,
  "productName": "Gold Ring",
  "rating": 5,
  "comment": "Excellent quality!",
  "customerId": 1
}
```

**Validation:**
- Rating: 1-5 stars
- ProductId: Required
- ProductName: Required
- Comment: Optional

**Response:**
```json
{
  "success": true,
  "message": "Rating added successfully",
  "data": { ... }
}
```

#### Get All Ratings
```http
GET /api/ratings
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "productId": 1,
      "productName": "Gold Ring",
      "rating": 5,
      "comment": "Excellent quality!",
      "customerId": 1,
      "date": "2026-04-01T10:30:00Z"
    },
    ...
  ],
  "totalRatings": 5
}
```

#### Get Ratings for Specific Product
```http
GET /api/ratings/:productId

Example: GET /api/ratings/1
```

**Response:**
```json
{
  "success": true,
  "data": [ ... ],
  "averageRating": 4.5,
  "totalRatings": 3
}
```

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Error Scenarios:

**Missing Required Fields:**
```json
{
  "success": false,
  "message": "All fields are required"
}
```

**Invalid Credentials:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Username Already Exists:**
```json
{
  "success": false,
  "message": "Username already exists"
}
```

**Invalid Email Format:**
```json
{
  "success": false,
  "message": "Invalid email format"
}
```

---

## Data Models

### User
```javascript
{
  id: number,
  username: string,
  password: string,
  email: string,
  role: string,
  createdAt: date,
  lastLogin: date,
  profile: {
    fullName: string,
    phone: string,
    store: string
  }
}
```

### Customer
```javascript
{
  id: number,
  name: string,
  email: string,
  phone: string,
  joinDate: date,
  totalSpent: number,
  orderCount: number
}
```

### Inventory Item
```javascript
{
  id: number,
  name: string,
  category: string,
  price: number,
  weight: string,
  purity: string,
  stock: number
}
```

### Transaction
```javascript
{
  id: number,
  customerId: number,
  items: array,
  subtotal: number,
  gst: number,
  total: number,
  date: date,
  status: string,
  paymentMethod: string
}
```

### Rating
```javascript
{
  id: number,
  productId: number,
  productName: string,
  rating: number (1-5),
  comment: string,
  customerId: number,
  date: date
}
```

---

## HTTP Status Codes

- **200 OK** - Request successful
- **201 Created** - Resource created successfully
- **400 Bad Request** - Invalid input data
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server error

---

## Usage Examples

### Example 1: Complete Login & Get Dashboard Stats
```javascript
// 1. Login
const loginResponse = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'demo', password: 'demo123' })
});

// 2. Get Statistics
const statsResponse = await fetch('/api/stats');
const stats = await statsResponse.json();
```

### Example 2: Add Customer & View Customers
```javascript
// 1. Add new customer
const addResponse = await fetch('/api/customers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '9876543235'
  })
});

// 2. Get all customers
const listResponse = await fetch('/api/customers');
const customers = await listResponse.json();
```

### Example 3: Create Bill & Record Transaction
```javascript
// 1. Create transaction
const transResponse = await fetch('/api/transactions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerId: 1,
    items: [
      { id: 1, name: 'Gold Ring', quantity: 2, price: 5000 }
    ],
    subtotal: 10000,
    gst: 1800,
    total: 11800
  })
});

// 2. Get transaction history
const historyResponse = await fetch('/api/transactions');
const transactions = await historyResponse.json();
```

### Example 4: Rate Products
```javascript
// 1. Submit rating
const ratingResponse = await fetch('/api/ratings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    productId: 1,
    productName: 'Gold Ring',
    rating: 5,
    comment: 'Amazing quality!',
    customerId: 1
  })
});

// 2. Get product ratings
const productRatingsResponse = await fetch('/api/ratings/1');
const ratings = await productRatingsResponse.json();
```

---

## Rate Limiting
Currently no rate limiting is implemented. For production, implement rate limiting to prevent abuse.

---

## Security Notes
- ⚠️ Passwords stored in plain text (demo only)
- ⚠️ No JWT tokens (use session storage)
- ⚠️ No HTTPS (local development only)
- ✅ Input validation on all endpoints
- ✅ XSS prevention on client side
- ✅ Email format validation

---

## Testing the API

### Using cURL
```bash
# Login
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"demo123"}'

# Get inventory
curl http://localhost:3000/api/inventory

# Get customers
curl http://localhost:3000/api/customers
```

### Using Postman
1. Set request type to POST
2. Enter URL: `http://localhost:3000/api/login`
3. Add Body: `{ "username": "demo", "password": "demo123" }`
4. Send request

---

**API Version:** 1.0  
**Last Updated:** April 1, 2026  
**Created for:** JMaaS College Project
