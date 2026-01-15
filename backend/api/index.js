// /api/index.js
import app from "../app.js";
import { dbConnection } from "../database/dbConnection.js";
import cloudinary from "cloudinary";

let isConnected = false;

// Connect DB and Cloudinary once at cold start
async function init() {
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

// Immediately run init() (cold start)
init().catch(err => console.error("Init error:", err));

// Export the Express app for Vercel
export default app;
