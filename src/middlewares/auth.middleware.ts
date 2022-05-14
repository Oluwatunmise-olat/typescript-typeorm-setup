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
    (error, token) => {
      if (error || !token) {
        throw new AuthenticationError({
          message: "Invalid Authentication Token",
        });
      }
      return next();
    }
  )(req, res, next);
};