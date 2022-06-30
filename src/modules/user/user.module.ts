import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { userRepositoryProvider } from './providers/user.repository.provider';
import { FindUserGraphqlResolver } from './use-cases/find-users/find-users.graphql.resolver';
import { FindUsersUseCase } from './use-cases/find-users/find-users.use-case';

@Module({
  imports: [PrismaModule],
  providers: [
    FindUserGraphqlResolver,
    FindUsersUseCase,
    userRepositoryProvider,
  ],
})
export class UserModule {}
