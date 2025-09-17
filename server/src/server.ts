import dotenv from "dotenv";
import { connectDB } from "./config/dbConnect";
import app from "./app";

dotenv.config();

const port = process.env.PORT || 5555;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("database connection error", err);
  });
