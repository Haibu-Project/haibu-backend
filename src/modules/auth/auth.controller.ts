import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { RegisterDto, LoginDto, } from "./dto/auth.dto";

/**
 * Register a new user.
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await AuthService.register(req.body as RegisterDto);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ error: "Registration failed" });
  }
};

/**
 * Login user and return JWT.
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await AuthService.login(req.body as LoginDto);
    if (!result) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};

export const checkUserExists = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;
    if (!email) {
      res.status(400).json({ error: "Wallet address is required" });
      return;
    }

    const user = await AuthService.findByEmail(email);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ message: "User exists", user });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ error: "Failed to check user" });
  }
};