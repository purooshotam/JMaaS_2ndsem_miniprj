// ========================================
// JMAAS - SHARED UTILITIES
// Common functions used across all pages
// ========================================

/**
 * Check if user is logged in
 * Redirects to login page if not authenticated
 */
function checkAuth() {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = '/';
        return false;
    }
    return username;
}

/**
 * Initialize header with username and logout button
 * Call this function in every authenticated page (except login)
 */
function initializeHeader() {
    const username = checkAuth();
    const headerHTML = `
        <div class="header">
            <div class="header-content">
                <div class="header-title">
                    💎 JMaaS
                </div>
                <div class="header-user">
                    <span>Welcome, <strong>${username}</strong>!</span>
                    <button class="logout-btn" onclick="logout()">Logout</button>
                </div>
            </div>
        </div>
    `;
    
    // Insert header at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

/**
 * Logout user and redirect to login page
 */
function logout() {
    localStorage.removeItem('username');
    window.location.href = '/';
}

/**
 * Format currency to Indian Rupees (₹)
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string
 */
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

/**
 * Calculate GST (Goods and Services Tax) at 18%
 * @param {number} baseAmount - The base amount before GST
 * @returns {number} - GST amount
 */
function calculateGST(baseAmount) {
    return Math.round(baseAmount * 0.18);
}

/**
 * Display error notification
 * @param {string} message - Error message to display
 */
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.style.marginBottom = '20px';
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(errorDiv, container.firstChild);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

/**
 * Display success notification
 * @param {string} message - Success message to display
 */
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        background-color: #d4edda;
        color: #155724;
        padding: 12px;
        border-radius: 5px;
        margin-bottom: 20px;
        border-left: 4px solid #155724;
    `;
    successDiv.textContent = message;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(successDiv, container.firstChild);
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

/**
 * Navigate to a page with authentication check
 * @param {string} page - The page to navigate to
 */
function navigateTo(page) {
    checkAuth();
    window.location.href = page;
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showSuccess('Copied to clipboard!');
    }).catch(err => {
        showError('Failed to copy to clipboard');
    });
}

/**
 * Load and display store information in a header or footer
 */
async function loadStoreInfo() {
    try {
        const response = await fetch('/api/store-info');
        const data = await response.json();
        
        if (data.success) {
            const storeInfo = data.data;
            return storeInfo;
        }
    } catch (error) {
        console.error('Error loading store info:', error);
    }
}

/**
 * Get statistics from backend
 * @returns {Promise} - Promise with statistics data
 */
async function getStats() {
    try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        
        if (data.success) {
            return data.stats;
        }
    } catch (error) {
        console.error('Error fetching stats:', error);
        return null;
    }
}

/**
 * Get all inventory items
 * @returns {Promise} - Promise with inventory data
 */
async function getInventory() {
    try {
        const response = await fetch('/api/inventory');
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        }
    } catch (error) {
        console.error('Error fetching inventory:', error);
        showError('Failed to load inventory');
        return [];
    }
}

/**
 * Get inventory by category
 * @param {string} category - Category name
 * @returns {Promise} - Promise with filtered inventory data
 */
async function getInventoryByCategory(category) {
    try {
        const response = await fetch(`/api/inventory/category/${category}`);
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        }
    } catch (error) {
        console.error('Error fetching inventory:', error);
        return [];
    }
}

/**
 * Generate AI greeting
 * @param {string} customerName - Customer name
 * @param {string} occasion - Occasion
 * @returns {Promise} - Promise with greeting text
 */
async function generateGreeting(customerName, occasion) {
    try {
        const response = await fetch('/api/greeting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ customerName, occasion })
        });
        
        const data = await response.json();
        
        if (data.success) {
            return data.greeting;
        }
    } catch (error) {
        console.error('Error generating greeting:', error);
        showError('Failed to generate greeting');
        return null;
    }
}

/**
 * Get all customers
 * @returns {Promise} - Promise with customers data
 */
async function getCustomers() {
    try {
        const response = await fetch('/api/customers');
        const data = await response.json();
        
        if (data.success) {
            return data.data;
        }
    } catch (error) {
        console.error('Error fetching customers:', error);
        return [];
    }
}

/**
 * Get all transactions
 * @returns {Promise} - Promise with transactions data
 */
async function getTransactions() {
    try {
        const response = await fetch('/api/transactions');
        const data = await response.json();
        
        if (data.success) {
            return data.data || [];
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
}

/**
 * Get top selling products
 * @returns {Promise} - Promise with top products data
 */
async function getTopSellingProducts() {
    try {
        const response = await fetch('/api/analytics/top-products');
        const data = await response.json();
        
        if (data.success) {
            return data.data || [];
        }
    } catch (error) {
        console.error('Error fetching top products:', error);
        return [];
    }
}

/**
 * Calculate sales summary for a given period
 * @param {string} period - 'today', 'week', or 'month'
 * @returns {Promise} - Promise with sales summary
 */
async function calculateSalesSummary(period = 'today') {
    try {
        const transactions = await getTransactions();
        const today = new Date();
        let filteredTransactions = [];

        if (period === 'today') {
            today.setHours(0, 0, 0, 0);
            filteredTransactions = transactions.filter(trans => {
                const transDate = new Date(trans.date);
                transDate.setHours(0, 0, 0, 0);
                return transDate.getTime() === today.getTime();
            });
        } else if (period === 'week') {
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            weekStart.setHours(0, 0, 0, 0);
            filteredTransactions = transactions.filter(trans => {
                const transDate = new Date(trans.date);
                transDate.setHours(0, 0, 0, 0);
                return transDate.getTime() >= weekStart.getTime();
            });
        } else if (period === 'month') {
            const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            filteredTransactions = transactions.filter(trans => {
                const transDate = new Date(trans.date);
                return transDate.getFullYear() === today.getFullYear() && 
                       transDate.getMonth() === today.getMonth();
            });
        }

        const totalSales = filteredTransactions.length;
        const totalRevenue = filteredTransactions.reduce((sum, trans) => sum + (trans.totalAmount || 0), 0);
        const avgOrder = totalSales > 0 ? Math.round(totalRevenue / totalSales) : 0;

        return {
            salesCount: totalSales,
            totalRevenue: totalRevenue,
            averageOrderValue: avgOrder
        };
    } catch (error) {
        console.error('Error calculating sales summary:', error);
        return {
            salesCount: 0,
            totalRevenue: 0,
            averageOrderValue: 0
        };
    }
}

/**
 * Validation Functions
 */

/**
 * Validate email format
 */
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validate phone number (Indian format)
 */
function validatePhone(phone) {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone.replace(/\D/g, ''));
}

/**
 * Validate username (3-20 chars, alphanumeric + underscore)
 */
function validateUsername(username) {
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    return regex.test(username);
}

/**
 * Validate password strength
 */
function validatePassword(password) {
    return password.length >= 6;
}

/**
 * Validate text field (not empty)
 */
function validateTextField(text) {
    return text && text.trim().length > 0;
}

/**
 * Validate amount (positive number)
 */
function validateAmount(amount) {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
}

/**
 * General form validation
 */
function validateForm(formData, rules) {
    const errors = {};
    
    for (const [field, rule] of Object.entries(rules)) {
        const value = formData[field];
        
        if (rule.required && !validateTextField(value)) {
            errors[field] = `${rule.label || field} is required`;
            continue;
        }
        
        if (rule.type === 'email' && value && !validateEmail(value)) {
            errors[field] = 'Invalid email address';
        } else if (rule.type === 'phone' && value && !validatePhone(value)) {
            errors[field] = 'Invalid phone number';
        } else if (rule.type === 'username' && value && !validateUsername(value)) {
            errors[field] = 'Username must be 3-20 chars (letters, numbers, underscore)';
        } else if (rule.type === 'password' && value && !validatePassword(value)) {
            errors[field] = 'Password must be at least 6 characters';
        } else if (rule.minLength && value && value.length < rule.minLength) {
            errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters`;
        } else if (rule.maxLength && value && value.length > rule.maxLength) {
            errors[field] = `${rule.label || field} must not exceed ${rule.maxLength} characters`;
        } else if (rule.type === 'amount' && value && !validateAmount(value)) {
            errors[field] = `${rule.label || field} must be a positive number`;
        }
    }
    
    return errors;
}

