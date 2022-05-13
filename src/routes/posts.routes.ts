import { Router } from "express";

import postsController from "../controllers/posts.controllers";
import RequestBodyDataMiddleware from "../middlewares/bodyfield.middleware";
import { createPostValidator } from "../validators/post.validator";

const router = Router();

router
  .route("/")
  .get(postsController.getOne)
  .delete(postsController.delete)
  .post(
    RequestBodyDataMiddleware.validate(createPostValidator),
    postsController.create
  );

router.get("/all", postsController.getAll);

export default router;
