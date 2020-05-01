import uuid from "uuid/v4";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import { getCoordsForAddress } from "../utils/location";

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world !",
    imageUrl:
      "https://images.pexels.com/photos/2404949/pexels-photo-2404949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878531,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Tour Eiffel",
    description: "The most iconic building in Europe",
    imageUrl:
      "https://images.pexels.com/photos/460740/pexels-photo-460740.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    address: "Champs de Mars, Paris 75007",
    location: {
      lat: 48.8560088,
      lng: 2.2882714,
    },
    creator: "u1",
  },
  {
    id: "p3",
    title: "La barquette",
    description: "Objectif du 501st PIR",
    imageUrl:
      "https://www.wikimanche.fr/images/thumb/6/6d/Stcome-1944-pontbarquette1.jpg/300px-Stcome-1944-pontbarquette1.jpg",
    address: "Dans les marais de Carentan",
    location: {
      lat: 49.32538,
      lng: -1.2455311,
    },
    creator: "u1",
  },
];

export const getPlaceById = (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_PLACES.find((p) => p.id === placeId);

  if (!place) {
    throw new HttpError("Could not find a place for the provided id", 404);
  }

  res.json({ place });
};

export const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.userId;
  const places = DUMMY_PLACES.filter((p) => p.creator === userId);

  console.log(places);

  if (!places || places.length === 0)
    return next(
      new HttpError("Could not find places for the provided user id", 404)
    );

  res.json({ places });
};

export const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    next(new HttpError("Invalid inputs passed please check your data", 422));
  }
  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};

export const updatePlace = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed please check your data", 422)
    );
  }

  const { title, description } = req.body;
  const placeId = req.params.placeId;

  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

export const deletePlace = (req, res, next) => {
  const placeId = req.params.placeId;
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    return next(new HttpError("Could not find a place for that id", 422));
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

  res.status(200).json({ message: "Place deleted" });
};
