import prisma from "../../database/prisma";

export class ClickService {
  static async getTopClickers(limit: number = 5) {
    const results = await prisma.click.groupBy({
      by: ["walletAddress"],
      _count: { walletAddress: true },
      orderBy: { _count: { walletAddress: "desc" } }, 
      take: limit,
    });

    if (results.length === 0) return [];

    const jarClicksByUser = await prisma.click.groupBy({
      by: ["walletAddress"],
      _count: { walletAddress: true },
      where: { isJar: true, walletAddress: { in: results.map((r) => r.walletAddress) } },
    });

    const users = await prisma.user.findMany({
      where: { walletAddress: { in: results.map((r) => r.walletAddress) } },
      select: { walletAddress: true, username: true },
    });

    const userMap: Record<string, string> = users.reduce((acc, user) => {
      acc[user.walletAddress] = user.username;
      return acc;
    }, {} as Record<string, string>);

    const jarClicksMap: Record<string, number> = jarClicksByUser.reduce((acc, curr) => {
      acc[curr.walletAddress] = curr._count.walletAddress;
      return acc;
    }, {} as Record<string, number>);

    return results.map((entry) => {
      const jarClicks = jarClicksMap[entry.walletAddress] || 0;
      return {
        walletAddress: entry.walletAddress,
        username: userMap[entry.walletAddress] || "Unknown",
        totalClicks: entry._count.walletAddress,
        jarClicks,
        score: (entry._count.walletAddress - jarClicks) + (jarClicks * 10),
      };
    });
  }
}
