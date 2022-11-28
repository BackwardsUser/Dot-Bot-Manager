'use strict';

/* General Imports */
var { ipcRenderer } = require('electron');
var settings = require("../../settings");


/* Dev settings */

/* Acquiring and setting themes */
var css = document.createElement('link')
css.rel = "stylesheet";
if(settings.theme.nonstandard_file_location) css.href = `${settings.theme.file_location}\\${settings.theme.name}.css`;
else css.href = `../css/updater/${settings.theme.name}.css`;


// if (settings.theme.nonstandard_file_location || location.toString().toLowerCase() !== "default") {
//     css.href = (location.toString().toLowerCase() === "default") ? settings.theme.file_location.toString() : `${location.toString().toLowerCase()}\\${font_name}`;
// } else {
//     css.href = `../CSS/updater/${get_theme}.css`;
// };

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
});