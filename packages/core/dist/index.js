var watchdog = (function (exports) {
    'use strict';

    var parseStack = function (stack) {
        if (stack) {
            var lines = stack.split('\n');
            // 解析第一行堆栈信息以获取文件名、行号和列号
            var matches = /.*at\s(.*):(\d+):(\d+)/.exec(lines[1]);
            if (matches) {
                var fileName = matches[1];
                var lineNumber = parseInt(matches[2], 10);
                var columnNumber = parseInt(matches[3], 10);
                console.log('Unhandled Promise rejection at:', fileName);
                console.log('Line Number:', lineNumber);
                console.log('Column Number:', columnNumber);
                return {
                    message: lines[0],
                    source: fileName,
                    lineno: lineNumber,
                    colno: columnNumber
                };
            }
        }
    };

    var monitor = function () {
        window.onerror = function (errorMessage, sourceURL, lineNumber, columnNumber) {
        };
        window.addEventListener('unhandledrejection', function (event) {
            var stack = event.reason.stack;
            parseStack(stack);
        });
    };

    var report = function () {
        fetch('/report');
    };

    var client = function (options) {
        monitor();
    };

    exports.client = client;
    exports.monitor = monitor;
    exports.report = report;

    return exports;

})({});
