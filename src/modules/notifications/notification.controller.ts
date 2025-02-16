import { Request, Response } from "express";
import { NotificationService } from "./notification.service";

/**
 * Get unread notifications for a user (requires `userId` in query params).
 */
export const getUnreadNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.query;
    if (!userId) {
      res.status(400).json({ error: "userId is required" });
      return;
    }
    const notifications = await NotificationService.getUnreadNotifications(userId as string);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch unread notifications" });
  }
};

/**
 * Get all notifications for a user (requires `userId` in query params).
 */
export const getAllNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.query;
    if (!userId) {
      res.status(400).json({ error: "userId is required" });
      return;
    }
    const notifications = await NotificationService.getUserNotifications(userId as string);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

/**
 * Mark a notification as read.
 */
export const markNotificationAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await NotificationService.markAsRead(id);
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Failed to mark notification as read" });
  }
};

/**
 * Create a new notification (requires `recipientId`, `senderId` in body).
 */
export const createNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { recipientId, senderId, type, postId, commentId } = req.body;
    if (!recipientId || !senderId || !type) {
      res.status(400).json({ error: "recipientId, senderId, and type are required" });
      return;
    }
    const notification = await NotificationService.createNotification(
      recipientId,
      senderId,
      type,
      postId,
      commentId
    );
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: "Failed to create notification" });
  }
};
