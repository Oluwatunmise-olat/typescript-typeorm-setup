import { User } from "../entities/users.entity";
import { UserService } from "../services/user.service";

export interface IUserService {
  getInstance?(): UserService;

  getAll(): Promise<Array<User>>;

  create(data: UserDTO): Promise<User>;
}

export type UserDTO = {
  username: string;
  email: string;
  password: string;
};
