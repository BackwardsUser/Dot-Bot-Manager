'use strict';

var { BrowserWindow, app } = require('electron');
var windowSettings = require('./defSet');

var path = require('path');

var _mainWindow = null;
var _popupWindow = null;

function _init(window, ready) {
    if (window.toLowerCase() == "pop" || window.toLowerCase() == "popup" || window.toLowerCase() == "popupwindow") _createPopupWindow()
    else _createMainWindow();
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
    else if ( typeof window == BrowserWindow ) return _displayHTMLByModule(window, page);
    else console.error("Error. Window is not of the right type.");
}

function _displayHTMLByString(window, page) {
    var _window = window.toLowerCase()
    if (_window == "main" || _window == "mainwindow") return _mainWindow.loadFile(path.join('src', 'common', 'pages', 'HTML', `${page}.html`));
    else if (_window == "pop" || _window == "popup" || _window == "popupwindow") return _popupWindow.loadFile(path.join('src', 'common', 'pages', 'HTML', `${page}.html`));
    else return console.error("No window by the name of \"" + window +"\"");
}

function _displayHTMLByModule(window, page) {
    window.loadFile(path.join('src', 'common', 'pages', 'HTML', `${page}.html`));
}

module.exports = {
    init: _init,
    displayHTML: _displayHTML,
}