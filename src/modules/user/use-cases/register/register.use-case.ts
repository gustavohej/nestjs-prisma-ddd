import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '@modules/user/database/user.repository.interface';
import { User } from '@modules/user/domain/entities/user.entity';
import { EmailAlreadyExistsError } from '@modules/user/errors/user.errors';
import { Inject } from '@nestjs/common';
import { RegisterInput } from './register.input.dto';

export class RegisterUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: RegisterInput): Promise<string> {
    if (await this.userRepository.existsEmail(input.email)) {
      throw new EmailAlreadyExistsError();
    }

    const user = User.create({
      email: input.email,
    });

    await this.userRepository.save(user);
    return user.props.email;
  }
}
