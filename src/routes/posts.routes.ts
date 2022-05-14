import { Router } from "express";

import postsController from "../controllers/posts.controllers";
import { authenticate } from "../middlewares/auth.middleware";
import RequestBodyDataMiddleware from "../middlewares/bodyfield.middleware";
import { createPostValidator } from "../validators/post.validator";

const router = Router();

router
  .route("/")
  .get(authenticate, postsController.getOne)
  .delete(authenticate, postsController.delete)
  .post(
    authenticate,
    RequestBodyDataMiddleware.validate(createPostValidator),
    postsController.create
  );

router.get("/all", authenticate, postsController.getAll);

export default router;
