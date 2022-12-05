'use strict';

var { BrowserWindow, app } = require('electron');
var windowSettings = require('./defSet');

var path = require('path');

var _mainWindow = null;
var _popupWindow = null;

function _getWindow(window) {
    if (typeof window != "string") return console.error("window needs to be a string");
    if (window.toLowerCase() == "pop" || window.toLowerCase() == "popup" || window.toLowerCase() == "popupwindow") return _popupWindow;
    else return _mainWindow;
}

function _destroy(window) {
    var _window = _getWindow(window);
    _window.destroy();
};

function _init(window, ready) {
    if (_getWindow(window) === _popupWindow) _createPopupWindow()
    else _createMainWindow();
    ready();
}


function _createMainWindow() {
    _mainWindow = new BrowserWindow(windowSettings.mainWindow);
    _mainWindow.once('closed', () => {
        app.exit();
    });
    _mainWindow.on("maximize", () => {
        _mainWindow.send("WINDOW:MAX:STATE", true);
    });
    _mainWindow.on("unmaximize", () => {
        _mainWindow.send("WINDOW:MAX:STATE", false);
    });
};

function _createPopupWindow() {
    _popupWindow = new BrowserWindow(windowSettings.popupWindow);
    _popupWindow.on('enter-full-screen', () => {
        _popupWindow.send("WINDOW:MAX:STATE", true);
    });
    _popupWindow.on('leave-full-screen', () => {
        _popupWindow.send("WINDOW:MAX:STATE", false);
    });
}

// This will be all lot more helpful than I first imagined.
function _displayHTML(window, page) {
    if ( !page ) page = "index";
    if ( typeof page != "string" ) return console.error("Error. Page needs to be provided as a string...");
    if ( typeof window == "string" ) return _displayHTMLByString(window, page);
    else if ( typeof window == BrowserWindow ) return _displayHTMLByModule(window, page); // Will likely not be used
    else console.error("Error. Window is not of the right type.");
}

function _displayHTMLByString(window, page) {
    var _window = _getWindow(window);
    _window.loadFile(path.join('src', 'common', 'pages', 'HTML', `${page}.html`));
}

function _displayHTMLByModule(window, page) {
    window.loadFile(path.join('src', 'common', 'pages', 'HTML', `${page}.html`));
}

function _post(window, data) {

    var _window = _getWindow(window);
    switch(data.type) {
        case "message":
            _window.webContents.send("SET:CONTENT", data);
            break;
        case "clear":
            _window.webContents.send("CLEAR:CONTENT", data);
            break;
        default:
            console.error("A data type must be declared. (display.js - ln 56)");
            break;
    };
};

function _getFocusedWindow() {
    return BrowserWindow.getFocusedWindow();
}

module.exports = {
    getFocusedWindow: _getFocusedWindow,
    displayHTML: _displayHTML,
    destroy: _destroy,
    post: _post,
    init: _init,

    variables: {
        popupWindow: _popupWindow,
        mainWindow: _mainWindow,
    }
}