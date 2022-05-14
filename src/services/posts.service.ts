import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Post } from "../entities/posts.entity";
import { createDTO } from "../interfaces/post-service.interface";
import {
  ServerError,
  ResourceNotFoundError,
  NotPermittedError,
} from "../common/exceptions.common";

export class PostService {
  private postRepository: Repository<Post> = AppDataSource.getRepository(Post);

  async getAllPosts(userId: number) {
    try {
      return await this.postRepository.find({
        where: { user: { id: userId } },
      });
    } catch (error) {
      throw new ServerError("DataBase Error");
    }
  }

  async create(data: createDTO) {
    const { description, publish, title, userId } = data;

    try {
      const post = new Post();
      post.description = description;
      post.title = title;

      if (publish) post.publish = publish;

      post.user_id = userId;

      const response = await this.postRepository.save(post);

      return response;
    } catch (error) {
      throw new ServerError();
    }
  }

  async delete(postId: number, userId: number) {
    try {
      const postObj = await this.postRepository.findOneBy({ id: postId });

      if (!postObj) {
        throw new ResourceNotFoundError("Resource Not Found");
      }

      if (!(postObj.user.id === userId)) {
        throw new NotPermittedError({ message: "Unauthorized to modify" });
      }

      await this.postRepository.delete({ id: postId });
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

export default new PostService();
