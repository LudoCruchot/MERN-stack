import uuid from "uuid/v4";

import HttpError from "../models/http-error";

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Antoine",
    email: "antoine@google.com",
    password: "cocotonio",
    image:
      "https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    places: 3,
  },
  {
    id: "u2",
    name: "Zoé",
    email: "zoe@google.com",
    password: "cocotonio",
    image:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    places: 128,
  },
  {
    id: "u3",
    name: "Claire",
    email: "claire@google.com",
    password: "cocotonio",
    image:
      "https://images.pexels.com/photos/806835/pexels-photo-806835.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    places: 55,
  },
];

export const getAllUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

export const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser)
    return next(
      new HttpError("Could not create user, email already exists", 422)
    );

  const newUser = {
    id: uuid(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(newUser);

  res.status(201).json({ user: newUser });
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
