import prisma from "../../../database/prisma";

export class MessageService {
  static async getMessages(chatId: string) {
    return prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
    });
  }

  static async saveMessage(chatId: string, senderId: string, content: string) {
    return prisma.message.create({
      data: { chatId, senderId, content },
    });
  }
}
