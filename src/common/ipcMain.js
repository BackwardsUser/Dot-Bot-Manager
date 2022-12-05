'use strict';

// NodeJS imports
var { ipcMain } = require('electron');


// Local Imports
var { mainWindow, popupWindow, getFocusedWindow } = require('./display');
var settings = require('./settings');
var ws = require('./ws')

// Main
function initializeDefaultEvents() {
    ipcMain.on('INTERNET:CHECK:DISABLE', (e) => {
        settings.loading_skips.skip_internet_check = false;
        console.log(settings.loading_skips)
        ws.connection = null;
        require('../core/update')
    });

    ipcMain.on('WINDOW:MIN', (e) => {
        var window = getFocusedWindow();
        if (!window && !window.isMinimizable()) return;
        if (!window.isMinimized()) window.minimize()
    })

    ipcMain.on('WINDOW:MAX', (e) => {
        var window = getFocusedWindow();
        if (!window && !window.isMaximized()) return;
        if (!window.isMaximized()) window.maximize()
        else window.unmaximize();
    });

    ipcMain.on('WINDOW:CLOSE', (e) => {
        var window = getFocusedWindow();
        if (!window && !window.isClosable()) return;
        window.close()
    })
};

module.exports = {
    initializeDefaultEvents
}