import { IUser } from '@adapters/interfaces/user/user.interface';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOutput implements IUser {
  @Field()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
