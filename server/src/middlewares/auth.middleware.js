import jsonwebtoken from "jsonwebtoken";
import asyncHandler from "../utils/async-handle.js";
import User from "../models/user.model.js"
import ApiError from "../utils/error.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new ApiError(500, "JWT secret is not defined", []);
  }

  if (!token) {
    throw new ApiError(401, "Authentication token is missing", []);
  }

  const decoded = jsonwebtoken.verify(token, JWT_SECRET);

  if (!decoded || typeof decoded === "string" || !decoded.id) {
    throw new ApiError(401, "Invalid authentication token", []);
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    throw new ApiError(401, "User not found", []);
  }

  req.user = user;
  next();
});
