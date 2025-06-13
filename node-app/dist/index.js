"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prom_client_1 = __importDefault(require("prom-client"));
const indexx_1 = require("./metrics/indexx");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(indexx_1.metricsMiddleware);
app.get('/cpu', (req, res) => {
    for (let i = 0; i < 100000; i++) {
        Math.random();
    }
    res.json({
        message: "cpu endpoint hit."
    });
});
app.post('/user', (req, res) => {
    const body = req.body;
    res.send({
        name: "john doe",
        age: "28"
    });
});
app.get('/delay', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const delay = yield new Promise((resolve) => setTimeout(resolve, 1000));
    res.send({
        message: "delay with 1s"
    });
}));
app.get('/metrics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const metrics = yield prom_client_1.default.register.metrics();
    res.set('Content-type', prom_client_1.default.register.contentType);
    res.end(metrics);
}));
app.listen(3000);
