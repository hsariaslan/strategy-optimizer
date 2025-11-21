// TradingView Strategy Optimizer - Content Script
// By Hakan Sarıaslan v0.1.1.1

console.log('TradingView Strategy Optimizer - Content Script Loaded v0.1.1.1');

// Store templates and styles
let modalTemplates = null;
let stylesInjected = false;

// Load modal resources on script initialization
loadModalResources();

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startOptimization') {
        console.log('Starting optimization with options:', message.options);
        handleOptimizationStart(message.options);
        sendResponse({ status: 'started' });
    }
});

// Load modal HTML and CSS files
async function loadModalResources() {
    try {
        // Load CSS
        const cssUrl = chrome.runtime.getURL('content/modal/modal.css');
        const cssResponse = await fetch(cssUrl);
        const cssText = await cssResponse.text();
        
        // Inject CSS
        if (!document.getElementById('tv-optimizer-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'tv-optimizer-modal-styles';
            style.textContent = cssText;
            document.head.appendChild(style);
            stylesInjected = true;
            console.log('Modal CSS loaded successfully');
        }
        
        // Load HTML templates
        const htmlUrl = chrome.runtime.getURL('content/modal/modal.html');
        const htmlResponse = await fetch(htmlUrl);
        const htmlText = await htmlResponse.text();
        
        // Parse HTML and store templates
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        
        modalTemplates = {
            loading: doc.getElementById('loading-modal-template'),
            parameters: doc.getElementById('parameters-modal-template'),
            error: doc.getElementById('error-modal-template')
        };
        
        console.log('Modal templates loaded successfully');
    } catch (error) {
        console.error('Error loading modal resources:', error);
    }
}

// Main handler for optimization start
async function handleOptimizationStart(options) {
    try {
        // Ensure resources are loaded
        if (!modalTemplates || !stylesInjected) {
            await loadModalResources();
            await sleep(100);
        }
        
        // Check if we have TVHelper
        if (!window.TVHelper) {
            throw new Error('TVHelper not loaded. Please refresh the page.');
        }

        // Show loading state
        showLoadingModal();

        // Open strategy settings
        await window.TVHelper.openStrategySettings();
        
        // Wait a bit for dialog to be fully rendered
        await window.TVHelper.sleep(1000);
        
        // Extract parameters
        const parameters = window.TVHelper.extractParameters();
        
        if (parameters.length === 0) {
            throw new Error('No parameters found. Make sure a strategy is applied and has input parameters.');
        }

        // Get strategy name
        const strategyName = window.TVHelper.getStrategyName();
        
        // Close strategy settings
        window.TVHelper.closeStrategySettings();
        
        // Wait a bit
        await window.TVHelper.sleep(300);
        
        // Show parameters modal
        showParametersModal(strategyName, parameters, options);

    } catch (error) {
        console.error('Optimization error:', error);
        
        // Close any open dialogs
        if (window.TVHelper) {
            window.TVHelper.closeStrategySettings();
        }
        
        showErrorModal(error.message);
    }
}

// Show loading modal
function showLoadingModal() {
    removeExistingModal();
    
    if (!modalTemplates || !modalTemplates.loading) {
        console.error('Loading template not available');
        return;
    }
    
    const template = modalTemplates.loading;
    const clone = template.content.cloneNode(true);
    document.body.appendChild(clone);
}

// Show parameters modal
function showParametersModal(strategyName, parameters, options) {
    removeExistingModal();
    
    if (!modalTemplates || !modalTemplates.parameters) {
        console.error('Parameters template not available');
        return;
    }
    
    const template = modalTemplates.parameters;
    const clone = template.content.cloneNode(true);
    
    // Fill in strategy name
    const strategyNameEl = clone.getElementById('strategy-name-display');
    if (strategyNameEl) {
        strategyNameEl.textContent = strategyName;
    }
    
    // Calculate and display total iterations
    const totalIterations = calculateTotalIterations(parameters, options);
    const iterationsEl = clone.getElementById('total-iterations-display');
    if (iterationsEl) {
        iterationsEl.textContent = totalIterations.toLocaleString();
    }
    
    // Display active parameters info
    const activeParamsLabel = clone.getElementById('active-params-label');
    if (activeParamsLabel) {
        activeParamsLabel.textContent = `Active parameters (${parameters.length}):`;
    }
    
    const paramNamesEl = clone.getElementById('param-names-display');
    if (paramNamesEl) {
        paramNamesEl.textContent = parameters.map(p => p.name).join(', ');
    }
    
    // Create parameter rows
    const tbody = clone.getElementById('parameters-tbody');
    if (tbody) {
        parameters.forEach((param, index) => {
            const row = createParameterRow(param, index);
            tbody.appendChild(row);
        });
    }
    
    // Append to body
    document.body.appendChild(clone);
    
    // Add event listeners after DOM insertion
    setTimeout(() => {
        const closeBtn = document.getElementById('close-modal');
        const cancelBtn = document.getElementById('cancel-btn');
        const startBtn = document.getElementById('start-optimization-btn');
        
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                startOptimizationProcess(parameters, options);
            });
        }
        
        // Add input change listeners
        const inputs = document.querySelectorAll('.param-input');
        inputs.forEach(input => {
            input.addEventListener('input', () => updateIterationsCount(parameters, options));
        });
    }, 0);
}

