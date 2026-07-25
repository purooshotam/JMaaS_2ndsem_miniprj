// ========================================
// BILLING PAGE SCRIPT
// Handle bill calculation and printing
// ========================================

// Initialize header and check authentication
initializeHeader();

let billItems = [];

// Load bill items when page loads
window.addEventListener('load', loadBillItems);

/**
 * Load bill items from session storage
 */
function loadBillItems() {
    billItems = JSON.parse(sessionStorage.getItem('billItems')) || [];
    
    if (billItems.length === 0) {
        document.getElementById('billItemsContainer').style.display = 'none';
        document.getElementById('emptyCart').style.display = 'block';
    } else {
        document.getElementById('billItemsContainer').style.display = 'block';
        document.getElementById('emptyCart').style.display = 'none';
        displayBillItems();
        updateBillSummary();
    }
}

/**
 * Display bill items in table format
 */
function displayBillItems() {
    const container = document.getElementById('billItemsContainer');
    container.innerHTML = '';

    // Create table header
    const table = document.createElement('table');
    table.innerHTML = `
        <tr style="background: #d4af37; color: #2c3e50;">
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
        </tr>
    `;

    // Add rows for each item
    billItems.forEach((item, index) => {
        const itemSubtotal = item.price * item.quantity;
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${formatCurrency(item.price)}</td>
            <td>
                <div class="bill-item-qty">
                    <button style="padding: 5px 8px; cursor: pointer;" onclick="updateQuantity(${index}, -1)">-</button>
                    <input type="number" value="${item.quantity}" class="qty-input" onchange="updateQuantityDirect(${index}, this.value)" min="1">
                    <button style="padding: 5px 8px; cursor: pointer;" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </td>
            <td>${formatCurrency(itemSubtotal)}</td>
            <td><button class="btn-remove" onclick="removeItem(${index})">Remove</button></td>
        `;
        
        table.appendChild(row);
    });

    container.appendChild(table);
}

/**
 * Update quantity of an item
 * @param {number} index - Item index in array
 * @param {number} change - Amount to change quantity by
 */
function updateQuantity(index, change) {
    billItems[index].quantity += change;
    
    // Ensure quantity is at least 1
    if (billItems[index].quantity < 1) {
        billItems[index].quantity = 1;
    }
    
    saveBillItems();
    displayBillItems();
    updateBillSummary();
}

/**
 * Update quantity directly from input
 * @param {number} index - Item index
 * @param {number} value - New quantity value
 */
function updateQuantityDirect(index, value) {
    const qty = parseInt(value) || 1;
    if (qty < 1) {
        billItems[index].quantity = 1;
    } else {
        billItems[index].quantity = qty;
    }
    
    saveBillItems();
    displayBillItems();
    updateBillSummary();
}

/**
 * Remove item from bill
 * @param {number} index - Item index to remove
 */
function removeItem(index) {
    billItems.splice(index, 1);
    saveBillItems();
    
    if (billItems.length === 0) {
        document.getElementById('billItemsContainer').style.display = 'none';
        document.getElementById('emptyCart').style.display = 'block';
    } else {
        displayBillItems();
        updateBillSummary();
    }
    
    showSuccess('Item removed from bill');
}

/**
 * Update and display bill summary
 */
function updateBillSummary() {
    const subtotal = billItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = calculateGST(subtotal);
    const total = subtotal + gst;

    // Update display
    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('gstAmount').textContent = formatCurrency(gst);
    document.getElementById('totalAmount').textContent = formatCurrency(total);
}

/**
 * Save bill items to session storage
 */
function saveBillItems() {
    sessionStorage.setItem('billItems', JSON.stringify(billItems));
}

/**
 * Print the bill
 */
function printBill() {
    if (billItems.length === 0) {
        showError('No items in bill to print');
        return;
    }

    const subtotal = billItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const gst = calculateGST(subtotal);
    const total = subtotal + gst;

    // Create print window
    const printWindow = window.open('', '', 'height=600,width=800');
    
    let itemsHTML = '';
    billItems.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        itemsHTML += `
            <tr>
                <td style="border-bottom: 1px solid #ddd; padding: 10px;">${item.name}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px; text-align: right;">₹${item.price.toLocaleString('en-IN')}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px; text-align: center;">${item.quantity}</td>
                <td style="border-bottom: 1px solid #ddd; padding: 10px; text-align: right;">₹${itemSubtotal.toLocaleString('en-IN')}</td>
            </tr>
        `;
    });

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice - JMaaS</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .invoice-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
                .invoice-header h1 { margin: 0; color: #d4af37; }
                .invoice-header p { margin: 5px 0; color: #666; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th { background: #d4af37; color: #2c3e50; padding: 10px; text-align: left; }
                tr:last-child td { border-bottom: 2px solid #333; }
                .summary { margin-left: auto; width: 300px; }
                .summary-row { display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #ddd; }
                .summary-row.total { font-size: 1.3em; font-weight: bold; color: #d4af37; border-bottom: 2px solid #333; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 0.9em; }
            </style>
        </head>
        <body>
            <div class="invoice-header">
                <h1>💎 JMAAS INVOICE 💎</h1>
                <p>Sparkling Gems Store</p>
                <p>New Delhi, India</p>
            </div>

            <table>
                <tr style="background: #d4af37; color: #2c3e50;">
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                </tr>
                ${itemsHTML}
            </table>

            <div class="summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>₹${subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div class="summary-row">
                    <span>GST (18%):</span>
                    <span>₹${gst.toLocaleString('en-IN')}</span>
                </div>
                <div class="summary-row total">
                    <span>Total Amount:</span>
                    <span>₹${total.toLocaleString('en-IN')}</span>
                </div>
            </div>

            <div class="footer">
                <p>Thank you for your purchase!</p>
                <p>Invoice generated on ${new Date().toLocaleDateString('en-IN')}</p>
                <p style="margin-top: 20px;">Please retain this invoice for your records.</p>
            </div>
        </body>
        </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Trigger print dialog after content loads
    setTimeout(() => {
        printWindow.print();
    }, 250);
    
    showSuccess('Invoice opened for printing');
}

/**
 * Clear all items from bill
 */
function clearBill() {
    if (confirm('Are you sure you want to clear the entire bill?')) {
        billItems = [];
        saveBillItems();
        document.getElementById('billItemsContainer').style.display = 'none';
        document.getElementById('emptyCart').style.display = 'block';
        showSuccess('Bill cleared');
    }
}
