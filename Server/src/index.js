import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import db from "./config/db.js";
import constant from "./config/constant.js";
import indexRoutes from "./routes/indexRoutes.js";

dotenv.config();
const app = express();
const port = constant.PORT;

// for CORS
app.use(cors());

// to parse json and encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for access static files
app.use(express.static(path.resolve("public")));

// create server
app.listen(port, (err) => {
  if (err) {
    console.error("Server not connected!");
  } else {
    console.log(`Server is running on http://localhost:${port}`);
    db();
  }
});

// routing
app.use("/api/v1/", indexRoutes);
