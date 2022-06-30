import { IFindUsers } from '@adapters/interfaces/user/find-users.interface';
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { PaginatedInputBase } from '@shared/adapters/base-classes/paginated.input.base';

@ArgsType()
@InputType()
export class FindUsersInput extends PaginatedInputBase implements IFindUsers {
  @Field({ nullable: true })
  email?: string;
}
