import { Server } from "socket.io";
import prisma from "../database/prisma";
import { ChatService } from "../modules/messaging/chat/chat.service";
import { MessageService } from "../modules/messaging/message/message.service";

export function setupWebSocket(server: any) {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`⚡ WebSocket connected: ${socket.id}`);

    socket.on("click", async (data: { email: string; isJar: boolean; timestamp: number }) => {
      try {
        await prisma.click.create({
          data: { email: data.email, isJar: data.isJar, createdAt: new Date(data.timestamp) },
        });

        const totalScore = await calculateScore(data.email);
        io.emit("updateScore", { email: data.email, totalScore });
      } catch (error) {
        console.error("Error saving click:", error);
      }
    });

    socket.on("searchUsers", async ({ query }, callback) => {
      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: query,
              mode: "insensitive",
            },
          },
          select: {
            id: true,
            username: true,
          },
          take: 10,
        });

        callback(users);
      } catch (error) {
        console.error("Error searching users:", error);
        callback([]);
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ WebSocket disconnected: ${socket.id}`);
    });
  });

  const chatNamespace = io.of("/chat");
  chatNamespace.on("connection", (socket) => {
    console.log(`⚡ Chat WebSocket connected: ${socket.id}`);

    socket.on("createChat", async ({ userA, userB }) => {
      try {
        const chat = await ChatService.findOrCreateChat(userA, userB);
        socket.emit("chatCreated", chat);
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    });

    socket.on("joinChat", async ({ chatId, userId }) => {
      socket.join(chatId);
      console.log(`📩 Usuario ${userId} se unió al chat ${chatId}`);
      socket.to(chatId).emit("userJoined", { userId, chatId });
    });

    socket.on("sendMessage", async ({ chatId, senderId, content }) => {
      try {
        const message = await MessageService.saveMessage(chatId, senderId, content);
        chatNamespace.to(chatId).emit("receiveMessage", message);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("leaveChat", ({ chatId, userId }) => {
      socket.leave(chatId);
      console.log(`👋 Usuario ${userId} salió del chat ${chatId}`);
      socket.to(chatId).emit("userLeft", { userId, chatId });
    });

    socket.on("disconnect", () => {
      console.log(`❌ Chat WebSocket disconnected: ${socket.id}`);
    });
  });
}

async function calculateScore(email: string): Promise<number> {
  const clicks = await prisma.click.findMany({ where: { email } });
  return clicks.reduce((score, click) => score + (click.isJar ? 10 : 1), 0);
}
