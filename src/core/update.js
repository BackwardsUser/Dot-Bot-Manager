'use strict';

var common = require('../common');

// Connect to server and check if there is an updated version of the app
// If there is an update the app will update than start
// Otherwise it will just launch the app (finding an update isn't time consuming)

common.app.init( () => {

    common.display.init("popup", () => {
        common.display.displayHTML("popup", "updater")
    });

    common.ws.init();

});
