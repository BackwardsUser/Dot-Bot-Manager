'use strict';

var { BrowserWindow } = require("electron");
var { join } = require("path");

var windows = [];

class window {
    constructor(window, h, w, resizable) {
        windows.push(window);
        this.name = window;
        this.window = new BrowserWindow({
            center: true,
            frame: false,
            height: h,
            icon: join(__dirname, ".", "images", "icons", "dot.ico"),
            resizable: resizable,
            webPreferences: {
                contextIsolation: false,
                nodeIntegration: true
            },
            width: w
        })
    }

    _getWindow(window) {
        if (!typeof window == "string") return `"${window}" is not a string.`;
        if (window.toLowerCase().startsWith("s")) return secondaryWindow
        else return primaryWindow;
    }
}

module.exports = {
    
    window
    
}