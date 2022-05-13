import Joi from "joi";

export const userCreationValidator = Joi.object({
  username: Joi.string().required().trim(),
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net"] } })
    .required()
    .trim(),
  password: Joi.string().required().trim(),
});

export const userLoginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
});
