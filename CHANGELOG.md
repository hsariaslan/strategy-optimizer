# Changelog

All notable changes to the TradingView Strategy Optimizer extension will be documented in this file.

## [0.1.1.1] - 2024-11-21

### ✨ Added
- **TradingView Integration**: Automatic strategy settings interaction
- **Parameter Detection**: Extracts all strategy parameters automatically
- **Modal Interface**: Beautiful modal showing strategy parameters
- **TV Helper Module**: New helper file for TradingView DOM interactions
- **Parameter Configuration**: UI for setting From/To/Step values for each parameter
- **Strategy Information Display**: Shows strategy name and iteration count
- **Loading States**: Loading modal while fetching parameters
- **Error Handling**: Error modal for better user feedback

### 🏗️ Architecture Improvements
- **Separated HTML from JS**: Created `modal.html` with all modal templates
- **Separated CSS from JS**: Created `modal.css` with all modal styles
- **Clean Code Structure**: No inline HTML or CSS in JavaScript files
- **Dynamic Template Loading**: Content script loads templates via fetch()
- **Web Accessible Resources**: Modal files properly configured in manifest

### 🔧 Technical Fixes
- **Improved Dialog Detection**: Multiple fallback selectors for strategy dialog
- **Better Error Messages**: More descriptive errors when dialog not found
- **Selector Reliability**: Added generic selectors as fallbacks
- **Loading Timing**: Increased wait times for dialog rendering
- **Tab Navigation**: Improved Inputs tab detection and clicking

### 📝 Changed
- Content script now loads HTML/CSS from separate files instead of inline
- Popup sends messages to content script on "Optimize Strategy" click
- Improved error messages and user notifications
- Better console logging for debugging

### 📖 Files Structure
```
content/
├── tv-helper.js      - TradingView DOM helper
├── content.js        - Main logic (no inline HTML/CSS)
└── modal/
    ├── modal.html    - HTML templates
    └── modal.css     - Styles
```

### 🐛 Fixed
- Fixed "Element .dialog not found" error with better selectors
- Fixed inline HTML/CSS issue - now properly separated
- Improved dialog detection reliability
- Better handling of TradingView UI variations

## [0.1.1] - 2024-11-21

### 🧹 Changed
- Removed progress bar from Test tab (will be shown in modal later)
- Removed simulation logic (preparation for real implementation)
- Updated default Test Iterations from 100 to 10
- "Optimize Strategy" button does nothing (placeholder for v0.1.1.1)

### 🎨 Added
- Added link to sariaslan.org in footer
- Link has hover effect with color transition

### 📝 Removed
- DEVELOPMENT_GUIDE.md (keeping only README.md)
- INSTALLATION.txt (instructions in README)
- OVERVIEW.txt (unnecessary)
- Progress simulation functions
- Tab switching after optimization

### 🔧 Changed Files
- `manifest.json` - Version to 0.1.1
- `popup/popup.html` - Removed progress section, added sariaslan.org link
- `popup/popup.css` - Added footer link styles
- `popup/popup.js` - Simplified, removed simulation logic
- `background/background.js` - Updated default iterations to 10

## [0.1.0] - 2024-11-21

### 🎉 Initial Release

### ✨ Features
- Chrome extension structure with Manifest V3
- Modern popup interface with 3 tabs:
  - **Test Tab**: Optimize Strategy button and status indicator
  - **Results Tab**: Display area for optimization results
  - **Options Tab**: Settings for optimization parameters
- Beautiful purple gradient design
- Settings persistence using Chrome Storage API
- Separate HTML, CSS, and JavaScript files (clean architecture)

### ⚙️ Settings
- Optimization Goal: Profit / Win Rate / Balanced
- Test Iterations: 10-1000 (default: 100)
- Delay Between Tests: 500-5000ms (default: 1000ms)
- Auto-save toggle

### 📦 Structure
- `manifest.json` - Extension configuration
- `popup/` - Popup interface files (HTML, CSS, JS)
- `content/` - Content script (placeholder)
- `background/` - Background service worker
- `icons/` - Extension icons (16x16, 48x48, 128x128)

### 📖 Documentation
- README.md with installation and usage instructions
- DEVELOPMENT_GUIDE.md with next steps for developers
- INSTALLATION.txt for quick setup
- OVERVIEW.txt with visual summary

---

## Version Roadmap

### 🔮 Upcoming (v0.1.3+)
- Actual optimization algorithm implementation
- Parameter testing automation
- Results collection and analysis
- Progress tracking in modal
- Results display in Results tab
- Export functionality (CSV/JSON)
- Best parameters highlighting

### 🎯 Future Features
- Genetic algorithm for smart optimization
- Multiple strategy support
- Historical results comparison
- Cloud results storage
- Optimization templates
- Auto-apply best parameters

---

**Author**: Hakan Sarıaslan  
**Website**: [sariaslan.org](https://sariaslan.org)  
**Repository**: Check GitHub for latest updates
