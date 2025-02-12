import { Router } from "express";
import { getAllUsers, createUser } from "./user.controller";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);

export default router;
