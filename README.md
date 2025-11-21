# TradingView Strategy Optimizer By Hakan Sarıaslan

A Chrome extension for automatically testing and optimizing TradingView strategy parameters to find the best profit and win rate combinations.

**Website:** [sariaslan.org](https://sariaslan.org)

## 🚀 Version 0.1.1

## 📋 Features

- **Modern UI**: Beautiful interface with 3 tabs (Test, Results, Options)
- **Multiple Optimization Goals**: 
  - Maximum Profit
  - Best Win Rate
  - Balanced (Profit + Win Rate)
- **Customizable Settings**: 
  - Test iterations (default: 10)
  - Delay between tests (500-5000ms)
  - Auto-save best results
- **Clean Architecture**: Separate HTML, CSS, and JavaScript files

## 📁 Folder Structure

```
tradingview-optimizer/
├── manifest.json          # Extension configuration
├── popup/
│   ├── popup.html        # Main popup interface
│   ├── popup.css         # Popup styles
│   └── popup.js          # Popup logic
├── content/
│   └── content.js        # TradingView page interaction
├── background/
│   └── background.js     # Background service worker
└── icons/
    ├── icon16.png        # Extension icons
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

1. Open [TradingView.com](https://www.tradingview.com)
2. Open a chart with a strategy already applied
3. Click the extension icon in your Chrome toolbar
4. Configure your optimization settings in the **Options** tab
5. Click **Save Settings**
6. Go to the **Test** tab and click **Optimize Strategy**

## 🎨 Design Features

- **Modern Gradient Design**: Beautiful purple gradient theme
- **Intuitive Tab Navigation**: Easy switching between tabs
- **Icon-Based UI**: Every button and tab has a relevant icon
- **Responsive Layout**: Clean, organized 400px width popup

## 🔄 Development Status

**Current Version**: 0.1.1 - Foundation with UI complete

**Next Steps**:
1. TradingView Integration - DOM interaction with strategy panel
2. Parameter Detection - Automatically detect strategy parameters
3. Optimization Algorithm - Implement parameter testing logic
4. Results Display - Show optimization results with statistics

## 💡 Code Structure

1. **manifest.json** - Extension configuration with permissions
2. **popup/popup.html** - Clean HTML structure (no embedded JS)
3. **popup/popup.css** - Modern CSS with animations
4. **popup/popup.js** - User interaction logic
5. **content/content.js** - TradingView page interaction
6. **background/background.js** - Background tasks and data storage

## 🛠️ Development Tips

**After modifying files**:
- Go to `chrome://extensions/`
- Click the refresh icon on your extension
- Reload any open TradingView pages

**Debugging**:
- **Popup**: Right-click extension icon → Inspect popup
- **Content Script**: F12 on TradingView page → Console tab
- **Background**: Extension details → Service Worker → Inspect

## 📝 License

Created by [Hakan Sarıaslan](https://sariaslan.org) - Version 0.1.1

## 📞 Support

For questions or issues, visit [sariaslan.org](https://sariaslan.org)

---

**Status**: UI Complete - Ready for TradingView integration
