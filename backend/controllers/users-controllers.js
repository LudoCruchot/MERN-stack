import uuid from "uuid/v4";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import User from "../models/user";

export const getAllUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

export const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed please check your data", 422)
    );
  }
  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later", 500)
    );
  }

  if (existingUser) {
    return next(new HttpError("User already exists, please login", 422));
  }

  const createdUser = new User({
    name,
    email,
    image:
      "https://images.pexels.com/photos/162520/farmer-man-shepherd-dog-162520.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    password,
    places,
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later", 400)
    );
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identified user, credentials seem to be wrong",
      401
    );
  }

  res.json({ message: "LOGGED IN" });
};
