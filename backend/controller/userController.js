import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtTokens.js";
import cloudinary from "cloudinary";

/* ===============================
   REGISTER PATIENT
=============================== */
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    adhar,
    role,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !gender ||
    !dob ||
    !adhar ||
    !role
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorHandler("User Already Registered!", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    adhar,
    role,
  });

  // send token in response body (no cookies)
  generateToken(user, "User Registered Successfully!", 200, res);
});

/* ===============================
   LOGIN
=============================== */
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;

  if (!email || !password || !confirmPassword || !role)
    return next(new ErrorHandler("Please provide all details", 400));

  if (password !== confirmPassword)
    return next(new ErrorHandler("Password and Confirm Password do not match", 400));

  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid email or password", 400));
  if (role !== user.role) return next(new ErrorHandler("User with this role not found", 400));

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) return next(new ErrorHandler("Invalid email or password", 400));

  // send JWT in response body
  generateToken(user, "User logged in successfully!", 200, res);
});

/* ===============================
   ADD NEW ADMIN
=============================== */
export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, gender, dob, adhar } = req.body;

  if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !adhar)
    return next(new ErrorHandler("Please Fill Full Form!", 400));

  const existing = await User.findOne({ email });
  if (existing) return next(new ErrorHandler(`${existing.role} with this email already exists`, 400));

  await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    adhar,
    role: "Admin",
  });

  res.status(200).json({
    success: true,
    message: "New Admin Registered!",
  });
});

/* ===============================
   GET ALL DOCTORS
=============================== */
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({ success: true, doctors });
});

/* ===============================
   GET USER DETAILS (PATIENT)
=============================== */
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
});

/* ===============================
   LOGOUT (FRONTEND CONTROLLED)
=============================== */
export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Admin Logged Out Successfully!" });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Patient Logged Out Successfully!" });
});

/* ===============================
   ADD NEW DOCTOR
=============================== */
export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0)
    return next(new ErrorHandler("Doctor Avatar Required!", 400));

  const { docAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype))
    return next(new ErrorHandler("File Format Not Supported!", 400));

  const { firstName, lastName, email, phone, password, gender, dob, adhar, doctorDepartment } = req.body;

  if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !adhar || !doctorDepartment)
    return next(new ErrorHandler("Please Provide Full Details!", 400));

  const existing = await User.findOne({ email });
  if (existing)
    return next(new ErrorHandler(`${existing.role} already registered with this email`, 400));

  const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error");
  }

  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    adhar,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(200).json({
    success: true,
    message: "New Doctor Registered!",
    doctor,
  });
});
