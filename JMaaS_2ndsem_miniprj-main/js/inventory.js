// ========================================
// INVENTORY PAGE SCRIPT
// Manage inventory display and filtering
// ========================================

// Initialize header and check authentication
initializeHeader();

let allItems = [];
let currentCategory = 'All';

// Load inventory when page loads
window.addEventListener('load', loadInventory);

/**
 * Load inventory from backend and display
 */
async function loadInventory() {
    try {
        const items = await getInventory();
        
        if (items && items.length > 0) {
            allItems = items;
            displayFilters();
            displayItems(items);
        } else {
            document.getElementById('itemsGrid').style.display = 'none';
            document.getElementById('noItemsMessage').style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading inventory:', error);
        showError('Failed to load inventory');
    }
}

/**
 * Display category filter buttons
 */
function displayFilters() {
    const filterGroup = document.getElementById('filterGroup');
    
    // Create "All" button
    const allButton = document.createElement('button');
    allButton.className = 'filter-btn active';
    allButton.textContent = 'All Items';
    allButton.onclick = () => filterByCategory('All');
    filterGroup.appendChild(allButton);

    // Get unique categories from inventory
    const categories = [...new Set(allItems.map(item => item.category))];
    
    // Create button for each category
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.textContent = category;
        button.onclick = () => filterByCategory(category);
        filterGroup.appendChild(button);
    });
}

/**
 * Filter items by category
 * @param {string} category - Category to filter by
 */
async function filterByCategory(category) {
    currentCategory = category;
    
    // Update active button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if ((category === 'All' && btn.textContent === 'All Items') ||
            (category !== 'All' && btn.textContent === category)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Filter items
    let filteredItems;
    if (category === 'All') {
        filteredItems = allItems;
    } else {
        filteredItems = allItems.filter(item => item.category === category);
    }

    // Display filtered items
    if (filteredItems.length > 0) {
        document.getElementById('itemsGrid').style.display = 'grid';
        document.getElementById('noItemsMessage').style.display = 'none';
        displayItems(filteredItems);
    } else {
        document.getElementById('itemsGrid').style.display = 'none';
        document.getElementById('noItemsMessage').style.display = 'block';
    }
}

/**
 * Display inventory items in grid
 * @param {array} items - Array of items to display
 */
function displayItems(items) {
    const itemsGrid = document.getElementById('itemsGrid');
    itemsGrid.innerHTML = '';

    items.forEach(item => {
        const itemCard = createItemCard(item);
        itemsGrid.appendChild(itemCard);
    });
}

/**
 * Create an item card element
 * @param {object} item - Item data
 * @returns {HTMLElement} - Item card element
 */
function createItemCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';

    // Stock status badge
    let stockClass = 'stock-available';
    let stockText = `✓ ${item.stock} pcs`;
    
    if (item.stock === 0) {
        stockClass = 'stock-out';
        stockText = '✗ Out of Stock';
    } else if (item.stock < 5) {
        stockClass = 'stock-low';
        stockText = `⚠ Low Stock: ${item.stock}`;
    }

    card.innerHTML = `
        <div class="item-header">
            <div class="item-name">${item.name}</div>
            <div class="item-category">${item.category}</div>
        </div>
        <div class="item-body">
            <div class="item-detail">
                <span class="item-detail-label">Price:</span>
                <span class="item-detail-value">${formatCurrency(item.price)}</span>
            </div>
            <div class="item-detail">
                <span class="item-detail-label">Weight:</span>
                <span class="item-detail-value">${item.weight}</span>
            </div>
            <div class="item-detail">
                <span class="item-detail-label">Purity:</span>
                <span class="item-detail-value">${item.purity}</span>
            </div>
            <div class="item-detail">
                <span class="item-detail-label">Stock:</span>
                <span class="stock-badge ${stockClass}">${stockText}</span>
            </div>
            <div style="margin-top: 15px; text-align: center;">
                <button class="btn btn-primary" onclick="addToBill(${item.id}, '${item.name}', ${item.price})">
                    Add to Bill
                </button>
            </div>
        </div>
    `;

    return card;
}

/**
 * Add item to bill (navigate to billing page with item info)
 * @param {number} id - Item ID
 * @param {string} name - Item name
 * @param {number} price - Item price
 */
function addToBill(id, name, price) {
    // Store item in session storage
    const billItem = { id, name, price, quantity: 1 };
    
    // Get existing bill items
    let billItems = JSON.parse(sessionStorage.getItem('billItems')) || [];
    
    // Check if item already in bill
    const existingItem = billItems.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        billItems.push(billItem);
    }
    
    // Save to session
    sessionStorage.setItem('billItems', JSON.stringify(billItems));
    
    // Navigate to billing page
    showSuccess(`${name} added to bill!`);
    setTimeout(() => {
        navigateTo('billing.html');
    }, 1000);
}
