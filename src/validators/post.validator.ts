import Joi from "joi";

class PostValidator {
  deleteValidator() {
    return Joi.object({
      postId: Joi.number().required(),
    });
  }

  createValidator() {
    return Joi.object({
      title: Joi.string().trim().required(),
      description: Joi.string().required(),
      publish: Joi.boolean().optional(),
      mimeUrl: Joi.string().optional(),
    });
  }
}

export default new PostValidator();
