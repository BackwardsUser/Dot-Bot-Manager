'use strict';

var { WebSocket } = require('ws');
var ping = require('ping');

var serverSettings = require('./server');
var settings = require('./settings');

var reconnecting = -1;

var _connection = null;

function getInternetConnection(done) {
    ping.sys.probe('8.8.8.8', function(alive) {
        if (alive) return console.log("It appears that the WS servers are down."), console.log("Disabling WS functionalities.\nYou can still use the app, you just are unable to login.\nYou should be able to use the bot like normal, however."), _connection = null, done(false);
        else return console.error("You are not connected to internet. Please connect to internet then restart the app.");
    });
};

function _init(done) {
    var _connection = new WebSocket("ws://" + serverSettings.host);

    _connection.on('open', () => {
        console.log("Connection Opened");
        done(true)
        reconnecting = -1;
    });

    _connection.on('error', () => {
        if (reconnecting >= 0) console.error("Failed. Attempt: " + reconnecting );
        setTimeout( () => {
            if (reconnecting == settings.reconnect_attempts) return console.error("Unable to connect to server."), getInternetConnection(done);
            if (reconnecting == -1) console.error("Something went wrong. Attempting to reconnect");
            if (reconnecting >= 0) console.log("Attempting Reconnection.");
            reconnecting++;
            _init();
        }, 1000 * reconnecting)
    });
};

module.exports = {
    connection: _connection,
    init: _init,
}