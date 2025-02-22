import { Request, Response } from "express";
import { FollowService } from "./follow.service";

export const followUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { followerId, followingId } = req.body;
    const follow = await FollowService.followUser(followerId, followingId);
    res.status(201).json({ message: "Followed successfully", follow });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const unfollowUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { followerId, followingId } = req.body;
    await FollowService.unfollowUser(followerId, followingId);
    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getFollowers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const followers = await FollowService.getFollowers(userId);
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch followers" });
  }
};

export const getFollowing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const following = await FollowService.getFollowing(userId);
    res.status(200).json(following);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch following" });
  }
};

export const checkIfFollowing = async (req: Request, res: Response): Promise<void> => {
  try {
    const { followerId, followingId } = req.params;
    const isFollowing = await FollowService.isFollowing(followerId, followingId);
    res.status(200).json({ isFollowing });
  } catch (error) {
    res.status(500).json({ error: "Failed to check following status" });
  }
};
