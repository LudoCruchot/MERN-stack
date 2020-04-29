import express from "express";
import bodyParser from "body-parser";

import placesRoutes from "./routes/places-routes";
import usersRoutes from "./routes/users-routes";

const app = express();

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.listen(5000);
