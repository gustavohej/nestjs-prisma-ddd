import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '@modules/user/database/user.repository.interface';
import { User } from '@modules/user/domain/entities/user.entity';
import { FindUserInput } from '@modules/user/use-cases/find-user/find-user.input.dto';
import { FindUserUseCase } from '@modules/user/use-cases/find-user/find-user.use-case';
import { TestingModule, Test } from '@nestjs/testing';

export class UserRepositoryFake {
  async findOneByEmailOrThrow(email: string): Promise<void> {}
}

describe('FindUserUseCase', () => {
  let findUserUseCase: FindUserUseCase;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserUseCase,
        {
          provide: USER_REPOSITORY_TOKEN,
          useClass: UserRepositoryFake,
        },
      ],
    }).compile();

    findUserUseCase = module.get(FindUserUseCase);
    userRepository = module.get(USER_REPOSITORY_TOKEN);
  });

  describe('find user', () => {
    it('call the execute with correct parameters', async () => {
      const input: FindUserInput = {
        email: 'admin@tsaaviacao.com.br',
      };

      const user = User.create({
        email: input.email,
      });

      const userRepositoryFindOneByEmailOrThrowSpy = jest
        .spyOn(userRepository, 'findOneByEmailOrThrow')
        .mockResolvedValue(user);

      const result = await findUserUseCase.execute(input);

      expect(userRepositoryFindOneByEmailOrThrowSpy).toHaveBeenCalled();
      expect(result).toEqual(user);
    });
  });
});
