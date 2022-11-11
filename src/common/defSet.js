'use strict';

module.exports.mainWindow = {
    height: 1000,
    width: 1000,
    frame: false,
    minHeight: 500,
    minWidth: 500,
    webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
    }
}

module.exports.popupWindow = {
    height: 500,
    width: 250,
    frame: false,
    resizable: false,
    webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
    }
}