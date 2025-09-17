import express from "express";
import { errorHandler } from "./utils/handleError";
import urlRoutes from "./routes/shortenRoutes"
import cors from 'cors';
import { corsOptions } from "./config/corsConfig";

const app = express();

app.use(cors(corsOptions))
app.use(express.json())

app.use("/", urlRoutes);

app.use(errorHandler);

export default app;
