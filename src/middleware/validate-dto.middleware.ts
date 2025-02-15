import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateDto = (DtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dtoInstance = plainToInstance(DtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      res.status(400).json({ error: "Validation failed", details: errors });
      return;
    }

    next();
  };
};
