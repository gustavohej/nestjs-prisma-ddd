import { PaginatedUsersOutput } from '@modules/user/dtos/paginated-users.output.dto';
import { UserOutput } from '@modules/user/dtos/user.output.dto';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { FindUsersInput } from './find-users.input.dto';
import { FindUsersUseCase } from './find-users.use-case';

@Resolver()
export class FindUsersGraphqlResolver {
  constructor(private readonly findUsersUseCase: FindUsersUseCase) {}

  @Query(() => PaginatedUsersOutput)
  async findUsers(
    @Args('input') input: FindUsersInput,
  ): Promise<PaginatedUsersOutput> {
    const result = await this.findUsersUseCase.execute(input);
    const { items, ...pagination } = result;
    return {
      items: items.map((item) => new UserOutput(item.props.email)),
      ...pagination,
    };
  }
}
