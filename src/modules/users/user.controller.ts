import { Request, Response } from "express";
import prisma from "../../database/prisma";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword }
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
};
