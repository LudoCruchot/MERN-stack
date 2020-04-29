import express from "express";
import bodyParser from "body-parser";

import placesRoutes from "./routes/places-routes";
import usersRoutes from "./routes/users-routes";

const app = express();

app.use(bodyParser.json()); // get the json data of the body and call automatically next middleware

app.use("/api/places", placesRoutes);

app.use("/api/users", usersRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

app.listen(5000);
