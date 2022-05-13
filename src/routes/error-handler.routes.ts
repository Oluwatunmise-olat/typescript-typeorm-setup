import express from "express";

import Response from "../common/response.common";
import {
  ServerError,
  ResourceNotFoundError,
  BodyFieldError,
} from "../common/exceptions.common";

export default (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (error instanceof ServerError) {
    return res.status(error.statusCode).json(
      Response.response(true, error.statusCode, {
        message: error.message,
        data: [],
      })
    );
  }
  if (error instanceof ResourceNotFoundError) {
    return res.status(error.statusCode).json(
      Response.response(true, error.statusCode, {
        message: error.message,
        data: [],
      })
    );
  }

  if (error instanceof BodyFieldError) {
    return res.status(error.statusCode).json(
      Response.response(true, error.statusCode, {
        message: error.message,
        data: error.data,
      })
    );
  }

  return next();
};
