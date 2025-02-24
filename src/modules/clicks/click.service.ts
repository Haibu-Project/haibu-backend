import prisma from "../../database/prisma";

export class ClickService {
  static async getTopClickers(limit: number = 5) {
    const results = await prisma.click.groupBy({
      by: ["walletAddress"],
      _count: { walletAddress: true }, // Total de clics (normales y en tarros)
      orderBy: { _count: { walletAddress: "desc" } }, // Ordenar por mayor cantidad de clics
      take: limit,
    });

    // Para cada usuario, contar cuántos clics son tarros
    const enrichedResults = await Promise.all(
      results.map(async (entry) => {
        const jarClicks = await prisma.click.count({
          where: { walletAddress: entry.walletAddress, isJar: true },
        });

        return {
          walletAddress: entry.walletAddress,
          totalClicks: entry._count.walletAddress,
          jarClicks, // Clics en tarros
          score: (entry._count.walletAddress - jarClicks) + (jarClicks * 10), // Cálculo final
        };
      })
    );

    return enrichedResults;
  }
}
