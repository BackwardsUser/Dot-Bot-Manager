'use strict';

var overwrite_color = "dark";

console.log(overwrite_color)

var get_theme = (overwrite_color != null) ? overwrite_color : require('../../settings').theme;

var css = document.createElement('link')
css.rel = "stylesheet";
css.href = `../CSS/updater.${get_theme}.css`;

var head = document.querySelector('head').appendChild(css)
