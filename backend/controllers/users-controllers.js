import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError("Could not create user, please try again", 500));
  }

  const createdUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (error) {
    return next(
      new HttpError("Signing up failed, please try again later", 400)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(
      new HttpError("Signing up failed, please try again later", 400)
    );
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
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

  if (!existingUser) {
    return next(
      new HttpError("Invalid credentials, could not log you in", 403)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    return next(
      new HttpError(
        "Could not log you in, please check your credentials and try again",
        500
      )
    );
  }

  if (!isValidPassword) {
    return next(
      new HttpError("Invalid credentials, could not log you in", 401)
    );
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(
      new HttpError("Logging in failed, please try again later", 400)
    );
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });
};
