import prisma from "../../database/prisma";

export class ClickService {
  static async getTopClickers(limit: number = 5) {
    // Obtener los usuarios con más clics (sin diferenciar tarros aún)
    const results = await prisma.click.groupBy({
      by: ["walletAddress"],
      _count: { walletAddress: true }, // Total de clics (normales y tarros)
      orderBy: { _count: { walletAddress: "desc" } }, // Ordenar por mayor cantidad de clics
      take: limit,
    });

    if (results.length === 0) return [];

    // Consultar la cantidad de clics en tarro por usuario (evita múltiples queries con `IN`)
    const jarClicksByUser = await prisma.click.groupBy({
      by: ["walletAddress"],
      _count: { walletAddress: true },
      where: { isJar: true, walletAddress: { in: results.map((r) => r.walletAddress) } },
    });

    // Mapear los clics en tarro a un objeto para acceso rápido
    const jarClicksMap: Record<string, number> = jarClicksByUser.reduce((acc, curr) => {
      acc[curr.walletAddress] = curr._count.walletAddress;
      return acc;
    }, {} as Record<string, number>);

    // Construir los resultados finales con puntajes calculados
    return results.map((entry) => {
      const jarClicks = jarClicksMap[entry.walletAddress] || 0;
      return {
        walletAddress: entry.walletAddress,
        totalClicks: entry._count.walletAddress,
        jarClicks,
        score: (entry._count.walletAddress - jarClicks) + (jarClicks * 10), // Cálculo final
      };
    });
  }
}
