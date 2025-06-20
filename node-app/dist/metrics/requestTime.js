"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpRequestTime = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.httpRequestTime = new prom_client_1.default.Histogram({
    name: 'http_request_time',
    help: 'duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000]
});
