import { Router } from "express";
import { authController } from "../controllers";
import bodyfieldMiddleware from "../middlewares/bodyfield.middleware";
import { userLoginValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/login",
  bodyfieldMiddleware.validate(userLoginValidator),
  authController.login
);

export default router;
