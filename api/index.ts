import express from "express";
import mongoose from "mongoose";

const app = express();

// const databaseUrl = process.env.DATABASE_URL;

// console.log(databaseUrl);

mongoose
  //@ts-ignore
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to mongo!"))
  .catch(() => console.log("Error!"));

app.listen(3333, () => {
  console.log("Server is running on http://localhost:3333");
});
