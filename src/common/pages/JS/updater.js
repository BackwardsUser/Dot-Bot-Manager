'use strict';

var overwrite_color = null;

var settings = require("../../settings");

var get_theme = ( overwrite_color != null && settings.dev_mode) ? overwrite_color : settings.default_theme;

var css = document.createElement('link')
css.rel = "stylesheet";
css.href = `../CSS/updater/${get_theme}.css`;

var head = document.querySelector('head').appendChild(css)
