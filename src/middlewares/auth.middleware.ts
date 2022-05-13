import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifiedCallback,
} from "passport-jwt";
import express from "express";
import { PassportStatic } from "passport";

export default (passport: PassportStatic) => {
  return passport.use("jwt", JwtAuth as unknown as JwtStrategy);
};

const JwtAuth = () => {
  return new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
