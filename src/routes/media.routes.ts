import { Router } from "express";

import { mediaService } from "../services";
import { authenticate } from "../middlewares/auth.middleware";
import { mediaController } from "../controllers";

const router = Router();

router.post(
  "/upload",
  authenticate,
  mediaService.upload(),
  mediaController.mediaUrl
);

export default router;
