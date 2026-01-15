import app from "../app.js";
import cloudinary from "cloudinary";
import { dbConnection } from "../database/dbConnection.js";

let isConnected = false;

async function connectOnce() {
  if (!isConnected) {
    await dbConnection();
    isConnected = true;

    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
  }
}

export default async function handler(req, res) {
  await connectOnce();
  return app(req, res);
}
