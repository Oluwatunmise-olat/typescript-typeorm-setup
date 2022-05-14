import { Router } from "express";
import passport from "passport";

import postsController from "../controllers/posts.controllers";
import { authenticate } from "../middlewares/auth.middleware";
import RequestBodyDataMiddleware from "../middlewares/bodyfield.middleware";
import postValidator from "../validators/post.validator";

const router = Router();

router
  .route("/")
  .get(authenticate, postsController.getAll)
  .delete(
    authenticate,
    RequestBodyDataMiddleware.validate(postValidator.deleteValidator()),
    postsController.delete
  )
  .post(
    authenticate,
    RequestBodyDataMiddleware.validate(postValidator.createValidator()),
    postsController.create
  );

router.get(
  "/all",
  passport.authenticate("jwt", { failWithError: true }),
  postsController.getAll
);

export default router;
