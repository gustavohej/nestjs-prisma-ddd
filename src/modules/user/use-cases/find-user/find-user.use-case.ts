import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '@modules/user/database/user.repository.interface';
import { User } from '@modules/user/domain/entities/user.entity';
import { Inject } from '@nestjs/common';
import { FindUserInput } from './find-user.input.dto';

export class FindUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: FindUserInput): Promise<User> {
    return await this.userRepository.findOneByEmailOrThrow(input.email);
  }
}
