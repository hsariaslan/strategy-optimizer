// TradingView DOM Helper
// This file contains selectors and methods to interact with TradingView's strategy panel

const TVHelper = {
    // Selectors for TradingView elements (these may need updates if TV changes their UI)
    selectors: {
        // Strategy settings button - multiple fallback options
        strategySettingsBtn: '[data-name="legend-settings-action"]',
        strategySettingsBtnAlt: 'button[aria-label*="Settings"], button[aria-label*="Format"]',
        
        // Strategy properties dialog - more flexible selectors
        strategyDialog: 'div[data-dialog-name]',
        strategyDialogAlt: 'div[class*="dialog"]',
        strategyDialogAlt2: 'div[role="dialog"]',
        
        // Input fields in strategy settings
        strategyInputs: 'input[type="number"], input[inputmode="numeric"], input[inputmode="decimal"]',
        
        // Strategy name
        strategyName: '[data-name="legend-source-title"]',
        
        // Close button
        closeButton: 'button[aria-label="Close"], button[name="close"]',
        
        // Tabs in strategy dialog
        inputsTab: 'button[data-name="inputs"], button:has-text("Inputs")',
        propertiesTab: 'button[data-name="properties"]',
    },

    // Wait for element to appear
    waitForElement(selector, timeout = 5000) {
        return new Promise((resolve, reject) => {
            const element = document.querySelector(selector);
            if (element) {
                resolve(element);
                return;
            }

            const observer = new MutationObserver((mutations, obs) => {
                const element = document.querySelector(selector);
                if (element) {
                    obs.disconnect();
                    resolve(element);
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject(new Error(`Element ${selector} not found within ${timeout}ms`));
            }, timeout);
        });
    },

    // Find strategy settings button
    async findStrategySettingsButton() {
        try {
            // Try primary selector
            let button = document.querySelector(this.selectors.strategySettingsBtn);
            if (button) return button;

            // Try alternative selector
            button = document.querySelector(this.selectors.strategySettingsBtnAlt);
            if (button) return button;

            // Search for button with settings icon near strategy name
            const buttons = Array.from(document.querySelectorAll('button[aria-label], button[data-name]'));
            button = buttons.find(btn => {
                const label = btn.getAttribute('aria-label') || btn.getAttribute('data-name') || '';
                return label.toLowerCase().includes('setting') || label.toLowerCase().includes('format');
            });

            return button;
        } catch (error) {
            console.error('Error finding strategy settings button:', error);
            return null;
        }
    },

    // Open strategy settings dialog
    async openStrategySettings() {
        try {
            const settingsBtn = await this.findStrategySettingsButton();
            
            if (!settingsBtn) {
                throw new Error('Strategy settings button not found. Make sure a strategy is applied to the chart.');
            }

            // Click the settings button
            settingsBtn.click();
            
            // Wait for dialog to open
            await this.sleep(800);
            
            // Try multiple selectors to find the dialog
            let dialogFound = false;
            const selectorsToTry = [
                this.selectors.strategyDialog,
                this.selectors.strategyDialogAlt,
                this.selectors.strategyDialogAlt2
            ];
            
            for (const selector of selectorsToTry) {
                try {
                    await this.waitForElement(selector, 2000);
                    dialogFound = true;
                    console.log('Dialog found with selector:', selector);
                    break;
                } catch (e) {
                    console.log('Selector failed:', selector);
                }
            }
            
            if (!dialogFound) {
                // Try one more time with a more generic approach
                await this.sleep(500);
                const dialogs = document.querySelectorAll('div[role="dialog"], div[data-name*="dialog"], div[class*="dialog"]');
                if (dialogs.length > 0) {
                    console.log('Found dialog with generic selector');
                    dialogFound = true;
                }
            }
            
            if (!dialogFound) {
                throw new Error('Strategy settings dialog did not open. Please try clicking the settings button manually first.');
            }
            
            // Click on Inputs tab if it exists
            await this.sleep(300);
            
            // Try to find and click inputs tab
            const buttons = Array.from(document.querySelectorAll('button'));
            const inputsTab = buttons.find(btn => 
                btn.textContent.toLowerCase().includes('input') ||
                btn.getAttribute('data-name') === 'inputs'
            );
            
            if (inputsTab) {
                inputsTab.click();
                await this.sleep(300);
            }

            return true;
        } catch (error) {
            console.error('Error opening strategy settings:', error);
            throw error;
        }
    },

    // Extract parameters from strategy settings
    extractParameters() {
        try {
            const parameters = [];
            
            // Find all input containers
            const inputContainers = document.querySelectorAll('[class*="cell-"][class*="first"]');
            
            inputContainers.forEach(container => {
                try {
                    // Get label
                    const label = container.querySelector('[class*="title"]');
                    if (!label) return;
                    
                    const paramName = label.textContent.trim();
                    
                    // Get input field
                    const input = container.closest('[class*="row"]')?.querySelector('input[type="number"], input[inputmode="numeric"]');
                    if (!input) return;
                    
                    // Extract values
                    const currentValue = parseFloat(input.value) || 0;
                    const minValue = input.min ? parseFloat(input.min) : null;
                    const maxValue = input.max ? parseFloat(input.max) : null;
                    const step = input.step ? parseFloat(input.step) : 1;
                    
                    parameters.push({
                        name: paramName,
                        current: currentValue,
                        min: minValue,
                        max: maxValue,
                        step: step,
                        type: 'number'
                    });
                } catch (err) {
                    console.warn('Error parsing parameter:', err);
                }
            });

            // Alternative method if first didn't work
            if (parameters.length === 0) {
                const allInputs = document.querySelectorAll('input[type="number"], input[inputmode="numeric"]');
                
                allInputs.forEach(input => {
                    try {
                        // Try to find associated label
                        const row = input.closest('[class*="row"]');
                        const label = row?.querySelector('[class*="title"]');
                        
                        if (label) {
                            parameters.push({
                                name: label.textContent.trim(),
                                current: parseFloat(input.value) || 0,
                                min: input.min ? parseFloat(input.min) : null,
                                max: input.max ? parseFloat(input.max) : null,
                                step: input.step ? parseFloat(input.step) : 1,
                                type: 'number'
                            });
                        }
                    } catch (err) {
                        console.warn('Error parsing input:', err);
                    }
                });
            }

            console.log('Extracted parameters:', parameters);
            return parameters;
        } catch (error) {
            console.error('Error extracting parameters:', error);
            return [];
        }
    },

    // Close strategy settings dialog
    closeStrategySettings() {
        try {
            const closeBtn = document.querySelector(this.selectors.closeButton);
            if (closeBtn) {
                closeBtn.click();
            }
        } catch (error) {
            console.error('Error closing strategy settings:', error);
        }
    },

    // Get strategy name
    getStrategyName() {
        try {
            const nameElement = document.querySelector(this.selectors.strategyName);
            return nameElement ? nameElement.textContent.trim() : 'Unknown Strategy';
        } catch (error) {
            return 'Unknown Strategy';
        }
    },

    // Helper sleep function
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};

// Export for use in content script
window.TVHelper = TVHelper;
