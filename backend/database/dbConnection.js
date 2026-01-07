import mongoose from "mongoose";

let isConnected = false;

export const dbConnection = async () => {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM"
    });

    isConnected = db.connections[0].readyState;
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};
