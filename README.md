# Ez Note - Minimal Sidebar Note-Taking Extension

A clean, minimal Chrome extension for quick note-taking with a global sidebar that works across all tabs.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![Manifest](https://img.shields.io/badge/manifest-v3-green.svg)

## ✨ Features

- **🎯 Global Sidebar** - Persistent note-taking sidebar accessible on any webpage
- **💾 Auto-Save** - Notes automatically save to Chrome local storage
- **📋 Quick Copy** - One-click copy to clipboard with visual feedback
- **📥 Export** - Export notes as timestamped `.txt` files
- **⌨️ Keyboard Shortcuts** - Configure custom shortcuts for quick access
- **🎨 Smooth Animations** - Polished slide + fade transitions
- **🎭 Clean UI** - Minimal design with Iconpark icons
- **🔒 Privacy-First** - All data stored locally, no external servers

## 🚀 How to Use

### Toggle Sidebar
- **Click** the Ez Note extension icon in your toolbar
- **Or** use your custom keyboard shortcut (if configured)

### Take Notes
- Type directly in the sidebar textarea
- Notes save automatically as you type
- Notes persist across all tabs and browser sessions

### Copy Notes
- Click the **Copy** button (blue) to copy all notes to clipboard
- Success indicator shows when copied

### Export Notes
- Click the **Export** button (amber) to download notes
- File format: `ez-note-{timestamp}.txt`
- Saved to your default downloads folder

### Configure Keyboard Shortcut
1. Click **"Shortcut"** link in the sidebar header
2. Chrome opens the shortcuts configuration page
3. Find "Ez Note" and click the pencil icon ✏️
4. Set your preferred shortcut (e.g., `Ctrl+Shift+N`)
5. Toggle sidebar anytime with your shortcut!

## 🎨 Interface

```
┌─────────────────────────────────┐
│ Ez Note    [Shortcut]  [✕]     │  ← Header
├─────────────────────────────────┤
│                                 │
│  Start taking notes...          │  ← Textarea (auto-save)
│                                 │
├─────────────────────────────────┤
│    [📋 Copy]  [📥 Export]       │  ← Actions
└─────────────────────────────────┘
```

## 🛠️ Development

Built with the [Plasmo Framework](https://docs.plasmo.com/) - a powerful browser extension development SDK.

### Prerequisites

- Node.js 16+ 
- npm or pnpm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Load extension in Chrome
# 1. Go to chrome://extensions/
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the build/chrome-mv3-dev folder
```

### Build for Production

```bash
# Create production bundle
npm run build

# Create packaged zip for Chrome Web Store
npm run package
```

The production build will be in `build/chrome-mv3-prod/`.

## 🏗️ Tech Stack

- **Framework**: [Plasmo](https://www.plasmo.com/)
- **Language**: TypeScript
- **UI Library**: React 18
- **Icons**: [@icon-park/react](https://iconpark.oceanengine.com/)
- **Storage**: [@plasmohq/storage](https://docs.plasmo.com/framework/storage)
- **Manifest**: Chrome Extension Manifest V3

## 📦 Project Structure

```
ez-note/
├── contents/
│   └── sidebar.tsx          # Main sidebar component
├── background.ts            # Background service worker
├── assets/
│   └── icon.png            # Extension icon
├── package.json            # Project config & manifest overrides
└── README.md               # This file
```

## 🔐 Permissions

- **storage** - Save notes locally
- **tabs** - Enable sidebar toggle across tabs

## 📝 Version History

### v2.0.0 (Current)
- Global sidebar with smooth animations
- Auto-save functionality
- Copy to clipboard
- Export as .txt file
- Keyboard shortcut support
- Iconpark integration
- Improved UI/UX

### v0.0.1
- Initial release

## 👤 Author

**Alen Hu**
- Email: huhaoyue0220@126.com

## 📄 License

This project is built with Plasmo Framework.

## 🤝 Contributing

This is a personal project. Feel free to fork and customize for your own use!

## 🐛 Known Issues

None currently! 🎉

## 💡 Tips

- Close the sidebar with the **X** button or toggle with the extension icon
- Sidebar state persists - if you close it, it stays closed until you reopen it
- Use keyboard shortcuts for the fastest access
- Notes are stored locally - they won't sync across devices

---

Made with ❤️ using [Plasmo](https://www.plasmo.com/)
