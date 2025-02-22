import prisma from "../../database/prisma";

export class FollowService {
  static async followUser(followerId: string, followingId: string) {
    if (followerId === followingId) {
      throw new Error("You cannot follow yourself.");
    }

    return prisma.follow.create({
      data: { followerId, followingId },
    });
  }

  static async unfollowUser(followerId: string, followingId: string) {
    return prisma.follow.delete({
      where: { followerId_followingId: { followerId, followingId } },
    });
  }

  static async getFollowers(userId: string) {
    return prisma.follow.findMany({
      where: { followingId: userId },
      include: { follower: { select: { id: true, username: true } } },
    });
  }

  static async getFollowing(userId: string) {
    return prisma.follow.findMany({
      where: { followerId: userId },
      include: { following: { select: { id: true, username: true } } },
    });
  }

  static async isFollowing(followerId: string, followingId: string) {
    const follow = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId, followingId } },
    });
    return !!follow;
  }
}
