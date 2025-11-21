# Quick Usage Guide - Version 0.1.1.1

## 🎉 What's New in v0.1.1.1

This version now **automatically** opens your strategy settings and fetches all parameters!

## 📝 Step-by-Step Usage

### 1️⃣ Open TradingView
- Go to https://www.tradingview.com
- Open any chart
- Apply a strategy that has input parameters
  - Example: "RSI Strategy", "Moving Average Cross", etc.
  - Make sure the strategy has parameters (most strategies do)

### 2️⃣ Click Extension Icon
- Find the extension icon in your Chrome toolbar
- If you don't see it, click the puzzle icon and pin it
- Click the "Strategy Optimizer" icon

### 3️⃣ Click "Optimize Strategy"
- In the popup, click the **"Optimize Strategy"** button
- The extension will now:
  1. ✅ Automatically find your strategy settings button
  2. ✅ Click it to open the settings dialog
  3. ✅ Navigate to the "Inputs" tab
  4. ✅ Extract all parameter information
  5. ✅ Close the settings dialog
  6. ✅ Show you a beautiful modal with all parameters!

### 4️⃣ Review Parameters Modal
You'll see a modal that shows:
- **Strategy Name** at the top
- **Total Iterations** count
- **Table of Parameters** with columns:
  - **Active**: Checkbox to include/exclude parameter
  - **Parameter**: Name of the parameter
  - **From**: Minimum value to test
  - **To**: Maximum value to test  
  - **Step**: Increment between tests
  - **Default**: Current value from strategy

### 5️⃣ Customize Parameter Ranges (Optional)
- Adjust **From** and **To** values for each parameter
- Change **Step** size to control granularity
- Uncheck parameters you don't want to optimize
- The modal will calculate total iterations

### 6️⃣ Start Optimization
- Click **"Start Optimization"** button
- *(Note: Actual optimization logic coming in v0.1.3)*

## 🔍 How It Works Behind the Scenes

```
User clicks "Optimize Strategy"
    ↓
Extension finds strategy settings button (gear icon)
    ↓
Clicks the button to open settings dialog
    ↓
Waits for dialog to load (500-800ms)
    ↓
Navigates to "Inputs" tab
    ↓
Scans all input fields and extracts:
  - Parameter name
  - Current value
  - Min value
  - Max value
  - Step value
    ↓
Closes the settings dialog
    ↓
Shows modal with all parameters
    ↓
User can customize ranges
    ↓
Click "Start Optimization" (coming soon)
```

## 🎨 Modal Features

### Header
- **Strategy Name**: Shows which strategy is being optimized
- **Total Iterations**: Approximate number of tests
- **Close Button (×)**: Close modal without starting

### Body
- **Active Parameters Section**: Shows count and names
- **Parameters Table**: 
  - Sortable columns
  - Editable input fields
  - Checkbox for each parameter
  - Default value reference

### Footer
- **Cancel**: Close modal
- **Start Optimization**: Begin testing (coming in v0.1.3)

## 💡 Tips

✅ **Do's:**
- Make sure you have a strategy applied to your chart
- Use strategies with input parameters
- Customize ranges based on your strategy logic
- Check parameter names to ensure they were detected correctly

❌ **Don'ts:**
- Don't click optimize if no strategy is applied
- Don't close the TradingView tab while fetching parameters
- Don't switch tabs during parameter extraction

## 🐛 Troubleshooting

**"No parameters found"**
- Check if your strategy has input parameters
- Some strategies have no configurable inputs
- Try refreshing the page and trying again

**"Strategy settings button not found"**
- Ensure a strategy is applied to the chart
- Look for the strategy name in the top-left of the chart
- Try applying a different strategy

**Modal doesn't appear**
- Check browser console (F12) for errors
- Refresh the extension (chrome://extensions/)
- Reload the TradingView page

**Parameters look incorrect**
- TradingView may have updated their UI
- Some parameters might not be detected properly
- Check the console for debugging info

## 🔄 Testing Different Strategies

Want to optimize a different strategy?
1. Apply a new strategy to your chart
2. Click "Optimize Strategy" again
3. The extension will fetch parameters from the NEW strategy
4. Each click fetches fresh data!

## 📊 Example Scenario

**Strategy**: RSI Strategy with parameters:
- RSI Length (default: 14)
- Overbought Level (default: 70)
- Oversold Level (default: 30)

**After clicking "Optimize Strategy":**
```
Modal shows:
┌─────────────────────────────────────────────┐
│ Strategy: RSI Strategy                      │
│ Total iterations: 1,000                     │
├─────────────────────────────────────────────┤
│ ☑ RSI Length       | 5  | 30 | 1  | 14     │
│ ☑ Overbought      | 65 | 85 | 5  | 70     │
│ ☑ Oversold        | 15 | 35 | 5  | 30     │
└─────────────────────────────────────────────┘
```

You can now:
- Adjust ranges (e.g., RSI Length from 5 to 30)
- Change step sizes
- Uncheck parameters to skip them
- Click "Start Optimization"

## 🚀 What's Coming Next (v0.1.3+)

- ⏳ Actual parameter testing
- ⏳ Progress tracking in modal
- ⏳ Results collection
- ⏳ Best parameters identification
- ⏳ Results display
- ⏳ Export functionality

---

**Version**: 0.1.1.1
**Author**: Hakan Sarıaslan
**Website**: [sariaslan.org](https://sariaslan.org)

Enjoy optimizing your strategies! 🎯
