import { Router } from "express";
import { likeComment, unlikeComment, getLikesByCommentId, getUserLikeOnComment } from "./comment-like.controller";
import { validateDto } from "../../middleware/validate-dto.middleware";
import { CommentLikeDto } from "./dto/comment-like.dto";

const router = Router();

/**
 * @swagger
 * /api/comment-likes:
 *   post:
 *     summary: Like a comment
 *     tags: [CommentLikes]
 */
router.post("/", validateDto(CommentLikeDto), likeComment);

/**
 * @swagger
 * /api/comment-likes:
 *   delete:
 *     summary: Unlike a comment
 *     tags: [CommentLikes]
 */
router.delete("/", validateDto(CommentLikeDto), unlikeComment);

/**
 * @swagger
 * /api/comment-likes/{commentId}:
 *   get:
 *     summary: Get total likes for a comment
 *     tags: [CommentLikes]
 */
router.get("/:commentId", getLikesByCommentId);

/**
 * @swagger
 * /api/comment-likes/{userId}/{commentId}:
 *   get:
 *     summary: Check if a user liked a comment
 *     tags: [CommentLikes]
 */
router.get("/:userId/:commentId", getUserLikeOnComment);

export default router;
