import path from "node:path";
import http from "node:http";
import express from "express";
import mongoose from "mongoose";
import { router } from "./router";
import { Server } from "socket.io";

import * as dotenv from "dotenv";
dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

const app = express();

const server = http.createServer(app);
export const io = new Server(server);

mongoose
  .connect(databaseUrl as string)
  .then(() => {
    io.on("connect", () => {
      console.log("Conectou!");
    });

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");

      next();
    });

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    );
    app.use(express.json());
    app.use(router);

    server.listen(3333, () => {
      console.log("Server is running on http://localhost:3333");
    });

    console.log("Connected to mongo!");
  })
  .catch((error) => console.log(error));
