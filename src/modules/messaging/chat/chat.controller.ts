import { Request, Response } from "express";
import { ChatService } from "./chat.service";

export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user1, user2 } = req.params;
    const messages = await ChatService.getMessagesBetweenUsers(user1, user2);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
