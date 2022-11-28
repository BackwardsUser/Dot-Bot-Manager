'use strict';

var dns = require('dns');

// function puts(error, stdout, stderr) { return stdout }

function ping(ip) {
    return new Promise(() => {
        dns.resolve(ip, (err, ips) => {
            if(ips[0]) return true
            else return false;
        });
    });
};



module.exports = {
    ping
}