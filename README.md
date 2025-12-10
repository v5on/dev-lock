# DevLock 🔒

**DevLock** is a powerful JavaScript library designed to protect your website code and content by disabling browser Developer Tools.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Size](https://img.shields.io/badge/size-1KB-green.svg)

## 🔥 Features

* **Auto-Block:** Automatically detects and blocks DevTools.
* **Disable Shortcuts:** Blocks `F12`, `Ctrl+Shift+I`, `Ctrl+U`, `Ctrl+S`.
* **Disable Right Click:** Prevents the context menu.
* **Debugger Trap:** Uses advanced loop techniques to freeze the browser if tools are opened.
* **Customizable:** Supports callbacks and redirects.

## 📦 Usage

### Method 1: The "One-Liner" (Recommended)
Add this to your HTML `<head>` section. It works automatically!

```html
<script disable-devtool-auto src="[https://cdn.jsdelivr.net/gh/v5on/dev-lock@main/dev-lock.js](https://cdn.jsdelivr.net/gh/v5on/dev-lock@main/dev-lock.js)"></script>
