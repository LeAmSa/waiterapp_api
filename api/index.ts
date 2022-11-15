import path from "node:path";

import express from "express";

import mongoose from "mongoose";

import { router } from "./router";

import * as dotenv from "dotenv";
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

mongoose
  .connect(databaseUrl as string)
  .then(() => {
    const app = express();

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    app.use(express.json());
    app.use(router);

    app.listen(3333, () => {
      console.log("Server is running on http://localhost:3333");
    });

    console.log("Connected to mongo!");
  })
  .catch((error) => console.log(error));
