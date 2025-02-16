import { Request, Response } from "express";
import { CommentService } from "./comment.service";

/**
 * Get all comments for a specific post.
 */
export const getCommentsByPostId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { postId } = req.params;
    const comments = await CommentService.getCommentsByPostId(postId);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

/**
 * Get a comment by ID.
 */
export const getCommentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const comment = await CommentService.getCommentById(id);
    if (!comment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comment" });
  }
};

/**
 * Create a new comment.
 */
export const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { content, userId, postId } = req.body;
    const newComment = await CommentService.createComment(content, userId, postId);
    res.status(201).json({ message: "Comment created successfully", comment: newComment });
  } catch (error) {
    res.status(400).json({ error: "Comment creation failed" });
  }
};

/**
 * Update a comment.
 */
export const updateComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const updatedComment = await CommentService.updateComment(id, content);
    if (!updatedComment) {
      res.status(404).json({ error: "Comment not found" });
      return;
    }
    res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });
  } catch (error) {
    res.status(500).json({ error: "Failed to update comment" });
  }
};

/**
 * Delete a comment.
 */
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await CommentService.deleteComment(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
