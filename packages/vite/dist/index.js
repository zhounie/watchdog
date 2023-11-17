'use strict';

function watchdogPlugin(options) {
    console.log(options);
    
    console.log('111111--------------');

    return {
        name: 'watchdog-vite',
        buildEnd: (outOptions) => {
            console.log('outOptions');
            console.log(outOptions);
        }
    }
}

module.exports = watchdogPlugin;
