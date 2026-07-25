// ========================================
// GREETING GENERATOR PAGE SCRIPT
// AI-powered greeting generation
// ========================================

// Initialize header and check authentication
initializeHeader();

/**
 * Generate greeting and display
 */
async function generateGreetingHandler() {
    const customerName = document.getElementById('customerName').value.trim();
    const occasion = document.getElementById('occasion').value;

    // Validation
    if (!customerName) {
        showError('Please enter customer name');
        return;
    }

    if (!occasion) {
        showError('Please select an occasion');
        return;
    }

    try {
        // Call API to generate greeting
        const greeting = await generateGreeting(customerName, occasion);

        if (greeting) {
            // Display greeting
            const output = document.getElementById('greetingOutput');
            output.innerHTML = `<p style="font-size: 1.1em; line-height: 1.8;">${greeting}</p>`;

            // Show action buttons
            document.getElementById('copyBtn').style.display = 'block';
            document.getElementById('whatsappBtn').style.display = 'block';
            document.getElementById('emailBtn').style.display = 'block';

            // Store current greeting for sharing
            window.currentGreeting = greeting;
            window.currentCustomer = customerName;

            showSuccess('Greeting generated successfully!');
        } else {
            showError('Failed to generate greeting');
        }
    } catch (error) {
        console.error('Error generating greeting:', error);
        showError('Error generating greeting');
    }
}

/**
 * Copy greeting to clipboard
 */
function copyGreeting() {
    const greeting = window.currentGreeting;
    if (!greeting) {
        showError('No greeting to copy');
        return;
    }

    copyToClipboard(greeting);
    
    // Show confirmation message
    const copySuccess = document.getElementById('copySuccess');
    copySuccess.style.display = 'block';
    setTimeout(() => {
        copySuccess.style.display = 'none';
    }, 3000);
}

/**
 * Share greeting via WhatsApp
 */
function shareOnWhatsApp() {
    const greeting = window.currentGreeting;
    if (!greeting) {
        showError('No greeting to share');
        return;
    }

    // Encode greeting for URL
    const encodedGreeting = encodeURIComponent(greeting);
    
    // WhatsApp Web URL
    const whatsappURL = `https://web.whatsapp.com/send?text=${encodedGreeting}`;
    
    // Open WhatsApp in new window
    window.open(whatsappURL, '_blank');
    
    showSuccess('Opening WhatsApp...');
}

/**
 * Share greeting via Email
 */
function shareViaEmail() {
    const greeting = window.currentGreeting;
    const customer = window.currentCustomer;
    
    if (!greeting) {
        showError('No greeting to share');
        return;
    }

    // Create email subject and body
    const subject = encodeURIComponent(`Special Greeting for ${customer}`);
    const body = encodeURIComponent(greeting + '\n\nSent from JMaaS - Jewellery Management System');

    // Open email client
    const mailtoURL = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoURL);
    
    showSuccess('Opening email client...');
}

// Allow Enter key to generate greeting
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && event.target.id === 'customerName') {
        event.preventDefault();
        generateGreetingHandler();
    }
});

// Allow Enter key in occasion select
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && event.target.id === 'occasion') {
        event.preventDefault();
        generateGreetingHandler();
    }
});
