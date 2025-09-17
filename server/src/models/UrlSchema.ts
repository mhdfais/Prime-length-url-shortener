import mongoose from "mongoose";
import { IShorten } from "../interfaces/IShorten";

const urlSchema = new mongoose.Schema<IShorten>({
  url: { type: String, required: true },
  shortCode: { type: String, required: true ,unique:true},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("UrlSchema", urlSchema);