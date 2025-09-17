import express from "express";
import { redirectShortUrl, shortenUrl } from "../controllers/shortenController";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/r/:shortCode", redirectShortUrl);

export default router;
