import { Router } from "express";

import { postController } from "../controllers";
import { authenticate } from "../middlewares/auth.middleware";
import RequestBodyDataMiddleware from "../middlewares/bodyfield.middleware";
import postValidator from "../validators/post.validator";

const router = Router();

router
  .route("/")
  .get(authenticate, postController.getAll)
  .delete(
    authenticate,
    RequestBodyDataMiddleware.validate(postValidator.deleteValidator()),
    postController.delete
  )
  .post(
    authenticate,
    RequestBodyDataMiddleware.validate(postValidator.createValidator()),
    postController.create
  );

router.get("/all", authenticate, postController.getAll);

export default router;