// Create parameter row element
function createParameterRow(param, index) {
    const tr = document.createElement('tr');
    tr.className = 'param-row';
    
    // Calculate default from/to values
    const fromValue = param.min !== null ? param.min : param.current - 10;
    const toValue = param.max !== null ? param.max : param.current + 10;
    
    tr.innerHTML = `
        <td class="param-checkbox">
            <input type="checkbox" id="param-active-${index}" checked>
        </td>
        <td class="param-name">
            <label for="param-active-${index}">${param.name}</label>
        </td>
        <td class="param-value">
            <input type="number" 
                   id="param-from-${index}" 
                   value="${fromValue}" 
                   step="${param.step}"
                   class="param-input">
        </td>
        <td class="param-value">
            <input type="number" 
                   id="param-to-${index}" 
                   value="${toValue}" 
                   step="${param.step}"
                   class="param-input">
        </td>
        <td class="param-value">
            <input type="number" 
                   id="param-step-${index}" 
                   value="${param.step}" 
                   step="0.1"
                   min="0.1"
                   class="param-input">
        </td>
        <td class="param-value">
            <span class="param-default">${param.current}</span>
        </td>
    `;
    
    return tr;
}

// Show error modal
function showErrorModal(errorMessage) {
    removeExistingModal();
    
    if (!modalTemplates || !modalTemplates.error) {
        console.error('Error template not available');
        alert('Error: ' + errorMessage);
        return;
    }
    
    const template = modalTemplates.error;
    const clone = template.content.cloneNode(true);
    
    const errorMessageEl = clone.getElementById('error-message-display');
    if (errorMessageEl) {
        errorMessageEl.textContent = errorMessage;
    }
    
    document.body.appendChild(clone);
    
    // Add event listener after DOM insertion
    setTimeout(() => {
        const closeBtn = document.getElementById('close-error-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
    }, 0);
}

// Calculate total iterations based on parameter ranges
function calculateTotalIterations(parameters, options) {
    // Use the iterations from options as default
    return options?.iterations || 10;
}

// Update iterations count dynamically
function updateIterationsCount(parameters, options) {
    // TODO: Calculate based on actual parameter ranges
    // For now, just update the display
    const iterationsEl = document.getElementById('total-iterations-display');
    if (iterationsEl) {
        const total = calculateTotalIterations(parameters, options);
        iterationsEl.textContent = total.toLocaleString();
    }
}

// Start optimization process
function startOptimizationProcess(parameters, options) {
    console.log('Starting optimization process with parameters:', parameters);
    
    // Gather parameter values from the form
    const configuredParams = [];
    parameters.forEach((param, index) => {
        const checkbox = document.getElementById(`param-active-${index}`);
        const fromInput = document.getElementById(`param-from-${index}`);
        const toInput = document.getElementById(`param-to-${index}`);
        const stepInput = document.getElementById(`param-step-${index}`);
        
        if (checkbox && checkbox.checked) {
            configuredParams.push({
                name: param.name,
                from: parseFloat(fromInput.value),
                to: parseFloat(toInput.value),
                step: parseFloat(stepInput.value),
                default: param.current
            });
        }
    });
    
    closeModal();
    
    console.log('Configured parameters:', configuredParams);
    
    // TODO: Implement actual optimization logic
    // This will involve:
    // 1. Testing different parameter combinations
    // 2. Recording results
    // 3. Finding optimal parameters
    
    // For now, show a message
    setTimeout(() => {
        showErrorModal('Optimization logic will be implemented in the next version. Parameters are configured and ready!');
    }, 300);
}

// Close modal
function closeModal() {
    removeExistingModal();
}

// Remove existing modal
function removeExistingModal() {
    const existingModal = document.getElementById('tv-optimizer-modal');
    if (existingModal) {
        existingModal.remove();
    }
}

// Helper sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
