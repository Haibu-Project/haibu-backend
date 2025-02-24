import { Router } from "express";
import { getLeaderboard } from "./click.controller";

const router = Router();

router.get("/leaderboard", getLeaderboard);

export default router;
