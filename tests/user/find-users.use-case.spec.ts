import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '@modules/user/database/user.repository.interface';
import { User } from '@modules/user/domain/entities/user.entity';
import { FindUsersInput } from '@modules/user/use-cases/find-users/find-users.input.dto';
import { FindUsersUseCase } from '@modules/user/use-cases/find-users/find-users.use-case';
import { TestingModule, Test } from '@nestjs/testing';
import { IPageInfo } from '@shared/adapters/interfaces/page-info.interface';

export class UserRepositoryFake {
  async findManyPaginated(query: any): Promise<void> {}
}

describe('FindUsersUseCase', () => {
  let findUsersUseCase: FindUsersUseCase;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUsersUseCase,
        {
          provide: USER_REPOSITORY_TOKEN,
          useClass: UserRepositoryFake,
        },
      ],
    }).compile();

    findUsersUseCase = module.get(FindUsersUseCase);
    userRepository = module.get(USER_REPOSITORY_TOKEN);
  });

  describe('find users', () => {
    it('call the execute with correct parameters', async () => {
      const input: FindUsersInput = {
        email: 'admin@tsaaviacao.com.br',
      };

      const pageInfo: IPageInfo<User> = {
        items: [
          User.create({
            email: 'admin@tsaaviacao.com.br',
          }),
        ],
        total: 1,
        totalPages: 1,
        currentPage: 1,
      };

      const userRepositoryFindManyPaginatedSpy = jest
        .spyOn(userRepository, 'findManyPaginated')
        .mockResolvedValue(pageInfo);

      const result = await findUsersUseCase.execute(input);

      const { email, take, skip } = input;
      expect(userRepositoryFindManyPaginatedSpy).toHaveBeenCalledWith({
        params: {
          email,
        },
        pagination: {
          take,
          skip,
        },
      });
      expect(result).toEqual(pageInfo);
    });
  });
});
