'use strict';
// Settings for the windows

module.exports.mainWindow = {
    height: 1000,   // Sets the pages "spawn" height
    width: 1000,    // Sets the pages "spawn" width
    frame: false,   // Enable/Disable default OS frame
    minHeight: 500, // Sets the absolute smallest the window can be (height)
    minWidth: 500,  // Sets the absolute smallest the window can be (width)
    webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
    }
}

// See above for what each does
module.exports.popupWindow = {
    height: 500,
    width: 250,
    frame: false,
    resizable: false,   // Enable/Disables whether you can resize the window
    webPreferences: {
        contextIsolation: false,
        nodeIntegration: true
    }
}