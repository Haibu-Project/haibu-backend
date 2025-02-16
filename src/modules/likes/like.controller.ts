import { Request, Response } from "express";
import { LikeService } from "./like.service";

/**
 * Like a post.
 */
export const likePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, postId } = req.body;
    const like = await LikeService.likePost(userId, postId);
    res.status(201).json({ message: "Post liked", like });
  } catch (error) {
    res.status(400).json({ error: "Failed to like post" });
  }
};

/**
 * Unlike a post.
 */
export const unlikePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, postId } = req.body;
    await LikeService.unlikePost(userId, postId);
    res.status(200).json({ message: "Post unliked" });
  } catch (error) {
    res.status(400).json({ error: "Failed to unlike post" });
  }
};

/**
 * Get total likes for a post.
 */
export const getLikesByPostId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;
    const likes = await LikeService.getLikesByPostId(postId);
    res.status(200).json({ postId, likes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch likes" });
  }
};

/**
 * Check if a user has liked a post.
 */
export const getUserLikeOnPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, postId } = req.params;
    const like = await LikeService.getUserLikeOnPost(userId, postId);
    res.status(200).json({ liked: !!like });
  } catch (error) {
    res.status(500).json({ error: "Failed to check like status" });
  }
};
