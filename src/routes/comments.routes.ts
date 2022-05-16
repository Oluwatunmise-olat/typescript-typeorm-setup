import { Router } from "express";

import { commentsController } from "../controllers";
import { authenticate } from "../middlewares/auth.middleware";
import bodyfieldMiddleware from "../middlewares/bodyfield.middleware";
import commentValidator from "../validators/comment.validator";

const router = Router();

router
  .route("/")
  .all(authenticate)
  .get(
    bodyfieldMiddleware.validate(commentValidator.getPostCommentValidator()),

    commentsController.getPostComments
  )
  .post(
    bodyfieldMiddleware.validate(commentValidator.createValidator()),
    commentsController.createComment
  )
  .delete(
    bodyfieldMiddleware.validate(commentValidator.deleteValidator()),
    commentsController.deleteComment
  )
  .patch(
    bodyfieldMiddleware.validate(commentValidator.editValidator()),
    commentsController.editComment
  );

export default router;
