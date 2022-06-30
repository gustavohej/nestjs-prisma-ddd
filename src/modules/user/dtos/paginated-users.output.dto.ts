import { ObjectType } from '@nestjs/graphql';
import { PaginatedOutputBase } from '@shared/adapters/base-classes/paginated.output.base';
import { User } from '../domain/entities/user.entity';
import { UserOutput } from './user.output.dto';

@ObjectType()
export class PaginatedUsersOutput extends PaginatedOutputBase(UserOutput) {}
