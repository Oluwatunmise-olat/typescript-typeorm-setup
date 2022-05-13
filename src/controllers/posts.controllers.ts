import { NextFunction, Request, Response } from "express";
import { postsService } from "../services";

class PostController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      // @ts-ignore
      const result = await postsService.getAllPosts(req.userId);

      return res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await postsService.getPostByEmail(req.body);

      return res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await postsService.create(req.body);

      return res.status(201).json({ data: result });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await postsService.delete(parseInt(req.body.postId));

      return res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();