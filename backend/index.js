import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config()

console.log("MongoDB Connection String:", mongoDBURL);

const app = express();

// Middleware for parsing request
app.use(express.json());

app.get("/", (request, response) => {
  console.log("request", request);
  return response.status(200).send("This will be a book store");
});

// Option1: Allow All origins with default of cors(*)
app.use(cors());

// Option2: Allow custom origins
// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type"]
// }))

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
