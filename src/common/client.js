'use strict';

var { Client, IntentsBitField } = require('discord.js');

class _my_client extends Client {
    constructor(token, prefix) {
        super({ intents: new IntentsBitField(7796), prefix: prefix });
        this.login(token);
    };
};

function _check_client(token, prefix, done) {
    var client = new _my_client(token, prefix)
    client.once('ready', () => {
        if (client.token != token) return done(false), client.destroy();
        else return done(client.user.avatarURL, client.user.username), client.destroy();
    });
    client.on('error', () => {
        return done(false), client.destroy();
    });
};

module.exports = {

    my_client: _my_client,
    check_client: _check_client,

}
