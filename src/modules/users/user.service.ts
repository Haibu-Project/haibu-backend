import prisma from "../../database/prisma";
import { hashPassword, verifyPassword } from "../../utils/auth.utils";
import { CreateUserDto, UpdateUserDto, ValidateUserDto } from "./dto/user.dto";

export class UserService {
  static async getAllUsers() {
    return prisma.user.findMany({
      select: { id: true, username: true, email: true, createdAt: true, walletAddress: true, description: true, image: true }
    });
  }

  static async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: { id: true, username: true, email: true, createdAt: true, walletAddress: true, image: true, description: true }
    });
  }

  static async createUser({ username, walletAddress, email, name, surnames, image, description }: CreateUserDto) {
    return prisma.user.create({
      data: { username, walletAddress, email, name, surnames, image, description }
    });
  }

  static async updateUser(id: string, updateData: UpdateUserDto) {
    return prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  static async deleteUser(id: string) {
    return prisma.user.delete({ where: { id } });
  }

  static async validateUser({ email }: ValidateUserDto) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    return user;
  }
}
