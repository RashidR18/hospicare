// /api/index.js
import app from "../app.js";
import { dbConnection } from "../database/dbConnection.js";
import cloudinary from "cloudinary";

let cloudinaryConfigured = false;

export default async function handler(req, res) {
  // ✅ Ensure MongoDB is connected BEFORE any route runs
  await dbConnection();

  // ✅ Configure Cloudinary once per container
  if (!cloudinaryConfigured) {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    cloudinaryConfigured = true;
  }

  // ✅ Now safely handle the request
  return app(req, res);
}
