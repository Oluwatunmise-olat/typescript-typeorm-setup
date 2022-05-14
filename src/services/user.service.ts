import { UserDTO } from "../interfaces/user-service.interface";
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

  async create(
    data: UserDTO
  ): Promise<Omit<User, "password" | "makePassword" | "checkPassword">> {
    try {
      let user = new User();
      user.email = data.email;
      user.username = data.username;
      user.password = data.password;

      user.makePassword();

      const { password: _, ...result } = await this.userRepository.save(user);

      return result;
    } catch (error) {
      if (error.name == "QueryFailedError") {
        throw new BodyFieldError("Email Already Exists");
      }
      throw new ServerError("Database Error");
    }
  }

  async getOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }
}

export default new UserService();
