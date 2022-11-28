'use strict';

module.exports = {

    loading_skips: {
        skip_ws_connection: true,
        skip_internet_check: false
    },
    hardware_acceleration: false, // Enable/Disable Hardware Acceleration
    reconnect_attempts: 5,  // The amount of times the websocket will attempt to connect to the server.
    default_theme: "dark",  // The default theme (This is unlikely to change)
    theme: {
        name: "dark", // Name of theme file (without ".css")
        nonstandard_file_location: false, // Changing this tells the pages to look elsewhere for the theme files.
        file_location: null // This should change to the CSS file location (if above is true)
    },
    connection_test_ip: [
        "www.discord.com"
    ],   // IP's that are tested in the case of a failed connection
    
    dev_mode: false, // Enable/Disable Dev mode (Very un-important changes - ex. change theme in page source)
    
}