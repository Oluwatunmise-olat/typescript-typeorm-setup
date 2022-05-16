import { Request, Response, NextFunction } from "express";

import { commentService } from "../services";

class CommentsController {
  async getPostComments(req: Request, res: Response, next: NextFunction) {
    try {
      const [data, count] = await commentService.getPostComment(
        req.body.postId
      );

      return res
        .status(200)
        .json({ success: true, data, total_comments: count });
    } catch (error) {
      next(error);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    try {
      await commentService.delete(req.body.commentId, req.userId);

      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async editComment(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.userId = req.userId;
      const result = await commentService.edit(req.body);

      return res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async createComment(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.userId = req.userId;
      const result = await commentService.create(req.body);

      return res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export default new CommentsController();
