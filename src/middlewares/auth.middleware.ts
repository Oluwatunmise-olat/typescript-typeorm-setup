import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from "passport-jwt";
import express from "express";
import passport from "passport";
import { AuthenticationError } from "../common/exceptions.common";

export default () => {
  passport.use("jwt", JwtAuth() as unknown as JwtStrategy);
};

const JwtAuth = () => {
  return new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
      passReqToCallback: true,
    },
    (req: express.Request, payload: any, done: VerifiedCallback) => {
      try {
        return done(null, payload.userId);
      } catch (error) {
        return done(error);
      }
    }
  );
};

export const authenticate = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false, failWithError: true },
    (error, payload) => {
      if (error || !payload) {
        throw new AuthenticationError({
          message: "Invalid Authentication Token",
        });
      }
      req.userId = payload;
      return next();
    }
  )(req, res, next);
};
