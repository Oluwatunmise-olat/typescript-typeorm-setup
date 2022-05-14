import { NextFunction, Request, Response } from "express";

import { jwtService, userService } from "../services";
import { AuthenticationError, ServerError } from "../common/exceptions.common";

class AuthenticationController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      let user = await userService.getOneByEmail(req.body.email);

      if (!user || !user.checkPassword(req.body.password)) {
        return next(
          new AuthenticationError({
            message: "Invalid Authentication Credentials",
          })
        );
      }

      const userAccessToken = await jwtService.generateAccessToken({
        userId: user.id,
      });

      return res
        .status(200)
        .json({ success: true, accessToken: userAccessToken });
    } catch (error) {
      next(new ServerError());
    }
  }

  async logout() {}
}

export default new AuthenticationController();
