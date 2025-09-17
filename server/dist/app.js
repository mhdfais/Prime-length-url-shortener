"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const handleError_1 = require("./utils/handleError");
const shortenRoutes_1 = __importDefault(require("./routes/shortenRoutes"));
const app = (0, express_1.default)();
app.use("/", shortenRoutes_1.default);
app.use(handleError_1.errorHandler);
exports.default = app;
