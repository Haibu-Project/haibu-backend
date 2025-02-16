import { Request, Response } from "express";
import { CommentLikeService } from "./comment-like.service";

/**
 * Like a comment.
 */
export const likeComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, commentId } = req.body;
    const like = await CommentLikeService.likeComment(userId, commentId);
    res.status(201).json({ message: "Comment liked", like });
  } catch (error) {
    res.status(400).json({ error: "Failed to like comment" });
  }
};

/**
 * Unlike a comment.
 */
export const unlikeComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, commentId } = req.body;
    await CommentLikeService.unlikeComment(userId, commentId);
    res.status(200).json({ message: "Comment unliked" });
  } catch (error) {
    res.status(400).json({ error: "Failed to unlike comment" });
  }
};

/**
 * Get total likes for a comment.
 */
export const getLikesByCommentId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { commentId } = req.params;
    const likes = await CommentLikeService.getLikesByCommentId(commentId);
    res.status(200).json({ commentId, likes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch likes" });
  }
};

/**
 * Check if a user has liked a comment.
 */
export const getUserLikeOnComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, commentId } = req.params;
    const like = await CommentLikeService.getUserLikeOnComment(userId, commentId);
    res.status(200).json({ liked: !!like });
  } catch (error) {
    res.status(500).json({ error: "Failed to check like status" });
  }
};
