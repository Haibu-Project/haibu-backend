import prisma from "../../database/prisma";
import { hashPassword, verifyPassword } from "../../utils/auth.utils";

export class UserService {
  static async getAllUsers() {
    return prisma.user.findMany({
      select: { id: true, username: true, email: true, createdAt: true }
    });
  }

  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, username: true, email: true, createdAt: true }
    });
  }

  static async createUser(username: string, email: string, password: string) {
    const hashedPassword = await hashPassword(password);
    return prisma.user.create({
      data: { username, email, password: hashedPassword }
    });
  }

  static async updateUser(id: string, username?: string, email?: string) {
    return prisma.user.update({
      where: { id },
      data: { username, email }
    });
  }

  static async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id }
    });
  }

  static async validateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isValid = await verifyPassword(password, user.password);
    return isValid ? user : null;
  }
}
