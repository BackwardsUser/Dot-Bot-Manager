'use strict';

var { BrowserWindow, app } = require('electron');
var windowSettings = require('./defSet');

var path = require('path');

var _mainWindow = null;
var _popupWindow = null;

function _getWindow(window) {
    if (window.toLowerCase() == "pop" || window.toLowerCase() == "popup" || window.toLowerCase() == "popupwindow") return "popup";
    else return "main"
}

function _init(window, ready) {
    if (_getWindow(window) == "popup") _createPopupWindow();
    else _createMainWindow()
    ready();
}

function _createMainWindow() {
    _mainWindow = new BrowserWindow(windowSettings.mainWindow);
    _mainWindow.once('closed', () => {
        app.exit();
    })
}

function _createPopupWindow() {
    _popupWindow = new BrowserWindow(windowSettings.popupWindow);
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
    var _window = window.toLowerCase()
    if (_getWindow(_window) == "main") return _mainWindow.loadFile(path.join('src', 'common', 'pages', 'HTML', `${page}.html`));
    else if (_getWindow(_window) == "popup") return _popupWindow.loadFile(path.join('src', 'common', 'pages', 'HTML', `${page}.html`));
    else return console.error("Something went wrong trying to display \"" + _window +"\"..."); // This line is unreachable, but still a good fallback.
}

function _displayHTMLByModule(window, page) {
    window.loadFile(path.join('src', 'common', 'pages', 'HTML', `${page}.html`));
}

function _post(window, data) {
    switch (window) {
        case "popup":
            switch (data.type) {
                case "message":
                    _popupWindow.webContents.send("SET:CONTENT", data);
                    break;
                case "clear":
                    _popupWindow.webContents.send("CLEAR:CONTENT", data);
                    break;
                default:
                    console.error("A data type must be declared. (display.js - ln 56)")
            }
            break;
        default:
            switch(data.type) {
                case "message":
                    _mainWindow.webContents.send("SET:CONTENT", data);
                    break;
                case "clear":
                    _mainWindow.webContents.send("CLEAR:CONTENT", data);
                    break;
                default:
                    console.error("A data type must be declared. (display.js - ln 67)");
                    break;
            }
            break;
    }
}

module.exports = {
    init: _init,
    displayHTML: _displayHTML,
    post: _post,

    mainWindow: _mainWindow,
    popupWindow: _popupWindow,
}