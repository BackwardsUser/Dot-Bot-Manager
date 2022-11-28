'use strict';

// NodeJS imports
var { ipcMain } = require('electron');


// Local Imports
var { mainWindow, popupWindow } = require('./display');
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

    ipcMain.on('MAIN:WINDOW', (e, data) => {
        switch (data) {
            case "close":
                mainWindow.close();
                break;
            case "minimize":
                mainWindow.minimize();
                break;
            case "maximize":
                if (mainWindow.isMaximized) mainWindow.maximize
                else mainWindow.unmaximize;
                break;
        }
    });

    ipcMain.on('POPUP:WINDOW', (e, data) => {
        switch (data) {
            case "close":
                popupWindow.close();
                break;
            case "minimize":
                popupWindow.minimize();
                break;
            case "maximize":
                if (popupWindow.isMaximized) popupWindow.maximize
                else popupWindow.unmaximize;
                break;
        }
    })
};



