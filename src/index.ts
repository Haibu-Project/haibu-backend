import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import prisma from "./database/prisma";
import userRoutes from "./modules/users/user.routes";
import postRoutes from "./modules/posts/post.routes";
import followRoutes from "./modules/follows/follow.routes";
import { setupSwagger } from "./config/swagger";
import likeRoutes from "./modules/likes/like.routes";

dotenv.config(); // Load environment variables from .env file

const app = express();
app.set("trust proxy", 1); // Necessary for Railway proxy support

// 🔐 Security Middlewares
app.use(express.json()); // Parse JSON requests
app.use(cors({ origin: "*" })); // Allow all origins for CORS
// app.use(helmet()); // (Disabled for now - Uncomment if needed)

// 🛑 Rate Limiting (Disabled - Uncomment if needed)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit to 100 requests per window
//   message: "Too many requests from this IP, please try again later."
// });
// app.use(limiter);

// ✅ Connect to PostgreSQL with Retry Mechanism
async function connectDB(retries = 5) {
  while (retries) {
    try {
      await prisma.$connect();
      console.log("✅ Connected to PostgreSQL");
      return;
    } catch (error) {
      console.error(`❌ Database connection failed. Retries left: ${retries - 1}`);
      retries -= 1;
      await new Promise((res) => setTimeout(res, 5000)); // Wait 5s before retrying
    }
  }
  console.error("🚨 Could not connect to the database. Exiting...");
  process.exit(1);
}

// 📌 Health Check Route
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// 🔗 API Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/follows", followRoutes);

// 📝 Swagger Documentation Setup
setupSwagger(app);

// 🚀 Start Server with Railway Compatibility
const PORT = Number(process.env.PORT) || 5000; // Convert string to number to fix TypeScript issue
app.listen(PORT, "0.0.0.0", async () => { // Ensure Railway assigns the right port
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});

// 🛡️ Prevent Railway from Stopping the App (Keep-Alive)
setInterval(() => console.log("✅ App is still running..."), 10 * 60 * 1000); // Every 10 minutes

// 🛑 Global Error Handling to Prevent Unexpected Crashes
process.on("uncaughtException", (err) => {
  console.error("🔥 Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("🚨 Unhandled Rejection at:", promise, "reason:", reason);
});