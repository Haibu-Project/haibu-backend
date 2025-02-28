import prisma from "../../../database/prisma";

export class ChatService {
  static async findOrCreateChat(userA: string, userB: string) {
    // Buscar un chat existente entre los dos usuarios
    const existingChat = await prisma.chat.findFirst({
      where: {
        participants: {
          every: {
            userId: { in: [userA, userB] },
          },
        },
      },
      include: {
        participants: true,
      },
    });

    if (existingChat) {
      return existingChat;
    }

    // Si no existe, crear un nuevo chat
    const newChat = await prisma.chat.create({
      data: {
        participants: {
          create: [{ userId: userA }, { userId: userB }],
        },
      },
      include: {
        participants: true,
      },
    });

    return newChat;
  }

  static async getUserChats(userId: string) {
    return prisma.chat.findMany({
      where: { participants: { some: { userId } } },
      include: { participants: { include: { user: true } } },
    });
  }

  static async deleteChat(chatId: string) {
    return prisma.chat.delete({ where: { id: chatId } });
  }
}