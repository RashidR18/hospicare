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
      "https://hospicarefrontend.vercel.app",
      "https://hospicaredashboard.vercel.app",
      "http://localhost:5173"
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


app.use((req, res, next) => {
  console.log("➡️ Incoming:", req.method, req.originalUrl);
  next();
});


// Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Error middleware (LAST)
app.use(errorMiddleware);

export default app;
