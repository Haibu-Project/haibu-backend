import { Router } from "express";
import { register, login,  } from "./auth.controller";
import { validateDto } from "../../middleware/validate-dto.middleware";
import { RegisterDto, LoginDto,  } from "./dto/auth.dto";

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
export default router;
