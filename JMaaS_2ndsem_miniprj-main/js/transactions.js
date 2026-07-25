// ========================================
// TRANSACTION HISTORY MODULE
// Displays all transactions and statistics
// ========================================

let allTransactions = [];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  initializeHeader();
  loadTransactions();
});

// Load transactions from API
async function loadTransactions() {
  try {
    const response = await fetch('/api/transactions');
    const data = await response.json();

    if (data.success) {
      allTransactions = data.data;
      displayTransactions(allTransactions);
      calculateSummary();
    } else {
      showError('Failed to load transactions');
    }
  } catch (error) {
    showError('Error loading transactions: ' + error.message);
    console.error('Error:', error);
  }
}

// Display transactions in table
function displayTransactions(transactions) {
  const tbody = document.getElementById('transactionsBody');
  const emptyState = document.getElementById('emptyState');

  if (transactions.length === 0) {
    tbody.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';

  tbody.innerHTML = transactions.map(transaction => `
    <tr style="border-bottom: 1px solid var(--border-color);">
      <td style="padding: 12px; text-align: left;">${formatDate(transaction.date)}</td>
      <td style="padding: 12px; text-align: left;">
        <code style="background: var(--light-bg); padding: 3px 6px; border-radius: 3px; font-size: 0.9em;">#${transaction.id}</code>
      </td>
      <td style="padding: 12px; text-align: left;">
        <span style="background: var(--light-bg); padding: 4px 8px; border-radius: 3px; font-size: 0.9em;">${transaction.items.length} items</span>
      </td>
      <td style="padding: 12px; text-align: right;">₹${formatCurrency(transaction.subtotal)}</td>
      <td style="padding: 12px; text-align: right;">₹${formatCurrency(transaction.gst)}</td>
      <td style="padding: 12px; text-align: right; font-weight: bold; color: var(--primary-color);">₹${formatCurrency(transaction.total)}</td>
      <td style="padding: 12px; text-align: center;">
        <span style="background: var(--success-color); color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.85em;">
          ${transaction.status}
        </span>
      </td>
      <td style="padding: 12px; text-align: center;">
        <button onclick="viewTransactionDetails(${JSON.stringify(transaction).replace(/"/g, '&quot;')})" 
          style="background: var(--primary-color); color: white; border: none; padding: 6px 12px; border-radius: 3px; cursor: pointer; font-size: 0.9em;">
          View
        </button>
      </td>
    </tr>
  `).join('');
}

// Calculate and display summary statistics
function calculateSummary() {
  const totalSales = allTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalGST = allTransactions.reduce((sum, t) => sum + t.gst, 0);
  const avgTransaction = allTransactions.length > 0 ? totalSales / allTransactions.length : 0;

  document.getElementById('totalSales').textContent = totalSales.toLocaleString('en-IN');
  document.getElementById('totalGST').textContent = Math.round(totalGST).toLocaleString('en-IN');
  document.getElementById('avgTransaction').textContent = Math.round(avgTransaction).toLocaleString('en-IN');
  document.getElementById('totalTransactions').textContent = allTransactions.length;
}

// View transaction details
function viewTransactionDetails(transaction) {
  const modal = document.getElementById('transactionModal');
  const details = document.getElementById('transactionDetails');

  const itemsHTML = transaction.items.map(item => `
    <tr style="border-bottom: 1px solid var(--border-color);">
      <td style="padding: 10px; text-align: left;">${item.name}</td>
      <td style="padding: 10px; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; text-align: right;">₹${formatCurrency(item.price)}</td>
      <td style="padding: 10px; text-align: right;">₹${formatCurrency(item.price * item.quantity)}</td>
    </tr>
  `).join('');

  details.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
      <div>
        <small style="color: var(--text-light);">Transaction ID</small>
        <p style="margin: 5px 0; font-weight: bold;">#${transaction.id}</p>
      </div>
      <div>
        <small style="color: var(--text-light);">Date</small>
        <p style="margin: 5px 0; font-weight: bold;">${formatDate(transaction.date)}</p>
      </div>
      <div>
        <small style="color: var(--text-light);">Status</small>
        <p style="margin: 5px 0; font-weight: bold; color: var(--success-color);">${transaction.status}</p>
      </div>
      <div>
        <small style="color: var(--text-light);">Payment Method</small>
        <p style="margin: 5px 0; font-weight: bold;">${transaction.paymentMethod}</p>
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <h3 style="color: var(--secondary-color); margin-bottom: 10px;">Items</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead style="background-color: var(--light-bg);">
          <tr style="border-bottom: 1px solid var(--border-color);">
            <th style="padding: 10px; text-align: left;">Item</th>
            <th style="padding: 10px; text-align: center;">Qty</th>
            <th style="padding: 10px; text-align: right;">Price</th>
            <th style="padding: 10px; text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>
    </div>

    <div style="background: var(--light-bg); padding: 15px; border-radius: 5px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <span>Subtotal:</span>
        <strong>₹${formatCurrency(transaction.subtotal)}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <span>GST (18%):</span>
        <strong>₹${formatCurrency(transaction.gst)}</strong>
      </div>
      <div style="display: flex; justify-content: space-between; border-top: 2px solid white; padding-top: 10px; font-size: 1.2em;">
        <span>Total:</span>
        <strong style="color: var(--primary-color);">₹${formatCurrency(transaction.total)}</strong>
      </div>
    </div>
  `;

  modal.style.display = 'flex';
}

// Close transaction modal
function closeTransactionModal() {
  document.getElementById('transactionModal').style.display = 'none';
}

// Print transaction
function printTransaction() {
  window.print();
}

// Export transactions to CSV
function exportTransactions() {
  if (allTransactions.length === 0) {
    showError('No transactions to export');
    return;
  }

  let csv = 'Date,Transaction ID,Items Count,Subtotal,GST,Total,Status\n';

  allTransactions.forEach(transaction => {
    const date = formatDate(transaction.date);
    const itemsCount = transaction.items.length;
    const subtotal = transaction.subtotal;
    const gst = transaction.gst;
    const total = transaction.total;
    const status = transaction.status;

    csv += `${date},#${transaction.id},${itemsCount},₹${subtotal},₹${gst},₹${total},${status}\n`;
  });

  downloadFile(csv, 'transactions.csv', 'text/csv');
}

// Helper functions
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

function formatCurrency(amount) {
  return parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function downloadFile(content, filename, type) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:' + type + ';charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
  showSuccess('File downloaded successfully!');
}

// Filter transactions by date
document.getElementById('filterDate')?.addEventListener('change', (e) => {
  const selectedDate = e.target.value;
  if (selectedDate) {
    const filtered = allTransactions.filter(t => {
      const transactionDate = new Date(t.date).toISOString().split('T')[0];
      return transactionDate === selectedDate;
    });
    displayTransactions(filtered);
  } else {
    displayTransactions(allTransactions);
  }
});

// Filter transactions by status
document.getElementById('filterStatus')?.addEventListener('change', (e) => {
  const selectedStatus = e.target.value;
  if (selectedStatus) {
    const filtered = allTransactions.filter(t => t.status === selectedStatus);
    displayTransactions(filtered);
  } else {
    displayTransactions(allTransactions);
  }
});

// Close modal when clicking outside
document.getElementById('transactionModal')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('transactionModal')) {
    closeTransactionModal();
  }
});
