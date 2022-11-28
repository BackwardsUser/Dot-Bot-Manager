'use strict';

var { WebSocket } = require('ws');
var dns = require('dns')

var serverSettings = require('./server');
var settings = require('./settings');
var display = require('./display');
const { internet } = require('.');

var reconnecting = -1;

var _connection = null;

function getInternetConnection(done) {
    if (settings.loading_skips.skip_internet_check) return display.post('popup', { type: "message", id: "message_top", content: `Skipped Internet Check`}),
    display.post('popup', { type: "clear", id: "message_bottom"}),
    done(false);
    setTimeout(async () => {
        for (var ip of settings.connection_test_ip) {
            internet.ping(ip, (con) => {
                if (con) console.log("Connection"), done();
                else {
                    display.post('popup', { type: "message", id: "message_top", content: "No Internet Connection"});
                    display.post('popup', { type: "clear", id: "message_bottom"});
                };
            });
        };
    }, 2000);
};

function _init(done) {
    if (settings.loading_skips.skip_ws_connection) return console.log("Skipped WS Connection"),
    display.post('popup', { type: "message", id: "message_top", content: `Skipped WS Connection`}),
    display.post('popup', { type: "message", id: "message_bottom", content: `Verifying Internet Connection`}),
    getInternetConnection(done);

    var _connection = new WebSocket("ws://" + serverSettings.host);

    _connection.on('open', () => {
        console.log("Connection Opened");
        done(true)
        reconnecting = -1;
    });

    _connection.on('error', () => {
        setTimeout(() => {
            if (reconnecting >= 0) console.error("Failed. Attempt: " + reconnecting);

            // Ignore my mess...
            if (reconnecting > 0) display.post('popup', { type: "message", id: "message_bottom", content: `Attempt: ${reconnecting}` }), display.post('popup', { type: "message", id: "message_top", content: "Attempting Reconnection" });
            setTimeout(() => {
                if (reconnecting == settings.reconnect_attempts) return console.error("Unable to connect to server."),
                display.post('popup', { type: "message", id: "message_top", content: "Reconnection Failed"}),
                display.post("popup", {type: "message", id: "message_bottom", content: "Checking Internet Connection."}),
                getInternetConnection(done);
                if (reconnecting == -1) console.error("Something went wrong. Attempting to reconnect");
                if (reconnecting >= 0) console.log("Attempting Reconnection.");
                reconnecting++;
                _init();
            }, 1000 * reconnecting)
        }, (reconnecting == -1) ? 1000 : 0);
    });
};

module.exports = {
    connection: _connection,
    init: _init,
}