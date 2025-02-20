import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import prisma from "./database/prisma";
import userRoutes from "./modules/users/user.routes";
import postRoutes from "./modules/posts/post.routes";
import likeRoutes from "./modules/likes/like.routes";

dotenv.config();

const app: Express = express();

app.set("trust proxy", 1);

app.use(express.json()); 
app.use(cors());
app.use(helmet());

// Rutas de la API
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);

// Health Check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

export default app;