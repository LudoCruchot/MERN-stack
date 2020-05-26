import HttpError from "../models/http-error";
import jwt from "jsonwebtoken";

const JWT_KEY = process.env.JWT_KEY;

export default (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken = jwt.verify(token, JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(new HttpError("Authentication failed", 403));
  }
};
