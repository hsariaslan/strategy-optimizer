# TradingView Strategy Optimizer By Hakan Sarıaslan

A Chrome extension for automatically testing and optimizing TradingView strategy parameters to find the best profit and win rate combinations.

## 🚀 Version 0.1 - Initial Release

## 📋 Features

- **Automatic Strategy Testing**: Automatically test multiple parameter combinations
- **Modern UI**: Beautiful, intuitive interface
- **Multiple Optimization Goals**: 
  - Maximum Profit
  - Best Win Rate
  - Balanced (Profit + Win Rate)
- **Customizable Settings**: 
  - Adjustable test iterations (10-infinity)
  - Configurable delay between tests (500-5000ms)
  - Auto-save best results
- **Progress Tracking**: Real-time progress updates during optimization
- **Results Export**: Export optimization results for further analysis

## 📁 Folder Structure

```
tradingview-optimizer/
├── manifest.json         # Extension configuration
├── popup/
│   ├── popup.html        # Main popup interface (separate HTML)
│   ├── popup.css         # Popup styles (separate CSS)
│   └── popup.js          # Popup logic (separate JavaScript)
├── content/
│   └── content.js        # TradingView page interaction script
├── background/
│   └── background.js     # Background service worker
└── icons/
    ├── icon16.png        # Extension icon (16x16)
    ├── icon48.png        # Extension icon (48x48)
    └── icon128.png       # Extension icon (128x128)
```

## 🔄 Next Steps (For Development)

This is version 0.1 - the foundation. The next steps will include:

1. **TradingView Integration**: Implement actual DOM interaction with TradingView strategy panel
2. **Parameter Detection**: Automatically detect strategy parameters
3. **Smart Testing Algorithm**: Implement genetic algorithm for efficient parameter optimization
4. **Results Display**: Show detailed results with charts and statistics
5. **Export Functionality**: Export results to CSV

### Understanding the Code Structure

1. **manifest.json**: The extension's configuration file
   - Defines permissions, icons, and which scripts run where
   - Version 3 manifest (latest standard)

2. **popup/popup.html**: The user interface
   - Pure HTML, no embedded JavaScript
   - Uses semantic HTML with proper structure
   - Links to external CSS and JS files

3. **popup/popup.css**: All the styling
   - Modern CSS with flexbox and grid
   - Custom animations and transitions
   - Responsive design principles

4. **popup/popup.js**: User interaction logic
   - Handles tab switching
   - Manages button clicks
   - Communicates with content script using Chrome APIs

5. **content/content.js**: TradingView page interaction
   - Runs directly on TradingView pages
   - Will interact with the strategy panel
   - Sends results back to popup

6. **background/background.js**: Background tasks
   - Runs independently of any page
   - Manages data storage
   - Handles extension lifecycle events
