import prisma from "../../database/prisma";

export class NotificationService {
  /**
   * Create a new notification.
   * @param recipientId - The user receiving the notification.
   * @param senderId - The user triggering the notification.
   * @param type - The notification type (e.g., "LIKE_POST", "NEW_COMMENT").
   * @param postId - (Optional) The related post ID.
   * @param commentId - (Optional) The related comment ID.
   */
  static async createNotification(
    recipientId: string,
    senderId: string,
    type: string,
    postId?: string,
    commentId?: string
  ) {
    return prisma.notification.create({
      data: { recipientId, senderId, type, postId, commentId }
    });
  }

  /**
   * Fetch all notifications for a user.
   * @param userId - The recipient user ID.
   */
  static async getUserNotifications(userId: string) {
    return prisma.notification.findMany({
      where: { recipientId: userId },
      orderBy: { createdAt: "desc" }
    });
  }

  /**
   * Fetch only unread notifications for a user.
   * @param userId - The recipient user ID.
   */
  static async getUnreadNotifications(userId: string) {
    return prisma.notification.findMany({
      where: { recipientId: userId, isRead: false },
      orderBy: { createdAt: "desc" }
    });
  }

  /**
   * Mark a notification as read.
   * @param notificationId - The notification ID to mark as read.
   */
  static async markAsRead(notificationId: string) {
    return prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    });
  }
}
