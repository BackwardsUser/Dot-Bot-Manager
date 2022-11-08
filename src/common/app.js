'use strict';

var { app } = require('electron');
var settings = require('./settings')

function _init(ready) {
    if (!settings.hardware_acceleration) app.disableHardwareAcceleration();
    app.whenReady().then( () => {
        ready();
    });
};

module.exports = {
    
    init: _init,

}