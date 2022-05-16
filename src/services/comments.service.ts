import {
  NotPermittedError,
  ResourceNotFoundError,
  ServerError,
} from "../common/exceptions.common";
import { AppDataSource } from "../data-source";
import { Comment } from "../entities/comments.entity";
import {
  ICreateCommentDto,
  IEditCommentDto,
} from "../interfaces/comment-service.interface";

class CommentService {
  private commentRepository = AppDataSource.getRepository(Comment);

  async getPostComment(postId: number) {
    try {
      const [data, count] = await this.commentRepository.findAndCount({
        where: { post: { id: postId } },
        relations: { post: true },
        loadEagerRelations: false,
      });

      return [data, count];
    } catch (error) {
      throw new ServerError();
    }
  }

  async create(data: ICreateCommentDto) {
    const { userId, postId, description } = data;

    try {
      let comment = new Comment();
      comment.user_id = userId;
      comment.post_id = postId;
      comment.description = description;

      return await this.commentRepository.save(comment);
    } catch (error) {
      if (error.name === "QueryFailedError") {
        throw new ResourceNotFoundError("Passed Id For Post Not Found");
      }
      throw new ServerError();
    }
  }

  async delete(commentId: number, userId: number) {
    try {
      const comment = await this.commentRepository.findOneBy({
        id: commentId,
      });

      if (!comment) {
        throw new ResourceNotFoundError("Resource Not Found");
      }

      if (!(comment.user.id == userId)) {
        throw new NotPermittedError({ message: "Unauthorized to modify" });
      }

      await this.commentRepository.delete({ id: commentId });
    } catch (error) {
      if (
        error instanceof ResourceNotFoundError ||
        error instanceof NotPermittedError
      ) {
        throw error;
      }

      throw new ServerError();
    }
  }

  async edit(data: IEditCommentDto) {
    const { commentId, userId, description } = data;
    try {
      const comment = await this.commentRepository.findOneBy({
        id: commentId,
      });

      if (!comment) {
        throw new ResourceNotFoundError("Resource Not Found");
      }

      if (!(comment.user.id == userId)) {
        throw new NotPermittedError({ message: "Unauthorized to modify" });
      }

      if (description) comment.description = description;

      return await this.commentRepository.save(comment);
    } catch (error) {
      if (
        error instanceof ResourceNotFoundError ||
        error instanceof NotPermittedError
      ) {
        throw error;
      }

      throw new ServerError();
    }
  }
}

export default new CommentService();
