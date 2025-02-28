import { Router } from "express";
import { createChat, deleteChat, getUserChats } from "./chat.controller";

const router = Router();

router.post("/", createChat); // Crear un chat
router.delete("/:chatId", deleteChat); // Eliminar un chat
router.get("/:userId", getUserChats); // Obtener chats de un usuario

export default router;
