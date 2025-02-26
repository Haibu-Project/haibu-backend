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

    const users = await prisma.user.findMany({
      where: { email: { in: results.map((r) => r.email) } },
      select: { email: true, username: true },
    });

    const userMap = Object.fromEntries(users.map(user => [user.email, user.username]));

    return results.map(entry => ({
      email: entry.email,
      username: userMap[entry.email] || "Unknown",
      totalClicks: entry._count.email,
    }));
  }

  static async calculateScore(email: string): Promise<number> {
    const clicks = await prisma.click.findMany({
      where: { email },
    });

    return clicks.reduce((score, click) => score + (click.isJar ? 10 : 1), 0);
  }
}
