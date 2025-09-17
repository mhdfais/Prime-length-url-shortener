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
exports.redirectShortUrl = exports.shortenUrl = void 0;
const handleError_1 = require("../utils/handleError");
const isValidUrl_1 = require("../utils/isValidUrl");
const customError_1 = require("../errors/customError");
const httpStatusCodes_1 = __importDefault(require("../enums/httpStatusCodes"));
const UrlSchema_1 = __importDefault(require("../models/UrlSchema"));
const urlHash_1 = require("../utils/urlHash");
const findSmallPrime_1 = require("../utils/findSmallPrime");
const shortenUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req.body;
        if (!url || !(0, isValidUrl_1.isValidUrl)(url))
            throw new customError_1.CustomError("invalid url", httpStatusCodes_1.default.BAD_REQUEST);
        const numOfDocuments = yield UrlSchema_1.default.countDocuments();
        const smallPrimeNum = (0, findSmallPrime_1.smallestPrimeNumberGreaterThanDocuments)(numOfDocuments);
        const hashedurl = (0, urlHash_1.hash)(url);
        const shortedcode = hashedurl.substring(0, smallPrimeNum);
        const isExist = yield UrlSchema_1.default.findOne({ shortCode: shortedcode });
        if (isExist) {
            if (isExist.url === url) {
                return res.json({
                    url: isExist.url,
                    shorted: isExist.shortCode,
                    shortUrl: `${req.protocol}://${req.get("host")}/r/${isExist.shortCode}`,
                });
            }
            else {
                const nextPrime = (0, findSmallPrime_1.smallestPrimeNumberGreaterThanDocuments)(smallPrimeNum);
                const nextShortedCode = hashedurl.substring(0, nextPrime);
                const nextExist = yield UrlSchema_1.default.findOne({
                    shortCode: nextShortedCode,
                });
                if (nextExist && nextExist.url === url) {
                    return res.json({
                        url: nextExist.url,
                        shorted: nextExist.shortCode,
                        shortUrl: `${req.protocol}://${req.get("host")}/r/${nextExist.shortCode}`,
                    });
                }
                if (!nextExist) {
                    const newUrlSchema = new UrlSchema_1.default({
                        url,
                        shortCode: nextShortedCode,
                    });
                    yield newUrlSchema.save();
                    return res.json({
                        url: newUrlSchema.url,
                        shorted: newUrlSchema.shortCode,
                        shortUrl: `${req.protocol}://${req.get("host")}/r/${newUrlSchema.shortCode}`,
                    });
                }
            }
        }
        else {
            const newUrlSchema = new UrlSchema_1.default({
                url,
                shortCode: shortedcode,
            });
            yield newUrlSchema.save();
            return res.json({
                url: newUrlSchema.url,
                shorted: newUrlSchema.shortCode,
                shortUrl: `${req.protocol}://${req.get("host")}/r/${newUrlSchema.shortCode}`,
            });
        }
    }
    catch (error) {
        (0, handleError_1.errorHandler)(error, res);
    }
});
exports.shortenUrl = shortenUrl;
const redirectShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortCode } = req.params;
        const shortedUrl = yield UrlSchema_1.default.findOne({ shortCode });
        if (!shortedUrl)
            throw new customError_1.CustomError("short url not found", httpStatusCodes_1.default.NOT_FOUND);
        res.redirect(shortedUrl.url);
    }
    catch (error) {
        (0, handleError_1.errorHandler)(error, res);
    }
});
exports.redirectShortUrl = redirectShortUrl;
