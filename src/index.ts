import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import prisma from "./database/prisma";
import userRoutes from "./modules/users/user.routes";
import postRoutes from "./modules/posts/post.routes";
import { setupSwagger } from "./config/swagger";
import likeRoutes from "./modules/likes/like.routes";


dotenv.config();

const app = express();

// Middlewares de seguridad
app.use(express.json());
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// Conectar a PostgreSQL con Prisma
async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to PostgreSQL");
  } catch (error) {
    console.error("❌ Error connecting to the database", error);
    process.exit(1);
  }
}

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);


setupSwagger(app);


// Iniciar Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
