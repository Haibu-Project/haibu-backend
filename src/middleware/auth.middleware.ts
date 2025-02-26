import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

const SECRET_KEY: string = process.env.JWT_SECRET || "super_secret_key";

/**
 * Middleware to verify JWT authentication.
 * @param requireJwt - If true, the request must include a valid JWT.
 */
export const AuthMiddleware = (requireJwt: boolean = true) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void => {
    const token: string | undefined = req.header("Authorization")?.replace("Bearer ", "");

    if (requireJwt) {
      if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
      }

      try {
        const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
        req.user = decoded;
        return next();
      } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
    } else {
      return next();
    }
  };
};