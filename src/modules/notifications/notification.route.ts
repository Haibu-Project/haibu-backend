import { Router } from "express";
import {
  getUnreadNotifications,
  getAllNotifications,
  markNotificationAsRead,
  createNotification
} from "./notification.controller";

const router = Router();

/**
 * @swagger
 * /api/notifications/unread:
 *   get:
 *     summary: Get unread notifications (Requires `userId` in query)
 *     tags: [Notifications]
 */
router.get("/unread", getUnreadNotifications);

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications (Requires `userId` in query)
 *     tags: [Notifications]
 */
router.get("/", getAllNotifications);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 */
router.patch("/:id/read", markNotificationAsRead);

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a notification manually
 *     tags: [Notifications]
 */
router.post("/", createNotification);

export default router;
