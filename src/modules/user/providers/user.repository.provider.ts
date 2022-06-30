import { Provider } from '@nestjs/common';
import { UserPrismaRepository } from '../database/user.prisma.repository';
import { USER_REPOSITORY_TOKEN } from '../database/user.repository.interface';

export const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY_TOKEN,
  useClass: UserPrismaRepository,
};
