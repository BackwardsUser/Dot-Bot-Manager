'use strict';

var { app } = require('electron');
var os = require('os')
var settings = require('./settings')

function _init(ready) {
    var platform = os.platform().toString();
    console.log(platform)
    if ( !(platform == 'win64' || platform == 'win32') ) return console.error("This application is developed for windows. Please download a " + os.platform + " version from the github.");
    if (!settings.hardware_acceleration) app.disableHardwareAcceleration(), console.log("Disabling Hardware Acceleration.");
    app.whenReady().then( () => {
        ready();
    });
};

module.exports = {
    
    init: _init,

}