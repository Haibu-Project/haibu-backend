import { Server } from "socket.io";
import { setupChat } from "./chat";

export function setupWebSocket(server: any) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log(`⚡ WebSocket conectado: ${socket.id}`);

    setupChat(io, socket); // Configurar el chat en tiempo real

    socket.on("disconnect", () => {
      console.log(`❌ WebSocket desconectado: ${socket.id}`);
    });
  });
}
