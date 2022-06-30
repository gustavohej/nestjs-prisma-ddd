import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IPaginated } from '../interfaces/paginated.interface';

@ArgsType()
@InputType()
export abstract class PaginatedInputBase implements IPaginated {
  @Field({ nullable: true })
  take?: number;

  @Field({ nullable: true })
  skip?: number;
}
