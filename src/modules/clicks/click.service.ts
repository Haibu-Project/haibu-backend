import prisma from "../../database/prisma";

export class ClickService {
  static async getTopClickers(limit: number = 5) {
    return prisma.click.groupBy({
      by: ["walletAddress"],
      _count: { walletAddress: true },
      orderBy: { _count: { walletAddress: "desc" } },
      take: limit,
    });
  }
}
