"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = void 0;
const activeReqs_1 = require("./activeReqs");
const requestCount_1 = require("./requestCount");
const requestTime_1 = require("./requestTime");
const metricsMiddleware = (req, res, next) => {
    const startTime = Date.now();
    activeReqs_1.activeRequests.inc();
    res.on('finish', function () {
        const endTime = Date.now();
        const duration = startTime - endTime;
        requestCount_1.requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: req.statusCode
        });
        requestTime_1.httpRequestTime.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: req.statusCode
        }, duration);
        activeReqs_1.activeRequests.dec();
    });
    next();
};
exports.metricsMiddleware = metricsMiddleware;
