import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import User from "../models/user";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (error) {
    return next(
      new HttpError("Fetching users failed, please try again later", 500)
    );
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

export const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed please check your data", 422)
    );
  }
  const { name, email, password } = req.body;

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
    image: req.file.path,
    password,
    places: [],
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

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("Logging in failed, please try again later", 500)
    );
  }

  if (!existingUser || existingUser.password !== password) {
    return next(
      new HttpError("Invalid credentials, could not log you in", 500)
    );
  }
  res.json({
    message: "LOGGED IN",
    user: existingUser.toObject({ getters: true }),
  });
};
