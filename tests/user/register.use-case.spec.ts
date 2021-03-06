import {
  IUserRepository,
  USER_REPOSITORY_TOKEN,
} from '@modules/user/database/user.repository.interface';
import { User } from '@modules/user/domain/entities/user.entity';
import {
  EmailAlreadyExistsError,
  EmailIsInvalidError,
} from '@modules/user/errors/user.errors';
import { RegisterInput } from '@modules/user/use-cases/register/register.input.dto';
import { RegisterUseCase } from '@modules/user/use-cases/register/register.use-case';
import { TestingModule, Test } from '@nestjs/testing';

export class UserRepositoryFake {
  async existsEmail(email: string): Promise<void> {}
  async save(user: User): Promise<void> {}
}

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterUseCase,
        {
          provide: USER_REPOSITORY_TOKEN,
          useClass: UserRepositoryFake,
        },
      ],
    }).compile();

    registerUseCase = module.get(RegisterUseCase);
    userRepository = module.get(USER_REPOSITORY_TOKEN);
  });

  describe('register a user', () => {
    it('call the execute with correct parameters', async () => {
      const input: RegisterInput = {
        email: 'admin@tsaaviacao.com.br',
      };

      const userRepositoryEmailExistsSpy = jest
        .spyOn(userRepository, 'existsEmail')
        .mockResolvedValue(false);

      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue();

      const result = await registerUseCase.execute(input);

      expect(userRepositoryEmailExistsSpy).toHaveBeenCalled();
      expect(userRepositorySaveSpy).toHaveBeenCalled();
      expect(result).toEqual(input.email);
    });

    it('throws an error when an email already exists', async () => {
      const input: RegisterInput = {
        email: 'admin@tsaaviacao.com.br',
      };

      const userRepositoryEmailExistsSpy = jest
        .spyOn(userRepository, 'existsEmail')
        .mockResolvedValue(true);

      try {
        await registerUseCase.execute(input);
      } catch (e: any) {
        expect(e).toBeInstanceOf(EmailAlreadyExistsError);
        expect(e.message).toBe('Email already exists');
      }

      expect(userRepositoryEmailExistsSpy).toHaveBeenCalled();
    });

    it('throws an error when an email is invalid', async () => {
      const input: RegisterInput = {
        email: '',
      };

      const userRepositoryEmailExistsSpy = jest
        .spyOn(userRepository, 'existsEmail')
        .mockResolvedValue(false);

      const userRepositorySaveSpy = jest
        .spyOn(userRepository, 'save')
        .mockResolvedValue();

      try {
        await registerUseCase.execute(input);
      } catch (e: any) {
        expect(e).toBeInstanceOf(EmailIsInvalidError);
        expect(e.message).toBe('Email is invalid');
      }

      expect(userRepositoryEmailExistsSpy).toHaveBeenCalled();
      expect(userRepositorySaveSpy).not.toBeCalled();
    });
  });
});
