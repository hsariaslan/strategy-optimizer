// TradingView Strategy Optimizer - Background Service Worker
// By Hakan Sarıaslan

console.log('TradingView Strategy Optimizer - Background Service Worker Loaded');

// Listen for extension installation
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === 'install') {
        console.log('Extension installed for the first time');
        
        // Set default options
        chrome.storage.local.set({
            optimizerOptions: {
                optimizationGoal: 'profit',
                iterations: 100,
                delay: 1000,
                autoSave: true
            }
        });

        // Open welcome page or show notification
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon128.png',
            title: 'TradingView Strategy Optimizer',
            message: 'Extension installed successfully! Click the extension icon to get started.'
        });
    } else if (details.reason === 'update') {
        console.log('Extension updated to version:', chrome.runtime.getManifest().version);
    }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Background received message:', message);

    switch (message.action) {
        case 'saveResults':
            handleSaveResults(message.results);
            break;
        
        case 'getResults':
            handleGetResults(sendResponse);
            return true; // Keep channel open for async response
        
        case 'clearResults':
            handleClearResults(sendResponse);
            return true;
        
        default:
            console.log('Unknown action:', message.action);
    }
});

// Handle saving optimization results
async function handleSaveResults(results) {
    try {
        // Get existing results
        const { optimizationResults = [] } = await chrome.storage.local.get('optimizationResults');
        
        // Add timestamp
        results.timestamp = new Date().toISOString();
        
        // Add to results array
        optimizationResults.push(results);
        
        // Keep only last 50 results
        if (optimizationResults.length > 50) {
            optimizationResults.shift();
        }
        
        // Save to storage
        await chrome.storage.local.set({ optimizationResults });
        
        console.log('Results saved successfully');
    } catch (error) {
        console.error('Error saving results:', error);
    }
}

// Handle getting optimization results
async function handleGetResults(sendResponse) {
    try {
        const { optimizationResults = [] } = await chrome.storage.local.get('optimizationResults');
        sendResponse({ success: true, results: optimizationResults });
    } catch (error) {
        console.error('Error getting results:', error);
        sendResponse({ success: false, error: error.message });
    }
}

// Handle clearing optimization results
async function handleClearResults(sendResponse) {
    try {
        await chrome.storage.local.set({ optimizationResults: [] });
        sendResponse({ success: true });
    } catch (error) {
        console.error('Error clearing results:', error);
        sendResponse({ success: false, error: error.message });
    }
}

// Listen for tab updates to check if we're on TradingView
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes('tradingview.com')) {
        console.log('TradingView page loaded:', tab.url);
        
        // We could send a message to the content script here if needed
        chrome.tabs.sendMessage(tabId, { 
            action: 'pageLoaded',
            url: tab.url 
        }).catch(err => {
            // Ignore errors if content script is not ready yet
            console.log('Content script not ready yet');
        });
    }
});

// Keep service worker alive
chrome.runtime.onConnect.addListener((port) => {
    console.log('Port connected:', port.name);
});

// Handle errors
self.addEventListener('error', (event) => {
    console.error('Background script error:', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
