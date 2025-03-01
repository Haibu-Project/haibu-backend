import express from "express";
import prisma from "../../../database/prisma";
const router = express.Router();

router.get("/chats/:userId", async (req, res) => {
  try {
    const chats = await prisma.chat.findMany({
      where: { participants: { some: { userId: req.params.userId } } },
      include: { participants: { include: { user: true } } },
    });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: "Error fetching chats" });
  }
});

router.post("/chats", async (req, res) => {
  try {
    const { userA, userB } = req.body;
    const chat = await prisma.chat.create({
      data: { participants: { create: [{ userId: userA }, { userId: userB }] } },
    });
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Error creating chat" });
  }
});

router.get("/chats/messages/:chatId", async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      where: { chatId: req.params.chatId },
      orderBy: { createdAt: "asc" },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages" });
  }
});

router.post("/chats/messages", async (req, res) => {
  try {
    const { chatId, senderId, content } = req.body;
    const message = await prisma.message.create({
      data: { chatId, senderId, content },
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
});

// Eliminar chat
router.delete("/chats/:chatId", async (req, res) => {
  try {
    await prisma.chat.delete({ where: { id: req.params.chatId } });
    res.json({ message: "Chat deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting chat" });
  }
});

export default router;
