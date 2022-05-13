import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { BodyFieldError } from "../common/exceptions.common";

class RequestBodyDataMiddleware {
  validate(schema: Joi.AnySchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error, value: _ } = schema.validate(req.body, {
        abortEarly: false,
      });

      if (error == undefined) {
        return next();
      }

      const formattedResponse = this.formatError(error.details);

      throw new BodyFieldError(formattedResponse);
    };
  }

  private formatError(errorArr: Array<Joi.ValidationErrorItem>) {
    return errorArr.map((errorObj) => {
      return { message: errorObj.message };
    });
  }
}

export default new RequestBodyDataMiddleware();
