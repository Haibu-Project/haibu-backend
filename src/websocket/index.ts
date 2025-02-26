import { Server } from "socket.io";
import prisma from "../database/prisma";

export function setupWebSocket(server: any) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log(`⚡ WebSocket connected: ${socket.id}`);

    socket.on("click", async (data: { email: string; isJar: boolean; timestamp: number }) => {
        try {
          await prisma.click.create({
            data: {
              email: data.email,
              isJar: data.isJar,
              createdAt: new Date(data.timestamp),
            },
          });
      
          const totalScore = await calculateScore(data.email);
          io.emit("updateScore", { email: data.email, totalScore });
        } catch (error) {
          console.error("Error saving click:", error);
        }
      });

    socket.on("disconnect", () => {
      console.log(`❌ WebSocket disconnected: ${socket.id}`);
    });
  });
}

async function calculateScore(email: string): Promise<number> {
  const clicks = await prisma.click.findMany({
    where: { email },
  });

  return clicks.reduce((score, click) => score + (click.isJar ? 10 : 1), 0);
}
