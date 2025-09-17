"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shortenController_1 = require("../controllers/shortenController");
const router = express_1.default.Router();
router.post("/shorten", shortenController_1.shortenUrl);
router.get("/r/:shortCode", shortenController_1.redirectShortUrl);
exports.default = router;
