import { Router } from "express";
import { getMessages } from "./chat.controller";

const router = Router();

router.get("/:user1/:user2", getMessages);

export default router;
