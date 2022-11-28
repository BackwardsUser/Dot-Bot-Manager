'use strict';

function ping(ip, done) {
    require('dns').lookup(ip, function(err) {
        if (err != null && err.code == "ENOTFOUND") done(false)
        else done(true);
    })
}

module.exports = {
    ping
}