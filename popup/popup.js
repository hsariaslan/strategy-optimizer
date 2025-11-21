// TradingView Strategy Optimizer - Popup Script
// By Hakan Sarıaslan

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeButtons();
    loadSavedOptions();
});

// Tab switching functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding tab pane
            const tabName = button.getAttribute('data-tab');
            const targetPane = document.getElementById(`${tabName}-tab`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// Initialize button event listeners
function initializeButtons() {
    // Optimize button
    const optimizeBtn = document.getElementById('optimizeBtn');
    optimizeBtn.addEventListener('click', handleOptimize);

    // Export button
    const exportBtn = document.getElementById('exportBtn');
    exportBtn.addEventListener('click', handleExport);

    // Save options button
    const saveOptionsBtn = document.getElementById('saveOptionsBtn');
    saveOptionsBtn.addEventListener('click', handleSaveOptions);
}

// Handle optimization start
async function handleOptimize() {
    try {
        // Check if we're on TradingView
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (!tab.url || !tab.url.includes('tradingview.com')) {
            showNotification('Please navigate to TradingView first', 'error');
            return;
        }

        // Get options
        const options = await getOptions();

        // Send message to content script
        await chrome.tabs.sendMessage(tab.id, { 
            action: 'startOptimization',
            options: options
        });

        showNotification('Opening strategy parameters...', 'info');

    } catch (error) {
        console.error('Optimization error:', error);
        showNotification(error.message || 'Failed to start optimization', 'error');
    }
}

// Handle export
function handleExport() {
    // TODO: Implement export functionality
    showNotification('Export functionality coming soon!', 'info');
}

// Handle save options
async function handleSaveOptions() {
    const options = {
        optimizationGoal: document.getElementById('optimizationGoal').value,
        iterations: parseInt(document.getElementById('iterations').value),
        delay: parseInt(document.getElementById('delay').value),
        autoSave: document.getElementById('autoSave').checked
    };

    try {
        await chrome.storage.local.set({ optimizerOptions: options });
        showNotification('Settings saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving options:', error);
        showNotification('Failed to save settings', 'error');
    }
}

// Load saved options
async function loadSavedOptions() {
    try {
        const result = await chrome.storage.local.get('optimizerOptions');
        
        if (result.optimizerOptions) {
            const options = result.optimizerOptions;
            document.getElementById('optimizationGoal').value = options.optimizationGoal || 'profit';
            document.getElementById('iterations').value = options.iterations || 10;
            document.getElementById('delay').value = options.delay || 1000;
            document.getElementById('autoSave').checked = options.autoSave !== false;
        }
    } catch (error) {
        console.error('Error loading options:', error);
    }
}

// Get current options
async function getOptions() {
    const result = await chrome.storage.local.get('optimizerOptions');
    return result.optimizerOptions || {
        optimizationGoal: 'profit',
        iterations: 10,
        delay: 1000,
        autoSave: true
    };
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 70px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#667eea'};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 13px;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Show error
function showError(message) {
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');

    statusDot.classList.remove('running');
    statusDot.classList.add('error');
    statusText.textContent = message;

    showNotification(message, 'error');
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);
