import prisma from "../../database/prisma";

export class LikeService {
  static async likePost(userId: string, postId: string) {
    return prisma.like.upsert({
      where: { userId_postId: { userId, postId } },
      update: {},
      create: { userId, postId }
    });
  }

  static async unlikePost(userId: string, postId: string) {
    return prisma.like.delete({
      where: { userId_postId: { userId, postId } }
    });
  }

  static async getLikesByPostId(postId: string) {
    return prisma.like.count({ where: { postId } });
  }

  static async getUserLikeOnPost(userId: string, postId: string) {
    return prisma.like.findUnique({
      where: { userId_postId: { userId, postId } }
    });
  }
}
