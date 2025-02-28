import { Request, Response } from "express";
import { PostService } from "./post.service";

/**
 * Get all posts.
 */
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await PostService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

/**
 * Get a post by ID.
 */
export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await PostService.getPostById(id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
};

/**
 * Create a new post.
 */
export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, userId } = req.body;
    console.log(req.body);
    if (!title || !content || !userId) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const newPost = await PostService.createPost(title, content, userId);
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Post creation failed" });
  }
};

/**
 * Update a post.
 */
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title && !content) {
      res.status(400).json({ error: "At least one field (title or content) is required to update" });
      return;
    }

    const updatedPost = await PostService.updatePost(id, title, content);
    if (!updatedPost) {
      res.status(404).json({ error: "Post not found" });
      return;
    }

    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

/**
 * Delete a post.
 */
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await PostService.deletePost(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
