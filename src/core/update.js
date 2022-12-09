'use strict';

var common = require('../common');

// Connect to server and check if there is an updated version of the app
// If there is an update the app will update than start
// Otherwise it will just launch the app (finding an update isn't time consuming)

// Check if application is in dev mode and warns if it is
// This prevents me from uploading the bot in dev mode, not a big deal if it is.
if (common.settings.dev_mode) {
    console.warn("----------");
    for (var i = 0; i < 10; i++) {
        console.warn("HOLD ON");
    };
    console.warn("Remember to switch dev-mode off before releasing or committing!");
    console.warn("----------");
};

common.ipcMain.initializeDefaultEvents();

common.app.init( () => {

    common.display.init("popup", () => {
        common.display.displayHTML("popup", "updater");
    });

    common.ws.init((opened) => {
        if (opened) console.warn("No Updating script yet.")
        common.display.init("main", () => {
            common.display.destroy("popup")
            common.display.displayHTML("main", "login");
        });
    });

});
