// ========================================
// CUSTOMERS PAGE SCRIPT
// Manage customer database and CRM
// ========================================

// Initialize header and check authentication
initializeHeader();

let allCustomers = [];
let filteredCustomers = [];

// Load customers when page loads
window.addEventListener('load', loadCustomers);

/**
 * Load customers from backend
 */
async function loadCustomers() {
    try {
        const customers = await getCustomers();
        
        if (customers && customers.length > 0) {
            allCustomers = customers;
            filteredCustomers = customers;
            displayCustomers(customers);
            document.getElementById('noCustomersMessage').style.display = 'none';
        } else {
            document.getElementById('noCustomersMessage').style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading customers:', error);
        showError('Failed to load customers');
    }
}

/**
 * Display customers in table
 * @param {array} customers - Array of customers to display
 */
function displayCustomers(customers) {
    const table = document.getElementById('customersTable');
    
    // Get header row
    const headerRow = table.querySelector('tr:first-child');
    
    // Remove all rows except header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    if (customers.length === 0) {
        document.getElementById('noCustomersMessage').style.display = 'block';
        return;
    }

    document.getElementById('noCustomersMessage').style.display = 'none';

    // Add customer rows
    customers.forEach((customer, index) => {
        const row = table.insertRow();
        row.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9';
        
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.joinDate}</td>
            <td>
                <button class="btn btn-primary" style="padding: 5px 10px; font-size: 0.9em;" onclick="viewCustomer(${customer.id})">View</button>
                <button class="btn-remove" style="padding: 5px 10px; font-size: 0.9em;" onclick="deleteCustomer(${customer.id})">Delete</button>
            </td>
        `;
    });
}

/**
 * Search customers by name, email, or phone
 * @param {string} searchTerm - Term to search for
 */
function searchCustomers(searchTerm) {
    if (!searchTerm.trim()) {
        filteredCustomers = allCustomers;
    } else {
        const term = searchTerm.toLowerCase();
        filteredCustomers = allCustomers.filter(customer =>
            customer.name.toLowerCase().includes(term) ||
            customer.email.toLowerCase().includes(term) ||
            customer.phone.includes(term)
        );
    }

    displayCustomers(filteredCustomers);
}

/**
 * Show add customer form modal
 */
function showAddCustomerForm() {
    document.getElementById('addCustomerModal').style.display = 'flex';
}

/**
 * Close add customer form modal
 */
function closeAddCustomerForm() {
    document.getElementById('addCustomerModal').style.display = 'none';
    // Clear form fields
    document.getElementById('newCustomerName').value = '';
    document.getElementById('newCustomerEmail').value = '';
    document.getElementById('newCustomerPhone').value = '';
}

/**
 * Add new customer
 */
function addNewCustomer() {
    const name = document.getElementById('newCustomerName').value.trim();
    const email = document.getElementById('newCustomerEmail').value.trim();
    const phone = document.getElementById('newCustomerPhone').value.trim();

    // Validation
    if (!name) {
        showError('Please enter customer name');
        return;
    }

    if (!email) {
        showError('Please enter email address');
        return;
    }

    if (!phone) {
        showError('Please enter phone number');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('Please enter valid email address');
        return;
    }

    // Create new customer object
    const newCustomer = {
        id: allCustomers.length > 0 ? Math.max(...allCustomers.map(c => c.id)) + 1 : 1,
        name: name,
        email: email,
        phone: phone,
        joinDate: new Date().toISOString().split('T')[0]
    };

    // Add to list
    allCustomers.push(newCustomer);
    filteredCustomers = allCustomers;

    // Update display
    displayCustomers(filteredCustomers);
    closeAddCustomerForm();

    showSuccess(`${name} added as new customer!`);
}

/**
 * View customer details
 * @param {number} id - Customer ID
 */
function viewCustomer(id) {
    const customer = allCustomers.find(c => c.id === id);
    
    if (customer) {
        alert(`
Customer Details:
━━━━━━━━━━━━━━━━━
Name: ${customer.name}
Email: ${customer.email}
Phone: ${customer.phone}
Joined: ${customer.joinDate}
        `);
    }
}

/**
 * Delete customer
 * @param {number} id - Customer ID
 */
function deleteCustomer(id) {
    const customer = allCustomers.find(c => c.id === id);
    
    if (!customer) return;

    if (confirm(`Are you sure you want to delete ${customer.name}?`)) {
        allCustomers = allCustomers.filter(c => c.id !== id);
        filteredCustomers = allCustomers;
        displayCustomers(filteredCustomers);
        showSuccess(`${customer.name} has been removed`);
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('addCustomerModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});
