import { Router } from "express";

import { userController } from "../controllers/index";
import userValidator from "../validators/user.validator";
import bodyfieldMiddleware from "../middlewares/bodyfield.middleware";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router
  .route("/")
  .get(authenticate, userController.getUsers)
  .post(
    [bodyfieldMiddleware.validate(userValidator.createValidator())],
    userController.createUser
  );

export default router;
