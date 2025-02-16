import prisma from "../../database/prisma";

export class CommentService {
  static async getAllComments() {
    return prisma.comment.findMany({
      include: { user: { select: { id: true, username: true } } }
    });
  }

  static async getCommentsByPostId(postId: string) {
    return prisma.comment.findMany({
      where: { postId },
      include: { user: { select: { id: true, username: true } } }
    });
  }

  static async getCommentById(id: string) {
    return prisma.comment.findUnique({
      where: { id },
      include: { user: { select: { id: true, username: true } } }
    });
  }

  static async createComment(content: string, userId: string, postId: string) {
    return prisma.comment.create({
      data: { content, userId, postId }
    });
  }

  static async updateComment(id: string, content?: string) {
    return prisma.comment.update({
      where: { id },
      data: { content }
    });
  }

  static async deleteComment(id: string) {
    return prisma.comment.delete({
      where: { id }
    });
  }
}
