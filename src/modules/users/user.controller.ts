import { Request, Response } from "express";
import { UserService } from "./user.service";
import { CreateUserDto, UpdateUserDto, ValidateUserDto } from "./dto/user.dto";
import { validateDto } from "../../middleware/validate-dto.middleware";

/**
 * Get all users.
 */
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

/**
 * Get a user by ID.
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

/**
 * Create a new user.
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await validateDto(CreateUserDto)(req, res, async () => {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json({ message: "User created successfully", user: newUser });
    });
  } catch (error) {
    res.status(400).json({ error: "User creation failed" });
  }
};

/**
 * Update a user's information.
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    await validateDto(UpdateUserDto)(req, res, async () => {
      const { id } = req.params;
      const updatedUser = await UserService.updateUser(id, req.body);
      if (!updatedUser) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

/**
 * Delete a user by ID.
 */
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
