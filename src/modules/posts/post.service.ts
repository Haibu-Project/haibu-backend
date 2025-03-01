import prisma from "../../database/prisma";

export class PostService {
  static async getAllPosts() {
    return prisma.post.findMany({
      include: { user: { select: { id: true, username: true, email: true } } }
    });
  }

  static async getPostById(id: string) {
    return prisma.post.findUnique({
      where: { id },
      include: { user: { select: { id: true, username: true } } }
    });
  }

  static async createPost(title: string, content: string, userId: string) {
    return prisma.post.create({
      data: { title, content, userId }
    });
  }

  static async updatePost(id: string, title?: string, content?: string) {
    return prisma.post.update({
      where: { id },
      data: { title, content }
    });
  }

  static async getPostsByUserId(userId: string) {
    return prisma.post.findMany({
      where: { userId },
      include: { user: { select: { id: true, username: true } } },
      orderBy: { createdAt: "desc" }
    });
  }
  
  static async deletePost(id: string) {
    return prisma.post.delete({
      where: { id }
    });
  }
}
