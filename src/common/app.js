var { app } = require("electron");
var os = require("os");
var settings = require("./settings");

function init(done) {
    if (app == undefined) return console.error("There was an issue trying to get \"app\".");
    var platform = os.platform().toString();
    if (settings.OS.filter(o => o == platform.toUpperCase()) == 0) return console.error(`This application was built for: `), settings.OS.forEach(function (o) {console.error(`- ${o}`)}), console.error(`Get the Correct build from the GitHub!`);
    if (!settings.HARDWARE_ACCELERATION) app.disableHardwareAcceleration();
    app.whenReady().then( () => {
        console.log("App Ready.");
        done(app);
    });
};

module.exports = {
    init,
}