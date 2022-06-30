import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '@modules/user/database/user.repository.interface';
import { User } from '@modules/user/domain/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { IPageInfo } from '@shared/adapters/interfaces/page-info.interface';
import { FindUsersInput } from './find-users.input.dto';

@Injectable()
export class FindUsersUseCase {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(input: FindUsersInput): Promise<IPageInfo<User>> {
    const { email, take, skip } = input;
    return await this.userRepository.findManyPaginated({
      params: {
        email,
      },
      pagination: {
        take,
        skip,
      },
    });
  }
}
