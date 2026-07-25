// ========================================
// ANALYTICS PAGE SCRIPT
// Display business metrics and insights
// ========================================

// Initialize header and check authentication
initializeHeader();

let allItems = [];
let allStats = null;

// Load analytics when page loads
window.addEventListener('load', loadAnalytics);

/**
 * Load analytics data
 */
async function loadAnalytics() {
    try {
        // Fetch inventory and stats
        allItems = await getInventory();
        allStats = await getStats();

        if (allItems && allStats) {
            displayKPIs();
            displayCharts();
            displayInventorySummary();
        } else {
            showError('Failed to load analytics data');
        }
    } catch (error) {
        console.error('Error loading analytics:', error);
        showError('Error loading analytics');
    }
}

/**
 * Update analytics based on selected time period
 */
function updateAnalytics() {
    const timePeriod = document.getElementById('timeFilter').value;
    // In a real application, this would filter data based on date range
    // For now, we display all data
    loadAnalytics();
}

/**
 * Display KPI cards
 */
function displayKPIs() {
    if (!allStats) return;

    document.getElementById('kpiInventoryValue').textContent = formatCurrency(allStats.totalInventoryValue);
    document.getElementById('kpiStockCount').textContent = allStats.totalStock;
    document.getElementById('kpiProductCount').textContent = allStats.totalItems;
    document.getElementById('kpiCustomerCount').textContent = allStats.totalCustomers;
    document.getElementById('kpiCategoryCount').textContent = allStats.categories.length;
}

/**
 * Display analytics charts
 */
function displayCharts() {
    displayCategoryChart();
    displayStockStatus();
}

/**
 * Display category distribution bar chart
 */
function displayCategoryChart() {
    const categoryChart = document.getElementById('categoryChart');
    categoryChart.innerHTML = '';

    // Count items by category
    const categoryCounts = {};
    const categoryValues = {};
    
    allItems.forEach(item => {
        if (!categoryCounts[item.category]) {
            categoryCounts[item.category] = 0;
            categoryValues[item.category] = 0;
        }
        categoryCounts[item.category]++;
        categoryValues[item.category] += item.stock;
    });

    // Create bars
    const maxCount = Math.max(...Object.values(categoryCounts));
    
    Object.keys(categoryCounts).forEach(category => {
        const count = categoryCounts[category];
        const percentage = (count / maxCount) * 100;

        const bar = document.createElement('div');
        bar.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
            flex: 1;
            height: 100%;
        `;

        const barBox = document.createElement('div');
        barBox.style.cssText = `
            width: 100%;
            height: ${percentage}%;
            background: linear-gradient(180deg, #d4af37, #c9860f);
            border-radius: 5px 5px 0 0;
            margin-bottom: 10px;
            transition: all 0.3s;
            cursor: pointer;
            min-height: 30px;
        `;

        barBox.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(180deg, #e8c547, #d4af37)';
            labelBox.style.display = 'block';
        });

        barBox.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(180deg, #d4af37, #c9860f)';
            labelBox.style.display = 'none';
        });

        const labelBox = document.createElement('div');
        labelBox.style.cssText = `
            position: absolute;
            background: #2c3e50;
            color: white;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 0.85em;
            white-space: nowrap;
            display: none;
        `;
        labelBox.textContent = count;

        const label = document.createElement('div');
        label.textContent = category;
        label.style.cssText = `
            font-size: 0.85em;
            color: #7f8c8d;
            text-align: center;
            width: 100%;
        `;

        bar.appendChild(barBox);
        bar.appendChild(label);
        categoryChart.appendChild(bar);
    });
}

/**
 * Display stock status summary
 */
function displayStockStatus() {
    let goodStock = 0;
    let lowStock = 0;
    let outOfStock = 0;

    allItems.forEach(item => {
        if (item.stock === 0) {
            outOfStock++;
        } else if (item.stock < 5) {
            lowStock++;
        } else {
            goodStock++;
        }
    });

    const stockStatusDiv = document.getElementById('stockStatus');
    stockStatusDiv.innerHTML = `
        <div style="margin-bottom: 10px;">
            <strong style="color: #27ae60;">Good Stock (>5):</strong> ${goodStock} items
        </div>
        <div style="margin-bottom: 10px;">
            <strong style="color: #f39c12;">Low Stock (1-4):</strong> ${lowStock} items
        </div>
        <div>
            <strong style="color: #e74c3c;">Out of Stock:</strong> ${outOfStock} items
        </div>
    `;
}

/**
 * Display inventory summary table
 */
function displayInventorySummary() {
    const table = document.getElementById('inventorySummaryTable');
    
    // Get header row
    const headerRow = table.querySelector('tr:first-child');
    
    // Remove all rows except header
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    allItems.forEach((item, index) => {
        const row = table.insertRow();
        const itemValue = item.price * item.stock;
        
        row.style.backgroundColor = index % 2 === 0 ? '#ffffff' : '#f9f9f9';
        row.style.borderBottom = '1px solid #ddd';

        row.innerHTML = `
            <td style="padding: 15px; text-align: left; color: #2c3e50;">${item.name}</td>
            <td style="padding: 15px; text-align: left; color: #7f8c8d;">${item.category}</td>
            <td style="padding: 15px; text-align: right; color: #d4af37; font-weight: 600;">${formatCurrency(item.price)}</td>
            <td style="padding: 15px; text-align: center; color: #2c3e50;">
                <span style="display: inline-block; padding: 5px 10px; background: ${item.stock === 0 ? '#f8d7da' : item.stock < 5 ? '#fff3cd' : '#d4edda'}; border-radius: 20px; font-size: 0.9em; font-weight: 600;">
                    ${item.stock}
                </span>
            </td>
            <td style="padding: 15px; text-align: right; color: #2c3e50; font-weight: 600;">${formatCurrency(itemValue)}</td>
        `;
    });
}

/**
 * Export analytics report as PDF/text
 */
function exportReport() {
    const timePeriod = document.getElementById('timeFilter').value;
    const timestamp = new Date().toLocaleDateString('en-IN');

    let reportContent = `
╔════════════════════════════════════════════════════╗
║    JMAAS ANALYTICS REPORT                          ║
║    ${timestamp}                            ║
╚════════════════════════════════════════════════════╝

TIME PERIOD: ${timePeriod}

KEY PERFORMANCE INDICATORS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Inventory Value: ${formatCurrency(allStats.totalInventoryValue)}
Total Items in Stock: ${allStats.totalStock}
Unique Products: ${allStats.totalItems}
Total Customers: ${allStats.totalCustomers}
Product Categories: ${allStats.categories.length}

INVENTORY SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Item Name                      | Category      | Stock | Value
──────────────────────────────────────────────────────
`;

    allItems.forEach(item => {
        const itemValue = item.price * item.stock;
        reportContent += `${item.name.padEnd(30)} | ${item.category.padEnd(13)} | ${String(item.stock).padStart(5)} | ${formatCurrency(itemValue)}
`;
    });

    reportContent += `
CATEGORIES: ${allStats.categories.join(', ')}

Generated by JMaaS - Jewellery Management System
    `;

    // Create downloadable file
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportContent));
    element.setAttribute('download', `jmaas-report-${new Date().getTime()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showSuccess('Report exported successfully!');
}
