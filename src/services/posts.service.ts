import { Repository } from "typeorm";

import { AppDataSource } from "../data-source";
import { Post } from "../entities/posts.entity";
import { createDTO, getByEmailDTO } from "../interfaces/post-service.interface";
import {
  ServerError,
  BodyFieldError,
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

  async getPostByEmail(data: getByEmailDTO) {
    try {
      const [result, count] = await this.postRepository.findAndCountBy({
        user: { email: data.userEmail },
      });
      return result;
    } catch (error) {
      throw new ServerError("DataBase Error");
    }
  }

  async create(data: createDTO) {}

  async delete(postId: number) {}
}

export default new PostService();
