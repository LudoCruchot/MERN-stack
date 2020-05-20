import HttpError from "../models/http-error";
import jwt from "jsonwebtoken";

export default (req, res, next) => {
  if(req.method === 'OPTIONS'){
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; // authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    return next(new HttpError("Authentication failed", 401));
  }
};
