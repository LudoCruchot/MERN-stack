import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

import placesRoutes from "./routes/places-routes";
import usersRoutes from "./routes/users-routes";
import HttpError from "./models/http-error";

//const DB_URL = process.env.DB_URL;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

const app = express();

app.use(bodyParser.json()); // get the json data of the body and call automatically next middleware

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.warn(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@antoinecluster-mrdww.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
