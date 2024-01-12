import dotenv from "dotenv";
import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

dotenv.config();

console.log("MongoDB Connection String:", mongoDBURL);
console.log("", process.env.REACT_APP_API_KEY);

const app = express();

// Middleware for parsing request
app.use(express.json());

app.get("/", (request, response) => {
  console.log("request", request);
  return response.status(200).send("This will be a book store");
});

// Option1: Allow All origins with default of cors(*)
app.use(cors());

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
