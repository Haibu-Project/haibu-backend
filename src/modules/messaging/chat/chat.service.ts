import prisma from "../../../database/prisma";

export class ChatService {
  static async findOrCreateChat(userA: string, userB: string) {
    let chat = await prisma.chat.findFirst({
      where: {
        participants: {
          every: { userId: { in: [userA, userB] } }
        }
      }
    });

    if (!chat) {
      chat = await prisma.chat.create({
        data: {
          participants: {
            create: [{ userId: userA }, { userId: userB }]
          }
        }
      });
    }

    return chat;
  }

  static async getUserChats(userId: string) {
    return prisma.chat.findMany({
      where: { participants: { some: { userId } } },
      include: { participants: { include: { user: true } } }
    });
  }
}
