import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { setServers } from "node:dns";

setServers(["1.1.1.1", "8.8.8.8"]);
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
const app = express();

const configuredClientUrl = process.env.CLIENT_URL || "http://localhost:5173";

const allowedOrigins = new Set([configuredClientUrl,
  "https://fronted-chi-lime-96.vercel.app",
  "https://frontend-r8bnp5dk6-shahbaz806s-projects.vercel.app",
]);
if (process.env.NODE_ENV !== "production") {
  allowedOrigins.add("http://localhost:5173");
  allowedOrigins.add("http://127.0.0.1:5173");
}
app.use(
  cors({
    origin: (origin, callback) =>
      callback(null, !origin || allowedOrigins.has(origin)),
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;
connectDB()
  .then(() =>
    app.listen(port, () => console.log(`API running on port ${port}`))
  )
  .catch((error) => {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  });
