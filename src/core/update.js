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

common.app.init( () => {

    common.display.init("popup", () => {
        common.display.displayHTML("popup", "updater");
    });

    common.ws.init((opened) => {
        common.display.init("main", () => {
            if (opened) {
                console.warn("Accounts have yet to be implemented, stay tuned!")
                // I really don't want to deal with accounts right yet.
                common.display.displayHTML("main", "botLog"); // Change "botLog" to "accLog" when accounts are implemented.
                // "accLog" should, on completion, route you to "botLog" anyways.
            } else {
                common.display.displayHTML("main", "botLog");
            }
        });
    });

});
