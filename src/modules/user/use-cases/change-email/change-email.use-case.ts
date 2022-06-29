import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '@modules/user/database/user.repository.interface';
import { EmailAlreadyExistsError } from '@modules/user/errors/user.errors';
import { Inject } from '@nestjs/common';
import { ChangeEmailInput } from './change-email.input.dto';

export class ChangeEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: ChangeEmailInput): Promise<string> {
    const user = await this.userRepository.findOneByEmailOrThrow(input.email);

    if (user.props.email !== input.email) {
      if (await this.userRepository.existsEmail(input.email)) {
        throw new EmailAlreadyExistsError();
      }
      user.changeEmail(input.email);
    }

    await this.userRepository.save(user);
    return user.props.email;
  }
}
