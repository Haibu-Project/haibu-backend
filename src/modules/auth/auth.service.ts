import prisma from "../../database/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { RegisterDto, LoginDto } from "./dto/auth.dto";
import { addMinutes } from "date-fns";


const SECRET_KEY = process.env.JWT_SECRET || "super_secret_key";

export class AuthService {
  static async register({
    username,
    walletAddress,
    email,
    surnames,
    name,
  }: RegisterDto) {
    return prisma.user.create({
      data: { username, walletAddress, email, name, surnames },
    });
  }

  static async login({ email }: LoginDto) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
  
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
      expiresIn: "24h",
    });
  
    const expiresAt = addMinutes(new Date(), 60);
    await prisma.session.upsert({
      where: { userId: user.id },
      update: { token, expiresAt },
      create: { userId: user.id, token, expiresAt },
    });
  
    return { user, token };
  }
  

  static async logout(userId: string) {
    await prisma.session.delete({ where: { userId } });
    return { message: "User logged out successfully" };
  }
}
