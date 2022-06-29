import { IFindUser } from '@adapters/interfaces/user/find-user.interface';

export interface FindUserInput extends IFindUser {
  email: string;
}
