import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error(`User with id: ${user_id} does not exist.`);
    }

    if (user.admin === true) {
      return user;
    }

    const userDto: User = {
      ...user,
      updated_at: new Date(),
    };

    return this.usersRepository.turnAdmin(userDto);
  }
}

export { TurnUserAdminUseCase };
