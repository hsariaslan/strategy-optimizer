# TradingView Strategy Optimizer By Hakan Sarıaslan

A Chrome extension for automatically testing and optimizing TradingView strategy parameters to find the best profit and win rate combinations.

**Website:** [sariaslan.org](https://sariaslan.org)

## 🚀 Version 0.1.1.1

### ✨ New Features in 0.1.1.1
- **Automatic Parameter Detection**: Extension opens strategy settings and fetches all parameters automatically
- **Parameter Modal**: Beautiful modal interface showing all strategy parameters
- **Real TradingView Integration**: Works directly with TradingView's strategy settings
- **Strategy Information**: Displays strategy name and total iterations
- **Customizable Parameters**: Adjust From, To, and Step values for each parameter
- **Clean Architecture**: Separate HTML, CSS, and JS files (no inline code!)

## 📋 Features

- **Automatic Strategy Detection**: Opens TradingView strategy settings automatically
- **Parameter Extraction**: Fetches all input parameters from your strategy
- **Modern Modal Interface**: Clean, professional modal with separate HTML/CSS files
- **Parameter Configuration**: Set range (From/To) and step size for each parameter
- **Multiple Optimization Goals**: 
  - Maximum Profit
  - Best Win Rate
  - Balanced (Profit + Win Rate)
- **Customizable Settings**: 
  - Test iterations (default: 10)
  - Delay between tests (500-5000ms)
  - Auto-save best results

## 📁 Folder Structure

```
tradingview-optimizer/
├── manifest.json              # Extension configuration
├── popup/
│   ├── popup.html            # Popup interface
│   ├── popup.css             # Popup styles
│   └── popup.js              # Popup logic
├── content/
│   ├── tv-helper.js          # TradingView DOM helper
│   ├── content.js            # Main content script
│   └── modal/
│       ├── modal.html        # Modal HTML templates
│       └── modal.css         # Modal styles (separate!)
├── background/
│   └── background.js         # Background service worker
└── icons/
    ├── icon16.png            # Extension icons
    ├── icon48.png
    └── icon128.png
```

## 🔧 Installation

1. **Extract the ZIP file** to a folder on your computer

2. **Open Chrome Extensions Page**:
   - Open Google Chrome
   - Go to `chrome://extensions/`

3. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the Extension**:
   - Click "Load unpacked"
   - Select the `tradingview-optimizer` folder
   - The extension should now appear in your extensions list

5. **Pin the Extension** (Optional):
   - Click the puzzle icon in Chrome toolbar
   - Find "Trading View Strategy Optimizer By Hakan Sarıaslan"
   - Click the pin icon to keep it visible

## 📖 How to Use

### Step 1: Open TradingView with a Strategy
1. Go to [TradingView.com](https://www.tradingview.com)
2. Open a chart
3. Apply a strategy to your chart (it must have input parameters)

### Step 2: Configure Extension Settings (Optional)
1. Click the extension icon in your Chrome toolbar
2. Go to the **Options** tab
3. Set your preferences:
   - **Optimization Goal**: Choose between Max Profit, Best Win Rate, or Balanced
   - **Test Iterations**: Number of parameter combinations to test
   - **Delay Between Tests**: Time to wait between each test
4. Click **Save Settings**

### Step 3: Start Optimization
1. Make sure you're on a TradingView chart with a strategy applied
2. Click the extension icon
3. Click **Optimize Strategy** button
4. The extension will:
   - Automatically open your strategy settings
   - Extract all input parameters
   - Show them in a modal dialog

### Step 4: Configure Parameters
1. Review the detected parameters in the modal
2. For each parameter:
   - Check/uncheck to include/exclude it from optimization
   - Set **From** value (minimum to test)
   - Set **To** value (maximum to test)
   - Set **Step** size (increment between tests)
3. Click **Start Optimization** (implementation coming in next version)

## 🎨 How It Works

1. **Click "Optimize Strategy"** → Extension sends message to content script
2. **Content Script Actions**:
   - Loads modal HTML and CSS from separate files
   - Finds and clicks strategy settings button
   - Waits for settings dialog to open
   - Navigates to "Inputs" tab
   - Extracts all parameter information (name, current value, min, max, step)
   - Closes the settings dialog
3. **Modal Display**:
   - Shows strategy name
   - Lists all parameters in a table
   - Allows customization of test ranges
   - Displays total iterations count

## 🏗️ Architecture Highlights

### Clean Code Structure
- ✅ **No inline HTML** in JavaScript files
- ✅ **No inline CSS** in JavaScript files
- ✅ **Separate template files** for modal HTML
- ✅ **Separate stylesheet** for modal CSS
- ✅ **Dynamic loading** using fetch() and chrome.runtime.getURL()

### File Organization
```
Modal System:
├── modal.html    → HTML templates (loading, parameters, error)
├── modal.css     → All modal styles
└── content.js    → Loads templates and manages logic
```

## 🔄 Development Status

**Version 0.1.1.1 - Parameter Detection Complete**

✅ Completed:
- Extension structure and UI
- TradingView DOM interaction
- Strategy settings automation
- Parameter extraction
- Modal interface with separate HTML/CSS
- Parameter configuration UI
- Improved selector reliability

⏳ Coming Next (v0.1.3+):
- Actual parameter testing logic
- Progress tracking during optimization
- Results collection and storage
- Best parameters identification
- Results display in Results tab
- Export functionality

## 💡 Technical Details

### TradingView Integration
- Uses multiple fallback selectors to find strategy elements
- Waits for dialogs to fully load
- Extracts parameters dynamically
- Works with TradingView's dynamic UI
- Handles UI changes gracefully

### Parameter Detection
- Finds input fields in strategy settings
- Extracts names, values, ranges, and steps
- Handles various parameter types
- Falls back to alternative detection methods

### Modal System
- Templates loaded via fetch()
- CSS injected once on initialization
- Clean separation of concerns
- Uses HTML template elements
- Dynamic content insertion

## 🛠️ Development Tips

**After modifying files**:
- Go to `chrome://extensions/`
- Click the refresh icon on your extension
- Reload any open TradingView pages

**Debugging**:
- **Popup**: Right-click extension icon → Inspect popup
- **Content Script**: F12 on TradingView page → Console tab
- Check console for "TradingView Strategy Optimizer" messages
- Look for "Modal templates loaded successfully"

**Common Issues**:
- If no parameters found, ensure strategy has input parameters
- If dialog not found, try different selectors in tv-helper.js
- Refresh the page if content script doesn't load
- Check that modal files are in web_accessible_resources

## ⚠️ Important Notes

- Make sure your strategy has input parameters
- The extension works only on TradingView chart pages
- Each time you click "Optimize Strategy", parameters are fetched fresh
- Switching strategies and clicking again will fetch the new strategy's parameters
- All HTML and CSS are in separate files for clean architecture

## 📝 License

Created by [Hakan Sarıaslan](https://sariaslan.org) - Version 0.1.1.1

## 📞 Support

For questions or issues, visit [sariaslan.org](https://sariaslan.org)

---

**Version 0.1.1.1**: Parameter detection with clean architecture. HTML and CSS properly separated from JavaScript!
