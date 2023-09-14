var watchdog = (function (exports) {
    'use strict';

    var monitor = function () {
        window.onerror = function (errorMessage, sourceURL, lineNumber, columnNumber) {
            console.log('err', errorMessage, sourceURL, lineNumber, columnNumber);
        };
        window.addEventListener('unhandledrejection', function (event) {
            var _a = event.reason, message = _a.message, stack = _a.stack;
            console.log('err', message, stack);
        });
    };

    var report = function () {
    };

    var client = function (options) {
        monitor();
    };

    exports.client = client;
    exports.monitor = monitor;
    exports.report = report;

    return exports;

})({});
