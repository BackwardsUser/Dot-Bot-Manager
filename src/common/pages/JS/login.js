'use strict';

/* General Imports */
var { ipcRenderer } = require('electron');
var settings = require("../../settings");


/* Dev settings */

/* Acquiring and setting themes */
var css = document.createElement('link')
css.rel = "stylesheet";
if(settings.theme.nonstandard_file_location) css.href = `${settings.theme.file_location}\\${settings.theme.name}.css`;
else css.href = `../css/login/${settings.theme.name}.css`;


// if (settings.theme.nonstandard_file_location || location.toString().toLowerCase() !== "default") {
//     css.href = (location.toString().toLowerCase() === "default") ? settings.theme.file_location.toString() : `${location.toString().toLowerCase()}\\${font_name}`;
// } else {
//     css.href = `../CSS/updater/${get_theme}.css`;
// };

document.querySelector('head').appendChild(css);


/* Nav Buttons */
document.getElementById("min").firstChild.addEventListener('click', () => {
    ipcRenderer.send("WINDOW:MIN")
})

document.getElementById("max").firstChild.addEventListener('click', () => {
    console.log("Hi")
    ipcRenderer.send("WINDOW:MAX");
})

document.getElementById("close").firstChild.addEventListener('click', () => {
    ipcRenderer.send("WINDOW:CLOSE")
})

function navLinkClick(e) {  // When a nav button is pressed this function will run
    if (e.className == "active") return; // If the button is already active, nothing will happen
    var nav_children = document.querySelector(".nav-list").children; // gets every nav button
    for ( var i = 0; i < nav_children.length; i++) {
        if (nav_children[i].className.startsWith("active")) {   // Check if the current nav button has the class "active"
            nav_children[i].className = ""; // If it does it removes it
            break;  // Than ends the for loop
        };
    };
    e.className = "active"; // Finally it sets the clicked button's class name to "active"
};


ipcRenderer.addListener("WINDOW:MAX:STATE", (e, state) => {
    var image = document.getElementById("max").firstChild
    if(state) image.src = "../../assets/images/controls/max-b.svg"
    else image.src = "../../assets/images/controls/max-a.svg";
});

/* Content Changer */
/* This is used so a content change request can be made in node scripts */
ipcRenderer.addListener("WINDOW:CONTENT:SET", (e, data) => {
    document.getElementById(data.id).innerText = data.content;
});

ipcRenderer.addListener("WINDOW:CONTENT:CLEAR", (e, data) => {
    document.getElementById(data.id).innerText = "";
});