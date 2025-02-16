import { Router } from "express";
import { likePost, unlikePost, getLikesByPostId, getUserLikeOnPost } from "./like.controller";
import { validateDto } from "../../middleware/validate-dto.middleware";
import { LikeDto } from "./dto/like.dto";

const router = Router();

/**
 * @swagger
 * /api/likes:
 *   post:
 *     summary: Like a post
 *     tags: [Likes]
 */
router.post("/", validateDto(LikeDto), likePost);

/**
 * @swagger
 * /api/likes:
 *   delete:
 *     summary: Unlike a post
 *     tags: [Likes]
 */
router.delete("/", validateDto(LikeDto), unlikePost);

/**
 * @swagger
 * /api/likes/{postId}:
 *   get:
 *     summary: Get total likes for a post
 *     tags: [Likes]
 */
router.get("/:postId", getLikesByPostId);

/**
 * @swagger
 * /api/likes/{userId}/{postId}:
 *   get:
 *     summary: Check if a user liked a post
 *     tags: [Likes]
 */
router.get("/:userId/:postId", getUserLikeOnPost);

export default router;
