import prisma from "../../database/prisma";

export class ClickService {
  static async recordClick(email: string, isJar: boolean) {
    return prisma.click.create({
      data: { email, isJar },
    });
  }

  static async getTopClickers(limit: number = 5) {
    const results = await prisma.click.groupBy({
      by: ["email"],
      _count: { email: true },
      orderBy: { _count: { email: "desc" } },
      take: limit,
    });

    if (results.length === 0) return [];

    // Obtener la cantidad de clics en tarros (isJar: true) por usuario
    const jarClicksByUser = await prisma.click.groupBy({
      by: ["email"],
      _count: { email: true },
      where: { isJar: true, email: { in: results.map((r) => r.email) } },
    });

    // Obtener los datos de usuario, incluyendo walletAddress
    const users = await prisma.user.findMany({
      where: { email: { in: results.map((r) => r.email) } },
      select: { email: true, username: true, walletAddress: true },
    });

    // Crear mapas para acceso rápido
    const userMap: Record<string, { username: string; walletAddress: string }> = {};
    users.forEach(user => {
      userMap[user.email] = { username: user.username, walletAddress: user.walletAddress };
    });

    const jarClicksMap: Record<string, number> = jarClicksByUser.reduce((acc, curr) => {
      acc[curr.email] = curr._count.email;
      return acc;
    }, {} as Record<string, number>);

    return results.map((entry) => {
      const jarClicks = jarClicksMap[entry.email] || 0;
      return {
        walletAddress: userMap[entry.email]?.walletAddress || "Unknown",
        username: userMap[entry.email]?.username || "Unknown",
        totalClicks: entry._count.email,
        jarClicks,
        score: (entry._count.email - jarClicks) + (jarClicks * 10), // Score formula: normal clicks + 10x jar clicks
      };
    });
  }

  static async calculateScore(email: string): Promise<number> {
    const clicks = await prisma.click.findMany({
      where: { email },
    });

    return clicks.reduce((score, click) => score + (click.isJar ? 10 : 1), 0);
  }
}
