import { Router } from "express";
import { getCommentsByPostId, getCommentById, createComment, updateComment, deleteComment } from "./comment.controller";
import { validateDto } from "../../middleware/validate-dto.middleware";
import { CreateCommentDto, UpdateCommentDto } from "./dto/comment.dto";

const router = Router();

router.get("/:postId", getCommentsByPostId);
router.get("/:id", getCommentById);
router.post("/", validateDto(CreateCommentDto), createComment);
router.put("/:id", validateDto(UpdateCommentDto), updateComment);
router.delete("/:id", deleteComment);

export default router;
