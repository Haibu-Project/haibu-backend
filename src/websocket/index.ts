import { Server } from "socket.io";
import prisma from "../database/prisma";

export function setupWebSocket(server: any) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log(`⚡ WebSocket connected: ${socket.id}`);

    socket.on("click", async (data: { walletAddress: string; isJar: boolean }) => {
      try {
        await prisma.click.create({
          data: {
            walletAddress: data.walletAddress,
            isJar: data.isJar,
          },
        });

        const totalScore = await calculateScore(data.walletAddress);

        io.emit("updateScore", { walletAddress: data.walletAddress, totalScore });
      } catch (error) {
        console.error("Error saving click:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`❌ WebSocket disconnected: ${socket.id}`);
    });
  });
}
async function calculateScore(walletAddress: string): Promise<number> {
  const clicks = await prisma.click.findMany({
    where: { walletAddress },
  });

  return clicks.reduce((score, click) => score + (click.isJar ? 10 : 1), 0);
}
