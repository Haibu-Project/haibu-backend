import { Request, Response } from "express";
import { ChatService } from "./chat.service";

export const createChat = async (req: Request, res: Response) => {
  try {
    const { userA, userB } = req.body;
    const chat = await ChatService.findOrCreateChat(userA, userB);
    res.status(201).json(chat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).json({ error: "Failed to create chat" });
  }
};

export const deleteChat = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;
    await ChatService.deleteChat(chatId);
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ error: "Failed to delete chat" });
  }
};

export const getUserChats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const chats = await ChatService.getUserChats(userId);
    res.status(200).json(chats);
  } catch (error) {
    console.error("Error fetching user chats:", error);
    res.status(500).json({ error: "Failed to fetch chats" });
  }
};


