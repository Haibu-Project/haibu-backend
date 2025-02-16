import { Router } from "express";
import { register, login, forgotPassword } from "./auth.controller";
import { validateDto } from "../../middleware/validate-dto.middleware";
import { RegisterDto, LoginDto, ForgotPasswordDto } from "./dto/auth.dto";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 */
router.post("/register", validateDto(RegisterDto), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 */
router.post("/login", validateDto(LoginDto), login);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Auth]
 */
router.post("/forgot-password", validateDto(ForgotPasswordDto), forgotPassword);

export default router;
