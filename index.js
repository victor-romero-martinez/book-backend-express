import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, DB } from "./config.js";
import booksRoute from "./routes/bookRoute.js";

const app = express();

// middleware for parsing request body
app.use(express.json());

// moddlerware for handling CORS policy
app.use(cors());
// // options
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "PUT", "POST", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  return res.status(200).send("Welcome to MERN");
});

app.use("/books", booksRoute);

mongoose
  .connect(DB)
  .then(() => {
    console.log("App connected to database");

    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error DB", err);
  });
