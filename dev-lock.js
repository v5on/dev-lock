/**
 * DevLock.js - Advanced Web Security Tool
 * Author: v5on
 * Repository: https://github.com/v5on/dev-lock
 * License: MIT
 */

(function (global) {
    'use strict';

    const DevLock = {
        config: {
            disableRightClick: true,
            disableShortcuts: true,
            disableSelect: true,
            redirectUrl: null,
            onDetect: null
        },

        init: function (options = {}) {
            this.config = { ...this.config, ...options };

            if (this.config.disableRightClick) this.preventContext();
            if (this.config.disableShortcuts) this.preventShortcuts();
            if (this.config.disableSelect) this.preventSelection();

            this.startDetector();
            console.log("%c Protected by DevLock ", "background: #222; color: #bada55; font-size: 12px; padding: 4px; border-radius: 4px;");
        },

        preventContext: function () {
            document.addEventListener('contextmenu', e => e.preventDefault());
        },

        preventShortcuts: function () {
            window.addEventListener('keydown', (e) => {
                if (
                    e.key === 'F12' ||
                    (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
                    (e.ctrlKey && e.key.toUpperCase() === 'U')
                ) {
                    e.preventDefault();
                    return false;
                }
            });
        },

        preventSelection: function () {
            const css = 'body { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }';
            const head = document.head || document.getElementsByTagName('head')[0];
            const style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(css));
            head.appendChild(style);
        },

        triggerAction: function () {
            console.clear();
            
            if (typeof this.config.onDetect === 'function') {
                this.config.onDetect();
            }

            if (this.config.redirectUrl) {
                window.location.href = this.config.redirectUrl;
                return;
            }

            // Default Freeze Action
            document.body.innerHTML = `
                <div style="height:100vh; background:#0d1117; color:#ff6b6b; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:system-ui, sans-serif;">
                    <h1 style="font-size:3rem; margin:0;">🚫 Access Denied</h1>
                    <p style="font-size:1.2rem; color:#8b949e;">Developer Tools are not allowed on this page.</p>
                </div>
            `;
            throw new Error("DevLock: Security Violation Detected.");
        },

        startDetector: function () {
            const threshold = 160;
            setInterval(() => {
                const start = new Date().getTime();
                (function(){debugger;})(); // The Trap
                const end = new Date().getTime();

                if (end - start > threshold) {
                    this.triggerAction();
                }
            }, 500);
        }
    };

    // Expose to Global
    global.DevLock = DevLock;

    // Auto-Init Logic for <script disable-devtool-auto src="...">
    try {
        const currentScript = document.currentScript || (function() {
            const scripts = document.getElementsByTagName('script');
            return scripts[scripts.length - 1];
        })();

        if (currentScript && currentScript.hasAttribute('disable-devtool-auto')) {
            DevLock.init();
        }
    } catch (e) {
        console.warn("DevLock auto-init error:", e);
    }

})(window);
