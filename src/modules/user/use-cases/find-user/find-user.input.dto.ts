import { IFindUser } from '@adapters/interfaces/user/find-user.interface';

export class FindUserInput implements IFindUser {
  email: string;
}
