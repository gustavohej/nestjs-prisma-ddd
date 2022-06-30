import { IPageInfo } from '@shared/adapters/interfaces/page-info.interface';
import { IFindManyPaginated } from '@shared/domain/interfaces/repository.interface';
import { User, UserProps } from '../domain/entities/user.entity';

export const USER_REPOSITORY_TOKEN = Symbol('USER_REPOSITORY');

export interface IFindUsersQuery extends IFindManyPaginated<UserProps> {}

export interface IUserRepository {
  existsEmail(email: string): Promise<boolean>;
  findOneByEmailOrThrow(email: string): Promise<User>;
  findManyPaginated(query: IFindUsersQuery): Promise<IPageInfo<User>>;
  save(user: User): Promise<void>;
}
