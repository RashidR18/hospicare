import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

// ✅ CORS (Vercel safe)
app.use(
  cors({
    origin: [
      "https://hospicare-b3r7-rgh8td1sf-rashid-alis-projects.vercel.app",
      "https://hospicare-zsd6-62bs2xgcx-rashid-alis-projects.vercel.app"
    ],
    credentials: true
  })
);

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
  })
);

// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Error middleware (LAST)
app.use(errorMiddleware);

export default app;
