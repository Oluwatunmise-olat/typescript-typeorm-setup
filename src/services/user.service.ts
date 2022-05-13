import { IUserService, UserDTO } from "../interfaces/user-service.interface";
import { AppDataSource } from "../data-source";
import { User } from "../entities/users.entity";
import { BodyFieldError, ServerError } from "../common/exceptions.common";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async getAll() {
    try {
      return await this.userRepository
        .createQueryBuilder("users")
        .leftJoinAndSelect("users.posts", "posts")
        .getMany();
    } catch (error) {
      throw new ServerError("Database Error");
    }
  }

  async create(data: UserDTO): Promise<User> {
    try {
      const user = new User();
      user.email = data.email;
      user.username = data.username;
      user.password = data.password;

      user.makePassword();

      return await this.userRepository.save(user);
    } catch (error) {
      if (error.name == "QueryFailedError") {
        throw new BodyFieldError("Email Already Exists");
      }
      throw new ServerError("Database Error");
    }
  }
}

export default new UserService();
