import express from "express";
import bodyParser from "body-parser";

import placesRoutes from "./routes/places-routes";
import usersRoutes from "./routes/users-routes";

const app = express();

app.use("/api/places", placesRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

app.use("/api/users", usersRoutes);

app.listen(5000);
