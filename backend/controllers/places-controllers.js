import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import { getCoordsForAddress } from "../utils/location";
import Place from "../models/place";

export const getPlaceById = async (req, res, next) => {
  const placeId = req.params.placeId;
  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError(
        "Something went wrong, could not find a place for the provided id",
        500
      )
    );
  }

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id", 404)
    );
  }

  res.json({ place: place.toObject({ getters: true }) });
};

export const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  let places;

  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    return next(
      new HttpError(
        "Something went wrong, could not find a place for the provided user id",
        500
      )
    );
  }

  if (!places || places.length === 0)
    return next(
      new HttpError("Could not find places for the provided user id", 404)
    );

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

export const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed please check your data", 422)
    );
  }
  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
    return next(new HttpError("Creating place failed, please try again", 500));
  }

  res.status(201).json({ place: createdPlace });
};

export const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed please check your data", 422)
    );
  }

  const { title, description } = req.body;
  const placeId = req.params.placeId;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not update place", 500)
    );
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not update place", 500)
    );
  }

  res.status(200).json({ place: place.toObject({ getter: true }) });
};

export const deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId;
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete place", 500)
    );
  }

  try {
    await place.remove();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete place XXX", 500)
    );
  }

  res.status(200).json({ message: "Place deleted" });
};
