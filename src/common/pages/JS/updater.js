'use strict';
/* General Imports */
var { ipcRenderer } = require('electron');
var settings = require("../../settings");

/* Acquiring and setting themes */
var overwrite_color = null;
var get_theme = ( overwrite_color != null && settings.dev_mode) ? overwrite_color : settings.default_theme;
var css = document.createElement('link')

css.rel = "stylesheet";
if (settings.theme.nonstandard_file_location) {
    css.href = `${settings.theme.file_location}`;
} else {
    css.href = `../CSS/updater/${get_theme}.css`;
};

document.querySelector('head').appendChild(css);


/* Content Changer */
/* This is used so a content change request can be made in node scripts */
ipcRenderer.addListener("SET:CONTENT", (e, data) => {
    document.getElementById(data.id).innerText = data.content;
});

ipcRenderer.addListener("CLEAR:CONTENT", (e, data) => {
    document.getElementById(data.id).innerText = "";
});

document.getElementById("loading_skip").addEventListener('click', () => {
    ipcRenderer.send("INTERNET:CHECK:DISABLE");
    console.log("Hi")
});