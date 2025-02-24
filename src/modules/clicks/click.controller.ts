import { Request, Response } from "express";
import { ClickService } from "./click.service";

export const getLeaderboard = async (req: Request, res: Response): Promise<void> => {
  try {
    const topClickers = await ClickService.getTopClickers(5);
    res.status(200).json(topClickers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};
