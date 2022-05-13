import { Router } from "express";

import { userController } from "../controllers/index";
import { userCreationValidator } from "../validators/user.validator";
import bodyfieldMiddleware from "../middlewares/bodyfield.middleware";
import passport from "passport";

const router = Router();

router
  .route("/")
  .get(
    passport.authenticate("jwt", { failWithError: true }),
    userController.getUsers
  )
  .post(
    [bodyfieldMiddleware.validate(userCreationValidator)],
    userController.createUser
  );

export default router;
