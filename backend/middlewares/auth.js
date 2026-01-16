import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";

/* ===============================
   ADMIN AUTHENTICATION
   (Header-based JWT)
=============================== */
export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return next(new ErrorHandler("Admin not authenticated", 401));

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }

  const user = await User.findById(decoded.id);
  if (!user || user.role !== "Admin")
    return next(new ErrorHandler("Not authorized for this resource", 403));

  req.user = user;
  next();
});

/* ===============================
   PATIENT AUTHENTICATION
   (Header-based JWT)
=============================== */
export const isPatientAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return next(new ErrorHandler("Patient not authenticated", 401));

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }

  const user = await User.findById(decoded.id);
  if (!user || user.role !== "Patient")
    return next(new ErrorHandler("Not authorized for this resource", 403));

  req.user = user;
  next();
});
