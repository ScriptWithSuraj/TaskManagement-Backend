import express from "express";
import mongoose from "mongoose";
import auth from "./middlewares/auth.js";
import apiRoute, { apiProtect } from "./routes/api.js";
import { DBConnection } from "./utils/constants.js";
import cors from "cors";
const app = express();
mongoose.connect(DBConnection.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const PORT = 8000;
app.use(cors());
app.listen(PORT, () => console.log("server is running"));
app.use(express.json());
app.use("/api/", apiRoute);
app.use("/api/", auth, apiProtect);
