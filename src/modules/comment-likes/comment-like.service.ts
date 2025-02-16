import prisma from "../../database/prisma";

export class CommentLikeService {
  static async likeComment(userId: string, commentId: string) {
    return prisma.commentLike.upsert({
      where: { userId_commentId: { userId, commentId } },
      update: {},
      create: { userId, commentId }
    });
  }

  static async unlikeComment(userId: string, commentId: string) {
    return prisma.commentLike.delete({
      where: { userId_commentId: { userId, commentId } }
    });
  }

  static async getLikesByCommentId(commentId: string) {
    return prisma.commentLike.count({ where: { commentId } });
  }

  static async getUserLikeOnComment(userId: string, commentId: string) {
    return prisma.commentLike.findUnique({
      where: { userId_commentId: { userId, commentId } }
    });
  }
}
