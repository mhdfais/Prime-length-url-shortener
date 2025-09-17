"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnect_1 = require("./config/dbConnect");
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const port = process.env.PORT || 5555;
(0, dbConnect_1.connectDB)()
    .then(() => {
    app_1.default.listen(port, () => {
        console.log(`server running on port ${port}`);
    });
})
    .catch((err) => {
    console.error("database connection error", err);
});
