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

    var monitor = function (options) {
        window.onerror = function (errorMessage, sourceURL, lineNumber, columnNumber) {
        };
        window.addEventListener('unhandledrejection', function (event) {
            var stack = event.reason.stack;
            parseStack(stack);
        });
        // window.addEventListener("error", (event) => {
        //     // 判断是否是资源加载错误
        //     if (
        //       event.target instanceof HTMLImageElement ||
        //       event.target instanceof HTMLScriptElement ||
        //       event.target instanceof HTMLLinkElement
        //     ) {
        //       console.error("资源加载错误:", event.target.src || event.target.href);
        //     }
        // });
    };

    var e,n,t,r,a=-1,o=function(e){addEventListener("pageshow",(function(n){n.persisted&&(a=n.timeStamp,e(n));}),!0);},c=function(){return window.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0]},u=function(){var e=c();return e&&e.activationStart||0},f=function(e,n){var t=c(),r="navigate";a>=0?r="back-forward-cache":t&&(document.prerendering||u()>0?r="prerender":document.wasDiscarded?r="restore":t.type&&(r=t.type.replace(/_/g,"-")));return {name:e,value:void 0===n?-1:n,rating:"good",delta:0,entries:[],id:"v3-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12),navigationType:r}},s=function(e,n,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){var r=new PerformanceObserver((function(e){Promise.resolve().then((function(){n(e.getEntries());}));}));return r.observe(Object.assign({type:e,buffered:!0},t||{})),r}}catch(e){}},d=function(e,n,t,r){var i,a;return function(o){n.value>=0&&(o||r)&&((a=n.value-(i||0))||void 0===i)&&(i=n.value,n.delta=a,n.rating=function(e,n){return e>n[1]?"poor":e>n[0]?"needs-improvement":"good"}(n.value,t),e(n));}},l=function(e){requestAnimationFrame((function(){return requestAnimationFrame((function(){return e()}))}));},p=function(e){var n=function(n){"pagehide"!==n.type&&"hidden"!==document.visibilityState||e(n);};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0);},v=function(e){var n=!1;return function(t){n||(e(t),n=!0);}},m=-1,h=function(){return "hidden"!==document.visibilityState||document.prerendering?1/0:0},g=function(e){"hidden"===document.visibilityState&&m>-1&&(m="visibilitychange"===e.type?e.timeStamp:0,T());},y=function(){addEventListener("visibilitychange",g,!0),addEventListener("prerenderingchange",g,!0);},T=function(){removeEventListener("visibilitychange",g,!0),removeEventListener("prerenderingchange",g,!0);},E=function(){return m<0&&(m=h(),y(),o((function(){setTimeout((function(){m=h(),y();}),0);}))),{get firstHiddenTime(){return m}}},C=function(e){document.prerendering?addEventListener("prerenderingchange",(function(){return e()}),!0):e();},L=[1800,3e3],b=function(e,n){n=n||{},C((function(){var t,r=E(),i=f("FCP"),a=s("paint",(function(e){e.forEach((function(e){"first-contentful-paint"===e.name&&(a.disconnect(),e.startTime<r.firstHiddenTime&&(i.value=Math.max(e.startTime-u(),0),i.entries.push(e),t(!0)));}));}));a&&(t=d(e,i,L,n.reportAllChanges),o((function(r){i=f("FCP"),t=d(e,i,L,n.reportAllChanges),l((function(){i.value=performance.now()-r.timeStamp,t(!0);}));})));}));},w=[.1,.25],S=function(e,n){n=n||{},b(v((function(){var t,r=f("CLS",0),i=0,a=[],c=function(e){e.forEach((function(e){if(!e.hadRecentInput){var n=a[0],t=a[a.length-1];i&&e.startTime-t.startTime<1e3&&e.startTime-n.startTime<5e3?(i+=e.value,a.push(e)):(i=e.value,a=[e]);}})),i>r.value&&(r.value=i,r.entries=a,t());},u=s("layout-shift",c);u&&(t=d(e,r,w,n.reportAllChanges),p((function(){c(u.takeRecords()),t(!0);})),o((function(){i=0,r=f("CLS",0),t=d(e,r,w,n.reportAllChanges),l((function(){return t()}));})),setTimeout(t,0));})));},A={passive:!0,capture:!0},I=new Date,P=function(r,i){e||(e=i,n=r,t=new Date,k(removeEventListener),F());},F=function(){if(n>=0&&n<t-I){var i={entryType:"first-input",name:e.type,target:e.target,cancelable:e.cancelable,startTime:e.timeStamp,processingStart:e.timeStamp+n};r.forEach((function(e){e(i);})),r=[];}},M=function(e){if(e.cancelable){var n=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,n){var t=function(){P(e,n),i();},r=function(){i();},i=function(){removeEventListener("pointerup",t,A),removeEventListener("pointercancel",r,A);};addEventListener("pointerup",t,A),addEventListener("pointercancel",r,A);}(n,e):P(n,e);}},k=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(n){return e(n,M,A)}));},D=[100,300],x=function(t,i){i=i||{},C((function(){var a,c=E(),u=f("FID"),l=function(e){e.startTime<c.firstHiddenTime&&(u.value=e.processingStart-e.startTime,u.entries.push(e),a(!0));},m=function(e){e.forEach(l);},h=s("first-input",m);a=d(t,u,D,i.reportAllChanges),h&&p(v((function(){m(h.takeRecords()),h.disconnect();}))),h&&o((function(){var o;u=f("FID"),a=d(t,u,D,i.reportAllChanges),r=[],n=-1,e=null,k(addEventListener),o=l,r.push(o),F();}));}));},U=[2500,4e3],V={},W=function(e,n){n=n||{},C((function(){var t,r=E(),i=f("LCP"),a=function(e){var n=e[e.length-1];n&&n.startTime<r.firstHiddenTime&&(i.value=Math.max(n.startTime-u(),0),i.entries=[n],t());},c=s("largest-contentful-paint",a);if(c){t=d(e,i,U,n.reportAllChanges);var m=v((function(){V[i.id]||(a(c.takeRecords()),c.disconnect(),V[i.id]=!0,t(!0));}));["keydown","click"].forEach((function(e){addEventListener(e,(function(){return setTimeout(m,0)}),!0);})),p(m),o((function(r){i=f("LCP"),t=d(e,i,U,n.reportAllChanges),l((function(){i.value=performance.now()-r.timeStamp,V[i.id]=!0,t(!0);}));}));}}));};

    var report = function (data) {
        navigator.sendBeacon('/report', JSON.stringify(data));
    };

    var LCP = function (options) {
        W(function (data) {
            report(data);
        });
    };
    var FID = function (options) {
        x(function (data) {
            report(data);
        });
    };
    var CLS = function (options) {
        S(function (data) {
            report(data);
        });
    };
    function performance$1(options) {
        LCP();
        FID();
        CLS();
    }

    // export const client = (options: Options) => {
    //     config(options)
    // }
    var client = /** @class */ (function () {
        function client(options) {
            this.data = [];
            performance$1();
            monitor();
        }
        return client;
    }());

    exports.CLS = CLS;
    exports.FID = FID;
    exports.LCP = LCP;
    exports.client = client;
    exports.monitor = monitor;
    exports.performance = performance$1;
    exports.report = report;

    return exports;

})({});
