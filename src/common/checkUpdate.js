'use strict';

// Create a function that will make a WS request (using ws module) to the server asking for the current version

// If this version (can be acquired in buildInfo.js) is lower than the newest version, an update is downloaded
// a local version checker function will be made to convert version string to number
// after the update completes, the done event is sent and the app is started

// If this version is equal to the newest version the done event is sent and the app is started


// Takes the string version ("x.x.x") and turns it into an array of numbers ( [x, x, x] ) this lets me compare the numbers.
function _compare_version(server_version, client_version) {
    if (typeof server_version != "string" && typeof client_version != "string") return console.error("The given parameters must be strings. checkUpdate.js - ln 11");
    var sv = server_version.split(".");
    var cv = client_version.split(".");

    for (var i = 0; i < sv.length; i++) {
        if (parseInt(sv[i], 10) > parseInt(cv[i], 10)) return true;
        if (parseInt(sv[i], 10) < parseInt(cv[i], 10)) return [false, "ERROR: Client version > Server version. How?"];
        if (i == (sv.length - 1) && parseInt(sv[i], 10) == parseInt(cv[i], 10)) return false;
    }
}