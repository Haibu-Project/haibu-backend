import bcrypt from "bcryptjs";

/**
 * Hash a plain text password before storing it in the database.
 * @param password - The plain text password.
 * @returns The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Verify if a provided password matches the stored hashed password.
 * @param password - The plain text password.
 * @param hashedPassword - The hashed password from the database.
 * @returns Boolean indicating whether the passwords match.
 */
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
