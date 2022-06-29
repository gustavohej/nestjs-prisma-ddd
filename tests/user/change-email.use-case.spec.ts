import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '@modules/user/database/user.repository.interface';
import { User } from '@modules/user/domain/entities/user.entity';
import {
  EmailAlreadyExistsError,
  UserNotFoundError,
} from '@modules/user/errors/user.errors';
import { ChangeEmailInput } from '@modules/user/use-cases/change-email/change-email.input.dto';
import { ChangeEmailUseCase } from '@modules/user/use-cases/change-email/change-email.use-case';
import { TestingModule, Test } from '@nestjs/testing';

export class UserRepositoryFake {
  async existsEmail(email: string): Promise<void> {}
  async findOneByEmailOrThrow(email: string): Promise<void> {}
  async save(user: User): Promise<void> {}
}

describe('ChangeEmailUseCase', () => {
  let changeEmailUseCase: ChangeEmailUseCase;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChangeEmailUseCase,
        {
          provide: USER_REPOSITORY_TOKEN,
          useClass: UserRepositoryFake,
        },
      ],
    }).compile();

    changeEmailUseCase = module.get(ChangeEmailUseCase);
    userRepository = module.get(USER_REPOSITORY_TOKEN);
  });

  describe('change email', () => {
    it('call the execute with correct parameters', async () => {
      const input: ChangeEmailInput = {
        email: 'admin@tsaaviacao.com.br',
      };

      const user = User.create({
        email: 'user@tsaaviacao.com.br',
      });

      const userRepositoryFindOneByEmailOrThrowSpy = jest
        .spyOn(userRepository, 'findOneByEmailOrThrow')
        .mockResolvedValue(user);

      const userRepositoryEmailExistsSpy = jest
        .spyOn(userRepository, 'existsEmail')
        .mockResolvedValue(false);

      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue();

      const result = await changeEmailUseCase.execute(input);

      expect(userRepositoryFindOneByEmailOrThrowSpy).toHaveBeenCalled();
      expect(userRepositoryEmailExistsSpy).toHaveBeenCalled();
      expect(userRepositorySaveSpy).toHaveBeenCalled();
      expect(result).toEqual(input.email);
    });

    it('throws an error when an email already exists', async () => {
      const input: ChangeEmailInput = {
        email: 'admin@tsaaviacao.com.br',
      };

      const user = User.create({
        email: 'user@tsaaviacao.com.br',
      });

      const userRepositoryFindOneByEmailOrThrowSpy = jest
        .spyOn(userRepository, 'findOneByEmailOrThrow')
        .mockResolvedValue(user);

      const userRepositoryEmailExistsSpy = jest
        .spyOn(userRepository, 'existsEmail')
        .mockResolvedValue(true);

      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue();

      try {
        await changeEmailUseCase.execute(input);
      } catch (e: any) {
        expect(e).toBeInstanceOf(EmailAlreadyExistsError);
        expect(e.message).toBe('Email already exists');
      }

      expect(userRepositoryFindOneByEmailOrThrowSpy).toHaveBeenCalled();
      expect(userRepositoryEmailExistsSpy).toHaveBeenCalled();
      expect(userRepositorySaveSpy).not.toHaveBeenCalled();
    });

    it('throws an error when user not found', async () => {
      const input: ChangeEmailInput = {
        email: 'admin@tsaaviacao.com.br',
      };

      const userRepositoryFindOneByEmailOrThrowSpy = jest
        .spyOn(userRepository, 'findOneByEmailOrThrow')
        .mockImplementation(() => {
          throw new UserNotFoundError();
        });

      const userRepositoryEmailExistsSpy = jest
        .spyOn(userRepository, 'existsEmail')
        .mockResolvedValue(true);

      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue();

      try {
        await changeEmailUseCase.execute(input);
      } catch (e: any) {
        expect(e).toBeInstanceOf(UserNotFoundError);
        expect(e.message).toBe('User not found');
      }

      expect(userRepositoryFindOneByEmailOrThrowSpy).toHaveBeenCalled();
      expect(userRepositoryEmailExistsSpy).not.toHaveBeenCalled();
      expect(userRepositorySaveSpy).not.toHaveBeenCalled();
    });
  });
});
