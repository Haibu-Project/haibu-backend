import { Router } from "express";
import { followUser, unfollowUser, getFollowers, getFollowing, checkIfFollowing } from "./follow.controller";
import { validateDto } from "../../middleware/validate-dto.middleware";
import { FollowDto } from "./dto/follow.dto";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Follows
 *   description: API endpoints for managing followers and following users.
 */

/**
 * @swagger
 * /api/follows:
 *   post:
 *     summary: Follow a user
 *     tags: [Follows]
 *     description: Allows a user to follow another user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FollowDto'
 *     responses:
 *       201:
 *         description: Successfully followed the user.
 *       400:
 *         description: Bad request (e.g., trying to follow yourself).
 */
router.post("/", validateDto(FollowDto), followUser);

/**
 * @swagger
 * /api/follows:
 *   delete:
 *     summary: Unfollow a user
 *     tags: [Follows]
 *     description: Allows a user to unfollow another user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FollowDto'
 *     responses:
 *       200:
 *         description: Successfully unfollowed the user.
 *       400:
 *         description: Bad request (e.g., relationship does not exist).
 */
router.delete("/", validateDto(FollowDto), unfollowUser);

/**
 * @swagger
 * /api/follows/{userId}/followers:
 *   get:
 *     summary: Get followers of a user
 *     tags: [Follows]
 *     description: Retrieves a list of users who follow the given user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose followers are being retrieved.
 *     responses:
 *       200:
 *         description: List of followers.
 *       500:
 *         description: Server error.
 */
router.get("/:userId/followers", getFollowers);

/**
 * @swagger
 * /api/follows/{userId}/following:
 *   get:
 *     summary: Get following users of a user
 *     tags: [Follows]
 *     description: Retrieves a list of users that the given user is following.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose following list is being retrieved.
 *     responses:
 *       200:
 *         description: List of users the given user is following.
 *       500:
 *         description: Server error.
 */
router.get("/:userId/following", getFollowing);

/**
 * @swagger
 * /api/follows/{followerId}/{followingId}:
 *   get:
 *     summary: Check if a user follows another user
 *     tags: [Follows]
 *     description: Checks if a given user (followerId) follows another user (followingId).
 *     parameters:
 *       - in: path
 *         name: followerId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the follower.
 *       - in: path
 *         name: followingId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user being followed.
 *     responses:
 *       200:
 *         description: Returns a boolean indicating follow status.
 *       500:
 *         description: Server error.
 */
router.get("/:followerId/:followingId", checkIfFollowing);

export default router;