/**
 * Display field errors
 */
function displayFieldErrors(errors) {
    // Clear previous errors
    document.querySelectorAll('.field-error').forEach(el => el.remove());
    
    // Display new errors
    for (const [field, message] of Object.entries(errors)) {
        const input = document.getElementById(field);
        if (input) {
            input.classList.add('error');
            const errorEl = document.createElement('div');
            errorEl.className = 'field-error';
            errorEl.textContent = message;
            input.parentElement.appendChild(errorEl);
        }
    }
}

/**
 * Clear field errors
 */
function clearFieldErrors() {
    document.querySelectorAll('[id]').forEach(el => {
        el.classList.remove('error', 'success');
    });
    document.querySelectorAll('.field-error').forEach(el => el.remove());
}

/**
 * Sanitize input to prevent XSS
 */
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

/**
 * Initialize sidebar navigation with all modules
 * Call this on all authenticated pages except dashboard
 */
function initializeSidebar() {
    const sidebarHTML = `
        <div class="sidebar">
            <div class="sidebar-header">
                <span class="sidebar-title">JMaaS</span>
                <button class="sidebar-toggle" onclick="toggleSidebar()">☰</button>
            </div>
            <nav class="sidebar-nav">
                <a href="/dashboard.html" class="nav-item-dashboard"><span class="nav-icon">📊</span><span class="nav-text">Dashboard</span></a>
                <a href="/inventory.html" class="nav-item"><span class="nav-icon">💍</span><span class="nav-text">Inventory</span></a>
                <a href="/billing.html" class="nav-item"><span class="nav-icon">🧾</span><span class="nav-text">Billing</span></a>
                <a href="/customers.html" class="nav-item"><span class="nav-icon">👥</span><span class="nav-text">Customers</span></a>
                <a href="/greeting-generator.html" class="nav-item"><span class="nav-icon">🎁</span><span class="nav-text">AI Greetings</span></a>
                <a href="/analytics.html" class="nav-item"><span class="nav-icon">📈</span><span class="nav-text">Analytics</span></a>
                <a href="/catalogue.html" class="nav-item"><span class="nav-icon">📱</span><span class="nav-text">E-Catalogue</span></a>
                <a href="/transactions.html" class="nav-item"><span class="nav-icon">💰</span><span class="nav-text">Transactions</span></a>
                <a href="/ratings.html" class="nav-item"><span class="nav-icon">⭐</span><span class="nav-text">Ratings</span></a>
                <hr style="margin: 10px 0; border: none; border-top: 1px solid rgba(255,255,255,0.2);">
                <a href="#" onclick="logout()" class="nav-item nav-logout"><span class="nav-icon">🔐</span><span class="nav-text">Logout</span></a>
            </nav>
        </div>
    `;
    
    // Insert sidebar at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    
    // Add sidebar styles if not already present
    if (!document.getElementById('sidebar-styles')) {
        const style = document.createElement('style');
        style.id = 'sidebar-styles';
        style.textContent = `
            .sidebar {
                position: fixed;
                left: 0;
                top: 80px;
                width: 220px;
                height: calc(100vh - 80px);
                background: var(--secondary-color);
                color: white;
                padding: 20px 0;
                overflow-y: auto;
                z-index: 100;
                box-shadow: 2px 0 5px rgba(0,0,0,0.1);
            }
            .sidebar-header {
                padding: 0 15px;
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .sidebar-title {
                font-weight: bold;
                font-size: 1.2em;
            }
            .sidebar-toggle {
                display: none;
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 1.5em;
            }
            .sidebar-nav {
                display: flex;
                flex-direction: column;
            }
            .nav-item {
                display: flex;
                align-items: center;
                padding: 12px 15px;
                color: rgba(255,255,255,0.9);
                text-decoration: none;
                transition: all 0.3s ease;
                border-left: 3px solid transparent;
            }
            .nav-item:hover {
                background: rgba(0,0,0,0.2);
                border-left-color: var(--primary-color);
                color: white;
            }
            .nav-item-dashboard {
                background: rgba(0,0,0,0.3);
                border-left-color: var(--primary-color);
                color: white;
            }
            .nav-icon {
                margin-right: 12px;
                font-size: 1.2em;
            }
            .nav-logout:hover {
                background: rgba(220,53,69,0.3);
                border-left-color: #dc3545;
            }
            .main-content {
                margin-left: 220px;
                transition: margin-left 0.3s ease;
            }
            .sidebar.collapsed {
                width: 70px;
            }
            .sidebar.collapsed .nav-text {
                display: none;
            }
            @media (max-width: 768px) {
                .sidebar {
                    width: 70px;
                }
                .sidebar-toggle {
                    display: block;
                }
                .nav-text {
                    display: none;
                }
                .sidebar.expanded {
                    width: 220px;
                }
                .sidebar.expanded .nav-text {
                    display: inline;
                }
                .main-content {
                    margin-left: 70px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Adjust container margins for sidebar
    const container = document.querySelector('.container');
    if (container) {
        container.style.marginLeft = '220px';
    }
}

/**
 * Toggle sidebar on mobile
 */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('expanded');
    }
}

// Export functions for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkAuth,
        initializeHeader,
        logout,
        formatCurrency,
        calculateGST,
        showError,
        showSuccess,
        navigateTo,
        copyToClipboard,
        loadStoreInfo,
        getStats,
        getInventory,
        getInventoryByCategory,
        generateGreeting,
        getCustomers,
        validateEmail,
        validatePhone,
        validateUsername,
        validatePassword,
        validateForm,
        displayFieldErrors,
        clearFieldErrors,
        sanitizeInput,
        getTransactions,
        getTopSellingProducts,
        calculateSalesSummary
    };
}
