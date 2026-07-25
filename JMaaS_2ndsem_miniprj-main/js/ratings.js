// ========================================
// RATINGS & REVIEWS MODULE
// Product rating system with star ratings
// ========================================

let allRatings = [];
let allProducts = [];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  checkAuth();
  initializeHeader();
  loadProducts();
  loadRatings();
});

// Load products from inventory
async function loadProducts() {
  try {
    const response = await fetch('/api/inventory');
    const data = await response.json();

    if (data.success) {
      allProducts = data.data;
      populateProductSelects();
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

// Populate product select dropdowns
function populateProductSelects() {
  const productSelect = document.getElementById('productSelect');
  const filterProduct = document.getElementById('filterProduct');

  allProducts.forEach(product => {
    const option1 = document.createElement('option');
    option1.value = product.id;
    option1.textContent = product.name;
    productSelect.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = product.id;
    option2.textContent = product.name;
    filterProduct.appendChild(option2);
  });
}

// Load all ratings
async function loadRatings() {
  try {
    const response = await fetch('/api/ratings');
    const data = await response.json();

    if (data.success) {
      allRatings = data.data;
      displayRatings(allRatings);
      calculateSummary();
    }
  } catch (error) {
    console.error('Error loading ratings:', error);
    showError('Failed to load ratings');
  }
}

// Display ratings list
function displayRatings(ratings) {
  const ratingsList = document.getElementById('ratingsList');

  if (ratings.length === 0) {
    ratingsList.innerHTML = `
      <div style="text-align: center; padding: 40px; color: var(--text-light);">
        <div style="font-size: 2em; margin-bottom: 10px;">😌</div>
        <p>No ratings yet. Be the first to review!</p>
      </div>
    `;
    return;
  }

  ratingsList.innerHTML = ratings.map(rating => `
    <div style="background: var(--light-bg); padding: 20px; border-radius: 8px; margin-bottom: 15px; border-left: 4px solid var(--primary-color);">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
        <div>
          <h3 style="color: var(--secondary-color); margin: 0 0 5px 0; font-size: 1.1em;">${sanitizeInput(rating.productName)}</h3>
          <div style="color: var(--primary-color); font-size: 1.2em; margin-bottom: 8px;">
            ${getStarDisplay(rating.rating)}
          </div>
        </div>
        <small style="color: var(--text-light);">${formatRatingDate(rating.date)}</small>
      </div>
      ${rating.comment ? `
        <p style="color: var(--text-dark); margin: 10px 0; font-style: italic;">
          "${sanitizeInput(rating.comment)}"
        </p>
      ` : ''}
    </div>
  `).join('');
}

// Calculate and display summary statistics
function calculateSummary() {
  if (allRatings.length === 0) {
    document.getElementById('avgRating').textContent = 'N/A';
    document.getElementById('totalRatings').textContent = '0';
    return;
  }

  const avgRating = (allRatings.reduce((sum, r) => sum + r.rating, 0) / allRatings.length).toFixed(1);
  const fiveStarCount = allRatings.filter(r => r.rating === 5).length;
  const fiveStarPercent = Math.round((fiveStarCount / allRatings.length) * 100);

  // Find most rated product
  const productCounts = {};
  allRatings.forEach(r => {
    productCounts[r.productName] = (productCounts[r.productName] || 0) + 1;
  });
  const topProduct = Object.entries(productCounts).sort((a, b) => b[1] - a[1])[0];

  document.getElementById('avgRating').textContent = avgRating;
  document.getElementById('fiveStarCount').textContent = fiveStarCount;
  document.getElementById('fiveStarPercent').textContent = fiveStarPercent;
  document.getElementById('totalRatings').textContent = allRatings.length;
  document.getElementById('topProduct').textContent = topProduct ? topProduct[0] : 'Loading...';
}

// Get star display HTML
function getStarDisplay(rating) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return '⭐'.repeat(fullStars) + '☆'.repeat(emptyStars);
}

// Handle rating form submission
document.getElementById('ratingForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const productId = parseInt(document.getElementById('productSelect').value);
  const productName = document.getElementById('productSelect').options[document.getElementById('productSelect').selectedIndex].text;
  const rating = parseInt(document.getElementById('rating').value);
  const comment = document.getElementById('comment').value.trim();

  if (!productId || !rating) {
    showError('Please select a product and rating');
    return;
  }

  try {
    const response = await fetch('/api/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        productName,
        rating,
        comment: comment || null,
        customerId: null
      })
    });

    const data = await response.json();

    if (data.success) {
      showSuccess('Rating submitted successfully!');
      document.getElementById('ratingForm').reset();
      loadRatings(); // Reload ratings list
    } else {
      showError(data.message || 'Failed to submit rating');
    }
  } catch (error) {
    showError('Error submitting rating: ' + error.message);
    console.error('Error:', error);
  }
});

// Filter by rating
document.getElementById('filterRating').addEventListener('change', (e) => {
  const selectedRating = e.target.value;
  if (selectedRating) {
    const filtered = allRatings.filter(r => r.rating === parseInt(selectedRating));
    displayRatings(filtered);
  } else {
    const selectedProduct = document.getElementById('filterProduct').value;
    if (selectedProduct) {
      const filtered = allRatings.filter(r => r.productId === parseInt(selectedProduct));
      displayRatings(filtered);
    } else {
      displayRatings(allRatings);
    }
  }
});

// Filter by product
document.getElementById('filterProduct').addEventListener('change', (e) => {
  const selectedProduct = e.target.value;
  if (selectedProduct) {
    const filtered = allRatings.filter(r => r.productId === parseInt(selectedProduct));
    displayRatings(filtered);
  } else {
    const selectedRating = document.getElementById('filterRating').value;
    if (selectedRating) {
      const filtered = allRatings.filter(r => r.rating === parseInt(selectedRating));
      displayRatings(filtered);
    } else {
      displayRatings(allRatings);
    }
  }
});

// Helper function to format date
function formatRatingDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Sanitize input helper
function sanitizeInput(input) {
  if (!input) return '';
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}
