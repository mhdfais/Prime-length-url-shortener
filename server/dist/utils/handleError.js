"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const customError_1 = require("./../errors/customError");
const errorHandler = (err, res) => {
    if (err instanceof customError_1.CustomError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }
    // console.error("unhandled error", err);
    res.status(500).json({
        success: false,
        message: "internal server error, please try again",
    });
};
exports.errorHandler = errorHandler;
