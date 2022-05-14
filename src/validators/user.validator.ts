import Joi from "joi";

class UserValidator {
  createValidator() {
    return Joi.object({
      username: Joi.string().required().trim(),
      email: Joi.string()
        .email({ tlds: { allow: ["com", "net"] } })
        .required()
        .trim(),
      password: Joi.string().required().trim(),
    });
  }
}

export default new UserValidator();

export const userLoginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().trim().required(),
});
