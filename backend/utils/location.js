import axios from "axios";
import HttpError from "../models/http-error";
require("dotenv").config();

const API_KEY = process.env.GOOGLE_MAP_API_KEY;

export const getCoordsForAddress = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError(
      "Could not find location for this specified address",
      422
    );
    throw error;
  }

  return data.results[0].geometry.location;
};
