"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestCounter = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.requestCounter = new prom_client_1.default.Counter({
    name: "http_request_total",
    help: "total number of http requests",
    labelNames: ['method', 'route', 'status_code']
});
