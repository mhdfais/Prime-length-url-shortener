"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = hash;
const crypto_1 = __importDefault(require("crypto"));
function hash(url) {
    const hashUrl = crypto_1.default.createHash("sha256").update(url).digest("hex");
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopkrstuvwxyz";
    let result = "";
    for (let i = 0; i < hashUrl.length; i += 2) {
        const pair = hashUrl.substring(i, i + 2);
        const decimal = parseInt(pair, 16);
        result += chars[decimal % 62];
    }
    return result;
}
