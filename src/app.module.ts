import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        'src/infrastructure/graphql/schema.gql',
      ),
      sortSchema: true,
    }),
  ],
})
export class AppModule {}
