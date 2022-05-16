import Joi from "joi";

class CommentValidator {
  getPostCommentValidator() {
    return Joi.object({
      postId: Joi.number().required().label("postId"),
    });
  }

  createValidator() {
    return Joi.object({
      postId: Joi.number().required().label("postId"),
      description: Joi.string().required(),
    });
  }

  deleteValidator() {
    return Joi.object({
      commentId: Joi.number().required().label("commentId"),
    });
  }

  editValidator() {
    return Joi.object({
      commentId: Joi.number().required().label("commentId"),
      description: Joi.string().optional(),
    });
  }
}

export default new CommentValidator();
