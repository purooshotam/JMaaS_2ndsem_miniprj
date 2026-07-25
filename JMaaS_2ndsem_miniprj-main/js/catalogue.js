// ========================================
// E-CATALOGUE PAGE SCRIPT
// Digital brochure for jewellery items
// ========================================

// Initialize header and check authentication
initializeHeader();

let allItems = [];
let filteredItems = [];
let currentPage = 1;
const itemsPerPage = 12;

// Load catalogue when page loads
window.addEventListener('load', loadCatalogue);

/**
 * Load catalogue items from backend
 */
async function loadCatalogue() {
    try {
        const items = await getInventory();
        
        if (items && items.length > 0) {
            allItems = items;
            filteredItems = items;
            populateCategoryFilter();
            displayCatalogue();
            displayPagination();
        } else {
            document.getElementById('catalogueGrid').style.display = 'none';
            document.getElementById('noCatalogueMessage').style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading catalogue:', error);
        showError('Failed to load catalogue');
    }
}

/**
 * Populate category filter dropdown
 */
function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = [...new Set(allItems.map(item => item.category))];

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

/**
 * Search catalogue items
 * @param {string} searchTerm - Term to search for
 */
function searchCatalogue(searchTerm) {
    if (!searchTerm.trim()) {
        filteredItems = allItems;
    } else {
        const term = searchTerm.toLowerCase();
        filteredItems = allItems.filter(item =>
            item.name.toLowerCase().includes(term) ||
            item.category.toLowerCase().includes(term)
        );
    }

    currentPage = 1;
    displayCatalogue();
    displayPagination();
}

/**
 * Filter catalogue by category
 * @param {string} category - Category to filter by
 */
function filterCatalogue(category) {
    if (!category) {
        filteredItems = allItems;
    } else {
        filteredItems = allItems.filter(item => item.category === category);
    }

    currentPage = 1;
    displayCatalogue();
    displayPagination();
}

/**
 * Sort catalogue items
 * @param {string} sortType - Sort criteria
 */
function sortCatalogue(sortType) {
    if (sortType === 'name') {
        filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'price-low') {
        filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-high') {
        filteredItems.sort((a, b) => b.price - a.price);
    } else if (sortType === 'stock') {
        filteredItems.sort((a, b) => b.stock - a.stock);
    }

    currentPage = 1;
    displayCatalogue();
}

/**
 * Display catalogue items with pagination
 */
function displayCatalogue() {
    const grid = document.getElementById('catalogueGrid');
    grid.innerHTML = '';

    if (filteredItems.length === 0) {
        grid.style.display = 'none';
        document.getElementById('noCatalogueMessage').style.display = 'block';
        return;
    }

    grid.style.display = 'grid';
    document.getElementById('noCatalogueMessage').style.display = 'none';

    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

    // Create item cards
    itemsToDisplay.forEach(item => {
        const card = createCatalogueCard(item);
        grid.appendChild(card);
    });
}

/**
 * Create catalogue item card
 * @param {object} item - Item data
 * @returns {HTMLElement} - Card element
 */
function createCatalogueCard(item) {
    const card = document.createElement('div');
    card.className = 'item-card';

    card.innerHTML = `
        <div style="background: #ecf0f1; padding: 60px 20px; text-align: center; font-size: 3em; color: #d4af37;">
            💍
        </div>
        <div class="item-header">
            <div class="item-name">${item.name}</div>
            <div class="item-category">${item.category}</div>
        </div>
        <div class="item-body">
            <div style="text-align: center; margin-bottom: 15px;">
                <div class="item-price" style="font-size: 1.8em; color: #d4af37;">${formatCurrency(item.price)}</div>
                <div style="color: #7f8c8d; font-size: 0.9em; margin-bottom: 10px;">Weight: ${item.weight}</div>
                <div style="color: #7f8c8d; font-size: 0.9em; margin-bottom: 10px;">Purity: ${item.purity}</div>
            </div>
            <div style="text-align: center;">
                <button class="btn btn-primary" style="margin-right: 8px;" onclick="viewDetails(${item.id}, '${item.name}')">
                    View Details
                </button>
                <button class="btn btn-secondary" onclick="addToCatalogueCart(${item.id}, '${item.name}', ${item.price})">
                    Inquire
                </button>
            </div>
        </div>
    `;

    return card;
}

/**
 * Display pagination controls
 */
function displayPagination() {
    if (filteredItems.length === 0) {
        document.getElementById('paginationControls').style.display = 'none';
        return;
    }

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginationDiv = document.getElementById('paginationControls');
    paginationDiv.innerHTML = '';

    if (totalPages <= 1) {
        paginationDiv.style.display = 'none';
        return;
    }

    paginationDiv.style.display = 'flex';

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '< Previous';
    prevBtn.className = 'btn btn-secondary';
    prevBtn.style.padding = '8px 12px';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => goToPage(currentPage - 1);
    paginationDiv.appendChild(prevBtn);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.style.padding = '8px 12px';
        pageBtn.style.margin = '0 5px';
        pageBtn.style.border = 'none';
        pageBtn.style.borderRadius = '5px';
        pageBtn.style.cursor = 'pointer';
        pageBtn.style.backgroundColor = currentPage === i ? '#d4af37' : '#ecf0f1';
        pageBtn.style.color = currentPage === i ? '#2c3e50' : '#7f8c8d';
        pageBtn.style.fontWeight = currentPage === i ? 'bold' : 'normal';
        pageBtn.onclick = () => goToPage(i);
        paginationDiv.appendChild(pageBtn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next >';
    nextBtn.className = 'btn btn-secondary';
    nextBtn.style.padding = '8px 12px';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => goToPage(currentPage + 1);
    paginationDiv.appendChild(nextBtn);

    // Page info
    const info = document.createElement('span');
    info.style.marginLeft = '20px';
    info.style.color = '#7f8c8d';
    info.textContent = `Page ${currentPage} of ${totalPages} | Total: ${filteredItems.length} items`;
    paginationDiv.appendChild(info);
}

/**
 * Go to specific page
 * @param {number} page - Page number
 */
function goToPage(page) {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayCatalogue();
    displayPagination();
    
    // Scroll to top of grid
    document.getElementById('catalogueGrid').scrollIntoView({ behavior: 'smooth' });
}

/**
 * View item details
 * @param {number} id - Item ID
 * @param {string} name - Item name
 */
function viewDetails(id, name) {
    const item = allItems.find(i => i.id === id);
    if (item) {
        alert(`
PRODUCT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${item.name}
Category: ${item.category}
Price: ${formatCurrency(item.price)}
Weight: ${item.weight}
Purity: ${item.purity}
In Stock: ${item.stock} pieces

For inquiry or purchase, use the "Inquire" button.
        `);
    }
}

/**
 * Add item to inquiry cart
 * @param {number} id - Item ID
 * @param {string} name - Item name
 * @param {number} price - Item price
 */
function addToCatalogueCart(id, name, price) {
    const inquiryItem = { id, name, price, quantity: 1 };
    
    let inquiries = JSON.parse(sessionStorage.getItem('catalogueInquiries')) || [];
    
    const existing = inquiries.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        inquiries.push(inquiryItem);
    }
    
    sessionStorage.setItem('catalogueInquiries', JSON.stringify(inquiries));
    
    showSuccess(`${name} added to your inquiry! (${inquiries.length} items in inquiry)`);
}

/**
 * Download catalogue as PDF
 */
function downloadCatalogue() {
    if (filteredItems.length === 0) {
        showError('No items to download');
        return;
    }

    let pdfContent = `
╔════════════════════════════════════════════════════╗
║           JMAAS E-CATALOGUE                        ║
║    Jewellery Management as a Service               ║
║    Sparkling Gems Store                            ║
╚════════════════════════════════════════════════════╝

PRODUCT LISTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    filteredItems.forEach((item, index) => {
        pdfContent += `
${index + 1}. ${item.name}
   Category: ${item.category}
   Price: ${formatCurrency(item.price)}
   Weight: ${item.weight}
   Purity: ${item.purity}
   In Stock: ${item.stock} pieces
   ─────────────────────────────────────────────────
`;
    });

    pdfContent += `

For inquiries, contact: info@sparklinggems.in
Phone: 011-XXXX-XXXX

Generated on: ${new Date().toLocaleDateString('en-IN')}
    `;

    // Create downloadable file
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(pdfContent));
    element.setAttribute('download', `jmaas-catalogue-${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showSuccess('Catalogue downloaded successfully!');
}
