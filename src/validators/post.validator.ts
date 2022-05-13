import Joi from "joi";

export const createPostValidator = Joi.object({
  title: Joi.string().trim().required(),
  description: Joi.string().required(),
  publish: Joi.boolean().optional(),
});
