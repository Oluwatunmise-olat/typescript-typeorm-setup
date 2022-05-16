import { Request, Response, NextFunction } from "express";

import { userService } from "../services";

class UserController {
  public async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getAll();

      return res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.create(req.body);

      return res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
